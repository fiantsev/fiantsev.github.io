function RoundLink(pLabel, pFunction)
{
	var link = document.createElement("div");
	link.className = "RoundLink";
		var textContainer = document.createElement("span");
		textContainer.className = "TextContainer";
		textContainer.innerHTML = pLabel;
		textContainer.style.verticalAlign = "middle";
	link.appendChild(textContainer);
	link.onclick = function()
	{
		document.getElementsByClassName("MainMenu")[0].style.visibility = "hidden";
		document.getElementsByClassName("MainMenu")[0].style.zIndex = -11;
		pFunction();
	}
	return link;
}
function BackToMM(pLabel)
{
	var link = document.createElement("div");
	link.className = "BackToMM";
		var textContainer = document.createElement("span");
		textContainer.className = "TextContainerBack";
		textContainer.innerHTML = pLabel;
		textContainer.style.verticalAlign = "middle";
	link.appendChild(textContainer);
	link.onclick = function()
	{
		document.getElementsByClassName("MainMenu")[0].style.visibility = "visible";
		document.getElementsByClassName("MainMenu")[0].style.zIndex = 2;
	}
	return link;
}

function MainMenu(pURL)
{
	var mm = document.createElement("div");
	mm.className = "MainMenu";
	mm.style.backgroundImage = "url('"+pURL+"')";
		mm.appendChild(RoundLink("Load Offline", function(){CApplication.theApplication.RestoreState(CApplication.theApplication.LoadStateFromLocalStorage())}));
		mm.appendChild(RoundLink("Create New", function(){;}));
		mm.appendChild(RoundLink("Load File", function(){CApplication.theApplication.LoadStateFromFile()}));
		mm.appendChild(RoundLink("Load DB", function(){CApplication.theApplication.LoadStateFromDB()}));
		mm.appendChild(RoundLink("Load EDL", function(){CApplication.theApplication.LoadConstellationFromEDLFile()}));
		mm.appendChild(RoundLink("Load NL", function(){CApplication.theApplication.LoadConstellationFromNLFile()}));
		
		mm.appendChild(RoundLink("Save Offline", function(){CApplication.theApplication.SaveStateToLocalStorage(CEntity)}));
		mm.appendChild(RoundLink("*", function(){alert("Hey!")}));
		mm.appendChild(RoundLink("Save File", function(){CApplication.theApplication.SaveStateToFile(CEntity)}));
		mm.appendChild(RoundLink("Save DB", function(){CApplication.theApplication.SaveStateToDB(CEntity)}));
		mm.appendChild(RoundLink("Save EDL", function(){}));
		mm.appendChild(RoundLink("Save NL", function(){}));
	return mm;
}