import { TextDecoder } from "util";

// Make TextDecoder available globally for tests
global.TextDecoder = TextDecoder as unknown as typeof global.TextDecoder;
