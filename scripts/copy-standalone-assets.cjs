const fs = require('node:fs');
const path = require('node:path');

const root = process.cwd();
const standaloneDir = path.join(root, '.next', 'standalone');

if (!fs.existsSync(standaloneDir)) {
  console.warn('Standalone output was not found; skipping asset copy.');
  process.exit(0);
}

const copies = [
  [path.join(root, 'public'), path.join(standaloneDir, 'public')],
  [path.join(root, '.next', 'static'), path.join(standaloneDir, '.next', 'static')],
];

for (const [source, destination] of copies) {
  if (!fs.existsSync(source)) {
    continue;
  }

  fs.rmSync(destination, { recursive: true, force: true });
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.cpSync(source, destination, { recursive: true });
}

function walkFiles(directory) {
  if (!fs.existsSync(directory)) {
    return [];
  }

  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkFiles(entryPath));
    } else {
      files.push(entryPath);
    }
  }
  return files;
}

function withoutRouteGroups(relativeDirectory) {
  if (!relativeDirectory) {
    return '';
  }

  return relativeDirectory
    .split(path.sep)
    .filter((segment) => !/^\(.+\)$/.test(segment))
    .join(path.sep);
}

function routeKey(relativeDirectory, fileName) {
  const baseName = fileName.replace(/\.js$/, '');
  const routeDirectory = relativeDirectory
    ? relativeDirectory.split(path.sep).join('/')
    : '';

  return `/${routeDirectory ? `${routeDirectory}/` : ''}${baseName}`;
}

function ensureClientReferenceManifests(targetAppDirectory, sourceAppDirectory) {
  for (const filePath of walkFiles(targetAppDirectory)) {
    const fileName = path.basename(filePath);
    if (fileName !== 'page.js' && fileName !== 'route.js') {
      continue;
    }

    const manifestName = fileName.replace(/\.js$/, '_client-reference-manifest.js');
    const destination = path.join(path.dirname(filePath), manifestName);
    const relativeDirectory = path.relative(targetAppDirectory, path.dirname(filePath));
    const sourceRouteKey = routeKey(withoutRouteGroups(relativeDirectory), fileName);
    const destinationRouteKey = routeKey(relativeDirectory, fileName);

    if (
      fs.existsSync(destination) &&
      fs.readFileSync(destination, 'utf8').includes(JSON.stringify(destinationRouteKey))
    ) {
      continue;
    }

    const source = path.join(
      sourceAppDirectory,
      withoutRouteGroups(relativeDirectory),
      manifestName,
    );

    if (!fs.existsSync(source) || source === destination) {
      continue;
    }

    let manifest = fs.readFileSync(source, 'utf8');

    if (sourceRouteKey !== destinationRouteKey) {
      manifest = manifest.replace(
        JSON.stringify(sourceRouteKey),
        JSON.stringify(destinationRouteKey),
      );
    }

    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, manifest);
  }
}

const serverAppDirectory = path.join(root, '.next', 'server', 'app');
const standaloneServerAppDirectory = path.join(standaloneDir, '.next', 'server', 'app');

ensureClientReferenceManifests(serverAppDirectory, serverAppDirectory);
ensureClientReferenceManifests(standaloneServerAppDirectory, serverAppDirectory);
