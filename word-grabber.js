const GTRANS_URL = "#";

function getTranslationData(){
	//JSON grabber
}

	function getData(searchTerm, callback) {
  const settings = {
    url: GTRANS_URL,
    data: {
		//fill this in
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };

  $.ajax(settings);
}
