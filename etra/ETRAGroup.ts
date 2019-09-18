import { fabric } from 'fabric';
import ETRAPolygon from './ETRAPolygon';
import ETRALabel from './ETRALabel';
import { Point } from 'fabric/fabric-impl';
import { ETRAPolygonOptions } from './constants';

export default class ETRAGroup extends fabric.Group {
  private readonly polygon: ETRAPolygon;
  private readonly label: ETRALabel;

  constructor(points: Point[], options: ETRAPolygonOptions) {
    super();

    this.polygon = new ETRAPolygon(points, { id: options.id, fill: options.color });
    this.label = new ETRALabel(options.label, ETRAGroup.calculateLabelPosition(this.polygon));

    this
      .addWithUpdate(this.polygon)
      .addWithUpdate(this.label);
  }

  private static calculateLabelPosition(polygon: ETRAPolygon): { top: number, left: number } {
    // @ts-ignore
    const [ _, __, p3 ] = polygon!.points;
    return { top: p3.y, left: p3!.x };
  }
}
