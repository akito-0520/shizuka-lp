export const STARS = Array.from({ length: 24 }, (_, i) => ({
  w: 2 + (i % 3),
  h: 2 + (i % 2),
  left: `${(i * 19 + 5) % 94}%`,
  top: `${(i * 13 + 3) % 44}%`,
  dur: 1 + (i % 4) * 0.35,
  delay: (i * 0.23) % 2.8,
}));
