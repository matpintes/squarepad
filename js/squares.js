count = 12;
brush = null;

$(document).ready(function() {
	// Initialize
	repaint();

	$('#reset-btn').on('click', function(){
		count = prompt("Enter number of squares per side", 12);
		if(count == null) count = 12;
		repaint();
	});

	// Toggle paintbrush
	$(document).on('keyup', function(event){
		if(event.key == 'p') {
			$('.switch').toggleClass('active');
			$('.square').on('mouseenter', function(){
				$(this).addClass('painted');
			}, null);
		}
	});

	$('.pick').on('click', function(){
		$(this).toggleClass('picked');
	});
	$('.color').on('click', function(){
		$(this).toggleClass('chosen');
	});
});

function repaint() {
	// Remove all child elements
	$('.container').empty();
	// Calculate width of a single square
	var size = $('.container').width() / count;
	// Populate container
	for(var i = 0; i < count; i++) {
		for(var j = 0; j < count; j++) {
			$('.container').append('<div class="square" style="width: '+size+'px; height: '+size+'px"></div>');
		}
	}
	// Attach event handler
	$('.square').hover(null, null);
	// Reset to default state
	$('.switch').removeClass('active');
}