export default function createRandomId(): string {
  // 生成する文字列に含める文字セット
  let c: string =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let cl = c.length;
  let r = "";
  for (let i = 0; i < 20; i++) {
    r += c[Math.floor(Math.random() * cl)];
  }
  return r;
}
