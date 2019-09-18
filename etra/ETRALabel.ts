import { fabric } from 'fabric';
import { Text, Rect } from 'fabric/fabric-impl';
import { LabelType } from './constants';

export type ETRALabelOptions = { top: number, left: number }

export default class ETRALabel extends fabric.Group {
  private static readonly DEFAULT_FONT_FACE: string = 'Roboto Condensed';
  private static readonly DEFAULT_FONT_COLOR: string = '#532F5B';

  constructor(text: LabelType, { top, left }: ETRALabelOptions) {
    const container = ETRALabel.renderRect();
    const label = ETRALabel.renderText(text);

    super([ container, label ], { top, left: left - 19 });
  }

  private static renderRect(): Rect {
    return new fabric.Rect({
      width: 18,
      height: 15,
      top: 0,
      left: 20,
      stroke: this.DEFAULT_FONT_COLOR,
      strokeWidth: 1,
      fill: 'transparent',
    });
  }

  private static renderText(text: LabelType): Text {
    return new fabric.Text(text, {
      fontSize: 12,
      fontFamily: ETRALabel.DEFAULT_FONT_FACE,
      textAlign: 'center',
      top: 1,
      left: 23,
      width: 18,
    });
  }
}
