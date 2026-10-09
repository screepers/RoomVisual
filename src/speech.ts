import { COLORS } from './colors.js'
import { closed, relPoly } from './geometry.js'

export interface SpeechOpts {
  background?: string
  textcolor?: string
  textstyle?: string | false
  textsize?: number
  textfont?: string
  opacity?: number
}

const SPEECH_SIZE = 0.5
const SPEECH_FONT = 'Times New Roman'

/** Simulates `creep.say()` through room visuals. */
export function speech(
  visual: RoomVisual,
  text: string,
  x: number,
  y: number,
  opts: SpeechOpts = {},
): RoomVisual {
  const background = opts.background || COLORS.speechBackground
  const textcolor = opts.textcolor || COLORS.speechText
  const textstyle = opts.textstyle || false
  const textsize = opts.textsize || SPEECH_SIZE
  const textfont = opts.textfont || SPEECH_FONT
  const opacity = opts.opacity || 1

  const font = `${textstyle ? `${textstyle} ` : ''}${textsize} ${textfont}`

  const pointer = closed(
    relPoly(x, y, [
      [-0.2, -0.8],
      [0.2, -0.8],
      [0, -0.3],
    ]),
  )

  visual.poly(pointer, { fill: background, stroke: background, opacity, strokeWidth: 0.0 })

  visual.text(text, x, y - 1, {
    color: textcolor,
    backgroundColor: background,
    backgroundPadding: 0.1,
    opacity,
    font,
  })

  return visual
}
