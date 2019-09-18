import { Circle, Group, StaticCanvas } from 'fabric/fabric-impl';
import { fabric } from 'fabric';
import ETRAGroup from './ETRAGroup';
import { ETRAPolygons } from './constants';
import ETRAAxisX from './axis/ETRAAxisX';
import ETRAAxisY from './axis/ETRAAxisY';
import { OilProbe } from 'constants/types';
import ETRADot from './ETRADot';

export type ETRAOptions = { H: number }

export default class ETRA {
  private readonly k: number = 0.6;
  private readonly dx: number = 40;
  private readonly dy: number = 10;
  private readonly H: number;
  private readonly W: number;
  private readonly id: string;

  private canvas: StaticCanvas;
  private dots: Map<number, Circle>;

  constructor(id: string, options: ETRAOptions) {
    this.id = id;
    this.H = options.H;
    this.W = options.H / this.k;
    this.canvas = new fabric.StaticCanvas(this.id);
    this.dots = new Map<number, Circle>();

    this.init();
  }

  /**
   * Adds single dot the canvas using probe specified int the argument.
   * @param probe {OilProbe}
   */
  public addDot(probe: OilProbe): ETRA {
    const W = this.W + this.dx;
    const H = this.H + this.dy;

    const dot = new ETRADot(probe, { W, H });

    this.canvas.add(dot).renderAll();
    this.dots.set(probe.id, dot);

    return this;
  }

  /**
   * Removes all points from the canvas and adds new points to the probes specified in the argument.
   * @param probes {OilProbe[]}
   */
  public updateDots(probes: OilProbe[]): ETRA {
    this.dots.forEach((_, k) => this.removeDot(k));
    this.dots.clear();
    probes.map(this.addDot.bind(this));
    return this;
  }

  /**
   * Removes dot from the canvas by given in the argument probe id
   * @param id {number}
   */
  public removeDot(id: number): boolean {
    const dot = this.dots.get(id);
    if (!dot) return false;

    this.canvas.remove(dot);
    return this.dots.delete(id);
  }

  private init() {
    const axis = this.renderAxis();
    const polygons = this.renderPolygons();
    this.canvas.add(...polygons, axis);
  }

  private renderAxis(): Group {
    const { W, H, dx, dy } = this;

    const x = new ETRAAxisX({ W, H, dx, dy });
    const y = new ETRAAxisY({ W, H, dx, dy });

    return new fabric.Group([ x, y ]);
  }

  private renderPolygons(): ETRAGroup[] {
    const dx = this.dx;
    const dy = this.dy;
    const W = this.W + dx;
    const H = this.H + dy;

    const x1_p1 = new fabric.Point(dx, H / 3);
    const x1_p2 = new fabric.Point(dx, dy);
    const x1_p3 = new fabric.Point(W, dy);
    const x1_p4 = new fabric.Point(W, H * .5);
    const x1_p5 = new fabric.Point(W * .6, H * .5);
    const x1_p6 = new fabric.Point(W * .6, H / 3);
    const x1 = new ETRAGroup([ x1_p1, x1_p2, x1_p3, x1_p4, x1_p5, x1_p6 ], ETRAPolygons.X1);

    const x2_p1 = new fabric.Point(dx, H * .5);
    const x2_p2 = new fabric.Point(dx, H / 3);
    const x2_p3 = new fabric.Point(W * .6, H / 3);
    const x2_p4 = new fabric.Point(W * .6, H * .5);
    const x2 = new ETRAGroup([ x2_p1, x2_p2, x2_p3, x2_p4 ], ETRAPolygons.D2);

    const x3_p1 = new fabric.Point(dx, H * 5 / 6);
    const x3_p2 = new fabric.Point(dx, H * .5);
    const x3_p3 = new fabric.Point(W * .4, H * .5);
    const x3_p4 = new fabric.Point(W * .4, H * 5 / 6);
    const x3 = new ETRAGroup([ x3_p1, x3_p2, x3_p3, x3_p4 ], ETRAPolygons.PD);

    const x4_p1 = new fabric.Point(W * .4, H * 5 / 6);
    const x4_p2 = new fabric.Point(W * .4, H * .5);
    const x4_p3 = new fabric.Point(W, H * .5);
    const x4_p4 = new fabric.Point(W, H * 5 / 6);
    const x4 = new ETRAGroup([ x4_p1, x4_p2, x4_p3, x4_p4 ], ETRAPolygons.O);

    const x5_p1 = new fabric.Point(dx, H);
    const x5_p2 = new fabric.Point(dx, H * 5 / 6);
    const x5_p3 = new fabric.Point(W * .4, H * 5 / 6);
    const x5_p4 = new fabric.Point(W * .4, H);
    const x5 = new ETRAGroup([ x5_p1, x5_p2, x5_p3, x5_p4 ], ETRAPolygons.T1);

    const x6_p1 = new fabric.Point(W * .4, H);
    const x6_p2 = new fabric.Point(W * .4, H * 5 / 6);
    const x6_p3 = new fabric.Point(W * .4 + W * .2 * .602, H * 5 / 6);
    const x6_p4 = new fabric.Point(W * .4 + W * .2 * .602, H);
    const x6 = new ETRAGroup([ x6_p1, x6_p2, x6_p3, x6_p4 ], ETRAPolygons.T2);

    const x7_p1 = new fabric.Point(W * .4 + W * .2 * .602, H);
    const x7_p2 = new fabric.Point(W * .4 + W * .2 * .602, H * 5 / 6);
    const x7_p3 = new fabric.Point(W, H * 5 / 6);
    const x7_p4 = new fabric.Point(W, H);
    const x7 = new ETRAGroup([ x7_p1, x7_p2, x7_p3, x7_p4 ], ETRAPolygons.T3);

    return [ x1, x2, x3, x4, x5, x6, x7 ];
  }
}
