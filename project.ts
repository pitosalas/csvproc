import { Survey } from './survey';

export class Project {
  name_column: number;
  timestamp_column: number;
  responses: string[][];
  questions:string[];
  surveys:Survey[];

  constructor(questions:string[], surveys:Survey[]) {
    this.questions = questions;
    this.surveys = surveys;
    this.timestamp_column = 0;
    this.name_column = 13;
  }
}
