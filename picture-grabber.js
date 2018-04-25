const KEY = "AIzaSyD8zWKL40wAK4H694xGTGB7OyoluvILxV4";
const SEARCH_ID = "016997435643568742287:j2dl6nqzf9c";
const GIMAGE_SRCH = "https://www.googleapis.com/customsearch/v1";

//easiest way to post images in separate places. Used exclusively in postImages function
let firstImagePost = true;

function getImageData(searchTerm, callbackFunc, countryPref){
	console.log(countryPref);
	const settings = {
    url: GIMAGE_SRCH,
    data: {
		'key': `${KEY}`,
		'num': '10',
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

function postImages(alt, src) {
	//post the pics
	if (src === undefined) {
		src = "https://www.absolutefencinggear.com/shopping/images/Not_available.jpg";
	}
	console.log('images posting');
	let pictureResult = `
		<div class="visual-aid">
			<a href="#">
				<img src="${src}" alt="${alt}"/>
			</a>
		</div>
		`;
	if (firstImagePost === true) {
		currentImgLocation = "original";
	} else {
		currentImgLocation = "new";
	}
	$(`.image-place-${currentImgLocation}`).append(pictureResult);
	firstImagePost = !firstImagePost;
}

function findImgSrc(array) {
	if (array === undefined) {
		return undefined;
	}
	for (i=0; i < array.length; i++) {
		imgSrc = array[i].pagemap.cse_image[0].src;
		if (imgSrc !== undefined) {
			return imgSrc;
		}
	}
}

function findImages(data) {
	//get the pics
	let imgAlt = data.items[0].title;
	let imgSrc = undefined;
	imgSrc = findImgSrc(data.items);
	
	//let imgSrc = srcExtractor(gLink);
	postImages(imgAlt, imgSrc);
}
