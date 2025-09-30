import { extendWallet } from "./index";

describe("extendWallet", () => {
  it("should directly extend an extensible object with name and icon", () => {
    const mockWallet = { signTx: jest.fn() };
    const name = "TestWallet";
    const icon = "test-icon.png";

    const extended = extendWallet(mockWallet, name, icon);

    expect(extended.name).toBe(name);
    expect(extended.icon).toBe(icon);
    expect(extended.signTx).toBe(mockWallet.signTx);
    expect(extended).toBe(mockWallet); // Should be the same object
  });

  it("should use Proxy for non-extensible objects and provide name and icon via getter", () => {
    const mockWallet = { signTx: jest.fn() };
    Object.preventExtensions(mockWallet);
    const name = "TestWallet";
    const icon = "test-icon.png";

    const extended = extendWallet(mockWallet, name, icon);

    expect(extended.name).toBe(name);
    expect(extended.icon).toBe(icon);
    expect(extended.signTx).toBe(mockWallet.signTx);
    expect(extended).not.toBe(mockWallet); // Proxy is a new object
  });

  it("should throw TypeError when trying to set name or icon on Proxy", () => {
    const mockWallet = {};
    Object.preventExtensions(mockWallet);
    const extended = extendWallet(mockWallet, "Test", "icon.png");

    expect(() => {
      (extended as any).name = "NewName";
    }).toThrow(TypeError);

    expect(() => {
      (extended as any).icon = "new-icon.png";
    }).toThrow(TypeError);
  });

  it("should allow setting other properties on Proxy if the target allows", () => {
    const mockWallet = { id: "someId" };
    // Not preventing extensions here to test setting
    const extended = extendWallet(mockWallet, "Test", "icon.png");

    (extended as any).newProp = "newValue";
    expect((extended as any).newProp).toBe("newValue");
  });

  it("should prevent setting new properties if target is non-extensible", () => {
    const mockWallet = { id: "someId" };
    Object.preventExtensions(mockWallet);
    const extended = extendWallet(mockWallet, "Test", "icon.png");

    expect(() => {
      (extended as any).newProp = "newValue";
    }).toThrow(TypeError);
  });

  it("should return true for 'has' name and icon on Proxy", () => {
    const mockWallet = {};
    Object.preventExtensions(mockWallet);
    const extended = extendWallet(mockWallet, "Test", "icon.png");

    expect("name" in extended).toBe(true);
    expect("icon" in extended).toBe(true);
    expect("nonExistent" in extended).toBe(false);
  });

  it("should preserve original properties and methods", () => {
    const mockSignTx = jest.fn();
    const mockWallet = {
      id: "someId",
      signTx: mockSignTx,
    };
    const extended = extendWallet(mockWallet, "Test", "icon.png");

    expect(extended.id).toBe("someId");
    extended.signTx("tx");
    expect(mockSignTx).toHaveBeenCalledWith("tx");
  });

  it("should handle non-extensible object with existing name/icon (Proxy overrides)", () => {
    const mockWallet = { name: "OriginalName", icon: "original-icon.png" };
    Object.preventExtensions(mockWallet);
    const newName = "NewName";
    const newIcon = "new-icon.png";

    const extended = extendWallet(mockWallet, newName, newIcon);

    expect(extended.name).toBe(newName);
    expect(extended.icon).toBe(newIcon);
    // Original should still have old values
    expect((mockWallet as any).name).toBe("OriginalName");
  });

  it("should work with empty object", () => {
    const mockWallet = {};
    const extended = extendWallet(mockWallet, "Test", "icon.png");

    expect(extended.name).toBe("Test");
    expect(extended.icon).toBe("icon.png");
  });

  it("should handle Proxy for objects that are already Proxies", () => {
    const original = { id: "someId" };
    const proxy = new Proxy(original, {});
    Object.preventExtensions(proxy);
    const extended = extendWallet(proxy, "Test", "icon.png");

    expect(extended.name).toBe("Test");
    expect(extended.icon).toBe("icon.png");
    expect((extended as any).id).toBe("someId");
  });
});
