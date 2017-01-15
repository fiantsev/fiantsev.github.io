var CAtomStructure = {};
CAtomStructure.Create = function(pName, pMass, pGeneralValue)
{
	this.name = pName
	this.mass = pMass;
	this.generalValue = pGeneralValue;
}
/*
var CAtomNode = {};
CAtomNode.Create = function(pName, pMass, pGeneralValue)
{
	this.atom = new CAtomStructure.Create(pName, pMass, pGeneralValue);
	this.leftNode = null;
	this.rightNode = null;
}

CAtomNode.Create.prototype.GetLeft = function()
{
	return
}
CAtomNode.Create.prototype.GetRight = function()
{

}
CAtomNode.Create.prototype.GetCurrent = function()
{

}

var CAtomLib = {};
CAtomLib.root = new CAtomNode.Create("пополам", 0, 0);
CAtomLib.Create = function()
{

}
CAtomLib.Create.prototype.AddAtom = function(pName)
{
	if(pName > this.root)
}
CAtomLib.Create.prototype.GetAtom = function()
{

}
*/