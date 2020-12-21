let x = 0;
let y = 0;
let z = 1;

function sleep(ms) {
	return new Promise((resolve) => {
		return setTimeout(resolve, ms);
	});
}

async function timer() {
	console.log('Breathe in...');
	while (true) {
		let breathingInterval = setInterval(function () {
			console.log('---------------');
		}, 1000);
		await sleep(4000);
		y++;
		clearInterval(breathingInterval);
		if (y % 2 != 0) {
			console.log('Hold...');
		} else if (z % 2 != 0) {
			console.log('Breathe out...');
			z++;
		} else {
			x++;
			console.log(`Breathe in...  | Cycles: ${x}`);
			z++;
		}
	}
}

timer();
