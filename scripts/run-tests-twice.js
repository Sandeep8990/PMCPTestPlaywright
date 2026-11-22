const { spawnSync } = require('child_process');

const testArgs = process.argv.slice(2);
const run = (attempt) => {
  console.log(`\nExecution pass ${attempt}/2`);
  const result = spawnSync('npx', ['playwright', 'test', ...testArgs], {
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });
  if (result.status !== 0) {
    console.error(`\nExecution pass ${attempt}/2 failed.`);
    process.exit(result.status || 1);
  }
};

run(1);
run(2);
console.log('\nBoth Playwright execution passes passed.');
