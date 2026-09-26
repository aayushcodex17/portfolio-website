// Candlestick data for the header banner: a seeded walk (so server and client render the
// same first frame) that the browser then keeps ticking live.
function mulberry32(seed) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), seed | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function seedCandles(count, seed) {
  const rand = mulberry32(seed);
  const candles = [];
  let price = 100;
  for (let id = 0; id < count; id++) {
    const open = price;
    const close = open + (rand() - 0.43) * 7;
    candles.push({ id, open, close, high: Math.max(open, close) + rand() * 2.5, low: Math.min(open, close) - rand() * 2.5 });
    price = close;
  }
  return candles;
}

// One market tick: the last candle keeps forming; every `perCandle` ticks a new one opens.
export function tickCandles(candles, tick, perCandle = 4) {
  const last = candles.at(-1);
  if (tick % perCandle === 0) {
    const open = last.close;
    return [...candles.slice(1), { id: last.id + 1, open, close: open, high: open, low: open }];
  }
  const recent = candles.slice(-20);
  const mean = recent.reduce((sum, c) => sum + c.close, 0) / recent.length;
  const close = last.close + (Math.random() - 0.5) * 3.4 + (mean - last.close) * 0.06;
  return [...candles.slice(0, -1), { ...last, close, high: Math.max(last.high, close), low: Math.min(last.low, close) }];
}

// Pixel grid, one column per candle, cells top to bottom: "up" | "down" | "wick" | null.
export function toGrid(candles, rows) {
  const max = Math.max(...candles.map((c) => c.high));
  const min = Math.min(...candles.map((c) => c.low));
  const row = (p) => Math.round(((max - p) / (max - min || 1)) * (rows - 1));

  return candles.map(({ open, close, high, low }) => {
    const bodyTop = row(Math.max(open, close));
    const bodyBottom = row(Math.min(open, close));
    const kind = close >= open ? "up" : "down";
    return Array.from({ length: rows }, (_, r) => {
      if (r >= bodyTop && r <= bodyBottom) return kind;
      if (r >= row(high) && r <= row(low)) return "wick";
      return null;
    });
  });
}
