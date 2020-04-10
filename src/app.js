import covid19ImpactEstimator from './estimator.js';
/**
 * Estimations Inputs
 */
const population = document.querySelector('[data-population]');
const timeToElapse = document.querySelector('[data-time-to-elapse]');
const reportedCases = document.querySelector('[data-reported-cases]');
const totalHospitalBeds = document.querySelector('[data-total-hospital-beds]');
const periodType = document.querySelector('[data-period-type]');
const goEstimate = document.querySelector('[data-go-estimate]');
/**
 * Regional Inputs..
 */
const regionName = document.querySelector('[data-region-name]');
const avgAge = document.querySelector('[data-average-age]');
const avgdailyIncomeInUSD = document.querySelector('[data-average-daily-income]');
const avgDailyIncomePopulation = document.querySelector('[data-average-population-income]');
const form = document.querySelector('form');
const estimationOutputs = document.querySelector('.estimation');
/**
 * Get Estimations Input values
 */
const displayData = (results) => {
	const {
		currentlyInfected,
		infectionsByRequestedTime,
		severeCasesByRequestedTime,
		hospitalBedsByRequestedTime,
		casesForICUByRequestedTime,
		casesForVentilatorsByRequestedTime,
		dollarsInFlight
	} = results.impact;

	const {
		currentlyInfected: CI,
		infectionsByRequestedTime: IBRT,
		severeCasesByRequestedTime: SCBRT,
		hospitalBedsByRequestedTime: HBBRT,
		casesForICUByRequestedTime: CFICUBRT,
		casesForVentilatorsByRequestedTime: CFVBRT,
		dollarsInFlight: DIF
	} = results.severeImpact;

	const impactCasesBox = document.createElement('div');
	impactCasesBox.className = 'impact-cases';
	impactCasesBox.innerHTML = ` 
    <div>
        <span class="continent">Africa</span>
       <span class="title">Impact Cases</span>
       <p>currently Infected <spanclass="data">: ${currentlyInfected}</span></p>
       <p>infections By Requestime:<span class="data"> ${infectionsByRequestedTime}</span></p>
       <p>severeCases By Requestime:<span class="data"> ${severeCasesByRequestedTime}</span></p>
       <p>Hospital Beds At Hand: <span class="data"> ${hospitalBedsByRequestedTime}</span></p>
       <p>cases for ICU: <span class="data"> ${casesForICUByRequestedTime}</span></p>
      <p> cases for Ventilators:  <span class="data"> ${casesForVentilatorsByRequestedTime}</span></p>
        <p>Dollars In flight:<span class="data">   ${dollarsInFlight}(USD)</span></p>
        </div>
        <div>
        <span class="title">Severe Impact Cases</span>
        <p>currently Infected : <span class="data">${CI}</span></p>
        <p>infections By Requestime:<span class="data"> ${IBRT}</span></p>
        <p>severeCases By Requestime:<span class="data"> ${SCBRT}</span></p>
        <p>Hospital Beds At Hand:  <span class="data">${HBBRT}</span></p>
        <p>cases for ICU:  <span class="data">${CFICUBRT}</span></p>
       <p> cases for Ventilators:  <span class="data">  ${CFVBRT}</span></p>
         <p>Dollars In flight:  <span class="data"> ${DIF}(USD)</span></p>
        </div>
    `;
	estimationOutputs.innerHTML = '';
	estimationOutputs.append(impactCasesBox);
};

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const data = { region: {} };
	data.region.name = regionName.value;
	data.region.avgAge = avgAge.value;
	data.region.avgDailyIncomeInUSD = avgdailyIncomeInUSD.value;
	data.region.avgDailyIncomePopulation = avgDailyIncomePopulation.value;
	data.periodType = periodType.value;
	data.timeToElapse = timeToElapse.value;
	data.reportedCases = reportedCases.value;
	data.population = population.value;
	data.totalHospitalBeds = totalHospitalBeds.value;
	const getResults = covid19ImpactEstimator(data);
	displayData(getResults);
});
