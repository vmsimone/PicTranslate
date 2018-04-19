function clearSearch() {
  $('.image-place').html('');
	 $('.word-place').html('');
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
	langSelector(query);
  });
}

function langSelector(q){
	//have this function run both getData functions
	//each needs new arguments to account for the language(s)
	let userLang = document.querySelector('input[name="user-language"]:checked').value;
	let foreignLang = document.querySelector('input[name="foreign-language"]:checked').value;

	console.log(userLang);
	console.log(foreignLang);
	getTranslationData(q, sortTranslationData, userLang, foreignLang);
	getImageData(q, findImages, userLang);
}

$(readySearch);
