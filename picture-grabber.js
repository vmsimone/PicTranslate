const KEY = "AIzaSyD8zWKL40wAK4H694xGTGB7OyoluvILxV4";
const SEARCH_ID = "016997435643568742287:j2dl6nqzf9c";

const GIMAGE_SRCH = "https://www.googleapis.com/customsearch/v1";

/*for testing https://www.googleapis.com/customsearch/v1?key=AIzaSyD8zWKL40wAK4H694xGTGB7OyoluvILxV4&cx=016997435643568742287:j2dl6nqzf9c&q=animals&callback=SearchCompleted*/


function getImageData(searchTerm, callbackFunc){
	const settings = {
    url: GIMAGE_SRCH,
    data: {
		'key': `${KEY}`,
		'num': '10',
		'cx': `${SEARCH_ID}`,
		//'start': something,
		'q': searchTerm,
		//'callback': 'SearchCompleted' //remove when finished testing
		//replace with needed api stuff
    },
    dataType: 'json',
    type: 'GET',
    success: callbackFunc
  };

	$.ajax(settings);
}

function srcExtractor(url) {
	let idNum = url.slice(30, -5);
	return `http://www.gstatic.com/hostedimg/${idNum}_large`;
}

function findImages(data) {
	//get the pics
	console.log('findImages ran');
	console.log(data);
	let imgAlt = data.items[1].title;
	let gLink = data.items[1].formattedUrl;
	let imgSrc = srcExtractor(gLink);
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
