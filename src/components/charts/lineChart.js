import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = (props) => {
	const { 
		Filed,
		Categorized,
		InProgress,
		Pending,
		Resolved,
		Closed
	 } = props;
const TotalSc = Filed + Categorized + InProgress + Pending + Resolved + Closed;

const yAxisMinValue = 0;
const yAxisMaxValue = TotalSc;

const data = {
	labels: [
		'Filed',
		'Categorized',
		'In Progress',
		'Pending',
		'Resolved',
		'Closed'
	],
	datasets: [
		{
			label: 'Filed',
			data: [Filed, Categorized, InProgress, Pending, Resolved, Closed],
			backgroundColor:'rgba(51, 51, 51, 0.2)',
            borderColor:'rgba(51, 51, 51, 1)',
			fill: false,
			//borderDash: [5, 5],
            pointBackgroundColor: ['rgba(51, 51, 51, 1)', 'rgba(255 ,193 ,7, 1)', 'rgba(0, 123 ,255, 1)', 'rgba(220 ,53 ,69, 1)', 'rgba(23 ,162 ,184, 1)', 'rgba(40 ,167 ,69, 1)'],
            pointBorderColor: 'rgba(51, 51, 51, 1)'

		},
		{
			label: 'Categorized',
			data: [Filed, Categorized, InProgress, Pending, Resolved, Closed],
			backgroundColor: 'rgba(255 ,193 ,7, 0.2)',
            borderColor: 'rgba(255 ,193 ,7, 1)',

			fill: false,
            pointBackgroundColor: ['rgba(51, 51, 51, 1)', 'rgba(255 ,193 ,7, 1)', 'rgba(0, 123 ,255, 1)', 'rgba(220 ,53 ,69, 1)', 'rgba(23 ,162 ,184, 1)', 'rgba(40 ,167 ,69, 1)'],
            pointBorderColor: 'rgba(255 ,193 ,7, 1)'

		},
		{
			label: 'In Progress',
			data: [Filed, Categorized, InProgress, Pending, Resolved, Closed],
			backgroundColor:'rgba(0, 123 ,255, 0.2)',
            borderColor:'rgba(0, 123 ,255, 0.2)',

			fill: false,
			pointBackgroundColor: ['rgba(51, 51, 51, 1)', 'rgba(255 ,193 ,7, 1)', 'rgba(0, 123 ,255, 1)', 'rgba(220 ,53 ,69, 1)', 'rgba(23 ,162 ,184, 1)', 'rgba(40 ,167 ,69, 1)'],
            pointBorderColor: 'rgba(0, 123 ,255, 1)'

		},
		{
			label: 'Pending',
			data: [Filed, Categorized, InProgress, Pending, Resolved, Closed],
			backgroundColor: 'rgba(220 ,53 ,69, 0.2)',
            borderColor:'rgba(220 ,53 ,69, 1)',

			fill: false,
            pointBackgroundColor: ['rgba(51, 51, 51, 1)', 'rgba(255 ,193 ,7, 1)', 'rgba(0, 123 ,255, 1)', 'rgba(220 ,53 ,69, 1)', 'rgba(23 ,162 ,184, 1)', 'rgba(40 ,167 ,69, 1)'],
            pointBorderColor: 'rgba(220 ,53 ,69, 1)'

		},
		{
			label: 'Resolved',
			data: [Filed, Categorized, InProgress, Pending, Resolved, Closed],
			backgroundColor: 'rgba(23 ,162 ,184, 0.2)',
            borderColor:'rgba(23 ,162 ,184, 1)',

			fill: false,
            pointBackgroundColor: ['rgba(51, 51, 51, 1)', 'rgba(255 ,193 ,7, 1)', 'rgba(0, 123 ,255, 1)', 'rgba(220 ,53 ,69, 1)', 'rgba(23 ,162 ,184, 1)', 'rgba(40 ,167 ,69, 1)'],
            pointBorderColor: 'rgba(23 ,162 ,184, 1)'

		},
		{
			label: 'Closed',
			data: [Filed, Categorized, InProgress, Pending, Resolved, Closed],
			backgroundColor: 'rgba(40 ,167 ,69, 0.2)',
            borderColor: "rgba(40 ,167 ,69, 1)",
			
			fill: false,
            pointBackgroundColor: ['rgba(51, 51, 51, 1)', 'rgba(255 ,193 ,7, 1)', 'rgba(0, 123 ,255, 1)', 'rgba(220 ,53 ,69, 1)', 'rgba(23 ,162 ,184, 1)', 'rgba(40 ,167 ,69, 1)'],
            pointBorderColor: 'rgba(40 ,167 ,69, 1)'

		}
	]
}


const options = {
	title: {
		display: true,
		text: 'Line Chart'
	},
	scales: {
		yAxes: [
			{
				ticks: {
					min: yAxisMinValue,
					max: yAxisMaxValue,
					stepSize: 1
				}

			}
		]
	}
}

	return <Line data={data} options={options} />
};
export default LineChart;