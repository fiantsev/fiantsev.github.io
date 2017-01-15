var ESTATES = 
{
	DEFAULT : 0,
	DELETED : 1,
}
//
//CEntity - model (business logic) in MVC classification
//
var CEntity = {};
CEntity.className = "CEntity";
CEntity.heap = [];
CEntity.id = 0;
CEntity.PreSerialize = function()
{
	var allEntities = [];
	for(var iX=0; iX<CEntity.heap.length; iX++)
		if(CEntity.heap[iX].state !== ESTATES.DELETED)
			allEntities.push(CEntity.heap[iX].PreSerialize());
	return allEntities;
}
CEntity.Serialize = function()
{
	var allEntities = [];
	for(var iX=0; iX<CEntity.heap.length; iX++)
		if(CEntity.heap[iX].state !== ESTATES.DELETED)
			allEntities.push(CEntity.heap[iX].PreSerialize());
	return JSON.stringify(allEntities);
}
//
//CEntity constructor
//
CEntity.Create = function(pName, pSpecs, pAtoms, pX, pY, pRadius)
{
	var atomsArray = pAtoms.split("!");
	this.id = (CEntity.id)++;
	this.name = pName || CEntity.className + this.id;
	this.specs = pSpecs || "";
	//console.log(theScreen.avatar.image.viewBox.baseVal.y);
	this.x = (pX)/CMedium.heap[0].avatar.image.getScreenCTM().a + theScreen.avatar.image.viewBox.baseVal.x;
	this.y = (pY)/CMedium.heap[0].avatar.image.getScreenCTM().a + theScreen.avatar.image.viewBox.baseVal.y;
	this.radius = pRadius || 15;
	this.state = ESTATES.DEFAULT;
	this.atoms = [];
	for(var iX=0; iX<atomsArray.length; iX++)
		if(atomsArray[iX] !== "")
			this.atoms.push(atomsArray[iX]);
	this.relations = [];
	this.selfClass = CEntity;
	this.avatar = new CEntity.avatar.Create(this);
	CEntity.heap.push(this);
}
CEntity.Create.prototype.Destroy = function()
{
	;//do nothing
}
CEntity.Create.prototype.Delete = function()
{
	this.state = ESTATES.DELETED;
	for(var iX=0; iX<this.relations.length; iX++)
	{
		this.relations[iX].Delete();
	}
	//this.Destroy();
}
CEntity.Create.prototype.PreSerialize = function()
{
	var result = {};
	result.x = this.avatar.x;
	result.y = this.avatar.y;
	result.radius = this.radius;
	result.name = this.name;
	result.specs = this.specs;
	result.atoms = this.atoms;
	return result;
}
CEntity.Create.prototype.Serialize = function()
{
	var result = {};
	result.x = this.avatar.x;
	result.y = this.avatar.y;
	result.radius = this.radius;
	result.name = this.name;
	result.specs = this.specs;
	result.atoms = this.atoms;
	return JSON.stringify(result);
}

CEntity.Create.prototype.Edit = function(pName, pSpecs, pAtoms)
{
	var atomsArray = pAtoms.split("!");

	this.name = pName || CEntity.className + this.id;
	this.specs = pSpecs || "";
	this.atoms = [];
	for(var iX=0; iX<atomsArray.length; iX++)
		if(atomsArray[iX] !== "")
			this.atoms.push(atomsArray[iX]);
	
	CRelation.BreakAll(this);
	CRelation.RecalculateAllAgainst(this);
}

//
//CEntity.avatar - controller in MVC classification
//
CEntity.avatar = {};
//CEntity.avatar.Create - constructor for CEntity.avatar
CEntity.avatar.Create = function(pOrigin)
{
	this.origin = pOrigin;
	this.x = pOrigin.x || 0;
	this.y = pOrigin.y || 0;
	this.radius = pOrigin.radius;
	this.name = pOrigin.name;
}
CEntity.avatar.Create.prototype.Destroy = function()
{
	this.image.parentNode.removeChild(this.image);
	delete this.image;
}
CEntity.avatar.Create.prototype.Delete = function()
{
	this.origin.Delete();
	this.Destroy();
}
//CEntity.avatar.Create.prototype.Visualize - первая визуализация - появление
CEntity.avatar.Create.prototype.Visualize = function()
{
	this.CreateNewImage();
	CMedium.heap[0].avatar.image.appendChild(this.image);
}
CEntity.avatar.Create.prototype.CreateNewImage = function()
{
	var svgNS = "http://www.w3.org/2000/svg";
	var theImage = document.createElementNS(svgNS, "g");
		var circle = document.createElementNS(svgNS, "circle");
		circle.setAttributeNS(null, "cx", 0);
		circle.setAttributeNS(null, "cy", 0);
		circle.setAttributeNS(null, "r", this.radius);
		circle.setAttributeNS(null, "fill", "DarkSlateGray");
		//circle.setAttributeNS(null, "fill", "black");
		circle.setAttributeNS(null, "stroke", "#3C9CC6");
		circle.setAttributeNS(null, "stroke-width", "2");
		circle.onmousedown = CEntity.avatar.image.onmousedown;
		circle.ondblclick = CEntity.avatar.image.ondblclick;
		circle.onmouseover = function(pEvent){
			var theAvatar = this.parentNode.aaa.avatar;
			CHintWindow.Show({x:pEvent.clientX, y:pEvent.clientY, title:theAvatar.name, subtitle:theAvatar.origin.specs, args:theAvatar.origin.atoms});
		}
		circle.onmouseout = function(pEvent){
			CHintWindow.Hide();
		}
		//circle.onclick = function(pE){console.log(pE)};
		
		var label = document.createElementNS(svgNS, "text");
		label.setAttributeNS(null, "fill", "crimson");//alternative value #BC041C
		label.setAttributeNS(null, "x", 0);
		label.setAttributeNS(null, "y", 0);
		//label.setAttributeNS(null, "dx", -10);
		label.setAttributeNS(null, "dy", 34);
		label.setAttributeNS(null, "font-size", 24);
		label.setAttributeNS(null, "text-anchor", "middle");
		label.style.pointerEvents = "none";
		label.textContent = this.name;
	theImage.appendChild(circle);
	theImage.appendChild(label);
	var translation = "translate(" + this.x + " " + this.y + ")";
	theImage.setAttributeNS(null, "transform", translation);
	
	theImage.aaa = {};
	theImage.aaa.avatar = this;
	this.image = theImage;
}
//CEntity.avatar.Create.prototype.Rerender - перерендеривоние
CEntity.avatar.Create.prototype.Rerender = function()
{
	this.image.style.left = this.x;
	this.image.style.top = this.y;
}
//Relative translate whole image
CEntity.avatar.Create.prototype.Move = function(pDeltaX, pDeltaY)
{
	this.x = (pDeltaX)/CMedium.heap[0].avatar.image.getScreenCTM().a + theScreen.avatar.image.viewBox.baseVal.x;
	this.y = (pDeltaY)/CMedium.heap[0].avatar.image.getScreenCTM().a + theScreen.avatar.image.viewBox.baseVal.y;
	CEntity.avatar.image.Move(this.image, this.x, this.y);
	
	var relations = this.origin.relations;
	for(var iX = 0; iX < relations.length; iX++)
	{
		if(relations[iX].entity1.state !== ESTATES.DELETED && relations[iX].entity2.state !== ESTATES.DELETED)
		relations[iX].avatar.Rerender();
	}
}
CEntity.avatar.Create.prototype.Rename = function(pName)
{
	this.name = pName;
	CEntity.avatar.image.Rename(this.image, pName);
}
CEntity.avatar.Create.prototype.Edit = function()
{
	CEditForm.Show(
		{
			name:this.origin.name,
			specs:this.origin.specs,
			atoms:this.origin.atoms,
			theEntity:this.origin,
		},
		function(pArgs)
		{
			pArgs.theEntity.Edit(pArgs.name, pArgs.specs, pArgs.atoms);
			pArgs.theEntity.avatar.Rename(pArgs.theEntity.name);
			/*
			var newValue = window.prompt([this.origin.name, this.origin.atoms.join("!")].join("!"));
			if(newValue != null && newValue != "")
			{
				this.origin.Edit(newValue);
				this.Rename(this.origin.name);
			}
			*/
		}
	)
	
}
CEntity.avatar.Create.prototype.Select = function()
{
	if(CInputController.Selection.currentSelection != null)
		CInputController.Selection.currentSelection.Deselect();
	this.image.children[0].setAttributeNS(null, "r", this.radius + 3);
	this.image.children[0].setAttributeNS(null, "fill", "GreenYellow");
	CInputController.Selection.currentSelection = this;
}
CEntity.avatar.Create.prototype.Deselect = function()
{
	this.image.children[0].setAttributeNS(null, "r", this.radius);
	this.image.children[0].setAttributeNS(null, "fill", "DarkSlateGray");
}

//
//
//
CEntity.avatar.image = {};
CEntity.avatar.image.Move = function(pImage, pDeltaX, pDeltaY)
{
	var translation = "translate(" + pDeltaX + " " + pDeltaY + ")";
	pImage.setAttributeNS(null, "transform", translation);
}
CEntity.avatar.image.Rename = function(pImage, pName)
{
	pImage.children[1].textContent = pName;
}
CEntity.avatar.image.onmousedown = function(pEvent)
{
	pEvent.stopPropagation(); // Standard model
	pEvent.preventDefault();
	if(pEvent.button == 1)
	{
		this.parentNode.aaa.avatar.Select();
		return false;
	}
	var tempImage = this.parentNode;
	var startPosX = tempImage.getCTM().e;
	var startPosY = tempImage.getCTM().f;
	var startX = pEvent.clientX + scrollX;
	var startY = pEvent.clientY + scrollY;
	
	if (document.addEventListener) {
		document.addEventListener("mousemove", moveHandler, true);
		document.addEventListener("mouseup", upHandler, true);
	}
	function moveHandler(ppEvent) {
		var posX = ppEvent.clientX + scrollX;
		var posY = ppEvent.clientY + scrollY;
		tempImage.aaa.avatar.Move(startPosX + posX - startX, startPosY + posY - startY);
		//CEntity.avatar.image.Move(tempImage, startPosX + posX - startX, startPosY + posY - startY);
		ppEvent.stopPropagation();
	};
	function upHandler(ppEvent) {
		document.removeEventListener("mouseup", upHandler, true);
		document.removeEventListener("mousemove", moveHandler, true);
		ppEvent.stopPropagation(); // Standard model
	};
};
CEntity.avatar.image.ondblclick = function()
{
	this.parentNode.aaa.avatar.Edit();
}

//
//End of CEntity
//