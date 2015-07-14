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
    Survey.prototype.analyze = function () {
    };
    return Survey;
})();
exports.Survey = Survey;
//# sourceMappingURL=survey.js.map