const xlsx = require('xlsx');
const inquirer = require('inquirer');

let timerDate = new Date();
let month = timerDate.getUTCMonth() + 1;
let day = timerDate.getUTCDate();
let year = timerDate.getUTCFullYear();

timerdate = month + '-' + day + '-' + year;

let wb = xlsx.readFile('breathing-timer.xlsx');
let ws = wb.Sheets['exercises'];
let jsonData = xlsx.utils.sheet_to_json(ws);

const askQuestion = async () => {
	const data = await inquirer.prompt({
		type: 'input',
		message: 'How many cycles did you get?',
		name: 'cycles',
	});

	const cycles = +data['cycles'];
	const seconds = cycles * 16;
	const minutes = (seconds / 60).toFixed(2);

	let bestScore = 0;

	jsonData.forEach((record) => {
		if (record['seconds'] > bestScore) {
			best = record['seconds'];
		}
	});

	if (seconds > bestScore) {
		bestScore = seconds;
	}

	jsonData.push({
		date: timerdate,
		cycles: cycles,
		seconds: seconds,
		minutes: minutes,
		desc: `${minutes} minutes of breathing`,
		best: bestScore,
	});

	let counter = 0;

	while (counter < jsonData.length - 1) {
		jsonData[counter]['best'] = '';
		counter++;
	}

	let newWB = xlsx.utils.book_new();
	let newWS = xlsx.utils.json_to_sheet(jsonData);
	xlsx.utils.book_append_sheet(newWB, newWS, 'exercises');
	xlsx.writeFile(newWB, 'breathing-timer.xlsx');
};

askQuestion();
