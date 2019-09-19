import { fabric } from 'fabric'
import { TriangleEdgeLegend } from '../endge-leneds/TriangleEdgeLegend'
import { TrianglePolygon } from '../polygons/TrianglePolygon'
import { BaseFigure } from '../base/BaseFigure'
import { toRad, calculateTriangleHeight } from '../utils'
import { POLYGON } from 'constants/constants'

export class Triangle extends BaseFigure {

  static #TICK_LINES_COUNT = 9
  static #TICK_LINE_WIDTH = 11
  static #EDGE_WIDTH = 300
  static #DEFAULT_TOP_POSITION = 20

  /**
   * @type {Number}
   * @private
   */
  #triangleWidth

  /**
   * @type {Number}
   * @private
   */
  #triangleHeight

  /**
   * @type {Number}
   * @private
   */
  #topPosition

  /**
   * @type {String}
   * @private
   */
  #clName

  /**
   * @type {Triangle}
   * @private
   */
  #triangle

  /**
   * Constructor
   * @param clName {String}
   * @param options {Object|void}
   * @returns {Triangle}
   */
  constructor(clName, options = {}) {
    super()

    this.#clName = clName
    this.#triangleWidth = options.width ? options.width : Triangle.#EDGE_WIDTH
    this.#topPosition = options.top ? options.top : Triangle.#DEFAULT_TOP_POSITION
    this.#triangleHeight = calculateTriangleHeight(this.#triangleWidth)

    this.#init()
  }

  /**
   * Add a new dot into the _canvas
   * @param conclusion
   * @returns {Triangle}
   */
  addDot(conclusion) {
    const T = this.#topPosition
    const W = this.#triangleWidth + 1
    const H = this.#triangleHeight + T
    const { id, sCH4, sC2H2 } = conclusion

    const point = new fabric.Circle({
      radius: 4,
      fill: 'red',
      originX: 'center',
      originY: 'center',
      left: W - (sC2H2 * W) / 100 - (sCH4 * W * .5) / 100,
      top: H - (sCH4 * W * toRad(Math.sin, 60)) / 100,
    })

    this._points = { ...this._points, [id]: point }
    this._canvas.add(point)
    return this
  }

  /**
   * @override
   */
  #init() {
    this._canvas = new fabric.StaticCanvas(this.#clName)
    this.#renderFigure()
    this.#renderPolygons()
    this.#renderEdgeTicks()
  }

  #renderFigure() {
    const triangle = new fabric.Triangle({
      height: this.#triangleHeight,
      width: this.#triangleWidth,
      top: 20,
      left: 0,
      fill: '#fff',
      stroke: Triangle.DEFAULT_STROKE_COLOR,
      strokeWidth: 1,
    })
    this.#triangle = triangle
    this._canvas.add(triangle)
  }

  #renderEdgeTicks() {
    const mt = this.#triangle.oCoords.mt
    const bl = this.#triangle.oCoords.bl
    const br = this.#triangle.oCoords.br

    const edges = [
      {
        start: bl,
        end: mt,
        angle: 90,
        legend: { text: '% CH4', offsetX: 60, ratio: .50, angle: -60 },
      },
      {
        start: mt,
        end: br,
        angle: -30,
        legend: { text: '% C2H4', offsetX: -60, ratio: .35, angle: 60 },
      },
      {
        start: br,
        end: bl,
        angle: -150,
        legend: { text: '% C2H2', offsetX: -20, offsetY: 20, ratio: .65, angle: 0 },
      },
    ]

    edges.forEach((edge, index) => {
      const {
        start, end,
        legend: { angle, offsetX, offsetY, text, ratio },
      } = edge
      const legend = new TriangleEdgeLegend(start, end, angle, offsetX, offsetY, ratio, text)
      this._canvas.add(legend)
      this.#renderTicks(start, end, edge.angle, index)
    })
  }

  /**
   * Drawing a scale on the sides of a triangle
   * @param start {Object}
   * @param end {Object}
   * @param angle {Number}
   * @param index {Number}
   */
  #renderTicks(start, end, angle, index) {
    const ratio = 10 / Triangle.#TICK_LINES_COUNT
    let dx = (end.x - start.x) / ratio
    let dy = (end.y - start.y) / ratio

    if (index === 2) dy -= 2

    for (let i = 1; i <= Triangle.#TICK_LINES_COUNT; i++) {
      const x0 = start.x + dx * i / Triangle.#TICK_LINES_COUNT
      const y0 = start.y + dy * i / Triangle.#TICK_LINES_COUNT
      const x1 = x0 + Triangle.#TICK_LINE_WIDTH * toRad(Math.sin, angle)
      const y1 = y0 + Triangle.#TICK_LINE_WIDTH * toRad(Math.cos, angle)
      const line = new fabric.Line([x0, y0, x1, y1], { stroke: Triangle.DEFAULT_STROKE_COLOR, strokeWidth: 1 })
      this._canvas.add(line)

      /**
       * Drawing only  20, 40, 60 and 80 labels
       */
      if (i !== 0 && i % 2 === 0) {
        this.#renderTrickLabel(line, angle, (i * 10).toString(), index)
      }
    }
  }

  /**
   * Drawing single tick label
   * @param line {Line}
   * @param angle {Number}
   * @param text {String}
   * @param index {Number}
   */
  #renderTrickLabel(line, angle, text, index) {
    let offsetX = -4
    let offsetY = -2
    if (index === 0) {
      offsetX = 15
      offsetY = 12
    }
    if (index === 1) {
      offsetX = -15
      offsetY = 17
    }

    const label = new fabric.Textbox(text, {
      fontSize: 12,
      fontFamily: Triangle.DEFAULT_FONT_FACE,
      textAlign: 'center',
      left: line.oCoords.bl.x - offsetX,
      top: line.oCoords.bl.y - offsetY,
    })
    this._canvas.add(label)
  }

  /**
   * @override
   * @returns {void}
   */
  #renderPolygons() {

    const T = this.#topPosition
    const W = Triangle.#EDGE_WIDTH + 1
    const H = this.#triangleHeight + T

    const pd_p1 = new fabric.Point(.98 * W * .5 + 1, .02 * H * toRad(Math.sin, 60) + T)
    const pd_p2 = new fabric.Point(W / 2, T)
    const pd_p3 = new fabric.Point(W - .98 * W * .5 - 1, .02 * H * toRad(Math.sin, 60) + T)

    const d2_p1 = new fabric.Point(0, H + 1)
    const d2_p2 = new fabric.Point(.23 * W, H)
    const d2_p3 = new fabric.Point(.23 * W + .64 * W * .5, H - (.5 * .64 * W) / toRad(Math.tan, 30))
    const d2_p4 = new fabric.Point(.87 * W * .5 + 1, H - .87 * W * toRad(Math.sin, 60))

    const d1_p1 = new fabric.Point(.23 * W, H)
    const d1_p2 = new fabric.Point(.23 * W + .64 * W * .5, H - .64 * W * .5 * toRad(Math.tan, 60))
    const d1_p3 = new fabric.Point(.38 * W + .49 * W * .5, H - .49 * W * .5 * toRad(Math.tan, 60))
    const d1_p4 = new fabric.Point(.38 * W + .33 * W * .5, H - .33 * W * .5 * toRad(Math.tan, 60))
    const d1_p5 = new fabric.Point(.71 * W, H)

    const t1_p1 = new fabric.Point(.98 * W * .5 + 1, H - .98 * W * toRad(Math.sin, 60))
    const t1_p2 = new fabric.Point(W - .98 * W * .5 - 1, H - .98 * W * toRad(Math.sin, 60))
    const t1_p3 = new fabric.Point(W - .80 * W * .5, H - .80 * W * toRad(Math.sin, 60) + 2)
    const t1_p4 = new fabric.Point(.96 * W - .76 * W * .5, H - .76 * W * .5 * toRad(Math.tan, 60))
    const t1_p5 = new fabric.Point(.96 * W * .5 + 1, H - .96 * W * toRad(Math.sin, 60))

    const t2_p1 = new fabric.Point(W - .80 * W * .5, H - .80 * W * .5 * toRad(Math.tan, 60) + 1)
    const t2_p2 = new fabric.Point(.96 * W - .76 * W * .5, H - .76 * W * .5 * toRad(Math.tan, 60))
    const t2_p3 = new fabric.Point(W - .5 * W * .5, H - .5 * W * toRad(Math.sin, 60) + 2)
    const t2_p4 = new fabric.Point(.96 * W - .46 * W * .5, H - .46 * W * .5 * toRad(Math.tan, 60))

    const t3_p1 = new fabric.Point(.85 * W, H + 1)
    const t3_p2 = new fabric.Point(W, H + 1)
    const t3_p3 = new fabric.Point(W - .5 * W * .5, H - .5 * W * toRad(Math.sin, 60) + 2)
    const t3_p4 = new fabric.Point(.85 * W - .35 * W * .5, H - .35 * W * .5 * toRad(Math.tan, 60))

    const dt_p1 = new fabric.Point(.71 * W, H)
    const dt_p2 = new fabric.Point(.85 * W, H + 1)
    const dt_p3 = new fabric.Point(.85 * W - .35 * W * .5, H - .35 * W * .5 * toRad(Math.tan, 60))
    const dt_p4 = new fabric.Point(.96 * W - .46 * W * .5, H - .46 * W * .5 * toRad(Math.tan, 60))
    const dt_p5 = new fabric.Point(.96 * W * .5 + 1, H - .96 * W * toRad(Math.sin, 60))
    const dt_p6 = new fabric.Point(.87 * W * .5 + 1, H - .87 * W * toRad(Math.sin, 60))
    const dt_p7 = new fabric.Point(.38 * W + .49 * W * .5, H - .49 * W * .5 * toRad(Math.tan, 60))
    const dt_p8 = new fabric.Point(.38 * W + .33 * W * .5, H - .33 * W * .5 * toRad(Math.tan, 60))

    this._canvas.add(
      new TrianglePolygon(POLYGON.PD, [pd_p1, pd_p2, pd_p3], { bgColor: '#E05662' }),
      new TrianglePolygon(POLYGON.D1, [d1_p1, d1_p2, d1_p3, d1_p4, d1_p5], { bgColor: '#B4FFFE' }),
      new TrianglePolygon(POLYGON.D2, [d2_p1, d2_p2, d2_p3, d2_p4], { bgColor: '#92D2FF' }),
      new TrianglePolygon(POLYGON.T1, [t1_p1, t1_p2, t1_p3, t1_p4, t1_p5], { bgColor: '#FFFFCB' }),
      new TrianglePolygon(POLYGON.T2, [t2_p1, t2_p2, t2_p4, t2_p3], { bgColor: '#FFBD3D' }),
      new TrianglePolygon(POLYGON.T3, [t3_p1, t3_p2, t3_p3, t3_p4], { bgColor: '#FF9557' }),
      new TrianglePolygon(POLYGON.DT, [dt_p1, dt_p2, dt_p3, dt_p4, dt_p5, dt_p6, dt_p7, dt_p8], { bgColor: '#E3D8FF' }),
    )
  }
}
