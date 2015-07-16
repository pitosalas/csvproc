export class Survey {
  when: Date;
  samples: number;
  indexStart: number;
  indexEnd: number;
  responses: number[][];

  constructor(when: Date, indexStart: number) {
    this.when = when;
    this.indexStart = indexStart;
    this.samples = 0;
    this.responses = []
  }

  addResponse(response: number[]) {
    this.responses.push(response);
  }

  // Returns an array of numbers. The array's length is the number of questions there are,
  // And each value is the average response to that question.

  calcAveResponses(): number[] {
    var result: number[] = [];
    var nquestions = this.responses[0].length
    var nrespondents = this.responses.length;
    for (var q: number = 0; q < nquestions; q++) {
      result[q] = 0;
      for (var res: number = 0; res < this.responses.length; res++) {
        result[q] += this.responses[res][q];
      }
      result[q] /= nrespondents;
    }
    return result;
  }
}
