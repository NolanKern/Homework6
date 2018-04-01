$(document).ready(function() {

$(".dropdown-menu li a").click(function(){
    // Gets name of Game from dropdown button and stores value
    var selText = $(this).attr('data-value');

    // Display text for what button was clicked
    $(".gifText").empty();
    $(".gifText").html("<h1>You selected to look at <i><u>"+selText+"</i></u> gifs</h1>"+"<br>"+"Please click on the images to animate them.");

	//Configures the URL needed to access the correct Giphy JSON
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + selText + "&api_key=dc6zaTOxFJmzC&limit=10";

	//Clears previous query so it can be populated by next 
	$('.gifHolder').empty();
		
	//Ajax call to get info from GIPHY
	$.ajax({url: queryURL, method: 'GET'}).done(function(response) {
		//Shorten neccessary refrence to shorten code
		var results = response.data;

		//Runs through results and performs actions to each of them
        for (i = 0; i < results.length; i++) {
            //Creates a div for each of the returned gifs
            var gifDiv = $('<div class="gif">')

            //Capitalizes the rating and sets it to N/A if there is no rating
            var rating = results[i].rating.toUpperCase();
            if(rating == "") {
                rating = "N/A";
            }

            //Creates display for the gif and its rating with the gif starting as still
            var ratingText = $('<p>').text("Rating: " + rating);
            var gameImage = $('<img src=' + results[i].images.fixed_height_still.url + ' data-still=' +
                results[i].images.fixed_height_still.url + ' data-animate=' +
                results[i].images.fixed_height.url + ' data-state="still" class="gameImage"> float="left"');

            //Appends the visuals to gifDiv
            gifDiv.append(ratingText);
            gifDiv.append(gameImage);

            //Appends each gif to gifHolder
            $('.gifHolder').append(gifDiv);
        }

		});
  });



    //Enables the toggle of the gifs from on to off
    function imageToggle() {
    //Sets state to represent the data-state of the target gif
    var state = $(this).attr('data-state');

    //Switches the source to the animate/still state depending on what it is currently at
    if(state == 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }
    else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
    }

    $(document).on('click', '.gameImage', imageToggle);


	//Sets up the buttons and form when the page loads
	buttonAdder();



//Ask about code below

  // passes in new Button Name and appends the new search term to the dropdown menu
  function buttonAdder() {
    // on clicking the span button
    $('#addGame').on('click', function(){
        //Gets the value in the text input field
        var typed = $('.form-control').val().trim();

        $('.form-control').empty();
        console.log("im here 1")

        // adds the typed text to the drop down bar 
        $(".dropdown-menu").append("<button class='btn dropdown-toggle btn-select' data-value=" + typed + ">" + typed + "</button>");

        // var select = $('#servingSizeUnits').clone().attr('id',$('#servingSizeUnits').attr('id')+count).attr('name',$('#servingSizeUnits').attr('name')+count); 
        // $("z").append(select);
    })
}

});

