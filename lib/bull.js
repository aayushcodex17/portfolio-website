// Pixel-art bull for the footer, facing right. One character per pixel:
// B body, L highlight, S shade/far side, H near horn, F far horn, E eye, N nostril, T tail, K hoof.
export const BULL_BODY = [
  "..............................",
  "..............LLL.............",
  "............LLBBBL............",
  "..........LLBBBBBBL.......H...",
  "....T.LLLLBBBBBBBBBL..F..H....",
  "...T.BBBBBBBBBBBBBBBB.F.HH....",
  "...T.BBBBBBBBBBBBBBBBBSBHB....",
  "...T.BBBBBBBBBBBBBBBBBBBBBB...",
  "...T.BBBBBBBBBBBBBBBBBBBBEBB..",
  "..T..BBBBBBBBBBBBBBBBBBBBBBBB.",
  "..T..BBBBBBBBBBBBBBBBBBBBBBBBB",
  ".TTT..BBBBBBBBBBBBBBBBBB.BBBNB",
  ".TTT..SBBSSSSSSSSSBBBBS...BBB.",
];

// Two gallop frames for the legs (drawn under the body): stretched, then gathered.
export const BULL_LEGS = [
  [
    ".....BB..SS.......BB..SS......",
    "....BB....SS.....BB....SS.....",
    "...BB......SS...BB......SS....",
    "...BB.......SS.BB........SS...",
    "...KK.......KK.KK........KK...",
  ],
  [
    "......BBSS.........BBSS.......",
    "......BBSS.........BBSS.......",
    ".......BBSS.........BBSS......",
    ".......BBSS.........BBSS......",
    ".......KKKK.........KKKK......",
  ],
];
