var CHeadstone = {};
CHeadstone.className = "CHeadstone";
CHeadstone.theHeadstone = null;
CHeadstone.zIndex = 127;
CHeadstone.Visualize = function()
{
	var theImage = document.createElement("div");
	theImage.className = this.className;
	theImage.style.zIndex = this.zIndex;
	this.theHeadstone = theImage; 
	CApplication.theScreen.appendChild(theImage);
}
CHeadstone.Show = function()
{
	if(!CHeadstone.theHeadstone)
		this.Visualize();
	this.theHeadstone.style.visibility = "visible";
}
CHeadstone.Hide = function()
{
	this.theHeadstone.style.visibility = "hidden";
}