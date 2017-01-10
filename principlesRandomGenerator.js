var principles = ["From heart", "Awesome", "About future", "Today is tomorrow", "Like pandas", "Just do it"];
$(document).ready(function(){
    var firstTime = true;
    var welcomeText = "TilliWilli";
    var currentPrinciples = Array.from(principles);
    $("#header h1")[0].onmouseenter = function(pEvent){
        if(firstTime)
        {
            firstTime = false;
            pEvent.target.innerHTML = welcomeText;
        }
        else
        {
            if(currentPrinciples.length === 0)
                currentPrinciples = Array.from(principles);
            var currIndex = parseInt(currentPrinciples.length*Math.random());
            pEvent.target.innerHTML = currentPrinciples[currIndex];
            currentPrinciples.splice(currIndex, 1);
            console.log(currentPrinciples);
        }
    }
});