REQURL = "https://astronomy-pic-of-the-day.herokuapp.com/api.json"
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
});