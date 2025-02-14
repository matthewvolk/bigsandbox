import { test, expect } from "vitest";

import { foo } from "./foo";

test("foo", () => {
  expect(foo()).toBe("foo");
});
