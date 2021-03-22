var combinationLock = {
	combination: 1618,
	locked: true,
	wheels: [0, 0, 0, 0],
	increment: function (wheel) {
		if (this.wheels[wheel] === 9) {
			this.wheels[wheel] = 0;
		} else {
			this.wheels[wheel]++;
		}
	},
	decrement: function (wheel) {
		if (this.wheels[wheel] === 0) {
			this.wheels[wheel] = 9;
		} else {
			this.wheels[wheel]--;
		}
	},
	check: function () {
		if (this.combination === parseInt(this.wheels.join(''))) {
			this.locked = false;
		} else {
			this.locked = true;
		}
	},
	spin: function () {
		for (i = 0; i < 4; i++) {
			this.wheels[i] = getRandomInt(10, -1);
		}
	}
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkLock() {
	combinationLock.check();
	if (combinationLock.locked === false) {
		document.querySelector('#indicator').classList.remove('locked');
		document.querySelector('#indicator').classList.add('unlocked');
	} else {
		document.querySelector('#indicator').classList.add('locked');
		document.querySelector('#indicator').classList.remove('unlocked');
	}
}

jQuery(function () {
	$('.increment').each(function () {
		$(this).on('click', function () {
			let wheelIndex = parseInt(this.getAttribute('index'));
			combinationLock.increment(wheelIndex);
			document.querySelectorAll('.digit')[wheelIndex].value = combinationLock.wheels[wheelIndex];
			checkLock();
		});
	});

	$('.decrement').each(function () {
		$(this).on('click', function () {
			let wheelIndex = parseInt(this.getAttribute('index'));
			combinationLock.decrement(wheelIndex);
			document.querySelectorAll('.digit')[wheelIndex].value = combinationLock.wheels[wheelIndex];
			checkLock();
		});
	});

	$('.digit').each(function () {
		$(this).on('keyup', function (e) {
			if (e.which === 38) {
				let wheelIndex = parseInt(this.getAttribute('index'));
				combinationLock.increment(wheelIndex);
				document.querySelectorAll('.digit')[wheelIndex].value = combinationLock.wheels[wheelIndex];
				checkLock();
			}

			if (e.which === 40) {
				let wheelIndex = parseInt(this.getAttribute('index'));
				combinationLock.decrement(wheelIndex);
				document.querySelectorAll('.digit')[wheelIndex].value = combinationLock.wheels[wheelIndex];
				checkLock();
			}

			if (e.which > 47 && e.which < 58) {
				let wheelIndex = parseInt(this.getAttribute('index'));
				combinationLock.wheels[wheelIndex] = parseInt(document.querySelectorAll('.digit')[wheelIndex].value);
				checkLock();
			}

			if (this.value.length > 1) {
				this.value = 0;
			}

			if (this.value.length < 1) {
				this.value = 0;
			}
		});
	});
});