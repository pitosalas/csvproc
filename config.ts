import fs = require('fs');

export interface Answer {
  order: number,
  text: string
}

export class Config {
  responses:Answer[];
  timestamp_column: string;
  name_column: string

  fromJSONFile(fileName: string) {
    var fileString = fs.readFileSync(fileName);
    var parsedFile = JSON.parse(fileString.toString());
    this.responses = parsedFile.responses;
    this.timestamp_column = parsedFile.timestamp_column;
    this.name_column = parsedFile.name_column;
  }

  mapAnswerToNum(answer:string):number {
    for (var a of this.responses) {
      if (a.text == answer) { return a.order;}
    }
    throw new Error(`Invalid response string ${answer}`);
  }
}
