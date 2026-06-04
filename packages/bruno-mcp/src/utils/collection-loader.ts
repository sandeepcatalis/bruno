import * as fs from 'node:fs';
import * as path from 'node:path';

const FORMAT_CONFIG: Record<string, { ext: string; collectionFile: string; folderFile: string }> = {
  yml: { ext: '.yml', collectionFile: 'opencollection.yml', folderFile: 'folder.yml' },
  bru: { ext: '.bru', collectionFile: 'collection.bru', folderFile: 'folder.bru' }
};

export function getCollectionFormat(collectionPath: string): string | null {
  if (fs.existsSync(path.join(collectionPath, 'opencollection.yml'))) return 'yml';
  if (fs.existsSync(path.join(collectionPath, 'bruno.json'))) return 'bru';
  return null;
}

export function resolveWorkspace(): string {
  return process.env.BRUNO_WORKSPACE || process.cwd();
}

export interface CollectionInfo {
  name: string;
  path: string;
  format: string;
  requestCount: number;
}

export function discoverCollections(workspacePath: string): CollectionInfo[] {
  const collections: CollectionInfo[] = [];

  if (!fs.existsSync(workspacePath)) return collections;

  // Check if workspacePath itself is a collection
  const format = getCollectionFormat(workspacePath);
  if (format) {
    const name = getCollectionName(workspacePath, format);
    const requestCount = countRequests(workspacePath, format);
    collections.push({ name, path: workspacePath, format, requestCount });
    return collections;
  }

  // Scan subdirectories
  const entries = fs.readdirSync(workspacePath, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;

    const dirPath = path.join(workspacePath, entry.name);
    const dirFormat = getCollectionFormat(dirPath);
    if (dirFormat) {
      const name = getCollectionName(dirPath, dirFormat);
      const requestCount = countRequests(dirPath, dirFormat);
      collections.push({ name, path: dirPath, format: dirFormat, requestCount });
    }
  }

  return collections;
}

function getCollectionName(collectionPath: string, format: string): string {
  try {
    if (format === 'bru') {
      const brunoJson = JSON.parse(fs.readFileSync(path.join(collectionPath, 'bruno.json'), 'utf8'));
      return brunoJson.name || path.basename(collectionPath);
    }
    // yml format - parse opencollection.yml for name
    const content = fs.readFileSync(path.join(collectionPath, 'opencollection.yml'), 'utf8');
    const nameMatch = content.match(/^name:\s*(.+)$/m);
    return nameMatch?.[1]?.trim() || path.basename(collectionPath);
  } catch {
    return path.basename(collectionPath);
  }
}

function countRequests(dirPath: string, format: string, recursive = true): number {
  const ext = FORMAT_CONFIG[format].ext;
  const { collectionFile, folderFile } = FORMAT_CONFIG[format];
  let count = 0;

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules' || entry.name === 'environments') continue;

    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory() && recursive) {
      count += countRequests(fullPath, format);
    } else if (entry.isFile() && entry.name.endsWith(ext) && entry.name !== collectionFile && entry.name !== folderFile) {
      count++;
    }
  }

  return count;
}

export interface RequestInfo {
  name: string;
  filename: string;
  path: string;
  relativePath: string;
  method?: string;
  url?: string;
  type?: string;
  seq?: number;
  tags?: string[];
}

export function listRequests(collectionPath: string, subPath?: string, recursive = true): RequestInfo[] {
  const format = getCollectionFormat(collectionPath);
  if (!format) return [];

  const { ext, collectionFile, folderFile } = FORMAT_CONFIG[format];
  const scanPath = subPath ? path.join(collectionPath, subPath) : collectionPath;
  const requests: RequestInfo[] = [];

  function scan(dir: string) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.name.startsWith('.') || entry.name === 'node_modules' || entry.name === 'environments') continue;
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory() && recursive) {
        scan(fullPath);
      } else if (entry.isFile() && entry.name.endsWith(ext) && entry.name !== collectionFile && entry.name !== folderFile) {
        const info = parseRequestMeta(fullPath, collectionPath, format!);
        if (info) requests.push(info);
      }
    }
  }

  scan(scanPath);
  return requests.sort((a, b) => (a.seq ?? 999) - (b.seq ?? 999));
}

function parseRequestMeta(filePath: string, collectionPath: string, format: string): RequestInfo | null {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(collectionPath, filePath);
    const filename = path.basename(filePath);

    // Extract meta block info using simple regex (avoid full parse dependency)
    const nameMatch = content.match(/^\s*name\s+(.+)$/m) || content.match(/^name:\s*(.+)$/m);
    const typeMatch = content.match(/^\s*type\s+(.+)$/m) || content.match(/^type:\s*(.+)$/m);
    const seqMatch = content.match(/^\s*seq\s+(\d+)$/m) || content.match(/^seq:\s*(\d+)$/m);

    // Extract method and url
    let method: string | undefined;
    let url: string | undefined;

    if (format === 'bru') {
      const methodBlock = content.match(/^(get|post|put|delete|patch|options|head|trace)\s*\{/m);
      if (methodBlock) {
        method = methodBlock[1].toUpperCase();
        const urlMatch = content.match(/^\s*url:\s*(.+)$/m);
        url = urlMatch?.[1]?.trim();
      }
    } else {
      const methodMatch = content.match(/^method:\s*(.+)$/m);
      method = methodMatch?.[1]?.trim().toUpperCase();
      const urlMatch = content.match(/^url:\s*(.+)$/m);
      url = urlMatch?.[1]?.trim();
    }

    // Extract tags
    const tagsMatch = content.match(/^\s*tags\s+(.+)$/m) || content.match(/^tags:\s*(.+)$/m);
    const tags = tagsMatch?.[1]?.split(',').map(t => t.trim()).filter(Boolean);

    return {
      name: nameMatch?.[1]?.trim() || filename.replace(/\.\w+$/, ''),
      filename,
      path: filePath,
      relativePath,
      method,
      url,
      type: typeMatch?.[1]?.trim(),
      seq: seqMatch ? Number.parseInt(seqMatch[1], 10) : undefined,
      tags
    };
  } catch {
    return null;
  }
}

export interface EnvironmentInfo {
  name: string;
  path: string;
  variables: Array<{ name: string; value: string; enabled: boolean; secret: boolean }>;
}

export function listEnvironments(collectionPath: string): EnvironmentInfo[] {
  const format = getCollectionFormat(collectionPath);
  if (!format) return [];

  const envDir = path.join(collectionPath, 'environments');
  if (!fs.existsSync(envDir)) return [];

  const ext = FORMAT_CONFIG[format].ext;
  const environments: EnvironmentInfo[] = [];

  const entries = fs.readdirSync(envDir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isFile()) continue;
    // Support both native format and .json
    if (!entry.name.endsWith(ext) && !entry.name.endsWith('.json') && !entry.name.endsWith('.yml')) continue;

    const filePath = path.join(envDir, entry.name);
    const env = parseEnvironmentFile(filePath, format);
    if (env) environments.push(env);
  }

  return environments;
}

function parseEnvironmentFile(filePath: string, _format: string): EnvironmentInfo | null {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const ext = path.extname(filePath);
    const baseName = path.basename(filePath, ext);
    const variables: EnvironmentInfo['variables'] = [];

    if (ext === '.json') {
      const json = JSON.parse(content);
      const name = json.name || baseName;
      const vars = json.variables || [];
      for (const v of vars) {
        if (v.enabled !== false) {
          variables.push({
            name: v.name || v.key,
            value: v.secret ? '••••••' : (v.value || ''),
            enabled: v.enabled !== false,
            secret: !!v.secret
          });
        }
      }
      return { name, path: filePath, variables };
    }

    // .bru or .yml format - extract variables with regex
    const name = baseName;
    const varBlockMatch = content.match(/vars\s*\{([^}]*)\}/s) || content.match(/variables:([\s\S]*?)(?=\n\w|\n$|$)/);
    if (varBlockMatch) {
      const block = varBlockMatch[1];
      const lines = block.split('\n');
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;

        const disabled = trimmed.startsWith('~');
        const cleaned = disabled ? trimmed.slice(1) : trimmed;
        const colonIdx = cleaned.indexOf(':');
        if (colonIdx === -1) continue;

        const varName = cleaned.slice(0, colonIdx).trim();
        const varValue = cleaned.slice(colonIdx + 1).trim();
        const secret = varName.startsWith('secret:') || trimmed.includes(':secret');

        variables.push({
          name: varName.replace(/^secret:/, '').trim(),
          value: secret ? '••••••' : varValue,
          enabled: !disabled,
          secret
        });
      }
    }

    return { name, path: filePath, variables };
  } catch {
    return null;
  }
}

export function readRequestFile(filePath: string): string | null {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch {
    return null;
  }
}
