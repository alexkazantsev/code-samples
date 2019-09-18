import {IPolylineOptions, Point } from 'fabric/fabric-impl';
import { fabric } from 'fabric';

export default class ETRAPolygon extends fabric.Polygon {
  // @ts-ignore
  private readonly id: string;

  constructor(points: Point[], options: IPolylineOptions & { id: string }) {
    super(points, options);

    this.id = options.id;
    this.stroke = '#532F5B';
  }
}
