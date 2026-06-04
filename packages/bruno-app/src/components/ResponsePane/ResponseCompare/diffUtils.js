/**
 * Simple line-by-line diff utility.
 * Returns an array of { type: 'added' | 'removed' | 'unchanged', line: string }
 */
export function computeLineDiff(textA, textB) {
  const linesA = (textA || '').split('\n');
  const linesB = (textB || '').split('\n');
  const result = [];

  // Simple LCS-based diff
  const n = linesA.length;
  const m = linesB.length;

  // For large texts, fall back to simple comparison
  if (n * m > 1000000) {
    return computeSimpleDiff(linesA, linesB);
  }

  // Build LCS table
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (linesA[i - 1] === linesB[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack to produce diff
  const diff = [];
  let i = n, j = m;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && linesA[i - 1] === linesB[j - 1]) {
      diff.unshift({ type: 'unchanged', line: linesA[i - 1] });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      diff.unshift({ type: 'added', line: linesB[j - 1] });
      j--;
    } else {
      diff.unshift({ type: 'removed', line: linesA[i - 1] });
      i--;
    }
  }

  return diff;
}

function computeSimpleDiff(linesA, linesB) {
  const result = [];
  const maxLen = Math.max(linesA.length, linesB.length);

  for (let i = 0; i < maxLen; i++) {
    const a = linesA[i];
    const b = linesB[i];

    if (a === undefined) {
      result.push({ type: 'added', line: b });
    } else if (b === undefined) {
      result.push({ type: 'removed', line: a });
    } else if (a === b) {
      result.push({ type: 'unchanged', line: a });
    } else {
      result.push({ type: 'removed', line: a });
      result.push({ type: 'added', line: b });
    }
  }

  return result;
}

/**
 * Compare two header objects.
 * Returns { added: [], removed: [], changed: [], unchanged: [] }
 */
export function compareHeaders(headersA, headersB) {
  const a = normalizeHeaders(headersA);
  const b = normalizeHeaders(headersB);
  const allKeys = new Set([...Object.keys(a), ...Object.keys(b)]);

  const added = [];
  const removed = [];
  const changed = [];
  const unchanged = [];

  for (const key of allKeys) {
    if (!(key in a)) {
      added.push({ key, value: b[key] });
    } else if (!(key in b)) {
      removed.push({ key, value: a[key] });
    } else if (a[key] !== b[key]) {
      changed.push({ key, oldValue: a[key], newValue: b[key] });
    } else {
      unchanged.push({ key, value: a[key] });
    }
  }

  return { added, removed, changed, unchanged };
}

function normalizeHeaders(headers) {
  if (!headers || typeof headers !== 'object') return {};
  const result = {};
  for (const [key, value] of Object.entries(headers)) {
    result[key.toLowerCase()] = String(value);
  }
  return result;
}

/**
 * Decode a base64 dataBuffer to text
 */
export function decodeDataBuffer(dataBuffer) {
  if (!dataBuffer) return '';
  try {
    return Buffer.from(dataBuffer, 'base64').toString('utf-8');
  } catch {
    return '[Binary data - cannot display]';
  }
}

/**
 * Pretty-format JSON string (or return as-is if not JSON)
 */
export function prettyFormat(text) {
  if (!text) return '';
  try {
    const parsed = JSON.parse(text);
    return JSON.stringify(parsed, null, 2);
  } catch {
    return text;
  }
}
