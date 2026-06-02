import { runTypewriter } from "./typewriter.js";
import { initKeyboardNav } from "./nav.js";

const CHAR_DELAY_MS = 80;

function currentTime() {
	return new Date().toTimeString().slice(0, 8);
}

function showPrompt(typedEl) {
	const ps1 = typedEl.parentElement.querySelector(".ps1");
	if (!ps1) return;
	ps1.textContent = `[ ${currentTime()} ][ leberton@asgard ][ main f0753ca ] > `;
}

runTypewriter("[data-typewriter]", CHAR_DELAY_MS, showPrompt);
initKeyboardNav("section");
