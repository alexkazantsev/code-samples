import { fabric } from 'fabric';
import { Group, Line } from 'fabric/fabric-impl';

export type AxisType = 'x' | 'y'

export default class ETRAAxisTickGenerator {
  private readonly STROKE_COLOR = '#532F5B';
  private readonly FONT_FAMILY = 'Roboto Condensed';
  private readonly STROKE_WIDTH = 2;
  private readonly position: AxisType;
  private readonly ticks: Group;

  constructor(position: AxisType) {
    this.position = position;
    this.ticks = new fabric.Group();
  }

  addTick(points: number[], text: string): ETRAAxisTickGenerator {
    const tick = this.renderTick(points);
    const label = this.renderLabel(points, text);

    this.ticks.addWithUpdate(new fabric.Group([ tick, label ]));

    return this;
  }

  generate(): Group {
    return this.ticks;
  }

  private renderTick(points: number[]): Line {
    return new fabric.Line(points, { stroke: this.STROKE_COLOR, strokeWidth: this.STROKE_WIDTH });
  }

  private renderLabel(points: number[], text: string): Group {
    const { top, left } = this.calculatePosition(points);
    const align = this.position === 'x' ? 'center' : 'right';

    const label = new fabric.Text(text, {
      left: this.position === 'x' ? 0 : 30,
      originX: align,
      textAlign: align,
      fontWeight: 400,
      fontSize: 12,
      fontFamily: this.FONT_FAMILY,
    });

    const rect = new fabric.Rect({ width: 30, height: 14, fill: 'transparent' });
    return new fabric.Group([ rect, label ], { top, left });
  }

  private calculatePosition(points: number[]): { top: number, left: number } {
    const [ x1, y1 ] = points;
    let left = x1 - 3;
    let top = y1 + 8;

    if (this.position === 'y') {
      left = x1 - 31;
      top = y1 - 6;
    }

    return { top, left };
  }
}
