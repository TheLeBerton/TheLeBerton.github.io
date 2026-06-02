export function runTypewriter(selector, charDelayMs) {
	const lines = document.querySelectorAll(selector);
	const texts = []
	lines.forEach((el) => {
		texts.push(el.textContent);
		el.textContent = "";
	})

	const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	let lineIndex = 0;

	function nextLine() {
		lineIndex += 1;
		if (lineIndex < lines.length) {
			lines[lineIndex - 1].classList.remove("typing");
			typeLine();
		}
	}

	function typeLine() {
		const el = lines[lineIndex];
		const text = texts[lineIndex];
		el.classList.add("typing");
		if (reduceMotion || text.length === 0) {
			el.textContent = text;
			nextLine();
			return;
		}
		let i = 0;
		const timer = setInterval(() => {
			el.textContent += text[i];
			i += 1;
			if (i === text.length) {
				clearInterval(timer);
				nextLine();
			}
		}, charDelayMs);
	}

	if (lines.length > 0) typeLine();

}
