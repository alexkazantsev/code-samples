import { Group, IText, Line } from 'fabric/fabric-impl';

export type ETRAAxisOptions = { W: number, H: number, dx: number, dy: number }

export interface IAxis {
  generateAxis(): Line;

  generateLegend(line: Line): IText;

  generateTicks(): Group;
}
