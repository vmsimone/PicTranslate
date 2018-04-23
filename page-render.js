const PAGES = ['main', 'second', 'transForm', 'results']
let ACTIVE_PAGE = PAGES[0];

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

function readyApp() {
  $('#start-btn').on('click', function(){
    loadMain();
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

  changePage();
	getTranslationData(q, sortTranslationData, userLang, foreignLang);
	userLang = useCountryCode(userLang);
	console.log(userLang);
	getImageData(q, findImages, userLang);
}

function changePage() {
  switch(ACTIVE_PAGE) {
    case "main":
      $('input[name="user-language"]').on('change', function(){
        loadSecondLang();
      });
      ACTIVE_PAGE = PAGES[1];
      break;
    case "second":
      $('input[name="foreign-language"]').on('change', function(){
        loadForm();
      });
      ACTIVE_PAGE = PAGES[2];
      break;
    case "transForm":
      readySearch();
      ACTIVE_PAGE = PAGES[3];
      break;
    case "results":
      loadTranslationPage();
      break;
  }
}

function loadMain() {
  $('main').html(`
    <noscript>JavaScript is required for this page.</noscript>

    <div class="user-lang container col-5">

    	<h2>Select a language to translate <em>from</em>:</h2>
    	<form class="lang-picker">

    		<label for="English_ul">
    			<input type="radio" name="user-language" value="en"  id="English_ul"/>
    				<img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/1200px-Flag_of_the_United_Kingdom.svg.png"
    				alt="English" title="English">
    		</label>

    		<label for="Spanish_ul">
    			<input type="radio" name="user-language" value="es" id="Spanish_ul" />
    			<img src="https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Flag_of_Spain.svg/750px-Flag_of_Spain.svg.png"
    			alt="Spanish" title="Spanish">
    		</label>

    		<label for="French_ul">
    			<input type="radio" name="user-language" value="fr" id="French_ul" />
    			<img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/900px-Flag_of_France.svg.png"
    			alt="French" title="French">
    		</label>

    		<label for="Japanese_ul">
    			<input type="radio" name="user-language" value="ja" id="Japanese_ul" />
    			<img src="https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/900px-Flag_of_Japan.svg.png"
    			alt="Japanese" title="Japanese">
    		</label>

    		<label for="Chinese_ul">
    			<input type="radio" name="user-language" value="zh-CN" id="Chinese_ul" />
    			<img src="http://flaglane.com/download/chinese-flag/chinese-flag-graphic.png"
    			alt="Chinese" title="Chinese">
    		</label>

    		<label for="Korean_ul">
    			<input type="radio" name="user-language" value="ko" id="Korean_ul" />
    			<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/900px-Flag_of_South_Korea.svg.png"
    			alt="Korean" title="Korean">
    		</label>

    		</form>
    	</div>
    	<div class="col-2 empty-space">
    		<p></p>
    	</div>
  `);
  changePage();
}

//can use boolean argument for whether or not user is on mobile device

function loadSecondLang() {
  $('main').append(`
    <div class="foreign-lang container col-5">
      <h2>Select a language to translate <em>to</em>:</h2>
    <form action="#" class="lang-picker">

      <label for="English_fl">
        <input type="radio" name="foreign-language" value="en"  id="English_fl"/>
        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/1200px-Flag_of_the_United_Kingdom.svg.png"
        alt="English" title="English">
      </label>

      <label for="Spanish_fl">
        <input type="radio" name="foreign-language" value="es" id="Spanish_fl" />
        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Flag_of_Spain.svg/750px-Flag_of_Spain.svg.png"
        alt="Spanish" title="Spanish">
      </label>

      <label for="French_fl">
        <input type="radio" name="foreign-language" value="fr" id="French_fl" />
        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/900px-Flag_of_France.svg.png"
        alt="French" title="French">
      </label>

      <label for="Japanese_fl">
        <input type="radio" name="foreign-language" value="ja" id="Japanese_fl" />
        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/900px-Flag_of_Japan.svg.png"
        alt="Japanese" title="Japanese">
      </label>

      <label for="Chinese_fl">
        <input type="radio" name="foreign-language" value="zh-CN" id="Chinese_fl" />
        <img src="http://flaglane.com/download/chinese-flag/chinese-flag-graphic.png"
        alt="Chinese" title="Chinese">
      </label>

      <label for="Korean_fl">
        <input type="radio" name="foreign-language" value="ko" id="Korean_fl" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/900px-Flag_of_South_Korea.svg.png"
        alt="Korean" title="Korean">
      </label>

    </form>

    </div>

    <br>
    `);
    changePage();
}

function loadForm() {
  $('main').append(`
    <div class="col-4 empty-space">
      <p></p>
    </div>
    <div class="col-4">

    <h3>Type in your word here:</h3>
    <form action="#" name="trans-form" class="js-srch">
    <label for="query"></label>
    <input type="text" class="js-input" placeholder="e.g. 'Apple'">
    <button type="submit">Translate!</button>
    </form>
    <br>
    </div>
    `);
    changePage();
}

function loadTranslationPage() {
  $('main').html(`
    <div class="col-12 word-place"></div>
    <br>
    <div class="col-5 image-place-original"></div>
    <div class="col-2 empty-space"><p></p></div>
    <div class="col-5 image-place-new"></div>
    <br>

    <div class="col-4 empty-space">
      <p></p>
    </div>
    <div class="col-4">

    <h3>Translate another word! (same languages)</h3>
    <form action="#" name="trans-form" class="js-srch">
    <label for="query"></label>
    <input type="text" class="js-input" placeholder="e.g. 'Apple'">
    <button type="submit">Fast Translate!</button>

    <p>or</p>

    <label for="reset"></label>
    <button type="submit">Start over</button>
    </form>
    <br>
    </div>
    `);
}

function readyNewTransation() {
  $('main').html(``);
}

// function loadAppMobile() {
//   $('main').html(`
//     <div class="slider">
//       <div class="slide red">1</div>
//       <div class="slide blue">2</div>
//       <div class="slide orange">3</div>
//       <div class="slide black">4</div>
//     </div>
//
//     <div class="col-12 word-place"></div>
//     <br>
//     <div class="col-5 image-place-original"></div>
//
//     <div class="col-2 empty-space"><p></p></div>
//
//     <div class="col-5 image-place-new"></div>
//   `);
// }

$(readyApp);

// $('.lang-picker').slick({
//   arrows: false
// });
