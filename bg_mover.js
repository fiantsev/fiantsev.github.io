$(document).ready(function(){
    var sensivity = -0.1;
    var theHeadBG = $("#header").children()[0];
    document.onmousemove = function(pEvent){
        var oldPosition = theHeadBG.style.backgroundPosition;
        var oldX, oldY;
        var newX, newY;
        if(oldPosition === "")
        {
            oldX = pEvent.clientX;
            oldY = pEvent.clientY;
        }
        else
        {
            oldX = parseFloat(oldPosition.split(" ")[0].replace("px",""));
            oldY = parseFloat(oldPosition.split(" ")[1].replace("px",""));
        }
        newX = oldX + pEvent.movementX*sensivity;
        newY = oldY + pEvent.movementY*sensivity;
        theHeadBG.style.backgroundPosition = `${newX}px ${newY}px`;
    };
});