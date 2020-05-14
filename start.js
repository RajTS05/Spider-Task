if(localStorage.getItem('score')!=null)
{
  var score = localStorage.getItem('score');
  document.querySelector('main').innerHTML="<h1>Your Score: "  + score +  "</h1>"
}