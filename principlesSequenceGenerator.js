var principles = [
    "TilliWilli Production",
    "and <u>PandaHead</u> studio",
    "presents",
    "from heart",
    "awesome",
    // "About future",
    "Some Super Stuff",
    "wich will make ur day",
    "and it will",
    "be...",
    "<i class=\"em em-panda_face\"></i>The Panda Head",
    "<i class=\"em em-panda_face\"></i>Thx for watching",
    "<i class=\"em em-panda_face\"></i>One more time?"
    ];
$(document).ready(function(){
    var currentPrinciples = Array.from(principles);
    $("#header h1")[0].onmouseenter = function(pEvent){
        if(currentPrinciples.length === 0)
                currentPrinciples = Array.from(principles);
        var currIndex = 0;
        pEvent.target.innerHTML = currentPrinciples[currIndex];
        currentPrinciples.splice(currIndex, 1);
    }
});