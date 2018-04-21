function clearSearch() {
  $('.image-place-original').html('');
	$('.image-place-new').html('');
	 $('.word-place').html('');
	console.log('html cleared');
}

function readySearch() {
  $('.js-srch').submit(event => {
    event.preventDefault();
	console.log('form was submitted');
    const input = $(event.currentTarget).find('.js-input');
    const query = input.val();
    input.val('');
	langSelector(query);
	clearSearch();
  });
}

function useCountryCode(langCode) {
	if (langCode === "en") {
		return "us";
	} else {
		return langCode;
	}
}

function langSelector(q){
	//have this function run both getData functions
	//each needs new arguments to account for the language(s)
	let userLang = document.querySelector('input[name="user-language"]:checked').value;
	let foreignLang = document.querySelector('input[name="foreign-language"]:checked').value;
	
	getTranslationData(q, sortTranslationData, userLang, foreignLang);
	userLang = useCountryCode(userLang);
	console.log(userLang);
	getImageData(q, findImages, userLang);
}

$(readySearch);
