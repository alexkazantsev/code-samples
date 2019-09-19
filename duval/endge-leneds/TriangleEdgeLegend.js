import { fabric } from 'fabric'
import { BaseEdgeLegend } from '../base/BaseEdgeLegend'

export class TriangleEdgeLegend extends BaseEdgeLegend {

  #start = {}
  #end = {}
  #angle = {}
  #offsetX = 0
  #offsetY = 0
  #ratio = .50
  #text = ''

  /**
   * @param start {Object}
   * @param end {Object}
   * @param angle {Number}
   * @param offsetX {Number}
   * @param offsetY {Number|void}
   * @param ratio {Number}
   * @param text {Text}
   * @returns {Group}
   */
  constructor(start, end, angle, offsetX, offsetY = 0, ratio, text) {
    super()

    this.#start = start
    this.#end = end
    this.#angle = angle
    this.#offsetX = offsetX
    this.#offsetY = offsetY
    this.#ratio = ratio
    this.#text = text

    return this.init()
  }

  init() {
    const offsetTop = 20
    const tr = new fabric.Triangle({
      width: 10,
      height: 10,
      fill: TriangleEdgeLegend.DEFAULT_STROKE_COLOR,
      angle: 90,
      top: offsetTop,
      left: 50,
    })

    const line = new fabric.Line([0, offsetTop + 5, 40, offsetTop + 5], {
      stroke: TriangleEdgeLegend.DEFAULT_STROKE_COLOR, strokeWidth: 1,
    })

    const arrow = new fabric.Group([line, tr], { flipX: this.#angle === 0 })

    const text = new fabric.Textbox(this.#text, {
      fontSize: 12,
      fontFamily: TriangleEdgeLegend.DEFAULT_FONT_FACE,
      textAlign: 'left',
      top: 5,
      left: 5,
      width: 40,
    })

    const dx = this.#end.x - this.#start.x
    const dy = this.#end.y - this.#start.y

    const x0 = parseInt(this.#start.x + dx * this.#ratio)
    const y0 = parseInt(this.#start.y + dy * this.#ratio + this.#offsetY)
    const x1 = parseInt(x0 + this.#offsetX * Math.cos(Math.PI))
    const y1 = parseInt(y0 + this.#offsetX * Math.sin(Math.PI))

    return new fabric.Group([arrow, text], {
      top: y1,
      left: x1,
      angle: this.#angle,
    })
  }
}
