var CMedium = {};
CMedium.className = "CMedium";
CMedium.heap = [];
CMedium.id = 0;

CMedium.Create = function(pShelter, pX, pY, pWidth, pHeight)
{
	this.id = (CMedium.id)++;
	this.name = CMedium.className + CMedium.id;
	this.selfClass = CMedium;
	this.shelter = pShelter;
	this.x = pX || 0;
	this.y = pY || 0;
	this.width = pWidth || window.innerWidth;
	this.height = pHeight || window.innerHeight;
	CMedium.heap.push(this);
	
	this.avatar = new CMedium.avatar.Create(this);
};

CMedium.avatar = {};
CMedium.avatar.Create = function(pOrigin)
{
	this.origin = pOrigin;
	this.image = null;
}
CMedium.avatar.Create.prototype.Visualize = function()
{
	this.image = CMedium.avatar.image.GetNew(this);
	this.image.aaa = {};
	this.image.aaa.avatar = this;
	this.image.onmouseup = CMedium.avatar.Create.AddEntity;
	this.origin.shelter.appendChild(this.image);
}
CMedium.avatar.Create.prototype.ZoomIn = function()
{
	var amount = 0.1;
	var scale = "scale(" + (this.image.getScreenCTM().a + amount) + ")";
	this.image.setAttributeNS(null, "transform", scale);
}
CMedium.avatar.Create.prototype.ZoomOut = function()
{
	var amount = -0.1;
	var scale = "scale(" + (this.image.getScreenCTM().a + amount) + ")";
	this.image.setAttributeNS(null, "transform", scale);
}
CMedium.avatar.Create.prototype.PanLeft = function()
{
	var amount = CMedium.heap[0].avatar.image.viewBox.baseVal.x - 10/this.image.getScreenCTM().a;
	CMedium.heap[0].avatar.image.viewBox.baseVal.x = amount;
	//CMedium.heap[0].avatar.image.setAttributeNS(null, "viewBox", amount + " 0 " + window.innerWidth + " " + window.innerHeight);
}
CMedium.avatar.Create.prototype.PanUp = function()
{
	var amount = CMedium.heap[0].avatar.image.viewBox.baseVal.y - 10/this.image.getScreenCTM().a;
	CMedium.heap[0].avatar.image.viewBox.baseVal.y = amount;
	//CMedium.heap[0].avatar.image.setAttributeNS(null, "viewBox", amount + " 0 " + window.innerWidth + " " + window.innerHeight);
}
CMedium.avatar.Create.prototype.PanRight = function()
{
	var amount = CMedium.heap[0].avatar.image.viewBox.baseVal.x + 10/this.image.getScreenCTM().a;
	CMedium.heap[0].avatar.image.viewBox.baseVal.x = amount;
	//CMedium.heap[0].avatar.image.setAttributeNS(null, "viewBox", amount + " 0 " + window.innerWidth + " " + window.innerHeight);
}
CMedium.avatar.Create.prototype.PanDown = function()
{
	var amount = CMedium.heap[0].avatar.image.viewBox.baseVal.y + 10/this.image.getScreenCTM().a;
	CMedium.heap[0].avatar.image.viewBox.baseVal.y = amount;
	//CMedium.heap[0].avatar.image.setAttributeNS(null, "viewBox", "0 " + amount + " " + window.innerWidth + " " + window.innerHeight);
}
CMedium.avatar.Create.prototype.Resize = function(pWidth, pHeight)
{
	this.image.style.width = pWidth + "px";
	this.image.style.height = pHeight + "px";
	//this.image.viewBox.baseVal.x.width = pWidth;
	//this.image.viewBox.baseVal.height = pHeight;
	var viewBox = this.image.viewBox.baseVal.x + " " + this.image.viewBox.baseVal.y + " " + pWidth + " " + pHeight;
	//this.image.
	this.image.setAttributeNS(null, "viewBox", viewBox);
}
CMedium.avatar.Create.AddEntity = function(pEvent)
{
	console.log(pEvent);
	if(pEvent.button != 1)
	{
		CEditForm.Show(
			{
				title:"Entity",
				subtitle:"Fill forms below. Separate tags by !",
				x:pEvent.clientX,
				y:pEvent.clientY,
			},
			function(pArgs)
			{
				var ens = new CEntity.Create(pArgs.name, pArgs.specs, pArgs.atoms, pArgs.x, pArgs.y);
				ens.avatar.Visualize();
				gotoNextEntity: for(var iX=0; iX<CEntity.heap.length - 1; iX++)
				{
					CRelation.VerifyAbout(ens, CEntity.heap[iX]);
				}
			}
		);
	}
}
CMedium.avatar.image = {};
CMedium.avatar.image.GetNew = function(pAvatar)
{
	var svgNS = "http://www.w3.org/2000/svg";
	var theImage = document.createElementNS(svgNS, "svg");
	theImage.setAttributeNS(null, "className", CMedium.className);
	theImage.id = pAvatar.origin.name;
	theImage.style.left = pAvatar.origin.x + "px";
	theImage.style.right = pAvatar.origin.y + "px";
	theImage.style.width = pAvatar.origin.width + "px";
	theImage.style.height = pAvatar.origin.height + "px";
	theImage.style.display = "block";
	return theImage;
}