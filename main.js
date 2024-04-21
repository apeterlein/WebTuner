const colors = ["#A0C4FF", "#BDB2FF", "#DEBCFF", "#EAB3EB", "#F5ACC8", "#FFA5A5", "#FFBEA5", "#FFD6A5", "#FEEBAE", "#FDFFB6", "#E4FFBB", "#CAFFBF", "#B3FBDF", "#9BF6FF", "#9EDDFF"];
let notes = {};
let counter = 0;

window.addEventListener("DOMContentLoaded", () => {
	const box = document.getElementById("box");
	const body = document.getElementById("body");

	document.getElementById("octave").value = 5;

	Array.prototype.forEach.call(document.getElementsByClassName("button"), (elm) => {
		elm.addEventListener("click", () => {
			let audio = document.getElementById(elm.dataset.key + document.getElementById("octave").value);
			if (audio) {
				if (!audio.paused) {
					audio.pause();
					audio.currentTime = 0;
				}
				audio.play();
			}
		});
	});

	Array.prototype.forEach.call(document.getElementsByTagName("audio"), (elm) => {
		elm.addEventListener("play", () => {
			let width = window.screen.width;
			if (window.screen.height > width) width = window.screen.height;
			document.documentElement.style.setProperty("--width", width / .3 + "px");
			let circle = document.createElement("div");
			circle.classList.add("circle");
			let color = colors[counter];
			counter = (counter + 1) % colors.length;
			circle.style.background = "radial-gradient(" + color + " 30%, transparent 60%)";
			box.appendChild(circle);
			circle.addEventListener("animationend", () => {
				circle.remove();
				body.style.background = color;
			});
		});
	});

	document.getElementById("octave").addEventListener("change", () => {
		Array.prototype.forEach.call(document.getElementsByClassName("button"), (elm) => {
			let audio = document.getElementById(elm.dataset.key + document.getElementById("octave").value);
			if (audio) {
				elm.classList.remove("gray");
			}
			else {
				elm.classList.add("gray");
			}
		});
	});

	window.addEventListener("keydown", (event) => {
		let elm = document.getElementById(event.code);
		if (elm) {
			elm.click();
			elm.classList.add("active");
			setTimeout(() => { elm.classList.remove("active"); }, 100);
		}
	});
});