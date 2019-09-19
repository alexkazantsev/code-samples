/**
 * @abstract
 */
export class BaseFigure {

  static DEFAULT_STROKE_COLOR = '#532F5B'
  static DEFAULT_FONT_FACE = 'Roboto Condensed'

  /**
   * @type {Object}
   */
  _points = {}

  /**
   * @type {StaticCanvas}
   */
  _canvas = null

  /**
   * @param conclusions {Array}
   * @returns {Triangle|BaseFigure}
   */
  addDots(conclusions) {
    if (!Array.isArray(conclusions)) return this
    conclusions.forEach(conclusion => this.addDot.call(this, conclusion))
    return this
  }

  /**
   * @description: Add single dot to the canvas
   * @abstract
   */
  addDot() { throw new Error('Method addDot() should be implemented') }

  /**
   * Update current rendered dots ont he _canvas using conclusions as an input.
   * So, basically you just need to push a new array of conclusions, only those that
   * you want to see on the _canvas.
   * All other _points will be automatically deleted from the _canvas.
   * @param conclusions {Array}
   * @returns {void|Boolean}
   */
  updateDots(conclusions = []) {

    if (!Array.isArray(conclusions)) return false

    /**
     * Add points to the canvas
     */
    conclusions
      .filter(conclusion => !this._points[conclusion.id])
      .forEach(conclusion => this.addDot(conclusion))

    /**
     * Remove points from the canvas
     */
    Object.entries(this._points)
      .filter(([id]) => !conclusions
        .find(({ id: _id }) => id.toString() === _id.toString()))
      .forEach(([id, point]) => this.removeDot(parseInt(id, 10), point))
  }

  /**
   * Remove dot from the _canvas by it's id.
   * @param id {Number}
   * @param point {klass}
   * @returns {void}
   */
  removeDot(id, point) {
    this._canvas.remove(point)
    delete this._points[id]
  }

  /**
   * @abstract
   * @private
   */
  #init() { throw new Error('Method #init() should be implemented') }

  /**
   * @abstract
   * @private
   */
  #renderFigure() { throw new Error('Method #renderFigure() should be implemented') }

  /**
   * @abstract
   * @private
   */
  #renderPolygons() { throw new Error('Method #renderPolygons() should be implemented') }

}
