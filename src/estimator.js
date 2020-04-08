const timeEstimator = (periodType, timeToElapse) => {
    switch (periodType) {
        case 'days':
            const unitInDays = Math.floor(timeToElapse / 3);
            return (result = Math.pow(2, unitInDays));

        case 'weeks':
            const weeksToDays = timeToElapse * 7;
            const unitInMonths = Math.floor(weeksToDays / 3);
            return (result = Math.pow(2, unitInMonths));

        case 'months':
            const monthsToDays = timeToElapse * 30;
            const unitInWeeks = Math.floor(monthsToDays / 3);
            return (result = Math.pow(2, unitInWeeks));

        default:
            break;
    }
};

const covid19ImpactEstimator = (data) => {
    const { reportedCases, periodType, timeToElapse } = data;
    const impact = {};
    const severeImpact = {};
    impact.currentlyInfected = reportedCases * 10;
    timeEstimator(periodType, timeToElapse);
    impact.infectionsByRequestedTime = impact.currentlyInfected * result;
    severeImpact.currentlyInfected = reportedCases * 50;

    timeEstimator(periodType, timeToElapse);
    severeImpact.infectionsByRequestedTime =
        severeImpact.currentlyInfected * result;
    return {
        data,
        impact,
        severeImpact
    };
};

export default covid19ImpactEstimator;