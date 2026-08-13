// Simple in-memory rate limiter. Good enough for a single-instance Node
// server at this site's traffic scale — no external store needed. If this
// ever runs across multiple server instances, this would need to move to a
// shared store (e.g. Redis) since each instance would track its own counts.

type RateLimitOptions = {
  /** Namespaces this limiter from others sharing the same module. */
  key: string;
  /** Max requests allowed per window, per client. */
  max: number;
  windowMs: number;
};

type RateLimitResult = {
  allowed: boolean;
  retryAfterSeconds: number;
};

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
let callsSinceCleanup = 0;

function getClientIdentifier(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();

  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;

  return "unknown";
}

function cleanupExpired(now: number) {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) {
      buckets.delete(key);
    }
  }
}

export function checkRateLimit(request: Request, options: RateLimitOptions): RateLimitResult {
  const now = Date.now();

  callsSinceCleanup += 1;
  if (callsSinceCleanup >= 500) {
    callsSinceCleanup = 0;
    cleanupExpired(now);
  }

  const bucketKey = `${options.key}:${getClientIdentifier(request)}`;
  const bucket = buckets.get(bucketKey);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(bucketKey, { count: 1, resetAt: now + options.windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (bucket.count >= options.max) {
    return { allowed: false, retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000) };
  }

  bucket.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}
