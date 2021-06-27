import { abortable } from ".";

/*
Copyright 2021 GoogleChromeLabs

Licensed under the Apache License, Version 2.0(the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// Copied from GoogleChromeLabs/squoosh project
// Full licence: https://github.com/GoogleChromeLabs/squoosh/blob/dev/LICENSE

async function decodeImageImpl(url: string): Promise<HTMLImageElement> {
  const img = new Image();
  img.decoding = "async";
  img.src = url;
  const loaded = new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(Error("Image loading error"));
  });

  if (img.decode) {
    // Nice off-thread way supported in Safari/Chrome.
    // Safari throws on decode if the source is SVG.
    // https://bugs.webkit.org/show_bug.cgi?id=188347
    await img.decode().catch(() => null);
  }

  // Always await loaded, as we may have bailed due to the Safari bug above.
  await loaded;
  return img;
}

async function blobToImg(blob: Blob): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(blob);

  try {
    return await decodeImageImpl(url);
  } finally {
    URL.revokeObjectURL(url);
  }
}

function getWidth(drawable: ImageBitmap | HTMLImageElement): number {
  if ("displayWidth" in drawable) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (drawable as any).displayWidth;
  }
  return drawable.width;
}

function getHeight(drawable: ImageBitmap | HTMLImageElement): number {
  if ("displayHeight" in drawable) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (drawable as any).displayHeight;
  }
  return drawable.height;
}

function drawableToImageData(
  drawable: ImageBitmap | HTMLImageElement,
): ImageData {
  const width = getWidth(drawable);
  const height = getHeight(drawable);
  const sx = 0;
  const sy = 0;
  const sw = getWidth(drawable);
  const sh = getHeight(drawable);

  // Make canvas same size as image
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  // Draw image onto canvas
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not create canvas context");
  ctx.drawImage(drawable, sx, sy, sw, sh, 0, 0, width, height);
  return ctx.getImageData(0, 0, width, height);
}

export async function decodeImage(
  signal: AbortSignal,
  blob: Blob,
): Promise<ImageData> {
  const drawable = await abortable<HTMLImageElement | ImageBitmap>(
    signal,
    "createImageBitmap" in self ? createImageBitmap(blob) : blobToImg(blob),
  );
  return drawableToImageData(drawable);
}
