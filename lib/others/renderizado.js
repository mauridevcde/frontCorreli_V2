// render graphics
export function render(obj, Login = false) {
	// create content object
	let content = document.getElementById('content');
	// clear content
	content.innerHTML = ``;
	// render all childs
	Object.values(obj).forEach(item => {
		content.innerHTML += item;
	});
	// add listeners
	if (!Login) {
		addNavbarFunc();
	}
}