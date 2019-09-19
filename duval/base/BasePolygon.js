import { fabric } from 'fabric'

export class BasePolygon {

  static DEFAULT_BG_COLOR = '#B4FFFE'
  static DEFAULT_BORDER_COLOR = '#532F5B'
  static DEFAULT_FONT_FACE = 'Roboto Condensed'

  id
  points
  bgColor
  label
  edge

  /**
   * Constructor
   * @param id {String}
   * @param points {Array|void}
   * @param options {Object|void}
   * @returns {Group}
   */
  constructor(id, points = [], options = {}) {
    const { bgColor = BasePolygon.DEFAULT_BG_COLOR, label = true, EDGE } = options
    this.id = id
    this.points = points
    this.bgColor = bgColor
    this.label = label
    this.edge = EDGE
    return this.init()
  }

  /**
   * @return {Group}
   */
  init() {
    let polygon = new fabric.Polygon(this.points, {
      fill: this.bgColor,
      stroke: BasePolygon.DEFAULT_BORDER_COLOR,
      strokeWidth: 1,
    })
    const group = new fabric.Group([polygon])
    if (!!this.label) group.addWithUpdate(this.addLabel())
    return group
  }

  /**
   * Add label inside polygon
   * @abstract
   * @returns {Group}
   */
  addLabel() { throw new Error('Add label method should be implemented') }
}
