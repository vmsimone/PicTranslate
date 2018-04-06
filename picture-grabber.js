const KEY = "AIzaSyD8zWKL40wAK4H694xGTGB7OyoluvILxV4";
const SEARCH_ID = "016997435643568742287:j2dl6nqzf9c";

const GIMAGE_SRCH = "https://www.googleapis.com/customsearch/";

/*for testing https://www.googleapis.com/customsearch/v1?
key=AIzaSyD8zWKL40wAK4H694xGTGB7OyoluvILxV4&
cx=016997435643568742287:j2dl6nqzf9c
&q=animals& callback=SearchCompleted*/


function getImageData(searchTerm, callback){
	const settings = {
    url: GIMAGE_SRCH,
    data: {
		'key': `${KEY}`,
		'num': '10',
		'cx': `${SEARCH_ID}`,
		//'start': something,
		'q': searchTerm
		//replace with needed api stuff
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };

  $.ajax(settings);
}

function findImages() {
	//get the pics
	//JSON
}

function postImages() {
	//post the pics
	let renameThisVar = `
		<div class="visual-aid">
			<a href="[google search results]">
				<img src="[nth image]" name="[image desc]"/>
			</a>
		</div>
		`;
	$('.image-place').append(renameThisVar);
}

function checkWorking(data) {
	console.log(data);
}
