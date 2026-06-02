import { runTypewriter } from "./typewriter.js";
import { initTerminal, promptText } from "./terminal.js";

const CHAR_DELAY_MS = 80;

function showPrompt(typedEl) {
	const ps1 = typedEl.parentElement.querySelector(".ps1");
	if (!ps1) return;
	ps1.textContent = promptText();
}

runTypewriter("[data-typewriter]", {
	charDelay: CHAR_DELAY_MS,
	onLineStart: showPrompt,
	onComplete: () => initTerminal("#terminal"),
});
