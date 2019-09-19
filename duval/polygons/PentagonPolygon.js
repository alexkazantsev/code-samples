import { TrianglePolygon } from './TrianglePolygon'
import { POLYGON } from 'constants/constants'
import { toRad } from '../utils'
import { BasePolygon } from '../base/BasePolygon'

export class PentagonPolygon extends BasePolygon {

  addLabel() {

    const B = this.edge
    const L = B / 2 / toRad(Math.cos, 54)
    // noinspection JSUnusedLocalSymbols
    const l = B / 2 * toRad(Math.tan, 54)
    const a = B * toRad(Math.cos, 72)
    const b = B * toRad(Math.sin, 72)
    const c = B * toRad(Math.cos, 54)
    const W = B + 2 * a
    const H = c + b
    const K = L / 40
    const offsetX = 50
    const offsetY = 20

    const [p1, p2] = this.points
    const width = 18
    const height = 15
    let line = null

    const container = new fabric.Rect({
      width: width,
      height: height,
      top: 0,
      left: 20,
      stroke: TrianglePolygon.DEFAULT_BORDER_COLOR,
      strokeWidth: 1,
      fill: 'transparent',
    })

    const text = new fabric.Text(this.id, {
      fontSize: 12,
      fontFamily: TrianglePolygon.DEFAULT_FONT_FACE,
      textAlign: 'left',
      top: 1,
      left: 23,
      width: 40,
    })

    const [leftPoint] = this.points.map(p => p.x).sort((a, b) => a - b)
    const rightPoint = p2.x

    let top = p1.y - 45
    let left = leftPoint + (rightPoint - leftPoint) / 2 + width / 2

    /**
     * @description: Define different position for each polygon's label
     */
    switch (this.id) {
      case POLYGON.D1:
        left = W / 2 + B / 2 * toRad(Math.cos, 36) - 25 + offsetX
        top = B / 2 * toRad(Math.sin, 36) + offsetY
        break
      case POLYGON.T1:
        left = B / 2 * toRad(Math.sin, 18) + 15 + offsetX
        top = B / 2 * toRad(Math.cos, 18) + c + 10 + offsetY
        break
      case POLYGON.T2:
        left = a + B * 1 / 4 - 10 + offsetX
        top = H - 20 + offsetY
        break
      case POLYGON.T3:
        left = a + B * 3 / 4 - 10 + offsetX
        top = H - 20 + offsetY
        break
      case POLYGON.PD:
        left = W / 2 - K - 25 + offsetX
        top = 11.25 * K + offsetY
        break
      case POLYGON.D2:
        left = W - B / 2 * toRad(Math.sin, 18) - 30 + offsetX
        top = B / 2 * toRad(Math.cos, 18) + c + 10 + offsetY
        break
      case POLYGON.S:
        left = W / 2 - B / 2 * toRad(Math.cos, 36) + 5 + offsetX
        top = B / 2 * toRad(Math.sin, 36) + offsetY
        break
    }
    
    return new fabric.Group([container, text, line].filter(Boolean), { top, left })
  }
  
}
