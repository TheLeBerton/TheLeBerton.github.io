// Shared "about" content, shown by both `cat about.txt` and `man theleberton`.
const ABOUT = [
	"NAME",
	"     leberton — 42 student",
	"",
	"SYNOPSIS",
	"     leberton [--c] [--cpp] [--py]",
	"",
	"DESCRIPTION",
	"     Student at 42 Vienna. Loves low-level, terminals,",
	"     algorithms, maths and video games.",
];

// Virtual filesystem: arrays = files (lines of text), objects = directories.
const FS = {
	"about.txt": ABOUT,
	"contact.txt": [
		"email    leonardo.bertonasco01@gmail.com",
		"github   github.com/TheLeBerton",
	],
	"projects": {
		"README.txt": ["use 'cat <name>' to read a project, 'cd ..' to go back"],
		// TODO: replace these with your real projects
		"example.txt": ["TODO: describe one of your projects here"],
	},
	"skills": {
		"languages.txt": ["C", "C++", "C#", "Python"],
		"tools.txt": ["git", "valgrind", "gdb", "make"],
	},
};

function currentTime() {
	return new Date().toTimeString().slice(0, 8);
}

export function promptText(path = "~") {
	return `[ ${currentTime()} ][ leberton@asgard ${path} ][ main f0753ca ] > `;
}

export function initTerminal(rootSelector) {
	const terminal = document.querySelector(rootSelector);
	if (!terminal) return;

	const output = terminal.querySelector(".output");
	const inputLine = terminal.querySelector(".input-line");
	const input = terminal.querySelector(".cmd");
	const ps1 = inputLine.querySelector(".ps1");

	// drop the leftover blinking cursor left by the intro typewriter
	output.querySelectorAll(".typing").forEach((el) => el.classList.remove("typing"));

	let cwd = []; // path segments from the root

	const isDir = (node) => node !== undefined && !Array.isArray(node);

	function dirAt(segments) {
		let node = FS;
		for (const seg of segments) node = node[seg];
		return node;
	}

	function pathLabel() {
		return cwd.length ? "~/" + cwd.join("/") : "~";
	}

	function refreshPrompt() {
		ps1.textContent = promptText(pathLabel());
	}

	function print(lines) {
		lines.forEach((text) => {
			const div = document.createElement("div");
			div.className = "out";
			div.textContent = text;
			output.appendChild(div);
		});
	}

	// echo the typed command back into the output as a finished prompt line
	function echo(raw) {
		const line = document.createElement("div");
		line.className = "line";
		const prompt = document.createElement("span");
		prompt.className = "ps1";
		prompt.textContent = ps1.textContent;
		const command = document.createElement("span");
		command.textContent = raw;
		line.append(prompt, command);
		output.appendChild(line);
	}

	function ls() {
		const dir = dirAt(cwd);
		const names = Object.keys(dir).map((name) => (isDir(dir[name]) ? name + "/" : name));
		return [names.join("   ")];
	}

	function cd(arg) {
		if (!arg || arg === "~" || arg === "/") {
			cwd = [];
			return [];
		}
		if (arg === "..") {
			cwd = cwd.slice(0, -1);
			return [];
		}
		const target = dirAt(cwd)[arg];
		if (isDir(target)) {
			cwd = [...cwd, arg];
			return [];
		}
		if (Array.isArray(target)) return [`cd: not a directory: ${arg}`];
		return [`cd: no such directory: ${arg}`];
	}

	function cat(arg) {
		if (!arg) return ["usage: cat <file>"];
		const target = dirAt(cwd)[arg];
		if (Array.isArray(target)) return target;
		if (isDir(target)) return [`cat: ${arg}: is a directory`];
		return [`cat: ${arg}: no such file`];
	}

	function man(arg) {
		if (!arg) return ["what manual page do you want?"];
		if (arg.toLowerCase() === "theleberton") return ABOUT;
		return [`No manual entry for ${arg}`];
	}

	function run(raw) {
		echo(raw);
		const [cmd, arg] = raw.trim().split(/\s+/);
		if (cmd === "") {
			// blank line
		} else if (cmd === "clear") {
			output.replaceChildren();
		} else if (cmd === "ls") {
			print(ls());
		} else if (cmd === "cd") {
			print(cd(arg));
		} else if (cmd === "cat") {
			print(cat(arg));
		} else if (cmd === "pwd") {
			print(["/" + cwd.join("/")]);
		} else if (cmd === "man") {
			print(man(arg));
		} else if (cmd === "whoami") {
			print(["leberton"]);
		} else if (cmd === "help") {
			print([
				"available commands:",
				"  ls            list files in the current directory",
				"  cd <dir>      change directory ('cd ..' to go up)",
				"  cat <file>    print a file's contents",
				"  man <name>    show a manual page",
				"  pwd           print the current path",
				"  whoami        my username",
				"  clear         clear the screen",
				"  help          show this message",
			]);
		} else {
			print([`command not found: ${cmd}`, "type 'help' for available commands"]);
		}
		refreshPrompt();
		terminal.scrollTop = terminal.scrollHeight;
	}

	input.addEventListener("keydown", (event) => {
		if (event.key === "Enter") {
			run(input.value);
			input.value = "";
		}
	});

	// clicking anywhere in the screen focuses the prompt
	terminal.addEventListener("click", () => input.focus({ preventScroll: true }));

	refreshPrompt();
	inputLine.hidden = false;
	input.focus({ preventScroll: true });
}
