function translate() {
	//run JSON using user input
}

function clearSearch() {
  $('.image-place').html('');
	console.log('html cleared');
}

function readySearch() {
  $('.js-srch').submit(event => {
    event.preventDefault();
    clearSearch();
	  console.log('form was submitted');
    const input = $(event.currentTarget).find('.js-input');
    const query = input.val();
    input.val('');
    getImageData(query, findImages);
	  //getTranslationData(query, checkWorking);
  });
}

$(readySearch);
