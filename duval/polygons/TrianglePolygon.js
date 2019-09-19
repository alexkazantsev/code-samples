import { fabric } from 'fabric'
import { POLYGON } from 'constants/constants'
import { BasePolygon } from '../base/BasePolygon'

export class TrianglePolygon extends BasePolygon {

  /**
   * Add label inside polygon
   * @returns {Group}
   */
  addLabel() {
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

    /**
     * @description: Render line for some of labels
     */
    if ([POLYGON.PD, POLYGON.T1, POLYGON.T2].includes(this.id)) {
      line = new fabric.Line(
        [0, height / 2, 20, height / 2],
        { stroke: TrianglePolygon.DEFAULT_BORDER_COLOR, strokeWidth: 1 },
      )
    }

    const [leftPoint] = this.points.map(p => p.x).sort((a, b) => a - b)
    const rightPoint = p2.x

    let top = p1.y - 45
    let left = leftPoint + (rightPoint - leftPoint) / 2 + width / 2

    /**
     * @description: Define different position for each polygon's label
     */
    switch (this.id) {
      case POLYGON.D1:
        left = leftPoint + (rightPoint - leftPoint) / 2 + width / 2
        break
      case POLYGON.T1:
        left = rightPoint + 17
        top = 45
        break
      case POLYGON.T2:
        left = rightPoint + 20
        top = 90
        break
      case POLYGON.T3:
        left = leftPoint + (rightPoint - leftPoint) / 2 - 5
        break
      case POLYGON.PD:
        left = leftPoint + 5
        top = 15
        break
    }
    return new fabric.Group([container, text, line].filter(Boolean), { top, left })
  }
}
