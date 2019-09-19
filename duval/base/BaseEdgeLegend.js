export class BaseEdgeLegend {

  static DEFAULT_STROKE_COLOR = '#532F5B'
  static DEFAULT_FONT_FACE = 'Roboto Condensed'

  /**
   * @abstract
   */
  init() {
    throw new Error('method init() should be implemented')
  }
}
