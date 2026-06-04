"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCollectionFormat = getCollectionFormat;
exports.resolveWorkspace = resolveWorkspace;
exports.discoverCollections = discoverCollections;
exports.listRequests = listRequests;
exports.listEnvironments = listEnvironments;
exports.readRequestFile = readRequestFile;
const fs = __importStar(require("node:fs"));
const path = __importStar(require("node:path"));
const FORMAT_CONFIG = {
    yml: { ext: '.yml', collectionFile: 'opencollection.yml', folderFile: 'folder.yml' },
    bru: { ext: '.bru', collectionFile: 'collection.bru', folderFile: 'folder.bru' }
};
function getCollectionFormat(collectionPath) {
    if (fs.existsSync(path.join(collectionPath, 'opencollection.yml')))
        return 'yml';
    if (fs.existsSync(path.join(collectionPath, 'bruno.json')))
        return 'bru';
    return null;
}
function resolveWorkspace() {
    return process.env.BRUNO_WORKSPACE || process.cwd();
}
function discoverCollections(workspacePath) {
    const collections = [];
    if (!fs.existsSync(workspacePath))
        return collections;
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
        if (!entry.isDirectory())
            continue;
        if (entry.name.startsWith('.') || entry.name === 'node_modules')
            continue;
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
function getCollectionName(collectionPath, format) {
    try {
        if (format === 'bru') {
            const brunoJson = JSON.parse(fs.readFileSync(path.join(collectionPath, 'bruno.json'), 'utf8'));
            return brunoJson.name || path.basename(collectionPath);
        }
        // yml format - parse opencollection.yml for name
        const content = fs.readFileSync(path.join(collectionPath, 'opencollection.yml'), 'utf8');
        const nameMatch = content.match(/^name:\s*(.+)$/m);
        return nameMatch?.[1]?.trim() || path.basename(collectionPath);
    }
    catch {
        return path.basename(collectionPath);
    }
}
function countRequests(dirPath, format, recursive = true) {
    const ext = FORMAT_CONFIG[format].ext;
    const { collectionFile, folderFile } = FORMAT_CONFIG[format];
    let count = 0;
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    for (const entry of entries) {
        if (entry.name.startsWith('.') || entry.name === 'node_modules' || entry.name === 'environments')
            continue;
        const fullPath = path.join(dirPath, entry.name);
        if (entry.isDirectory() && recursive) {
            count += countRequests(fullPath, format);
        }
        else if (entry.isFile() && entry.name.endsWith(ext) && entry.name !== collectionFile && entry.name !== folderFile) {
            count++;
        }
    }
    return count;
}
function listRequests(collectionPath, subPath, recursive = true) {
    const format = getCollectionFormat(collectionPath);
    if (!format)
        return [];
    const { ext, collectionFile, folderFile } = FORMAT_CONFIG[format];
    const scanPath = subPath ? path.join(collectionPath, subPath) : collectionPath;
    const requests = [];
    function scan(dir) {
        if (!fs.existsSync(dir))
            return;
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
            if (entry.name.startsWith('.') || entry.name === 'node_modules' || entry.name === 'environments')
                continue;
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory() && recursive) {
                scan(fullPath);
            }
            else if (entry.isFile() && entry.name.endsWith(ext) && entry.name !== collectionFile && entry.name !== folderFile) {
                const info = parseRequestMeta(fullPath, collectionPath, format);
                if (info)
                    requests.push(info);
            }
        }
    }
    scan(scanPath);
    return requests.sort((a, b) => (a.seq ?? 999) - (b.seq ?? 999));
}
function parseRequestMeta(filePath, collectionPath, format) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const relativePath = path.relative(collectionPath, filePath);
        const filename = path.basename(filePath);
        // Extract meta block info using simple regex (avoid full parse dependency)
        const nameMatch = content.match(/^\s*name\s+(.+)$/m) || content.match(/^name:\s*(.+)$/m);
        const typeMatch = content.match(/^\s*type\s+(.+)$/m) || content.match(/^type:\s*(.+)$/m);
        const seqMatch = content.match(/^\s*seq\s+(\d+)$/m) || content.match(/^seq:\s*(\d+)$/m);
        // Extract method and url
        let method;
        let url;
        if (format === 'bru') {
            const methodBlock = content.match(/^(get|post|put|delete|patch|options|head|trace)\s*\{/m);
            if (methodBlock) {
                method = methodBlock[1].toUpperCase();
                const urlMatch = content.match(/^\s*url:\s*(.+)$/m);
                url = urlMatch?.[1]?.trim();
            }
        }
        else {
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
    }
    catch {
        return null;
    }
}
function listEnvironments(collectionPath) {
    const format = getCollectionFormat(collectionPath);
    if (!format)
        return [];
    const envDir = path.join(collectionPath, 'environments');
    if (!fs.existsSync(envDir))
        return [];
    const ext = FORMAT_CONFIG[format].ext;
    const environments = [];
    const entries = fs.readdirSync(envDir, { withFileTypes: true });
    for (const entry of entries) {
        if (!entry.isFile())
            continue;
        // Support both native format and .json
        if (!entry.name.endsWith(ext) && !entry.name.endsWith('.json') && !entry.name.endsWith('.yml'))
            continue;
        const filePath = path.join(envDir, entry.name);
        const env = parseEnvironmentFile(filePath, format);
        if (env)
            environments.push(env);
    }
    return environments;
}
function parseEnvironmentFile(filePath, _format) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const ext = path.extname(filePath);
        const baseName = path.basename(filePath, ext);
        const variables = [];
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
                if (!trimmed || trimmed.startsWith('#'))
                    continue;
                const disabled = trimmed.startsWith('~');
                const cleaned = disabled ? trimmed.slice(1) : trimmed;
                const colonIdx = cleaned.indexOf(':');
                if (colonIdx === -1)
                    continue;
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
    }
    catch {
        return null;
    }
}
function readRequestFile(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf8');
    }
    catch {
        return null;
    }
}
//# sourceMappingURL=collection-loader.js.map