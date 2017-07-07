count = 12;

$(document).ready(function() {
	// Initialize
	repaint();

	$('#reset-btn').on('click', function(){
		count = prompt("Enter number of squares per side");
		if(count == null) count = 12;
		repaint();
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
	$('.square').hover(function(){
		$(this).addClass('painted');
	}, null);
}