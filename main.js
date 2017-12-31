
$(document).on("click", "#searchButton", function () {

    $("#spot1").empty();

    var applicationKey = "f336283acac5b1fd24ac4727379750f9";
    var applicationID = "0398ef47";
    var searchTerm = $("#searchTerm").val();
    var range = '&from=0&to=1';
    console.log(searchTerm);
    var queryURL = 'https://api.edamam.com/search?q=' + searchTerm + '&app_id=' + applicationID + '&app_key=' + applicationKey + range;


    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        console.log(response)

        for (var i = 0, n = response.hits.length; i < n; i++) {
            var imageDisplay = response.hits[i].recipe.image;
            $("#spot1").append('<img src=' + imageDisplay + '><br><br>');
            var label = response.hits[i].recipe.label;
            var siteUrl = response.hits[i].recipe.url;
            var modalButton = $('<button class="modalButton" site="' + siteUrl + '">OpenUrl</button>');

            $("#spot1").append(modalButton);
            // playVideo(videoSearch);
        }
    })
})

function playVideo(searchTerm) {

    var ytAPIKey = 'AIzaSyD6PlwA6w_Ek0A8IBNNE2rBEkXKXzr2hhE';
    $.ajax({
        url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=' + ytAPIKey + '&maxResults=20&videoEmbeddable=true&relevanceLanguage=en&q=' + searchTerm,
        type: 'GET'
    })
        .done(function (response) {
            var videoDiv = $('<div class="videoDiv">');
            videoDiv.append('<iframe width="1102" height="620" src="https://www.youtube.com/embed/' + response.items[0].id.videoId + '" frameborder="0" allowfullscreen></iframe>')
            $('#spot1').append(videoDiv);
        })
        .fail(function () {
            console.log("video error");
        });
}

$(document).on("click", ".modalButton", function () {
    var siteUrl = $(this).attr("site");
    openUrl(siteUrl);
})

function openUrl(siteUrl) {

    console.log("siteUrl: " + siteUrl);

    var $dialog = $('<div></div>')
        .html('<iframe style="border: 0px; " src="' + siteUrl + '" width="50%" height="50%"></iframe>')
        .dialog({
            autoOpen: false,
            modal: true,
            height: 625,
            width: 500,
            title: "Some title"
        });
    $dialog.dialog('open');


}