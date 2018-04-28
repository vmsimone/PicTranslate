const GTRANS_URL = "https://translate.googleapis.com/translate_a/single?";

function foreignSearch(translatedQuery) {
	console.log(translatedQuery);
	let foreignLang = FOREIGN_LANG;
	getImageData(translatedQuery, findImages, foreignLang);
}

function sortTranslationData(data){
	console.log(data);
	let userWord = data[0][0][1];
	let translation = data[0][0][0];
	console.log(userWord + " = " + translation);
	$('.word-place').append(`

		<div class="col-5">
			<div class="card">
				<h3>${userWord}</h3>
			</div>
		</div>
		<div class="col-2">
			<div class="card">
				<p><span>translates to</span></p>
			</div>
		</div>
		<div class="col-5">
			<div class="card">
				<h3>${translation}</h3>
			</div>
		</div>

		`);
	getImageData(translation, findImages, FOREIGN_LANG);
}

function getTranslationData(searchTerm, callback, sourceLang, targetLang) {
	console.log('getTrans ran');
	console.log(`variables are ${searchTerm}, ${sourceLang}, and ${targetLang}`)
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
