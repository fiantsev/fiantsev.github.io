var CRelation = {};
CRelation.className = "CRelation";
CRelation.heap = [];
CRelation.id = 0;

CRelation.CheckAbout = function(pEntity1, pEntity2)
{
	if(pEntity1.state === ESTATES.DELETED || pEntity2.state === ESTATES.DELETED)
		return false;
	for(var iX=0; iX<pEntity1.atoms.length; iX++)
		for(var iY=0; iY<pEntity2.atoms.length; iY++)
			if(pEntity1.atoms[iX] == pEntity2.atoms[iY])
				return true;
	return false;
}
CRelation.VerifyAbout = function(pEntity1, pEntity2)
{
	if(pEntity1.state === ESTATES.DELETED || pEntity2.state === ESTATES.DELETED)
		return false;
	for(var iX=0; iX<pEntity1.atoms.length; iX++)
		for(var iY=0; iY<pEntity2.atoms.length; iY++)
			if(pEntity1.atoms[iX] == pEntity2.atoms[iY])
			{
				(new CRelation.Create(pEntity1, pEntity2)).avatar.Visualize();
				return true;
			}
	return false;
}
CRelation.RecalculateAllAgainst = function(pEntity)
{
	for(var iX=0; iX<CEntity.heap.length; iX++)
	{
		if(iX === pEntity.id)
			continue;
		CRelation.VerifyAbout(pEntity, CEntity.heap[iX]);
	}
}
CRelation.BreakAll = function(pEntity)
{
	var relations = pEntity.relations;
	for(var iX=0; iX<relations.length; iX++)
	{
		relations[iX].Delete();
	}
}

CRelation.Create = function(pEntity1, pEntity2)
{
	CRelation.heap.push(this);
	this.id = (CRelation.id)++;
	this.name = CRelation.className + this.id;
	this.entity1 = pEntity1;
	this.entity2 = pEntity2;
	pEntity1.relations.push(this);
	pEntity2.relations.push(this);
	this.selfClass = CRelation;
	this.avatar = new CRelation.avatar.Create(this);
}
CRelation.Create.prototype.Destroy = function()
{
	;//do nothing
}
CRelation.Create.prototype.Delete = function()
{
	this.avatar.Delete();
}
CRelation.Create.prototype.GetCommonAtoms = function()
{
	var commonAtoms = [];
	var atoms1 = this.entity1.atoms;
	var atoms2 = this.entity2.atoms;
	for(var iX=0; iX<atoms1.length; iX++)
	{
		for(var iY=0; iY<atoms2.length; iY++)
		{
			if(atoms1[iX] === atoms2[iY])
				commonAtoms.push(atoms1[iX]);
		}
	}
	return commonAtoms;
}

CRelation.avatar = {};
CRelation.avatar.Create = function(pOrigin)
{
	this.origin = pOrigin;
	this.image = null;
	this.thickness = 2;
	//this.color = "LightCyan";
	this.color = "rgb(64,74,74)";
	//this.color = "black";
}
CRelation.avatar.Create.prototype.Visualize = function()
{
	this.image = CRelation.avatar.image.GetNew(this);
	this.image.aaa = {};
	this.image.aaa.avatar = this;
	CMedium.heap[0].avatar.image.appendChild(this.image);
	CMedium.heap[0].avatar.image.insertBefore(this.image, CMedium.heap[0].avatar.image.firstChild);
}
CRelation.avatar.Create.prototype.Rerender = function()
{
	if(this.image)
		CRelation.avatar.image.Rerender(this.image);
}
CRelation.avatar.Create.prototype.Destroy = function()
{
	if(this.image)
	{
		this.image.parentNode.removeChild(this.image);
		delete this.image;
	}
}
CRelation.avatar.Create.prototype.Delete = function()
{
	this.Destroy();
}
//
//CEntity.avatar.image - реализация конректного варианта отображения на кокретной платформе
//
CRelation.avatar.image = {};
CRelation.avatar.image.GetNew = function(pAvatar)
{
	var svgNS = "http://www.w3.org/2000/svg";
	var theImage = document.createElementNS(svgNS, "g");
		var line = document.createElementNS(svgNS, "line");
		line.style.stroke = pAvatar.color;
		line.style.strokeWidth = pAvatar.thickness;
		line.y1.baseVal.value = pAvatar.origin.entity1.avatar.y;
		line.x1.baseVal.value = pAvatar.origin.entity1.avatar.x;
		line.y2.baseVal.value = pAvatar.origin.entity2.avatar.y;
		line.x2.baseVal.value = pAvatar.origin.entity2.avatar.x;
		line.className = CRelation.className;
		line.onmouseover = function(pEvent){
			var theAvatar = this.parentNode.aaa.avatar;
			CHintWindow.Show({x:pEvent.clientX, y:pEvent.clientY, title:theAvatar.origin.entity1.name+" - "+theAvatar.origin.entity2.name, args:theAvatar.origin.GetCommonAtoms()});
		}
		line.onmouseout = function(pEvent){
			CHintWindow.Hide();
		}
		
		var outline = document.createElementNS(svgNS, "line");
		outline.style.stroke = pAvatar.color;
		outline.style.strokeWidth = 0;
		outline.y1.baseVal.value = pAvatar.origin.entity1.avatar.y;
		outline.x1.baseVal.value = pAvatar.origin.entity1.avatar.x;
		outline.y2.baseVal.value = pAvatar.origin.entity2.avatar.y;
		outline.x2.baseVal.value = pAvatar.origin.entity2.avatar.x;
		outline.className = CRelation.className;
	theImage.appendChild(outline);
	theImage.appendChild(line);
	return theImage;
}
CRelation.avatar.image.Rerender = function(pImage)
{
	
	var entity1 = pImage.aaa.avatar.origin.entity1;
	var entity2 = pImage.aaa.avatar.origin.entity2;
	var line = pImage.children[0];
	var outline = pImage.children[1];
	outline.y1.baseVal.value = line.y1.baseVal.value = entity1.avatar.y;
	outline.x1.baseVal.value = line.x1.baseVal.value = entity1.avatar.x;
	outline.y2.baseVal.value = line.y2.baseVal.value = entity2.avatar.y;
	outline.x2.baseVal.value = line.x2.baseVal.value = entity2.avatar.x;
}