import { colors } from "./colors";

export const groupedBarData = {
	labels: ["Qty", "More", "Sold", "Restocking", "Misc"],
	datasets: [
		{
			label: "Dataset 1",
			backgroundColors: [colors[0]],
			data: [
				{
					x: -300,
					y: 200
				},
				{
					x: 200,
					y: 20
				},
				{
					x: 10,
					y: 50
				},
				{
					x: 0,
					y: 300
				},
				{
					x: 300,
					y: 250
				},
				{
					x: 20,
					y: 100
				}
			]
		},
		{
			label: "Dataset 2",
			backgroundColors: [colors[1]],
			data: [
				{
					x: 300,
					y: 100
				},
				{
					x: 10,
					y: 230
				},
				{
					x: 253,
					y: 150
				},
				{
					x: 32,
					y: 30
				},
				{
					x: 64,
					y: 200
				},
				{
					x: 43,
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
