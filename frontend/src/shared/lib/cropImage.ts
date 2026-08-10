import type { Area } from "react-easy-crop"

const OUTPUT_TYPE = "image/webp"
const OUTPUT_QUALITY = 0.98

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new window.Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error("Не удалось прочитать изображение"))
    image.src = src
  })
}

export async function cropImageFile(file: File, area: Area): Promise<File> {
  const url = URL.createObjectURL(file)

  try {
    const image = await loadImage(url)
    const canvas = document.createElement("canvas")
    canvas.width = Math.round(area.width)
    canvas.height = Math.round(area.height)

    const context = canvas.getContext("2d")
    if (!context) throw new Error("Не удалось обработать изображение")

    context.drawImage(
      image,
      area.x,
      area.y,
      area.width,
      area.height,
      0,
      0,
      canvas.width,
      canvas.height
    )

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, OUTPUT_TYPE, OUTPUT_QUALITY)
    )
    if (!blob) throw new Error("Не удалось обработать изображение")

    const name = file.name.replace(/\.[^.]+$/, "") || "image"

    return new File([blob], `${name}.webp`, { type: OUTPUT_TYPE })
  } finally {
    URL.revokeObjectURL(url)
  }
}
