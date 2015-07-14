var Project = (function () {
    function Project(questions, surveys) {
        this.questions = questions;
        this.surveys = surveys;
        this.timestamp_column = 0;
        this.name_column = 13;
    }
    Project.prototype.getSurveyMonths = function () {
        var firstDate = this.surveys[0].when;
        var lastDate = this.surveys.slice(-1)[0].when;
        var result = [];
        var currentMonth = new Date(firstDate.getFullYear(), firstDate.getMonth(), 1);
        while (currentMonth.getTime() < lastDate.getTime()) {
            result.push(new Date(currentMonth.valueOf()));
            currentMonth.setMonth(currentMonth.getMonth() + 1);
        }
        result.push(new Date(currentMonth.valueOf()));
        return result;
    };
    return Project;
})();
exports.Project = Project;
//# sourceMappingURL=project.js.map