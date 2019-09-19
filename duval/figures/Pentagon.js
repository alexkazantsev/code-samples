import { fabric } from 'fabric'
import { toRad } from '../utils'
import { PentagonPolygon } from '../polygons/PentagonPolygon'
import { POLYGON } from 'constants/constants'
import { BaseFigure } from '../base/BaseFigure'
import { PentagonEdgeLegend } from '../endge-leneds/PentagonEdgeLegend'

export class Pentagon extends BaseFigure {

  static #EDGE_WIDTH = 200

  offsetX = 50
  offsetY = 20

  #clName = null

  /**
   * @type {Polygon}
   */
  #figure = null

  #B = null
  #L = null
  #l = null
  #a = null
  #b = null
  #c = null
  #W = null
  #H = null
  #K = null

  constructor(clName, options = {}) {
    super()

    const { width = Pentagon.#EDGE_WIDTH } = options

    this.#clName = clName
    this.#B = width
    this.#L = this.#B / 2 / toRad(Math.cos, 54)
    this.#l = this.#B / 2 * toRad(Math.tan, 54)
    this.#a = this.#B * toRad(Math.cos, 72)
    this.#b = this.#B * toRad(Math.sin, 72)
    this.#c = this.#B * toRad(Math.cos, 54)
    this.#W = this.#B + 2 * this.#a
    this.#H = this.#c + this.#b
    this.#K = this.#L / 40

    this.#init()
  }

  /**
   * Add a new dot into the _canvas
   * @param conclusion
   * @returns {Pentagon}
   */
  addDot(conclusion) {
    const L = this.#L
    const W = this.#W
    const K = this.#K

    const { id, h2: H2, ch4: CH4, c2h2: C2H2, c2h4: C2H4, c2h6: C2H6 } = conclusion

    const S = H2 + CH4 + C2H2 + C2H4 + C2H6
    const p_H2 = (H2 * 100) / S
    const p_CH4 = (CH4 * 100) / S
    const p_C2H2 = (C2H2 * 100) / S
    const p_C2H4 = (C2H4 * 100) / S
    const p_C2H6 = (C2H6 * 100) / S

    const h2x = W / 2
    const h2y = L - p_H2 * K
    const ch4x = W / 2 - p_CH4 * toRad(Math.sin, 36) * K
    const ch4y = L + p_CH4 * toRad(Math.cos, 36) * K
    const c2h2x = W / 2 + p_C2H2 * toRad(Math.cos, 18) * K
    const c2h2y = L - p_C2H2 * toRad(Math.sin, 18) * K
    const c2h4x = W / 2 + p_C2H4 * toRad(Math.sin, 36) * K
    const c2h4y = L + p_C2H4 * toRad(Math.cos, 36) * K
    const c2h6x = W / 2 - p_C2H6 * toRad(Math.cos, 18) * K
    const c2h6y = L - p_C2H6 * toRad(Math.sin, 18) * K

    const A = ((c2h6x * h2y - h2x * c2h6y) + (h2x * c2h2y - c2h2x * h2y) + (c2h2x * c2h4y - c2h4x * c2h2y) + (c2h4x * ch4y - ch4x * c2h4y) + (ch4x * c2h6y - c2h6x * ch4y)) / 2

    const left = ((c2h6x + h2x) * (c2h6x * h2y - h2x * c2h6y) + (h2x + c2h2x) * (h2x * c2h2y - c2h2x * h2y) + (c2h2x + c2h4x) * (c2h2x * c2h4y - c2h4x * c2h2y) + (c2h4x + ch4x) * (c2h4x * ch4y - ch4x * c2h4y) + (ch4x + c2h6x) * (ch4x * c2h6y - c2h6x * ch4y)) / (6 * A)
    const top = ((c2h6y + h2y) * (c2h6x * h2y - h2x * c2h6y) + (h2y + c2h2y) * (h2x * c2h2y - c2h2x * h2y) + (c2h2y + c2h4y) * (c2h2x * c2h4y - c2h4x * c2h2y) + (c2h4y + ch4y) * (c2h4x * ch4y - ch4x * c2h4y) + (ch4y + c2h6y) * (ch4x * c2h6y - c2h6x * ch4y)) / (6 * A)

    const point = new fabric.Circle({
      radius: 4,
      fill: 'red',
      originX: 'center',
      originY: 'center',
      left: left + this.offsetX,
      top: top + this.offsetY,
    })
    this._points = { ...this._points, [id]: point }
    this._canvas.add(point)
    return this

  }

  #init() {
    // noinspection JSValidateTypes
    this._canvas = new fabric.StaticCanvas(this.#clName)
    this.#renderPolygons()
    this.#renderFigure()

  }

  #renderFigure() {

    const p1 = new fabric.Point(this.#a + this.offsetX, this.#H + this.offsetY)
    const p2 = new fabric.Point(this.offsetX, this.#c + this.offsetY)
    const p3 = new fabric.Point(this.#W / 2 + this.offsetX, this.offsetY)
    const p4 = new fabric.Point(this.#W + this.offsetX, this.#c + this.offsetY)
    const p5 = new fabric.Point(this.#a + this.#B + this.offsetX, this.#H + this.offsetY)

    this.#figure = new fabric.Polygon([p1, p2, p3, p4, p5], {
      fill: 'transparent',
      stroke: Pentagon.DEFAULT_STROKE_COLOR,
      strokeWidth: 2,
    })

    this._canvas.add(this.#figure)

    this.#renderGuides()
    const array = [
      {
        x: p1.x - 20,
        y: p1.y + 5,
        text: '40%CH4',
      },
      {
        x: p2.x - 50,
        y: p2.y - 5,
        text: '40%C2H6',
      },
      {
        x: p3.x - 15,
        y: p3.y - 15,
        text: '40%H2',
      },
      {
        x: p4.x + 5,
        y: p4.y - 5,
        text: '40%C2H2',
      },
      {
        x: p5.x - 20,
        y: p5.y + 5,
        text: '40%C2H4',
      },
    ]

    this.#renderLegend(array)


  }

  #renderLegend(array) {
    this._canvas.add(...array.map((point) => {
      return new PentagonEdgeLegend(point.x, point.y, point.text)
    }))
  }

  #renderGuides() {
    const { points: [p1, p2, p3, p4, p5] } = this.#figure

    const left = this.#W / 2 + this.offsetX
    const top = this.#L + this.offsetY

    this._canvas.add(new fabric.Circle({
      radius: 1,
      fill: 'black',
      originX: 'center',
      originY: 'center',
      left,
      top,
    }))

    const options = { stroke: 'black', strokeWidth: 1 }

    const l1 = new fabric.Line([p1.x, p1.y, left, top], options)
    const l2 = new fabric.Line([p2.x, p2.y, left, top], options)
    const l3 = new fabric.Line([p3.x, p3.y, left, top], options)
    const l4 = new fabric.Line([p4.x, p4.y, left, top], options)
    const l5 = new fabric.Line([p5.x, p5.y, left, top], options)

    this._canvas.add(l1, l2, l3, l4, l5)

  }

  #renderPolygons() {
    const W = this.#W
    const H = this.#H
    const L = this.#L
    const K = this.#K
    const B = this.#B
    const a = this.#a
    const c = this.#c

    const pd_p1 = new fabric.Point(W / 2 - 1 * K + this.offsetX, 15.5 * K + this.offsetY)
    const pd_p2 = new fabric.Point(W / 2 - 1 * K + this.offsetX, 7 * K + this.offsetY)
    const pd_p3 = new fabric.Point(W / 2 + this.offsetX, 7 * K + this.offsetY)
    const pd_p4 = new fabric.Point(W / 2 + this.offsetX, 15.5 * K + this.offsetY)

    const t2_p1 = new fabric.Point(a + this.offsetX, H + this.offsetY)
    const t2_p2 = new fabric.Point(W / 2 - 6 * K + this.offsetX, L + 4 * K + this.offsetY)
    const t2_p3 = new fabric.Point(W / 2 + 1 * K + this.offsetX, H + this.offsetY)

    const t3_p1 = new fabric.Point(W / 2 + 1 * K + this.offsetX, H + this.offsetY)
    const t3_p2 = new fabric.Point(W / 2 - 6 * K + this.offsetX, L + 4 * K + this.offsetY)
    const t3_p3 = new fabric.Point(W / 2 + this.offsetX, L + 3 * K + this.offsetY)
    const t3_p4 = new fabric.Point(W / 2 + 24 * K + this.offsetX, H - (24 * K - B / 2) * toRad(Math.tan, 72) + this.offsetY)
    const t3_p5 = new fabric.Point(a + B + this.offsetX, H + this.offsetY)

    const d2_p1 = new fabric.Point(W / 2 + 24 * K + this.offsetX, H - (24 * K - B / 2) * toRad(Math.tan, 72) + this.offsetY)
    const d2_p2 = new fabric.Point(W / 2 + this.offsetX, L + 3 * K + this.offsetY)
    const d2_p3 = new fabric.Point(W / 2 + this.offsetX, L - 1.5 * K + this.offsetY)
    const d2_p4 = new fabric.Point(W / 2 + 4 * K + this.offsetX, L - 16 * K + this.offsetY)
    const d2_p5 = new fabric.Point(W / 2 + 32 * K + this.offsetX, H - (32 * K - B / 2) * toRad(Math.tan, 72) + this.offsetY)

    const d1_p1 = new fabric.Point(W / 2 + this.offsetX, L - 1.5 * K + this.offsetY)
    const d1_p2 = new fabric.Point(W / 2 + this.offsetX, this.offsetY)
    const d1_p3 = new fabric.Point(W + this.offsetX, c + this.offsetY)
    const d1_p4 = new fabric.Point(W / 2 + 32 * K + this.offsetX, H - (32 * K - B / 2) * toRad(Math.tan, 72) + this.offsetY)
    const d1_p5 = new fabric.Point(W / 2 + 4 * K + this.offsetX, L - 16 * K + this.offsetY)

    const t1_p1 = new fabric.Point(a + this.offsetX, H + this.offsetY)
    const t1_p2 = new fabric.Point(W / 2 - 35 * K + this.offsetX, H - (35 * K - B / 2) * toRad(Math.tan, 72) + this.offsetY)
    const t1_p3 = new fabric.Point(W / 2 + this.offsetX, L - 1.5 * K + this.offsetY)
    const t1_p4 = new fabric.Point(W / 2 + this.offsetX, L + 3 * K + this.offsetY)
    const t1_p5 = new fabric.Point(W / 2 - 6 * K + this.offsetX, L + 4 * K + this.offsetY)

    const s_p1 = new fabric.Point(W / 2 - 35 * K + this.offsetX, H - (35 * K - B / 2) * toRad(Math.tan, 72) + this.offsetY)
    const s_p2 = new fabric.Point(this.offsetX, c + this.offsetY)
    const s_p3 = new fabric.Point(W / 2 + this.offsetX, this.offsetY)
    const s_p4 = new fabric.Point(W / 2 + this.offsetX, 7 * K + this.offsetY)
    const s_p5 = new fabric.Point(W / 2 - 1 * K + this.offsetX, 7 * K + this.offsetY)
    const s_p6 = new fabric.Point(W / 2 - 1 * K + this.offsetX, 15.5 * K + this.offsetY)
    const s_p7 = new fabric.Point(W / 2 + this.offsetX, 15.5 * K + this.offsetY)
    const s_p8 = new fabric.Point(W / 2 + this.offsetX, L - 1.5 * K + this.offsetY)


    const t1 = new PentagonPolygon(POLYGON.T1, [t1_p1, t1_p2, t1_p3, t1_p4, t1_p5], {
      bgColor: '#FFFFCB',
      label: true,
      EDGE: Pentagon.#EDGE_WIDTH,
    })
    const t2 = new PentagonPolygon(POLYGON.T2, [t2_p1, t2_p2, t2_p3], {
      bgColor: '#FFBD3D',
      label: true,
      EDGE: Pentagon.#EDGE_WIDTH,
    })
    const t3 = new PentagonPolygon(POLYGON.T3, [t3_p1, t3_p2, t3_p3, t3_p4, t3_p5], {
      bgColor: '#FF9557',
      label: true,
      EDGE: Pentagon.#EDGE_WIDTH,
    })
    const d1 = new PentagonPolygon(POLYGON.D1, [d1_p1, d1_p2, d1_p3, d1_p4, d1_p5], {
      bgColor: '#B4FFFE',
      label: true,
      EDGE: Pentagon.#EDGE_WIDTH,
    })
    const d2 = new PentagonPolygon(POLYGON.D2, [d2_p1, d2_p2, d2_p3, d2_p4, d2_p5], {
      bgColor: '#92D2FF',
      label: true,
      EDGE: Pentagon.#EDGE_WIDTH,
    })
    const s = new PentagonPolygon(POLYGON.S, [s_p1, s_p2, s_p3, s_p4, s_p5, s_p6, s_p7, s_p8], {
      bgColor: '#F9F59E',
      label: true,
      EDGE: Pentagon.#EDGE_WIDTH,
    })
    const pd = new PentagonPolygon(POLYGON.PD, [pd_p1, pd_p2, pd_p3, pd_p4], {
      bgColor: '#E05662',
      label: true,
      EDGE: Pentagon.#EDGE_WIDTH,
    })

    this._canvas.add(t1, t2, t3, d2, d1, t1, s, pd)
  }
}
