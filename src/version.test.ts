import { test, expect } from "vitest";

import pkg from "../package.json";

import { version } from "./version";

test("version", () => {
  expect(version).toBe(pkg.version);
});
