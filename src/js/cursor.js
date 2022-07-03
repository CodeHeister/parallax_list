//-- C U R S O R  F U N C T I O N S --//

var mouseX; // global X cursor position
var mouseY; // global Y cursor position

const moveCursor = e => { // follow real cursor
	showCursor(); // show custom cursor

	if(!cursorIcon.classList.contains('focused')) {
		mouseX = e.clientX; // refresh global cursor X
		mouseY = e.clientY; // refresh global cursor Y
   
		cursor.style.transform = `translate3d(${window.scrollX+mouseX}px, ${window.scrollY+mouseY}px, 0)`; // set new position
	}
}

const moveCursorScroll = e => { // scroll sync
	showCursor(); // show custom cursor
	cursor.style.transform = `translate3d(${window.scrollX+mouseX}px, ${window.scrollY+mouseY}px, 0)`; // set position (px)
}

const setCursor = e => { // get target position
	mouseX = e.currentTarget.offsetLeft+e.currentTarget.clientWidth/2; // global X rewrite
	mouseY = e.currentTarget.offsetTop+e.currentTarget.clientHeight/2; // global Y rewrite

	var k = 0.7; // size ratio

	cursorIcon.classList.add("focused"); // disable following
	cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`; // set target position (px)
	
	cursorIcon.style.width = `${e.currentTarget.clientWidth*k}px`; // set new width
	cursorIcon.style.height = `${e.currentTarget.clientHeight*k}px`; // set new height
}

const setCursorPanel = e => { // fixed panel exeption
	/*mouseX = e.currentTarget.offsetLeft+e.currentTarget.clientWidth/2; // global X rewrite
	mouseY = e.currentTarget.offsetTop+e.currentTarget.clientHeight/2; // global Y rewrite
*/

	var k = 0.7; // size ratio

	cursorIcon.classList.add("focused"); // disable following
	cursor.style.transform = `translate3d(${window.scrollX+mouseX}px, ${window.scrollY+mouseY}px, 0)`; // set target position (px)

	/*cursorIcon.style.width = `${e.currentTarget.clientWidth*k}px`; // set new width
	cursorIcon.style.height = `${e.currentTarget.clientHeight*k}px`; // set new height*/
	cursorIcon.style.width = "3.5rem";
	cursorIcon.style.height = "3.5rem";
}

const coordinateCursor = e => { // smooth moving targeted cursor
	mouseX = e.currentTarget.offsetLeft+e.currentTarget.clientWidth/2; // may be commented to optimize
	mouseY = e.currentTarget.offsetTop+e.currentTarget.clientHeight/2; // may be commented to optimize

	var percent = 40; // coordinate limit (percent/2)
	var k = 0.25;
	
	var coordinateX = parseInt(((e.clientX-e.currentTarget.offsetLeft)/e.currentTarget.clientWidth-0.5)*percent);
	var coordinateY = parseInt(((e.clientY-e.currentTarget.offsetTop)/e.currentTarget.clientHeight-0.5)*percent);

	cursor.style.transform = `translate(${coordinateX}%, ${coordinateY}%) translate3d(${mouseX}px, ${mouseY}px, 0)`; // set new coordinate value
	e.currentTarget.style.transform = `scale(1.2) translate(${coordinateX*k}%, ${coordinateY*k}%)`;
}

const coordinateCursorPanel = e => {
	mouseX = e.currentTarget.offsetLeft+e.currentTarget.clientWidth/2; // may be commented to optimize
	mouseY = e.currentTarget.offsetTop+e.currentTarget.clientHeight/2; // may be commented to optimize

	var percent = 10; // coordinate limit (percent/2)
	var k = 0.25;
	
	var coordinateX = parseInt(((e.clientX-e.currentTarget.offsetLeft)/e.currentTarget.clientWidth-0.5)*percent);
	var coordinateY = parseInt(((e.clientY-e.currentTarget.offsetTop)/e.currentTarget.clientHeight-0.5)*percent);

	cursor.style.transform = `translate(${coordinateX}%, ${coordinateY}%) translate3d(${window.scrollX+mouseX}px, ${window.scrollY+mouseY}px, 0)`; // set new coordinate value
	e.currentTarget.style.transform = `scale(1.2) translate(${coordinateX*k}%, ${coordinateY*k}%)`;
}

const unsetCursor = e => {
	cursorIcon.classList.remove("focused"); // enable following

	cursorIcon.style.width = null; // erase width
	cursorIcon.style.height = null; // erase height

	e.currentTarget.style.transform = null;
}

const showCursor = e => { // show custom cursor
 
    if(cursor.classList.contains('cursor-hidden')) {
        cursor.classList.remove('cursor-hidden');
    }
 
    cursor.classList.add('cursor-visible');
 
}

const hideCursor = e => { // hide custom cursor
	
	if(cursor.classList.contains('cursor-visible')) {
		cursor.classList.remove('cursor-visible');
    
	}
	cursor.classList.add('cursor-hidden');
}

//- E N A B L E  C U R S O R -//

var cursor = document.querySelector(".cursor");
var cursorIcon = document.querySelector(".cursor-icon");

window.addEventListener('mousemove', moveCursor);
window.addEventListener('scroll', moveCursorScroll);

document.body.addEventListener('mouseleave', hideCursor);

document.querySelectorAll("#icons a").forEach(item => { 
	item.addEventListener("mouseover", setCursorPanel);
	item.addEventListener("mousemove", coordinateCursorPanel);
	item.addEventListener("mouseout", unsetCursor);
});
