import ETRAAxis from './ETRAAxis';
import { Group, IText, Line } from 'fabric/fabric-impl';
import { fabric } from 'fabric';
import ETRAAxisTickGenerator from './ETRAAxisTickGenerator';

export default class ETRAAxisY extends ETRAAxis {

  private static readonly TEXT = 'C2H2 / C2H6';

  generateAxis(): Line {
    const { H, dx, dy } = this.options;
    return new fabric.Line([ dx, dy, dx, H + dy ], {
      stroke: this.STROKE_COLOR,
      strokeWidth: this.STROKE_WIDTH,
    });
  }

  generateLegend(line: Line): IText {
    const { y1, y2 } = line.calcLinePoints();

    return new fabric.IText(ETRAAxisY.TEXT, {
      top: (y2 - y1) / 1.5,
      angle: 270,
      left: 0,
      centeredRotation: true,
      fontSize: 14,
      fontWeight: 400,
      fontFamily: this.DEFAULT_FONT_FACE,
      stroke: this.STROKE_COLOR,
    });
  }

  generateTicks(): Group {
    const { H, dx, dy } = this.options;
    const lH = 5;
    const x = dx - lH;
    const y = H + dy;

    return new ETRAAxisTickGenerator('y')
      .addTick([ x, y - .5, dx + 1, y - .5 ], '0.001')
      .addTick([ x, y * 5 / 6 - 1, dx + 1, y * 5 / 6 - 1 ], '0.01')
      .addTick([ x, y * 2 / 3 - 1, dx + 1, y * 2 / 3 - 1 ], '0.1')
      .addTick([ x, y * .5 - 1, dx + 1, y * .5 - 1 ], '1')
      .addTick([ x, y / 3 - 1, dx + 1, y / 3 - 1 ], '10')
      .addTick([ x, y / 6, dx + 1, y / 6 ], '100')
      .addTick([ x, dy - .5, dx + 1, dy - .5 ], '1000')
      .generate();
  }
}
