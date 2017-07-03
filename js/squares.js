grid = 256;

$(document).ready(function(){
	// Populate container
	for(var i = 0; i < grid; i++)
		$('.container').append('<div class="square"></div>');

	// Event handler
	$('.square').hover(function(){
		$(this).addClass('painted');
	}, null)
});