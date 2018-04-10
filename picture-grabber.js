const KEY = "AIzaSyD8zWKL40wAK4H694xGTGB7OyoluvILxV4";
const SEARCH_ID = "016997435643568742287:j2dl6nqzf9c";

const GIMAGE_SRCH = "https://www.googleapis.com/customsearch/v1";

//may need global for country code

/*for testing https://www.googleapis.com/customsearch/v1?
key=AIzaSyD8zWKL40wAK4H694xGTGB7OyoluvILxV4&cx=016997435643568742287:j2dl6nqzf9c
&q=animals&callback=SearchCompleted*/


function getImageData(searchTerm, callbackFunc, countryPref){
	const settings = {
    url: GIMAGE_SRCH,
    data: {
		'key': `${KEY}`,
		'num': '3',
		'defaultToImageSearch': true,
		'gl': countryPref,
		'cx': `${SEARCH_ID}`,
		'q': searchTerm
    },
    dataType: 'json',
    type: 'GET',
    success: callbackFunc
  };

	$.ajax(settings);
}

function findImages(data) {
	//get the pics
	console.log('findImages ran');
	console.log(data);
	let imgAlt = data.items[0].title;
	let imgSrc = data.items[0].pagemap.cse_image[0].src;
	//temporary solution
	if (imgSrc === undefined) {
		 imgSrc = data.items[1].pagemap.cse_image[0].src;
	}
	//let imgSrc = srcExtractor(gLink);
	console.log(imgSrc);
	postImages(imgAlt, imgSrc);
}

function postImages(alt, src) {
	//post the pics
	console.log('images posting');
	let pictureResult = `
		<div class="visual-aid">
			<a href="#">
				<img src="${src}" alt="${alt}"/>
			</a>
		</div>
		`;
	$('.image-place').append(pictureResult);
}

function checkWorking(data) {
	console.log('Well, the callback function ran at least');
	console.log(data);
}
