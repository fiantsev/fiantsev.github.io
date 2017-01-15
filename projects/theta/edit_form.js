var CEditForm = {};
CEditForm.className = "CEditForm";
CEditForm.theForm = null;
CEditForm.zIndex = 128;
CEditForm.configuration = null;
CEditForm.CallbackFunction = null;
CEditForm.Visualize = function()
{
	var theImage = document.createElement("div");
	theImage.className = this.className;
	theImage.style.zIndex = this.zIndex;
		var name = document.createElement("input");
		name.type = "text";
		name.className = "CEditFormName";
		name.placeholder = "Entity name...";
		var specs = document.createElement("textarea");
		specs.className = "CEditFormSpecs";
		specs.placeholder = "Entity details...";
		var atomField = new CAtomField.Create().RenderHere();
		atomField.lastChild.placeholder = "new Atom";
		var controlPanel = document.createElement("div");
		controlPanel.className = "CEditFormControlPanel";
			var buttonYes = document.createElement("button");
			buttonYes.className = "CEditFormButtonYes";
			buttonYes.innerHTML = "OK";
			buttonYes.onclick = function(pEvent){CEditForm.Hide()};
			var buttonNo = document.createElement("button");
			buttonNo.className = "CEditFormButtonNo";
			buttonNo.innerHTML = "noOK";
			buttonNo.onclick = function(pEvent){CEditForm.Cancel()};
		controlPanel.appendChild(buttonYes);
		controlPanel.appendChild(buttonNo);
	theImage.appendChild(name);
	theImage.appendChild(specs);
	theImage.appendChild(atomField);
	theImage.appendChild(controlPanel);
	theImage.aaa = {};
	theImage.aaa.origin = this;
	this.theForm = theImage;
	CApplication.theScreen.appendChild(theImage);
}
CEditForm.Show = function(pConfiguration, pCallbackFunction)
{
	CHeadstone.Show();
	this.configuration = pConfiguration;
	if(!this.theForm)
		this.Visualize();
	this.Clear();
	if(pConfiguration)
	{
		this.theForm.children[0].value = pConfiguration.name || "";
		this.theForm.children[1].value = pConfiguration.specs || "";
		var atomField = this.theForm.children[2].aaa.origin;
		if(pConfiguration.atoms)
			for(var iX=0; iX<pConfiguration.atoms.length; ++iX)
				atomField.AddAtom(pConfiguration.atoms[iX]);
		this.CallbackFunction = pCallbackFunction;
	}
	this.theForm.children[0].focus();
	this.theForm.style.visibility = "visible";
}
CEditForm.Hide = function()
{
	this.theForm.style.visibility = "hidden";
	CHeadstone.Hide();
	this.CallbackFunction(this.GatherResult());
}
CEditForm.Cancel = function()
{
	this.theForm.style.visibility = "hidden";
	CHeadstone.Hide();
}
CEditForm.Clear = function()
{
		this.theForm.children[0].value = "";
		this.theForm.children[1].value = "";
		this.theForm.children[2].aaa.origin.DeleteAtoms();
}
CEditForm.GatherResult = function()
{
	var _result = {};
	_result.theEntity = this.configuration.theEntity;
	_result.x = this.configuration.x;
	_result.y = this.configuration.y;
	_result.name = this.theForm.children[0].value;
	_result.specs = this.theForm.children[1].value;
	_result.atoms = this.theForm.children[2].aaa.origin.GetAtoms().join("!");
	return _result;
}