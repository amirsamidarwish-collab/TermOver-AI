/**
 * TermOver AI — Parallel Chunk Processor
 * 
 * Large ToS documents are split into chunks and analyzed concurrently
 * to reduce scan time from 4+ minutes down to under 20 seconds.
 * 
 * NOTE: This is a simplified illustration. Full implementation is proprietary.
 */

const MAX_CHUNK_SIZE = 1500; // tokens per chunk

function splitIntoChunks(text, maxSize) {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  const chunks = [];
  let current = "";

  for (const sentence of sentences) {
    if ((current + sentence).length > maxSize) {
      chunks.push(current.trim());
      current = sentence;
    } else {
      current += " " + sentence;
    }
  }

  if (current.trim()) chunks.push(current.trim());
  return chunks;
}

async function analyzeInParallel(documentText) {
  const chunks = splitIntoChunks(documentText, MAX_CHUNK_SIZE);

  // All chunks processed concurrently — not sequentially
  const results = await Promise.all(
    chunks.map(chunk => analyzeChunk(chunk))
  );

  return mergeResults(results);
}
