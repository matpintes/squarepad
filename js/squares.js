count = 12;
color = () => 'rgb(255, 0, 0)';
matrix = true;
active = false;
squareHandler = null;
mode = 'pen';

$(document).ready(function() {
	// Initialize
	populate();
	$('#matrix-switch').addClass('active');
	$('.square').addClass('matrix');
	$('#pen').addClass('picked');
	$('#red').addClass('chosen');

	// Reset -> ask for new square count, repaint canvas
	$('#reset-btn').on('click', function(){
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
	});
	// Erase -> set background color to transparent
	$('#erase-btn').on('click', function(){
		$('.square').css('background-color', 'transparent');
	});
	$('#matrix-switch').on('click', function(){
		if(matrix) {
			$(this).removeClass('active');
			$('.square').removeClass('matrix');
			matrix = false;
		} else {
			$(this).addClass('active');
			$('.square').addClass('matrix');
			matrix = true;
		}
	});
	$('#mode-switch').on('click', function(){
		if(active) {
			$('.square').off('mouseenter');
			$(this).removeClass('active');
			active = false;
		} else {
			$('.square').on('mouseenter', function(){
				if(mode === 'pen') pen(this);
				else if(mode === 'brush') brush(this);
				else console.log('Error setting event listener');
			});
			$(this).addClass('active');
			active = true;
		}
	});
	$('.color').on('click', function(){
		$('.color').removeClass('chosen');
		$(this).addClass('chosen');
		if($(this).attr('id') === 'random') {
			// Set random color
			color = () => 'rgb('+Math.floor((Math.random() * 1000) % 256) + ', '+Math.floor((Math.random() * 1000) % 256)+', '+Math.floor((Math.random() * 1000) % 256)+')';
		} else {
			var c = $(this).css('background-color');
			color = () => c;
		}
	});
	$('.pick').on('click', function(){
		$('.pick').removeClass('picked');
		$(this).addClass('picked');
		mode = $(this).attr('id');
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
pen = function(elem) {
	$(elem).css('background-color', color());
	$(elem).css('opacity', 1);
}
brush = function(elem) {
	if($(elem).css('background-color') === color()) {
		var opacity = $(elem).css('opacity');
		$(elem).css('opacity', parseFloat(opacity) + 0.1);
	} else {
		$(elem).css('background-color', color());
		$(elem).css('opacity', 0.1);
	}
}
