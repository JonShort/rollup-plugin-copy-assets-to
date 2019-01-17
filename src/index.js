const fs = require('fs-extra');
const path = require('path');

const copyAssetTo = ({ assets, outputDir } = {}) => ({
  name: 'copy-assets-to',
  generateBundle: ({ file, dir }) => {
    const outputDirectory = outputDir || dir || path.dirname(file);

    return Promise.all(
        assets.map((asset) =>
          fs.copy(asset, path.join(outputDirectory, path.basename(asset)))
        )
    );
  },
});

export default copyAssetTo;
