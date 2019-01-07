import { colors } from "./colors";

export const groupedBarData = {
	labels: ["Qty", "More", "Sold", "Restocking", "Misc"],
	datasets: [
		{
			label: "Dataset 1",
			backgroundColors: [colors[0]],
			data: [
				{
					x: new Date("Dec 10, 2018"),
					y: 200
				},
				{
					x: new Date("Dec 5, 2017"),
					y: 20
				},
				{
					x: new Date("Aug 21, 2017"),
					y: 50
				},
				{
					x: new Date("Jan 10, 2017"),
					y: 300
				},
				{
					x: new Date("July 15, 2018"),
					y: 250
				},
				{
					x: new Date("Sep 10, 2017"),
					y: 100
				}
			]
		},
		{
			label: "Dataset 2",
			backgroundColors: [colors[1]],
			data: [
				{
					x: new Date("Dec 10, 2018"),
					y: 100
				},
				{
					x: new Date("Dec 5, 2017"),
					y: 230
				},
				{
					x: new Date("Aug 21, 2017"),
					y: 150
				},
				{
					x: new Date("Jan 10, 2017"),
					y: 30
				},
				{
					x: new Date("July 15, 2018"),
					y: 200
				},
				{
					x: new Date("Sep 10, 2017"),
					y: 20
				}
			]
		},
		// {
		// 	label: "Dataset 2",
		// 	backgroundColors: [colors[1]],
		// 	data: [
		// 		32432,
		// 		-21312,
		// 		-56456,
		// 		-21312,
		// 		34234
		// 	]
		// },
		// {
		// 	label: "Dataset 3",
		// 	backgroundColors: [colors[2]],
		// 	data: [
		// 		-12312,
		// 		23232,
		// 		34232,
		// 		-12312,
		// 		-34234
		// 	]
		// },
		// {
		// 	label: "Dataset 4",
		// 	backgroundColors: [colors[3]],
		// 	data: [
		// 		-32423,
		// 		21313,
		// 		64353,
		// 		24134,
		// 		32423
		// 	]
		// }
	]
};

export const groupedBarOptions = {
	scales: {
		x: {
			title: "2018 Annual Sales Figures",
			type: "time"
		},
		y: {
			formatter: axisValue => `${axisValue / 1000}k`,
			yMaxAdjuster: yMaxValue => yMaxValue * 1.1,
		},
		y2: {
			ticks: {
				max: 1,
				min: 0
			},
			formatter: axisValue => `${axisValue * 100}%`
		}
	},
	legendClickable: true,
	containerResizable: true
};

// Simple bar
export const simpleBarData = {
	labels: ["Qty", "More", "Sold", "Restocking", "Misc"],
	datasets: [
		{
			label: "Dataset 1",
			backgroundColors: colors,
			data: [
				65000,
				29123,
				35213,
				51213,
				16932
			]
		}
	]
};

export const simpleBarOptions = {
	accessibility: false,
	scales: {
		x: {
			title: "2018 Annual Sales Figures",
		},
		y: {
			formatter: axisValue => `${axisValue / 1000}k`,
			yMaxAdjuster: yMaxValue => yMaxValue * 1.1,
			stacked: false
		}
	},
	legendClickable: true,
	containerResizable: true
};

// Stacked bar
export const stackedBarData = {
	labels: ["Qty", "More", "Sold", "Restocking", "Misc"],
	datasets: [
		{
			label: "Dataset 1",
			backgroundColors: [colors[0]],
			data: [
				65000,
				29123,
				35213,
				51213,
				16932
			]
		},
		{
			label: "Dataset 2",
			backgroundColors: [colors[1]],
			data: [
				32432,
				21312,
				56456,
				21312,
				34234
			]
		},
		{
			label: "Dataset 3",
			backgroundColors: [colors[2]],
			data: [
				12312,
				23232,
				34232,
				12312,
				34234
			]
		},
		{
			label: "Dataset 4",
			backgroundColors: [colors[3]],
			data: [
				32423,
				21313,
				64353,
				24134,
				32423
			]
		}
	]
};

export const stackedBarOptions = {
	accessibility: false,
	scales: {
		x: {
			title: "2018 Annual Sales Figures",
		},
		y: {
			formatter: axisValue => `${axisValue / 1000}k`,
			yMaxAdjuster: yMaxValue => yMaxValue * 1.1,
			stacked: true
		}
	},
	legendClickable: true,
	containerResizable: true
};
