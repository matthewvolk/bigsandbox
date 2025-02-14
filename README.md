# `bigsandbox`

## Overview

This module is available in two formats:

- **ES Module**
- **CommonJS**

## Requirements

- **Node.js:** `>=18`

## Installation

> ⚠️ _**Important:** This module is experimental and not guaranteed to follow semver, it is recommended to install it using `--save-exact` to avoid breaking changes._

```sh
npm install --save-exact bigsandbox
```

## Usage

### Modules

```ts
// TypeScript
import { foo } from "bigsandbox/foo";
```

```js
// CommonJS
const { foo } = require("bigsandbox/foo");
```

```js
// ES Module
import { foo } from "bigsandbox/foo";
```

### CLI

```sh
npx bigsandbox
```

## Contributing

This project is built using [`tsup`](https://github.com/egoist/tsup) and publishes its build outputs via the `exports` field in `package.json`. Both the build and package settings are configured to work with TypeScript files a single level deep under the `src` directory. This section explains how you can add new programs for package consumers.

### Adding New Modules

#### (Simple) Single File Program (e.g., `src/foo.ts`)

If you want to add a simple program, simply create a new file directly under the `src` folder:

**Example:** Create `src/foo.ts` with your implementation.

```ts
// src/foo.ts

export function foo() {
  return "foo";
}
```

When you run the build script (`pnpm run build`), tsup will compile `src/foo.ts` into both CommonJS (`dist/foo.cjs`) and ESM (`dist/foo.js`) formats. Consumers of your package can then import the module as:

```js
// ES module usage
import { foo } from "bigsandbox/foo";

// CommonJS usage
const { foo } = require("bigsandbox/foo");

console.log(foo());
```

#### (Complex) Multi-File Program (e.g., a full program under `src/bar`)

If your program requires multiple files (say, a folder structure with many supporting modules), you should do the following:

1. **Create an entry point for the program.**  
   Since the build setup only builds files directly under `src/`, you need to expose the program via a single file in `src`.
2. **Organize your internal folder.**  
   Place your program’s code into a folder (for example, `src/bar/`) and create the main export file inside that folder.
3. **Re-export the folder via an entry file at the top level.**  
   Create a file such as `src/bar.ts` (note: this file is at the top level of `src/`) that re-exports the contents of your program’s folder. This file is automatically picked up by tsup during build and will be published for package consumers.

**Example folder structure:**

```
src/
  ├── index.ts
  ├── foo.ts
  ├── bar/
  │   ├── bar.ts
  │   ├── baz.ts
  │   └── ... other files ...
  └── bar.ts
```

**Content of `src/bar/baz.ts`:**

```ts
// src/bar/baz.ts

export function baz() {
  return "baz";
}
```

**Content of `src/bar/bar.ts`:**

```ts
// src/bar/bar.ts

import { baz } from "./baz";

export function bar() {
  return baz();
}
```

**Content of `src/bar.ts`:**

```ts
// src/bar.ts

export * from "./bar/bar";
```

With this setup, the compiled build will output `dist/bar.js` (or `.cjs`) returned from the entry point `src/bar.ts`. Consumers can import the program by simply using:

```js
// ESM usage
import { bar } from "bigsandbox/bar";

// CommonJS usage
const { bar } = require("bigsandbox/bar");

bar();
```

#### Ensure the library is tree-shakable

Before publishing, you can check that the library is still tree-shakable with [`agadoo`](https://github.com/Rich-Harris/agadoo) by running:

```sh
pnpm run agadoo
```

#### Ensure no issues exist with TypeScript types

[`arethetypeswrong`](https://github.com/arethetypeswrong/cli) attempts to analyze npm package contents for issues with their TypeScript types, particularly ESM-related module resolution issues. Can detect issues like `Resolution failed`, `No types`, `Internal resolution error`, etc.

Before publishing, use it by running:

```sh
pnpm run attw
```

### CLI

The CLI is built using [`tsup`](https://github.com/egoist/tsup) and published to the `bin` directory. The CLI entry point is `cli/index.ts`.

### Scripts

The `scripts` directory is a useful place to put one-off scripts that don't fit in other directories.

Scripts are typically written in plain JavaScript and are executed using Node.js:

```sh
node scripts/foo.js
```

### Testing

This project uses [`vitest`](https://vitest.dev/) for testing.

To add a test for a single file program, simply create a new file in the `src` directory:

```ts
// src/foo.test.ts

import { test, expect } from "vitest";

import { foo } from "./foo";

test("foo", () => {
  expect(foo()).toBe("foo");
});
```

For a multi-file program, you can create a test file in the program’s folder:

```ts
// src/bar/bar.test.ts

import { test, expect } from "vitest";

import { bar } from "./bar";

test("bar", () => {
  expect(bar()).toBe("baz");
});
```

Run tests using:

```sh
pnpm run test
```

or in watch mode using:

```sh
pnpm run dev
```
