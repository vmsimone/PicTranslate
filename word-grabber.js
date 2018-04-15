const GTRANS_URL = "https://translate.googleapis.com/translate_a/single?";

function sortTranslationData(data){
	let userWord = data[0][0][1];
	let translation = data[0][0][0];
	$('.word-place').append(`The word "${userWord}" translates to "${translation}"`);
}

	function getTranslationData(searchTerm, callback, sourceLang, targetLang) {
  const settings = {
    url: GTRANS_URL,
    data: {
		'client' : 'gtx',
		'sl' : sourceLang,
		'tl' : targetLang,
		'dt' : 't',
		'q' : searchTerm
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };

  $.ajax(settings);
}
