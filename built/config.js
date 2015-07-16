var fs = require('fs');
var Config = (function () {
    function Config() {
    }
    Config.prototype.fromJSONFile = function (fileName) {
        var fileString = fs.readFileSync(fileName);
        var parsedFile = JSON.parse(fileString.toString());
        this.responses = parsedFile.responses;
        this.timestamp_column = parsedFile.timestamp_column;
        this.name_column = parsedFile.name_column;
    };
    Config.prototype.mapAnswerToNum = function (answer) {
        for (var _i = 0, _a = this.responses; _i < _a.length; _i++) {
            var a = _a[_i];
            if (a.text == answer) {
                return a.value;
            }
        }
        throw new Error("Invalid response string " + answer);
    };
    return Config;
})();
exports.Config = Config;
//# sourceMappingURL=config.js.map