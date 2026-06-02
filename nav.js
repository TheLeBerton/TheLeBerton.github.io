export function initKeyboardNav(selector) {
	const sections = document.querySelectorAll(selector);
	let current = 0;
	document.addEventListener("keydown", (event) => {
		if (event.target.matches("input, textarea")) return;
		if (event.key === "j" && current < sections.length - 1) {
			current += 1;
		} else if (event.key === "k" && current > 0) {
			current -= 1;
		} else {
			return;
		}
		sections[current].scrollIntoView({ behavior: "smooth" });
	});
}
