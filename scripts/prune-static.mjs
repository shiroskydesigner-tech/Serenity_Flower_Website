import { rm } from 'node:fs/promises';

const outDir = new URL('../dist/', import.meta.url);
const devOnlyOutputs = [
  'admin',
  'api/admin',
  'README',
];

await Promise.all(
  devOnlyOutputs.map((path) => rm(new URL(`./${path}`, outDir), { recursive: true, force: true }))
);

console.log(`Pruned dev-only static outputs: ${devOnlyOutputs.join(', ')}`);
