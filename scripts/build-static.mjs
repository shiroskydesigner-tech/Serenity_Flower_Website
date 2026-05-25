import { mkdir, rename, rm } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const stashRoot = join(root, '.astro-build-stash');
const hiddenDuringBuild = [
  'src/pages/admin',
  'src/pages/api/admin',
  'src/pages/README.md',
];

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: root,
      stdio: 'inherit',
      env: {
        ...process.env,
        ASTRO_TELEMETRY_DISABLED: process.env.ASTRO_TELEMETRY_DISABLED || '1',
      },
    });

    child.on('error', reject);
    child.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} ${args.join(' ')} exited with code ${code}`));
    });
  });
}

async function moveIfExists(from, to) {
  await mkdir(dirname(to), { recursive: true });
  try {
    await rename(from, to);
    return true;
  } catch (error) {
    if (error?.code === 'ENOENT') return false;
    throw error;
  }
}

async function restore(moved) {
  for (const item of moved.reverse()) {
    await mkdir(dirname(item.from), { recursive: true });
    await rename(item.to, item.from);
  }
}

await rm(join(root, 'dist'), { recursive: true, force: true });
await rm(stashRoot, { recursive: true, force: true });
console.log('Cleaned dist/');

const moved = [];
try {
  for (const relativePath of hiddenDuringBuild) {
    const from = join(root, relativePath);
    const to = join(stashRoot, relativePath);
    if (await moveIfExists(from, to)) moved.push({ from, to });
  }

  await run(process.execPath, [join(root, 'node_modules', 'astro', 'bin', 'astro.mjs'), 'build']);
} finally {
  await restore(moved);
  await rm(stashRoot, { recursive: true, force: true });
}
