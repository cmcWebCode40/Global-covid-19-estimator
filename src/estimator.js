const timeEstimator = (periodType, timeToElapse) => {
  let result;
  if (periodType === 'days') {
    const unitInDays = Math.floor(timeToElapse / 3);
    result = 2 ** unitInDays;
  } else if (periodType === 'weeks') {
    const unitInMonths = Math.floor((timeToElapse * 7) / 3);
    result = 2 ** unitInMonths;
  } else if (periodType === 'months') {
    const unitInWeeks = Math.floor((timeToElapse * 30) / 3);
    result = 2 ** unitInWeeks;
  }
  return result;
};

const flightInUSD = (periodType, timeToElapse, avgDailyIncome) => {
  let Indays;
  if (periodType === 'days') {
    Indays = 0.65 * avgDailyIncome * timeToElapse;
  } else if (periodType === 'weeks') {
    Indays = 0.65 * avgDailyIncome * timeToElapse * 7;
  } else if (periodType === 'months') {
    Indays = 0.65 * avgDailyIncome * timeToElapse * 30;
  }
  return Indays;
};

const covid19ImpactEstimator = (data) => {
  const {
    reportedCases,
    periodType,
    timeToElapse,
    totalHospitalBeds,
    region: { avgDailyIncomeInUSD }
  } = data;
  const impact = {};
  const severeImpact = {};
  /**
   * challenge one
   */
  impact.currentlyInfected = reportedCases * 10;
  const timeEstimate = timeEstimator(periodType, timeToElapse);
  impact.infectionsByRequestedTime = Math.floor(impact.currentlyInfected * timeEstimate);
  severeImpact.currentlyInfected = reportedCases * 50;
  severeImpact.infectionsByRequestedTime = Math.floor(severeImpact.currentlyInfected * timeEstimate);
  /**
   * challenge two
   */
  impact.severeCasesByRequestedTime = impact.infectionsByRequestedTime * 0.15;
  const hospitalBeds = totalHospitalBeds * 0.35;
  const impactHospital = Math.trunc(hospitalBeds - impact.severeCasesByRequestedTime);
  impact.hospitalBedsByRequestedTime = impactHospital;
  severeImpact.severeCasesByRequestedTime = severeImpact.infectionsByRequestedTime * 0.15;
  const { severeCasesByRequestedTime, infectionsByRequestedTime } = severeImpact;
  const severeImpactHospital = Math.trunc(hospitalBeds - severeCasesByRequestedTime);
  severeImpact.hospitalBedsByRequestedTime = severeImpactHospital;
  /**
    * challenge three
    *
    */
  impact.casesForICUByRequestedTime = Math.floor(impact.infectionsByRequestedTime * 0.05);
  severeImpact.casesForICUByRequestedTime = Math.floor(infectionsByRequestedTime * 0.05);
  impact.casesForVentilatorsByRequestedTime = Math.floor(impact.infectionsByRequestedTime * 0.02);
  severeImpact.casesForVentilatorsByRequestedTime = Math.floor(infectionsByRequestedTime * 0.02);
  const getFlightUSD = flightInUSD(periodType, timeToElapse, avgDailyIncomeInUSD);
  const convertDollarsForSevereImpact = infectionsByRequestedTime * getFlightUSD;
  const convertDollarsForImpact = impact.infectionsByRequestedTime * getFlightUSD;
  impact.dollarsInFlight = Number(convertDollarsForImpact.toFixed(2));
  severeImpact.dollarsInFlight = Number(convertDollarsForSevereImpact.toFixed(2));
  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
