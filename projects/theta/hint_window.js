CHintWindow = {};
CHintWindow.image = null;
CHintWindow.Show = function(pConfiguration)
{
	if(this.image)
		this.image.parentNode.removeChild(this.image);
	
	var theImage = document.createElement("div");
	theImage.className = "HintWindow";
		var theHeader = document.createElement("div"); 
		theHeader.className = "HintHeader";
		theHeader.innerHTML = pConfiguration.title || "Entity";
		var theUnderHeader = document.createElement("div"); 
		theUnderHeader.className = "HintUnderHeader";
		theUnderHeader.innerHTML = pConfiguration.subtitle || "";
		var theList = document.createElement("div");
		theList.className = "HintList";
			var args = pConfiguration.args;
			for(var iX=0; iX<args.length; iX++)
			{
				var theItem = document.createElement("div");
				theItem.className = "HintItem";
				theItem.innerHTML = args[iX];
				theList.appendChild(theItem);
			}
	theImage.appendChild(theHeader);
	theImage.appendChild(document.createElement("hr"));
	theImage.appendChild(theUnderHeader);
	theImage.appendChild(document.createElement("hr"));
	theImage.appendChild(theList);
	this.image = theImage;
	document.body.appendChild(this.image);
	var dimensions = theImage.getBoundingClientRect();
	if(window.innerWidth < (pConfiguration.x + dimensions.width))
		theImage.style.left = (-20 + window.innerWidth - dimensions.width) + "px";
	else
		theImage.style.left = pConfiguration.x + "px";
	if(window.innerHeight < (pConfiguration.y + dimensions.height))
		theImage.style.top = (-20 + window.innerHeight - dimensions.height) + "px";
	else
		theImage.style.top = 15 + pConfiguration.y + "px";
	this.image.style.visibility = "visible";
}
CHintWindow.Hide = function()
{
	this.image.style.visibility = "hidden";
}
