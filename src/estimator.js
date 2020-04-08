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
  const { reportedCases, periodType, timeToElapse, totalHospitalBeds } = data;
  const impact = {};
  const severeImpact = {};
  //challenge one 
  impact.currentlyInfected = reportedCases * 10;
  const timeEstimate = timeEstimator(periodType, timeToElapse);
  impact.infectionsByRequestedTime = impact.currentlyInfected * timeEstimate;
  severeImpact.currentlyInfected = reportedCases * 50;
  severeImpact.infectionsByRequestedTime =severeImpact.currentlyInfected * timeEstimate;


  //challenge Two 
  impact.severeCasesByRequestedTime = impact.infectionsByRequestedTime * 0.15;
  const hospitalBeds = totalHospitalBeds * 0.35;
  impact.HospitalBedsByRequestedTime = hospitalBeds - impact.severeCasesByRequestedTime;
  severeImpact.severeCasesByRequestedTime =severeImpact.infectionsByRequestedTime * 0.15;
  const {severeCasesByRequestedTime} = severeImpact;
  severeImpact.HospitalBedsByRequestedTime = hospitalBeds - severeCasesByRequestedTime;

 
  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
