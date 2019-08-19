import assert from 'assert';
import { rollup } from 'rollup';
import fs from 'fs-extra';
import copyTo from '../dist/rollup-plugin-copy-assets-to.module';

// Change working directory to current
process.chdir(__dirname);

describe('rollup-plugin-copy-assets-to', () => {
  beforeAll(async () => {
    await fs.remove('output');
  });

  afterEach(async () => {
    await fs.remove('output');
  });

  it('should copy the assets to the output dir provided', async () => {
    await build({
      assets: [ 'fixtures/top-level-item.txt' ],
      outputDir: 'output/thing',
    });

    assertExists('output/thing/top-level-item.txt');
  });

  it('should copy the assets to output when no outputDir provided', async () => {
    await build({ assets: [ 'fixtures/top-level-item.txt' ] });

    assertExists('output/top-level-item.txt');
  });

  it('should copy folder contents', async () => {
    await build({
      assets: [ 'fixtures/assets' ],
    });

    assertExists('output/assets');
    assertExists('output/assets/foo.txt');
    assertExists('output/assets/bar.csv');
  });

  it('should place all items in output directory specified', async () => {
    await build({
      assets: [ 'fixtures/assets/bar.csv', 'fixtures/top-level-item.txt' ],
      outputDir: 'output/testOutput'
    });

    assertExists('output/testOutput/top-level-item.txt');
    assertExists('output/testOutput/bar.csv');
  });
});

// Run the rollup build with an example configuration.
const build = (config) => new Promise(async resolve => {
    const bundle = await rollup({
      input: './fixtures/index.js',
      plugins: [
        copyTo(config),
      ],
    });

    return resolve(bundle.write({
      file: 'output/bundle.js',
      format: 'iife',
      name: 'test',
    }));
  });

// Asserts that a file does or does not exist.
const assertExists = async (file, shouldExist = true) => {
  const exists = await fs.pathExists(file);

  return assert.ok(exists === shouldExist);
};
