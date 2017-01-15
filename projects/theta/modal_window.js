CModalWindow = {};
CModalWindow.className = "CModalWindow";
CModalWindow.theWindow = null;
CModalWindow.GetWindow = function(pConfiguration, pCallbackFunction)
{
	if(!CModalWindow.theWindow)
		CModalWindow.theWindow = new CModalWindow.Create(pConfiguration, pCallbackFunction);
	CModalWindow.theWindow.Show(pConfiguration, pCallbackFunction);
	return CModalWindow.theWindow;
}

CModalWindow.Create = function(pConfiguration, pCallbackFunction)
{
	console.log("[CModalWindow]: opened");
	this.CallbackFunction = pCallbackFunction;
	this.configuration = pConfiguration;
	this.configuration.x = pConfiguration.x;
	this.configuration.y = pConfiguration.y;
	this.argsIn = this.configuration.args;
	this.argsOut = [];
	this.selfClass = CModalWindow;
	this.title = this.configuration.title || "";
	this.subtitle = this.configuration.subtitle || "";
	
	this.avatar = new CModalWindow.avatar.Create(this);
}
CModalWindow.avatar = {};
CModalWindow.avatar.Create = function(pOrigin)
{
	this.origin = pOrigin;
	this.image = CModalWindow.avatar.image.GetNew(this);
	this.image.aaa = {};
	this.image.aaa.avatar = this;
	document.body.appendChild(this.image);
}

CModalWindow.avatar.image = {};
CModalWindow.avatar.image.GetNew = function(pAvatar)
{
	var theUnderPlate = document.createElement("div");
	theUnderPlate.className = "ArgsUnderPlate";
	var theImage = document.createElement("div");
	theImage.className = "ArgsView"
		var theHeader = document.createElement("div"); 
		theHeader.className = "ArgsHeader";
			var theTitle = document.createElement("h3"); 
			theTitle.className = "ArgsTitle";
			theTitle.innerHTML = pAvatar.origin.title;
			var theSubTitle = document.createElement("h6"); 
			theSubTitle.className = "ArgsSubTitle";
			theSubTitle.innerHTML = pAvatar.origin.subtitle;
		theHeader.appendChild(theTitle);
		theHeader.appendChild(theSubTitle);
		
		var theMain = document.createElement("input"); 
		theMain.className = "ArgsMain";
		theMain.size = 100;
		
		var theFooter = document.createElement("div"); 
		theFooter.className = "ArgsFooter";
			var theYes = document.createElement("button"); 
			theYes.className = "ArgsYes";
			theYes.innerHTML = "YES";
			theYes.onclick = function()
			{
				var ans = {};
				ans.atoms = CModalWindow.theWindow.avatar.image.children[0].children[1].value;
				ans.x = CModalWindow.theWindow.configuration.x;
				ans.y = CModalWindow.theWindow.configuration.y;
				CModalWindow.theWindow.Hide();
				CModalWindow.theWindow.CallbackFunction(ans);
			}
			var theNo = document.createElement("button"); 
			theNo.className = "ArgsNo";
			theNo.innerHTML = "NO";
			theNo.onclick = function()
			{
				CModalWindow.theWindow.Hide();
			}
		theFooter.appendChild(theYes);
		theFooter.appendChild(theNo);
	theImage.appendChild(theHeader);
	theImage.appendChild(theMain);
	theImage.appendChild(theFooter);
	theUnderPlate.appendChild(theImage);
	return theUnderPlate;
}
CModalWindow.avatar.image.ArgsToView = function(pArgs)
{
	var theView = document.createElement("div");
	theView.className = "ArgsField";
		for(var iX=0; iX<pArgs.length; iX++)
		{
			var theBlock = document.createElement("div"); 
			theBlock.className = "ArgsBlock";
				var theLabel = document.createElement("input");
				theLabel.value = pArgs[iX];
				theLabel.readonly = true;
				theLabel.type = "text";
				theLabel.className = "ArgsLabel";
				var theValue = document.createElement("input");
				theValue.type = "text";
				theValue.className = "ArgsValue";
			theBlock.appendChild(theLabel);
			theBlock.appendChild(theValue);
			theView.appendChild(theBlock);
		}
	return theView;
}
CModalWindow.avatar.image.ViewToArgs = function()
{
	var argsOut = [];
	var blocks = CModalWindow.theWindow.children
	//for(var iX=0; iX<)
	//CModalWindow.theWindow.
}
CModalWindow.Create.prototype.Show = function(pConfiguration, pCallbackFunction)
{
	this.CallbackFunction = pCallbackFunction;
	this.configuration = pConfiguration;
	this.configuration.x = pConfiguration.x;
	this.configuration.y = pConfiguration.y;
	this.argsIn = this.configuration.args;
	this.argsOut = [];
	this.title = this.configuration.title || "";
	this.subtitle = this.configuration.subtitle || "";
	CModalWindow.theWindow.avatar.image.style.visibility = "visible";
}
CModalWindow.Create.prototype.Hide = function()
{
	console.log("[CModalWindow]: closed");
	CModalWindow.theWindow.avatar.image.children[0].children[1].value = "";
	CModalWindow.theWindow.avatar.image.style.visibility = "hidden";
}