function getUserInput() {
	//pull data from form
	event.preventDefault();

}

function translate() {
	//run JSON using user input
}

function findImages() {
	//get the pics
}

function postImages() {
	//post the pics
	let renameThisVar = `
		<div class="visual-aid">
			<a href="[google search results]">
				<img src="[nth image]" name="[image desc]"/>
			</a>
		</div>
		`;
	$('.image-place').append(renameThisVar);
}

function clearSearch() {
  $('.results').html('');
}

function readySearch() {
  $('.js-srch').submit(event => {
    event.preventDefault();
    clearSearch();
    const input = $(event.currentTarget).find('.js-input');
    const query = input.val();
    input.val('');
    getImageData(query, findImages);
	  getTranslationData(query, /* callback function*/)
  });
}

$(readySearch);
