import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Mesmo punho do favicon, sem cantos arredondados: o iOS aplica a própria máscara
export default async function AppleIcon() {
  const svg = (await readFile(join(process.cwd(), "app/icon.svg"), "utf8")).replace('rx="44"', 'rx="0"');
  const src = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
  return new ImageResponse(
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} width={180} height={180} alt="" />,
    size
  );
}
