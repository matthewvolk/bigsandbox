import { test, expect } from "vitest";

import { bar } from "./bar";

test("bar", () => {
  expect(bar()).toBe("baz");
});
