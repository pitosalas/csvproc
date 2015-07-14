export class Survey {
  when: Date;
  samples: number;
  indexStart: number;
  indexEnd: number;
  responses: number[][];

  constructor(when:Date, indexStart:number) {
    this.when = when;
    this.indexStart = indexStart;
    this.samples = 0;
    this.responses = []
  }

  addResponse(response: number[]) {
    this.responses.push(response);
  }

  analyze() {

  }
}
