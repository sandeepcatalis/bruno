const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const cwd = path.resolve(__dirname, '..');
const outFile = path.join(cwd, 'build-output.log');

try {
  execSync('./node_modules/.bin/tsc', { encoding: 'utf8', cwd, timeout: 30000 });
  fs.writeFileSync(outFile, 'BUILD_SUCCESS\n');
} catch (e) {
  const msg = (e.stdout || '') + '\n' + (e.stderr || '') + '\n' + (e.message || '');
  fs.writeFileSync(outFile, 'BUILD_FAILED\n' + msg);
}
