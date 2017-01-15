var CUI = {};
//
//Main Menu
//
CUI.theMainMenu = null;
CUI.CreateMainMenu = function()
{
	var theImage = document.createElement("div");
	theImage.className = "CMainMenu";
	theImage.appendChild(CUI.CreateMenuItem("Clear", function(){/*Nothing*/;}));
	theImage.appendChild(CUI.CreateMenuItem("New", function(){/*Nothing*/;}));
	theImage.appendChild(CUI.CreateMenuItem("Load", function(){

	}));
	theImage.appendChild(CUI.CreateMenuItem("Save", function(){}));
	CUI.theMainMenu = theImage;
	return theImage;
};
CUI.ShowMainMenu = function()
{
	CUI.theMainMenu.style.visibility = "visible";
};
CUI.HideMainMenu = function()
{
	CUI.theMainMenu.style.visibility = "hidden";
};
//
//Menu List
//
CUI.theMenuList = null;
CUI.CreateMenuList = function(pItems, pX, pY)
{
	var theImage = document.createElement("div");
	theImage.className = "CMenuList";
	theImage.left = pX;
	theImage.top = pY;
	for(var iX=0; iX<pItems.length; ++iX)
	{
		theImage.appendChild(pItems[iX]);
	}
	CUI.theMenuList = theImage;
	return theImage;
};
//
//
//
CUI.CreateMenuItem = function(pLabel, pFunction, pTerminate)
{
	pTerminate = pTerminate || true;
	var theImage = document.createElement("div");
	theImage.className = "CMenuItem";
		var textContainer = document.createElement("span");
		textContainer.className = "CMenuItemText";
		textContainer.style.verticalAlign = "middle";
		textContainer.innerHTML = pLabel;
	theImage.appendChild(textContainer);
	if(pTerminate)
	{
		theImage.onmouseover = function()
		{
			if(CUI.theMenuList)
			{
				CUI.theMenuList.parentNode.removeChild(CUI.theMenuList);
				CUI.theMenuList = null;
			}
		};
		theImage.onclick = function()
		{
			if(CUI.theMenuList)
			{
				CUI.theMenuList.parentNode.removeChild(CUI.theMenuList);
				CUI.theMenuList = null;
			}
			CUI.HideMainMenu();
			pFunction();
		};
	}
	else
	{
		theImage.onclick = function()
		{
			if(CUI.theMenuList)
			{
				CUI.theMenuList.parentNode.removeChild(CUI.theMenuList);
				CUI.theMenuList = null;
			}
			CUI.HideMainMenu();
			pFunction();
		};
	}
	return theImage;
};

CUI.OpenMenuList = function()
{

};
CUI.CloseMenuList = function()
{

};