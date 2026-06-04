const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const pkgDir = path.join(__dirname, '..');

try {
  const out = execSync('./node_modules/.bin/tsc', {
    encoding: 'utf8',
    cwd: pkgDir,
    timeout: 30000
  });
  fs.writeFileSync(path.join(pkgDir, 'build-result.txt'), 'OK\n' + (out || ''));
} catch (e) {
  fs.writeFileSync(path.join(pkgDir, 'build-result.txt'), 'FAIL\n' + (e.stdout || '') + '\n' + (e.stderr || ''));
}
