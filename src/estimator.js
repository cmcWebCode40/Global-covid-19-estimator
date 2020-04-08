const timeEstimator = (periodType, timeToElapse) => {
  let result;
  if (periodType === 'days') {
    const unitInDays = Math.floor(timeToElapse / 3);
    result = 2 ** unitInDays;
  } else if (periodType === 'weeks') {
    const weeksToDays = timeToElapse * 7;
    const unitInMonths = Math.floor(weeksToDays / 3);
    result = 2 ** unitInMonths;
  } else if (periodType === 'months') {
    const monthsToDays = timeToElapse * 30;
    const unitInWeeks = Math.floor(monthsToDays / 3);
    result = 2 ** unitInWeeks;
  }
  return result;
};

const covid19ImpactEstimator = (data) => {
  const { reportedCases, periodType, timeToElapse } = data;
  const impact = {};
  const severeImpact = {};
  impact.currentlyInfected = reportedCases * 10;
  const timeEstimate = timeEstimator(periodType, timeToElapse);
  impact.infectionsByRequestedTime = impact.currentlyInfected * timeEstimate;
  severeImpact.currentlyInfected = reportedCases * 50;
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * timeEstimate;
  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
