count = 12;
matrix = true;
active = false;
mode = 'pen';
modes = ['pen', 'brush'];
modeI = 0;
color = () => 'rgb(255, 0, 0)';
colors = ['red', 'green', 'blue', 'black', 'white', 'random'];
colorI = 0;

$(document).ready(function() {
	// Initialize
	populate();
	$('#matrix-switch').addClass('active');
	$('.square').addClass('matrix');
	$('#pen').addClass('picked');
	$('#red').addClass('chosen');

	// Reset
	$('#reset-btn').on('click', fReset);
	// Erase
	$('#erase-btn').on('click', fErase);
	// Matrix
	$('#matrix-switch').on('click', fMatrix);
	// Enable/disable drawing
	$('#mode-switch').on('click', fActive);
	// Change color
	$('.color').on('click', function(){
		$('.color').removeClass('chosen');
		$(this).addClass('chosen');
		let id = $(this).attr('id');
		colorI = colors.indexOf(id);
		if(id === 'random') {
			// Set random color
			color = () => 'rgb('+Math.floor((Math.random() * 1000) % 256) + ', '+Math.floor((Math.random() * 1000) % 256)+', '+Math.floor((Math.random() * 1000) % 256)+')';
		} else {
			let c = $(this).css('background-color');
			color = () => c;
		}
	});
	// Change type of brush
	$('.pick').on('click', function(){
		$('.pick').removeClass('picked');
		$(this).addClass('picked');
		mode = $(this).attr('id');
		modeI = modes.indexOf(mode);
	});
	// Keyboard shortcuts
	$(document).on('keypress', function(event){
		if(event.key === 'm') fMatrix();
		else if(event.key === 'e') fErase();
		else if(event.key === 'a') fActive();
		else if(event.key === 'r') fReset();
		else if(event.key === 't') fType();
		else if(event.key === 'c') fColor();
	});
});

function populate() {
	// Calculate width of a single square
	var size = $('.container').width() / count;
	// Populate container
	for(var i = 0; i < count; i++) {
		for(var j = 0; j < count; j++) {
			$('.container').append('<div class="square" style="width: '+size+'px; height: '+size+'px"></div>');
		}
	}
}
function pen(elem) {
	$(elem).css('background-color', color());
	$(elem).css('opacity', 1);
}
function brush(elem) {
	if($(elem).css('background-color') === color()) {
		var opacity = $(elem).css('opacity');
		$(elem).css('opacity', parseFloat(opacity) + 0.1);
	} else {
		$(elem).css('background-color', color());
		$(elem).css('opacity', 0.1);
	}
}
function fMatrix() {
	if(matrix) {
		$('#matrix-switch').removeClass('active');
		$('.square').removeClass('matrix');
		matrix = false;
	} else {
		$('#matrix-switch').addClass('active');
		$('.square').addClass('matrix');
		matrix = true;
	}
}
function fErase() {
	$('.square').css('background-color', 'transparent');
}
function fActive() { 
	if(active) {
		$('.square').off('mouseenter');
		$('#mode-switch').removeClass('active');
		active = false;
	} else {
		$('.square').on('mouseenter', function(){
			if(mode === 'pen') pen(this);
			else if(mode === 'brush') brush(this);
			else console.log('Error setting event listener');
		});
		$('#mode-switch').addClass('active');
		active = true;
	}
}
function fReset() {
	// Remove all child elements
		$('.container').empty();
		// Get new square count
		count = prompt("Enter number of squares per side", 12);
		if(count == null) count = 12;
		// Populate canvas
		populate();
		if(matrix) $('.square').addClass('matrix');
		$('#mode-switch').removeClass('active');
		active = false;
}
function fType() {
	$('.pick').removeClass('picked');
	modeI = modeI >= 1 ? 0 : modeI + 1;
	$('#' + modes[modeI]).addClass('picked');
	mode = modes[modeI];
}
function fColor() {
	$('.color').removeClass('chosen');
	colorI = colorI >= 5 ? 0 : colorI + 1;
	$('#' + colors[colorI]).addClass('chosen');
	if(colors[colorI] === 'random') {
		// Set random color
		color = () => 'rgb('+Math.floor((Math.random() * 1000) % 256) + ', '+Math.floor((Math.random() * 1000) % 256)+', '+Math.floor((Math.random() * 1000) % 256)+')';
	} else {
		let c = $('#' + colors[colorI]).css('background-color');
		color = () => c;
	}
}
