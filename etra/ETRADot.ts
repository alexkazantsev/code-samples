import { fabric } from 'fabric';
import { OilProbe } from 'constants/types';

export type ETRADotOptions = { W: number, H: number }

export default class ETRADot extends fabric.Circle {
  private readonly options: ETRADotOptions;
  private readonly a: number;
  private readonly b: number;

  constructor(probe: OilProbe, options: ETRADotOptions) {
    super({
      radius: 4,
      fill: 'red',
      originX: 'center',
      originY: 'center',
    });

    this.options = options;
    this.a = probe.c2h4 / probe.c2h6;
    this.b = probe.c2h2 / probe.c2h6;
    this.init();
  }

  private init() {
    const left = this.calculateLeft();
    const top = this.calculateTop();

    this.setOptions({ top, left });
  }

  private calculateLeft(): number {
    const { W } = this.options;
    const { a } = this;
    let left = 0;

    if (a >= .01 && a < .1) left = W * .2 * Math.log10(a * 100);
    if (a >= .1 && a < 1) left = W * .2 + W * .2 * Math.log10(a * 10);
    if (a >= 1 && a < 10) left = W * .4 + W * .2 * Math.log10(a);
    if (a >= 10 && a < 100) left = W * .6 + W * .2 * Math.log10(a / 10);
    if (a >= 100 && a <= 1000) left = W * .8 + W * .2 * Math.log10(a / 100);

    return left;
  }

  private calculateTop(): number {
    const { H } = this.options;
    const { b } = this;
    let top = 0;

    if (b >= .001 && b < .01) top = H - H / 6 * Math.log10(b * 1000);
    if (b >= .01 && b < .1) top = H * 5 / 6 - H / 6 * Math.log10(b * 100);
    if (b >= .1 && b < 1) top = H * 2 / 3 - H / 6 * Math.log10(b * 10);
    if (b >= 1 && b < 10) top = H / 2 - H / 6 * Math.log10(b);
    if (b >= 10 && b < 100) top = H / 3 - H / 6 * Math.log10(b / 10);
    if (b >= 100 && b < 1000) top = H / 6 - H / 6 * Math.log10(b / 100);

    return top;
  }
}
