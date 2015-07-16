var Survey = (function () {
    function Survey(when, indexStart) {
        this.when = when;
        this.indexStart = indexStart;
        this.samples = 0;
        this.responses = [];
    }
    Survey.prototype.addResponse = function (response) {
        this.responses.push(response);
    };
    Survey.prototype.calcAveResponses = function () {
        var result = [];
        var nquestions = this.responses[0].length;
        var nrespondents = this.responses.length;
        for (var q = 0; q < nquestions; q++) {
            result[q] = 0;
            for (var res = 0; res < this.responses.length; res++) {
                result[q] += this.responses[res][q];
            }
            result[q] /= nrespondents;
        }
        return result;
    };
    return Survey;
})();
exports.Survey = Survey;
//# sourceMappingURL=survey.js.map