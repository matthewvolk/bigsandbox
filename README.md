# Adding a New Utility to `bigcommerce-utils`

## Steps to Create a New Utility

1. **Create a New Directory**

   - Create a new folder in the `src` directory
   - Example: `src/myNewUtil`

2. **Create Your Implementation Files**

   - Create your utility implementation in one or more TypeScript files
   - You can organize your code however you prefer. For example:
     - A single file with your implementation
     - Multiple files split by functionality (like the `utils.ts` pattern shown below)

   Example of a simple single-file approach:

   ```typescript
   // src/myNewUtil/index.ts
   export function myNewUtil(/* params */) {
     // Implementation
   }
   ```

   Example of split files:

   ```typescript
   // src/myNewUtil/helper.ts
   export function helper() {
     // implementation
   }

   // src/myNewUtil/utils.ts
   import { helper } from './helper';

   export function myNewUtil(/* params */) {
     const value = helper();
     // implementation
   }

   // src/myNewUtil/index.ts
   export { myNewUtil } from './myNewUtil';
   ```

3. **Update package.json**
   - Add a new entry to the "exports" field in package.json following this pattern:
   ```json
   "./myNewUtil": {
     "import": {
       "types": "./dist/myNewUtil/index.d.ts",
       "default": "./dist/myNewUtil/index.js"
     },
     "default": {
       "types": "./dist/myNewUtil/index.d.cts",
       "default": "./dist/myNewUtil/index.cjs"
     }
   }
   ```

## Example

You can reference the existing `src/add` or `src/subtract` utilities for valid examples of what's documented above.
