import { EnabledWallet } from "common";
import { extendWallet } from "./index";

type MockEnabledWallet = Partial<EnabledWallet>;

describe("extendWallet", () => {
  const mockWalletName = "TestWallet";
  const mockWalletIcon = "test-icon.svg";

  describe("extensible objects (direct assignment path)", () => {
    it("should add name and icon properties directly to extensible objects", () => {
      const mockWallet: MockEnabledWallet = {
        signTx: jest.fn(),
        getBalance: jest.fn(),
      };

      const result = extendWallet(mockWallet, mockWalletName, mockWalletIcon);

      expect(result.name).toBe(mockWalletName);
      expect(result.icon).toBe(mockWalletIcon);
      expect(result.signTx).toBe(mockWallet.signTx);
      expect(result.getBalance).toBe(mockWallet.getBalance);
      // Should be the same object reference
      expect(result).toBe(mockWallet);
    });

    it("should preserve all original methods and properties", () => {
      const mockSignTx = jest.fn().mockResolvedValue("signed-tx");
      const mockGetBalance = jest.fn().mockResolvedValue("1000000");
      const mockWallet: MockEnabledWallet = {
        signTx: mockSignTx,
        getBalance: mockGetBalance,
      };

      const result = extendWallet(mockWallet, mockWalletName, mockWalletIcon);

      expect(result.signTx).toBe(mockSignTx);
      expect(result.getBalance).toBe(mockGetBalance);
    });
  });

  describe("non-extensible objects (proxy path)", () => {
    it("should handle non-extensible objects using proxy", () => {
      const mockWallet: MockEnabledWallet = {
        signTx: jest.fn(),
        getBalance: jest.fn(),
      };
      Object.preventExtensions(mockWallet);

      const result = extendWallet(mockWallet, mockWalletName, mockWalletIcon);

      expect(result.name).toBe(mockWalletName);
      expect(result.icon).toBe(mockWalletIcon);
      expect(result.signTx).toBe(mockWallet.signTx);
      expect(result.getBalance).toBe(mockWallet.getBalance);
      // Should NOT be the same object reference (proxy)
      expect(result).not.toBe(mockWallet);
    });

    it("should handle sealed objects using proxy", () => {
      const mockWallet: MockEnabledWallet = {
        signTx: jest.fn(),
        getBalance: jest.fn(),
      };
      Object.seal(mockWallet);

      const result = extendWallet(mockWallet, mockWalletName, mockWalletIcon);

      expect(result.name).toBe(mockWalletName);
      expect(result.icon).toBe(mockWalletIcon);
      expect(result.signTx).toBe(mockWallet.signTx);
      // Should NOT be the same object reference (proxy)
      expect(result).not.toBe(mockWallet);
    });

    it("should handle frozen objects using proxy", () => {
      const mockWallet: MockEnabledWallet = {
        signTx: jest.fn(),
        getBalance: jest.fn(),
      };
      Object.freeze(mockWallet);

      const result = extendWallet(mockWallet, mockWalletName, mockWalletIcon);

      expect(result.name).toBe(mockWalletName);
      expect(result.icon).toBe(mockWalletIcon);
      expect(result.signTx).toBe(mockWallet.signTx);
      // Should NOT be the same object reference (proxy)
      expect(result).not.toBe(mockWallet);
    });

    it("should preserve wallet methods functionality", async () => {
      const mockSignTx = jest.fn().mockResolvedValue("signed-tx-hash");
      const mockGetBalance = jest.fn().mockResolvedValue("2000000");
      const mockWallet: MockEnabledWallet = {
        signTx: mockSignTx,
        getBalance: mockGetBalance,
      };
      Object.preventExtensions(mockWallet);

      const result = extendWallet(mockWallet, mockWalletName, mockWalletIcon);

      // Methods should work normally
      const signedTx = await result.signTx!("mock-tx");
      const balance = await result.getBalance!();

      expect(signedTx).toBe("signed-tx-hash");
      expect(balance).toBe("2000000");
      expect(mockSignTx).toHaveBeenCalledWith("mock-tx");
      expect(mockGetBalance).toHaveBeenCalled();
    });

    it("should throw error when trying to set any property", () => {
      const mockWallet: MockEnabledWallet = {
        signTx: jest.fn(),
      };
      Object.preventExtensions(mockWallet);

      const result = extendWallet(mockWallet, mockWalletName, mockWalletIcon);

      expect(() => {
        (result as any).customProperty = "test";
      }).toThrow("Cannot add property customProperty, object is not extensible");
    });

    it("should throw error when trying to set name or icon", () => {
      const mockWallet: MockEnabledWallet = {
        signTx: jest.fn(),
      };
      Object.preventExtensions(mockWallet);

      const result = extendWallet(mockWallet, mockWalletName, mockWalletIcon);

      expect(() => {
        result.name = "new-name";
      }).toThrow("Cannot add property name, object is not extensible");

      expect(() => {
        result.icon = "new-icon";
      }).toThrow("Cannot add property icon, object is not extensible");
    });

    it("should allow reading all original properties", () => {
      const mockWallet: MockEnabledWallet = {
        signTx: jest.fn(),
        getBalance: jest.fn(),
        id: "example",
        numericProp: 42,
      };
      Object.preventExtensions(mockWallet);

      const result = extendWallet(mockWallet, mockWalletName, mockWalletIcon);

      expect(result.id).toBe("example");
      expect(result.signTx).toBe(mockWallet.signTx);
      expect(result.getBalance).toBe(mockWallet.getBalance);
    });

    it("should handle property enumeration correctly", () => {
      const mockWallet: MockEnabledWallet = {
        signTx: jest.fn(),
        existingProp: "value",
      };
      Object.preventExtensions(mockWallet);

      const result = extendWallet(mockWallet, mockWalletName, mockWalletIcon);

      // Original properties should still be enumerable
      const keys = Object.keys(result);
      expect(keys).toContain("signTx");
      expect(keys).toContain("existingProp");

      // Virtual properties (name, icon) won't show in Object.keys
      // This is expected behavior with proxies unless we implement ownKeys trap
      expect(result.name).toBe(mockWalletName);
      expect(result.icon).toBe(mockWalletIcon);
    });
  });

  describe("edge cases", () => {
    it("should handle empty wallet objects", () => {
      const emptyWallet = {};

      const result = extendWallet(emptyWallet, mockWalletName, mockWalletIcon);

      expect(result.name).toBe(mockWalletName);
      expect(result.icon).toBe(mockWalletIcon);
    });

    it("should handle null prototype objects", () => {
      const nullProtoWallet = Object.create(null);
      nullProtoWallet.signTx = jest.fn();

      const result = extendWallet(nullProtoWallet, mockWalletName, mockWalletIcon);

      expect(result.name).toBe(mockWalletName);
      expect(result.icon).toBe(mockWalletIcon);
      expect(result.signTx).toBe(nullProtoWallet.signTx);
    });

    it("should handle wallet objects with existing name/icon properties (extensible)", () => {
      const mockWallet: MockEnabledWallet = {
        signTx: jest.fn(),
        name: "existing-name",
        icon: "existing-icon",
      };

      const result = extendWallet(mockWallet, mockWalletName, mockWalletIcon);

      // Should overwrite existing properties
      expect(result.name).toBe(mockWalletName);
      expect(result.icon).toBe(mockWalletIcon);
    });

    it("should handle wallet objects with existing name/icon properties (non-extensible)", () => {
      const mockWallet: MockEnabledWallet = {
        signTx: jest.fn(),
        name: "existing-name",
        icon: "existing-icon",
      };
      Object.preventExtensions(mockWallet);

      const result = extendWallet(mockWallet, mockWalletName, mockWalletIcon);

      // Proxy should return the new values, not original ones
      expect(result.name).toBe(mockWalletName);
      expect(result.icon).toBe(mockWalletIcon);
    });

    it("should preserve instanceof relationships for extensible objects", () => {
      class CustomWallet implements MockEnabledWallet {
        signTx = jest.fn();
      }

      const mockWallet = new CustomWallet();
      const result = extendWallet(mockWallet, mockWalletName, mockWalletIcon);

      expect(result instanceof CustomWallet).toBe(true);
    });
  });

  describe("Object.isExtensible detection", () => {
    it("should correctly identify extensible objects", () => {
      const extensibleWallet = { signTx: jest.fn() };
      expect(Object.isExtensible(extensibleWallet)).toBe(true);

      const result = extendWallet(extensibleWallet, mockWalletName, mockWalletIcon);
      expect(result).toBe(extensibleWallet); // Same reference = direct assignment used
    });

    it("should correctly identify non-extensible objects", () => {
      const nonExtensibleWallet = { signTx: jest.fn() };
      Object.preventExtensions(nonExtensibleWallet);
      expect(Object.isExtensible(nonExtensibleWallet)).toBe(false);

      const result = extendWallet(nonExtensibleWallet, mockWalletName, mockWalletIcon);
      expect(result).not.toBe(nonExtensibleWallet); // Different reference = proxy used
    });

    it("should correctly identify sealed objects as non-extensible", () => {
      const sealedWallet = { signTx: jest.fn() };
      Object.seal(sealedWallet);
      expect(Object.isExtensible(sealedWallet)).toBe(false);

      const result = extendWallet(sealedWallet, mockWalletName, mockWalletIcon);
      expect(result).not.toBe(sealedWallet); // Different reference = proxy used
    });

    it("should correctly identify frozen objects as non-extensible", () => {
      const frozenWallet = { signTx: jest.fn() };
      Object.freeze(frozenWallet);
      expect(Object.isExtensible(frozenWallet)).toBe(false);

      const result = extendWallet(frozenWallet, mockWalletName, mockWalletIcon);
      expect(result).not.toBe(frozenWallet); // Different reference = proxy used
    });
  });
});
