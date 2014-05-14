/**
 * Created by or on 5/3/14.
 */
function replaceBrowserContents (elm){
    var thisFolder = elm;
    $.ajax({
        url: "/contents",
        type: "get",
        context: thisFolder,
        data: {'thisFolder': thisFolder},
        contentType: 'application/json',
        dataType: 'json',
        success: function successCallback (result){
            $('p').detach();
            var lastFolder = document.createElement("p");
            var lastFolderText = thisFolder.substring(0, thisFolder.lastIndexOf("/"));
            $(lastFolder).append(lastFolderText);
            $(lastFolder).addClass('row');
            $(lastFolder).css('color', 'green');
            $('.contents').prepend(lastFolder);
            for(var key in result){
                if(result.hasOwnProperty(key)){
                    var newContent = document.createElement("p");
                    $(newContent).append(key);
                    if(result[key]){
                        $(newContent).addClass('row');
                        $(newContent).css('color', 'blue');
                    }
                    $('.contents').append(newContent);
                }
            }
        }
    });
}
$(document).ready(function (){
    replaceBrowserContents("/home"); // change this to a local folder.
    $('.contents').on('click', '.row', function(){
        var thisElement = $(this).text();
        replaceBrowserContents(thisElement);
    })
});
