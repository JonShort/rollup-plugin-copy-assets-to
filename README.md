# rollup-plugin-copy-assets-to

[![Build Status](https://travis-ci.org/JonShort/rollup-plugin-copy-assets-to.svg?branch=master)](https://travis-ci.org/JonShort/rollup-plugin-copy-assets-to)
[![npm version](https://badge.fury.io/js/rollup-plugin-copy-assets-to.svg)](https://www.npmjs.com/package/rollup-plugin-copy-assets-to)

Copy additional assets into a directory you choose.

## Installation

_with npm_
```bash
npm install --save-dev rollup-plugin-copy-assets-to
```

_with Yarn_
```bash
yarn add --dev rollup-plugin-copy-assets-to
```

## Usage

```js
// rollup.config.js
import copyTo from 'rollup-plugin-copy-assets-to';

export default {
  entry: 'src/index.js',
  dest: 'dist/bundle.js',
  plugins: [
    copy({
      assets: [
        './src/assets',
        './src/external/buffer.bin',
        './src/component/assets/image.png',
      ],
      outputDir: 'dist/allAssets'
    }),
  ],
};
```

On final bundle generation the provided files will be copied over into the folder chosen with outputDir.

```bash
# Source directory structure
src/
- index.js
- component/
  - assets/
    - image.png
- assets/
  - some-library-needing-special-treatment.js
- external/
  - buffer.bin

# Output directory structure
dist/
- bundle.js
- allAssets/
  - some-library-needing-special-treatment.js
  - image.png
  - buffer.bin
```

### Options

- `assets`: **(required)** An array of paths to copy. Accepts files as well as directories.
- `outputDir`: **(optional)** Path to the directory where assets will be copied to (defaults to bundle output location).

## License

MIT
