function ToogleMusic()
{
    if($("#musicOff").css("visibility") === "hidden")
    {
        $("#musicOn").css("visibility", "hidden");
        $("#musicOff").css("visibility", "visible");
        $("#theMusic")[0].pause();
    }
    else
    {
        $("#musicOn").css("visibility", "visible");
        $("#musicOff").css("visibility", "hidden");
        $("#theMusic")[0].play();
    }
}
function StartAutoPlayMusic(pVolumeDelta, pTimeDelta)
{
    pVolumeDelta = pVolumeDelta?pVolumeDelta:0.03;
    pTimeDelta = pTimeDelta?pTimeDelta:100;
    var startVolume = 0.0;
    var endVolume = 0.9;
    var fadeOnTimer;
    var theMusic = $("#theMusic")[0];
    theMusic.volume = startVolume;
    theMusic.play();
    fadeOnTimer = setInterval(function(){
        startVolume += pVolumeDelta;
        if(startVolume >= endVolume)
        {
            startVolume = endVolume;
            clearInterval(fadeOnTimer);
        }
        theMusic.volume = startVolume;
    }, pTimeDelta);
}
function GotoFacebook()
{
    window.location.href = "https://www.facebook.com/fiantsev.sergey";
}
function GotoVK()
{
    window.location.href = "https://vk.com/tilliwilli";
}
function GotoInstagram()
{
    window.location.href = "https://www.instagram.com/thetilliwilli/";
}
function GotoEMail()
{
    window.location.href = "mailto:tilliwilli@gmail.com";
}