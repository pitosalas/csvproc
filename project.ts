import { Survey } from './survey';
import { Answer, Config } from './config';

export class Project {
  name_column: number;
  timestamp_column: number;
  questions: string[];
  surveys: Survey[];

  constructor(public conf: Config, questions: string[], surveys: Survey[]) {
    this.questions = questions;
    this.surveys = surveys;
    this.timestamp_column = 0;
    this.name_column = 13;
  }

  getResponses(): Answer[] {
    return this.conf.responses;
  }

  // Return an array of dates corresponding to the first day of each of
  // the months of the survey.
  getSurveyMonths(): Date[] {
    var firstDate: Date = this.surveys[0].when;
    var lastDate: Date = this.surveys.slice(-1)[0].when;
    var result: Date[] = [];
    var currentMonth = new Date(firstDate.getFullYear(), firstDate.getMonth(), 1);
    while (currentMonth.getTime() < lastDate.getTime()) {
      result.push(new Date(currentMonth.valueOf()));
      currentMonth.setMonth(currentMonth.getMonth() + 1);
    }
    result.push(new Date(currentMonth.valueOf()));
    return result;

  }
}
