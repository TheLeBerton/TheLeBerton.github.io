import { runTypewriter } from "./typewriter.js";
import { initKeyboardNav } from "./nav.js";

const CHAR_DELAY_MS = 80;

runTypewriter("[data-typewriter]", CHAR_DELAY_MS)
initKeyboardNav("section")
