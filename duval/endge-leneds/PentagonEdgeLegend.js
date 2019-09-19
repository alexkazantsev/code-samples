import { fabric } from 'fabric'
import { BaseEdgeLegend } from '../base/BaseEdgeLegend'

export class PentagonEdgeLegend extends BaseEdgeLegend {

  x = 0
  y = 0
  text = ''

  /**
   * @param x {Number}
   * @param y {Number}
   * @param text {String}
   * @returns {Group}
   */
  constructor(x, y, text) {
    super()

    this.x = x
    this.y = y
    this.text = text

    return this.init()
  }

  /**
   * Generates a new edge legend for the Pentagon
   * @returns {Group}
   */
  init() {
    const text = new fabric.Textbox(this.text, {
      fontSize: 12,
      fontFamily: PentagonEdgeLegend.DEFAULT_FONT_FACE,
      fill: PentagonEdgeLegend.DEFAULT_STROKE_COLOR,
      textAlign: 'left',
      top: 5,
      left: 5,
      width: 40,
    })

    const dx = this.x
    const dy = this.y


    return new fabric.Group([text], {
      top: dy,
      left: dx,
    })
  }
}
