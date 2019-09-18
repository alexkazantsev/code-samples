import ETRAAxis from './ETRAAxis';
import { Group, IText, Line } from 'fabric/fabric-impl';
import { fabric } from 'fabric';
import ETRAAxisTickGenerator from './ETRAAxisTickGenerator';

export default class ETRAAxisX extends ETRAAxis {

  private static readonly TEXT = 'C2H4 / C2H6';

  generateAxis(): Line {
    const { W, H, dx, dy } = this.options;
    return new fabric.Line([ dx, H + dy, W + dx, H + dy ], {
      stroke: this.STROKE_COLOR,
      strokeWidth: this.STROKE_WIDTH,
    });
  }

  generateLegend(line: Line): IText {
    const { x1, x2 } = line.calcLinePoints();
    const { H, dy } = this.options;

    return new fabric.IText(ETRAAxisX.TEXT, {
      top: H + dy + 30,
      left: (x2 - x1) / 2.1,
      centeredRotation: true,
      fontSize: 14,
      fontWeight: 400,
      fontFamily: this.DEFAULT_FONT_FACE,
      stroke: this.STROKE_COLOR,
    });
  }

  generateTicks(): Group {
    const { W, H, dx, dy } = this.options;
    const lH = 7;
    const x = W + dx;
    const y = H + dy;

    return new ETRAAxisTickGenerator('x')
      .addTick([ dx, y, dx, y + lH ], '0.01')
      .addTick([ x * .23 - 1, y, x * .23 - 1, y + lH ], '0.1')
      .addTick([ x * .4 - 1, y, x * .4 - 1, y + lH ], '1')
      .addTick([ x * .4 + x * .2 * .602 - 1, y, x * .4 + x * .2 * .602 - 1, y + lH ], '4')
      .addTick([ x * .6 - 1, y, x * .6 - 1, y + lH ], '10')
      .addTick([ x * .8 - 1, y, x * .8 - 1, y + lH ], '100')
      .addTick([ x - 1.5, y, x - 1.5, y + lH ], '1000')
      .generate();
  }
}
