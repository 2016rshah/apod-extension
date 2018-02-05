/*REQURL = "https://astronomy-pic-of-the-day.herokuapp.com/api.json"
resObject = {}
function setImage(res){
  var resultURL = res.url
  var image = document.getElementById("image")
  var img = document.createElement('img');
  img.src = resultURL
  img.setAttribute('alt', "yolo");
  image.appendChild(img)
}
function setTitle(res){
  var title = res.title
  $("#title").html(title)
}
function setExplanation(res){
  var explanation = res.explanation
  $("#explanation").html(explanation)
}
document.addEventListener('DOMContentLoaded', function () {
  $.ajax({ url: REQURL, success: function(result){
    resObject = result
    setImage(result)
    setTitle(result)
    setExplanation(result)
  }});


  $("#image").click(function(){
    $("#explanation").toggle()
  })
});*/

function loadAPOD(url) {
  $.ajax({
    url: url,
    success: function(result){
    if("copyright" in result) {
      $("#copyright").text("Image Credits: " + result.copyright);
    }
    else {
      $("#copyright").text("Image Credits: " + "Public Domain");
    }

    if(result.media_type == "video") {
      $("#apod_img_id").css("display", "none");
      $("#apod_vid_id").attr("src", result.url);
    }
    else {
      $("#apod_vid_id").css("display", "none");
      $("#apod_img_id").attr("src", result.url);
      $("#apod_img_id").attr("alt", result.url);
    }
    //$("#reqObject").text(url);
    //$("#returnObject").text(JSON.stringify(result, null, 4));
    $("#apod_explaination").text(result.explanation);
    $("#apod_title").text(result.title);
    $("#date").text(result.date);
    if (days == 0) {
      document.getElementById("nextButton").style.display = "none";
    } else {
      document.getElementById("nextButton").style.display = "inline";
    }
  }
  });

}

var url = 'https://api.nasa.gov/planetary/apod?api_key=f88nlByrAKllCaklW1AtfDuqiAUKAinSni0EcjhW';
loadAPOD(url);

var days = 0;

function getYesterdaysDate() {
    var date = new Date();
    date.setDate(date.getDate()+days);
    date = moment(date).format('YYYYMMDD');
    date = date.split('');
    console.log(date);
    date.splice(4, 0, "-");
    date.splice(7, 0, "-");
    return date.join("");
    //return date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear();
    //return date.getFullYear() + '-' + (date.getMonth()+1) + '/' + date.getDate();
}

document.getElementById("backButton").addEventListener("click", function(){
  days = days - 1;
  url = 'https://api.nasa.gov/planetary/apod?date=' + getYesterdaysDate() + '&api_key=f88nlByrAKllCaklW1AtfDuqiAUKAinSni0EcjhW';
  loadAPOD(url);
});
document.getElementById("nextButton").addEventListener("click", function(){
  days = days + 1;
  url = 'https://api.nasa.gov/planetary/apod?date=' + getYesterdaysDate() + '&api_key=f88nlByrAKllCaklW1AtfDuqiAUKAinSni0EcjhW';
  loadAPOD(url);
});

$(document).ready(function(){
   $('body').on('click', 'a', function(){
     chrome.tabs.create({url: $(this).attr('href')});
     return false;
   });
});
