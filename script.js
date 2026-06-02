const prmpt = document.querySelector(".prompt")
const text = prmpt.textContent
prmpt.textContent = ""

let i = 0
const timer = setInterval(() => {
	prmpt.textContent +=  text[i];
	i += 1;
	if (i === text.length ) {
		clearInterval(timer);
	}
}, 80 );


const sections = document.querySelectorAll("section");
let current = 0;

document.addEventListener("keydown", (event) => {
	if (event.key === "j" && current < sections.length - 1) {
		current += 1
	} else if (event.key === "k" && current > 0) {
		current -= 1
	}
	sections[current].scrollIntoView({ behavior: "smooth" });
});
