/**
 * TermOver AI — Cache-First Lookup
 * 
 * Before running a full AI scan, we check Supabase for a cached result.
 * With 40,000+ websites already analyzed, most users get instant results.
 * 
 * NOTE: This is a simplified illustration. Full implementation is proprietary.
 */

async function getAnalysis(websiteUrl) {
  // 1. Normalize URL to maximize cache hit rate
  const normalizedUrl = normalizeUrl(websiteUrl);

  // 2. Check Supabase cache first
  const { data: cached } = await supabase
    .from('terms_cache')
    .select('result, analyzed_at')
    .eq('url', normalizedUrl)
    .single();

  if (cached) {
    console.log(`Cache hit for ${normalizedUrl}`);
    return cached.result; // instant — no AI call needed
  }

  // 3. Cache miss — run full scan and store result
  console.log(`Cache miss — running full scan for ${normalizedUrl}`);
  const result = await runFullScan(normalizedUrl);

  await supabase
    .from('terms_cache')
    .insert({ url: normalizedUrl, result, analyzed_at: new Date() });

  return result;
}
