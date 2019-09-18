import { fabric } from 'fabric';
import { Group, IText, Line } from 'fabric/fabric-impl';
import { ETRAAxisOptions, IAxis } from './IAxis';

export default abstract class ETRAAxis extends fabric.Group implements IAxis {
  protected readonly STROKE_COLOR = '#532F5B';
  protected readonly STROKE_WIDTH = 2;
  protected readonly DEFAULT_FONT_FACE: string = 'Roboto Condensed';
  protected readonly options: ETRAAxisOptions;

  constructor(options: ETRAAxisOptions) {
    super();

    this.options = options;
    this.init();
  }

  private init(): void {
    const axis = this.generateAxis();
    const ticks = this.generateTicks();
    const legend = this.generateLegend(axis);

    this
      .addWithUpdate(axis)
      .addWithUpdate(ticks)
      .addWithUpdate(legend);
  }

  abstract generateAxis(): Line;

  abstract generateLegend(line: Line): IText;

  abstract generateTicks(): Group;
}
