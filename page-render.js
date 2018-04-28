//globals
let USER_LANG;
let FOREIGN_LANG;

function readySearch() {
  $('.js-srch').submit(event => {
    event.preventDefault();
    const input = $(event.currentTarget).find('.js-input');
    const query = input.val();
    langSelector(query);
    input.val('');
  });
}

function readyApp() {
  $('#start-btn, #js-reset').on('click', function() {
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

function langSelector(q) {
	//this function runs both getData functions
	//each needs multiple arguments to account for the language(s)
	USER_LANG = document.querySelector('input[name="user-language"]:checked').value;
	FOREIGN_LANG = document.querySelector('input[name="foreign-language"]:checked').value;

  getTranslationData(q, sortTranslationData, USER_LANG, FOREIGN_LANG);
  /*The language and country codes are not always the same, so this has to run AFTER
  the getTranslationData function*/
	USER_LANG = useCountryCode(USER_LANG);

	getImageData(q, findImages, USER_LANG);
  loadTranslationPage();
}

function loadMain() {
  $('main').html(`
    <div class="user-lang container col-5">
      <div class="card">
        <h2>Select a language to translate <em>from</em>:</h2>
        <form class="lang-picker">

          <label for="English_ul">
      			<input type="radio" name="user-language" value="en" id="English_ul"/>
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
    </div>

    <div class="col-2 empty-space">
    	<p></p>
    </div>

    <div class="foreign-lang container col-5"></div>

    <div class="col-4 empty-space">
      <p></p>
    </div>

    <div class="col-4 transForm"></div>
  `).hide().fadeIn();
  $('input[name="user-language"]').on('change', loadSecondLang);
}

function loadSecondLang() {
  let scrnWidth = $(document).width();

  if (scrnWidth < 640) {
    $('.user-lang').fadeOut(500);
  }

  $('.foreign-lang').html(`
    <div class="card">
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
    `).hide().delay(500).fadeIn();
  $('input[name="user-language"]').off('change', loadSecondLang);
  $('input[name="foreign-language"]').on('change', loadForm);
}

function loadForm() {
  $('.transForm').html(`
    <div class="card">
      <h3>Type in your word here:</h3>
      <form action="#" name="trans-form" class="js-srch">
        <label for="query"></label>
        <input type="text" class="js-input" placeholder="e.g. 'Apple'">
        <br><br>
        <button type="submit">Translate!</button>
      </form>
    </div>
    <br>
  `).hide().fadeIn();
  $('input[name="foreign-language"]').off('change', loadForm);
  readySearch();
}

function loadTranslationPage() {
  $('main').html(`
    <div class="col-12 word-place"></div>
    <br>

    <div class="row">
      <div class="col-5 image-place-original"></div>

      <div class="col-2 empty-space">
        <p></p>
      </div>

      <div class="col-5 image-place-new"></div>
    </div>

    <br>

    <div class="row">
      <div class="col-4 empty-space">
        <p></p>
      </div>

      <div class="col-4 reset">
        <form action="#" name="trans-form" class="js-restart">
          <label for="reset"></label>
          <button type="submit" id="js-reset">Start over</button>
        </form>
      </div>

      <div class="col-4 empty-space">
        <p></p>
      </div>
    </div>
    <br>
    `);
	readyApp();
}

$(readyApp);
