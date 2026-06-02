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
