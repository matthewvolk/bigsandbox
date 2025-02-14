import { test, expect } from "vitest";

import { baz } from "./baz";

test("baz", () => {
  expect(baz()).toBe("baz");
});
