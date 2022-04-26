import React from "react";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = (props) => {
	const { 
		Filed,
		Categorized,
		InProgress,
		Pending,
		Resolved,
		Closed
	 } = props;

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
			label: 'Servicecalls',
			data: [Filed, Categorized, InProgress, Pending, Resolved, Closed],
			backgroundColor: [
                'rgba(51, 51, 51, 1)',
                'rgba(255 ,193 ,7, 1)',
                'rgba(0, 123 ,255, 1)',
                'rgba(220 ,53 ,69, 1)',
                'rgba(23 ,162 ,184, 1)',
                'rgba(40 ,167 ,69, 1)'
            ],
            borderColor: [
                'rgba(51, 51, 51, 1)',
                'rgba(255 ,193 ,7, 1)',
                'rgba(0, 123 ,255, 1)',
                'rgba(220 ,53 ,69, 1)',
                'rgba(23 ,162 ,184, 1)',
                'rgba(40 ,167 ,69, 1)'
            ]

		}
	]
}


const options = {
	title: {
		display: true,
		text: 'Doughnut Chart'
	}
	
}

	return <Doughnut data={data} options={options} />
};
export default DoughnutChart;