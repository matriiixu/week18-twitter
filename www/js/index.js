var auth_result = null; //stores authentication key of user 

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    
    console.log("DeviceReady");
    
    //setup listner for search button
    $(document).on("click", "#searchButton", search);
    
    
	//need to initialise OAuth here
	//OAuth.initialize('public-key-goes-here');
    OAuth.initialize('RN_7Mu_Y0881qIJvDEqyChZJokw');
    console.log(OAuth.getVersion());
    //authorise
	OAuth.popup('twitter').done(function(result) {
         
        //authorisation successful 
        console.log(result);
        auth_result = result;
    
    }).fail(function (err) {
      console.log("oh dear: " + err);
    });

}


function search() {
    
    console.log("Search");
	
	   
    //need to get the search terms from the text box in HTML
    var search_terms = document.getElementById('searchTerms').value;

    //create an URL for the REST API call
	//The first bit of the url  - https://api.twitter.com - will automatically be included
	//so we just need the endpoint
    var url = "/1.1/search/tweets.json?q=" + search_terms;
		
    //need to ensure that the URL is proberly encoded.
    url = encodeURI(url);
	
		
    auth_result.get(url).done(
			
        function(data) {
		
                //its worked - do something with the resultant data
            $("#tweetList").empty();
        
			//populate list
			for(index =0; index<data.statuses.length; index++) {
				$("#tweetList").append("<li>" + data.statuses[index].text + "</li>");
			}
        
            $("#tweetList").listview('refresh');
		
    }).fail(
            
        function(err) {
  		
			     //Oh nos! Search broken
			
        });
    
}





