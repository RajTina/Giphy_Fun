

//var babyArray = ['funny baby','dancing baby','crying baby'];

var babyArray = [
    {
        name: "funny baby",
        currentState: "data-still",
        imageStill: "",
        imageAnimate: "",
       
    },
    {
        name: "dancing baby",
        currentState: "data-still",
        imageStill: "",
        imageAnimate: "",
        backgroundImage: ""

    },
    {
        name: "crying baby",
        currentState: "data-still",
        imageStill: "",
        imageAnimate: "",
        backgroundImage: ""

    },

    {   name: "scared baby",
        currentState: "data-still",
        imageStill: "",
        imageAnimate: "",
        backgroundImage: ""
}
];

//function populateButtons(babyArray,classToAdd,areaToAddTo){
//     $(areaToAddTo).empty();
//     for ( var i = 0; i<babyArray.length; i++){
//         var a =$('<button>');
//         a.addClass(classToAdd);
//         a.attr('data-type',babyArray[i]);
//         a.text(babyArray[i]);
//         $(areaToAddTo).append(a);


 var imageStill = "";
 var imageAnimate = "";
//  funciton for creating buttons
function createButtons() {

    $("#buttonsSpace").empty();

    for (var i = 0; i < babyArray.length; i++) {
        var b = $("<button>");

        b.addClass("btn btn-info Baby-buttons");

        b.text(babyArray[i].name);

        b.attr("data-character", babyArray[i].name);

        $("#buttonsSpace").append(b);
    }
}

createButtons();

function isDuplicate(currentCharacter){
    for(var y=0;y<babyArray.length;y++)
    {
        if(babyArray[y].name === currentCharacter ){
            return true;
        }else{
            return false;         
    }
    }
}
$("#addButtons").on("click", function (event) {
    // Preventing the buttons default behavior when clicked (which is submitting a form)
    event.preventDefault();
    // This line grabs the input from the textbox
    var character = $("#search-input").val().trim();

    if(character!=="" && !isDuplicate(character)) {

        var obj = { name: character, currentState: "data-still", imageStill: "", imageAnimate: "" };

        babyArray.push(obj);

        // Calling createButtons that will process the array
        createButtons();
    }
});

// this function will display the gifs
function displayBabies() {

    var baby = $(this).attr("data-character");
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=JbAze3Bq2K81GsPhzV1gSBiyZyA2vR38&q=" + baby +
     "&limit=10&offset=0&rating=PG-13&lang=en";

    $.ajax({
        url: queryURL,
        method: "GET"
    })

    .then(function (response) {
        // we are going to get data from queryURL.
        var results = response.data;

       // console.log(results);
        //console.log($(this).attr("data-character"));
        //console.log("rating : " + results[0].rating);
        //console.log(results);

        //clear any previous images
        $(".searches").empty();
        for (var j = 0; j < results.length; j++) {
            if (results[j].rating !== "r" && results[j].rating !== "pg-13") {
                var babyImage = $("<img>");

                babyImage.attr("src", results[j].images.fixed_height_still.url);
                babyImage.attr("data-state", "data-still");

                 //console.log("index : " + babyArray.indexOf(baby));

                
                babyImage.attr("data-still", results[j].images.fixed_height_still.url);
                babyImage.attr("data-animate", results[j].images.fixed_height.url);
                babyImage.attr("id", baby);
                babyImage.addClass("searches");

                $(".searches").prepend(babyImage);
                 $(".Baby-buttons").css('background-image', 'url(' + results[j].images.fixed_height_still.url + ')');
                // $("body").css('background-size', '100%');

            }
        }
    })
}
function imageClick() {
    var currentImage = ($(this));

    var currentStateAttr = $(this).attr("data-state");

    //console.log("currentStateAttr : " + currentStateAttr);

    imageStill = currentImage.attr("data-still");
    imageAnimate = currentImage.attr("data-animate");

    if (currentStateAttr == "data-still") {
        currentImage.attr("src", $(this).attr("data-animate"));
        currentImage.attr("data-state", "data-animate");
    } else {
        currentImage.attr("src", $(this).attr("data-still"));
        currentImage.attr("data-state", "data-still");
    }


}

$(document).on("click", ".Baby-buttons", displayBabies);
$(document).on("click", ".searches", imageClick);
