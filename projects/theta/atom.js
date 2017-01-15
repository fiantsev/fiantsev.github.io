var CAtom = CBase.Extend
(
	function Constructor(pValue)
	{
		this.value = pValue || "";
	},
	//Methods
	function RenderHere()
	{
		var theImage = document.createElement("div");
		theImage.className = "CAtom";
			var label = document.createElement("div");
			label.className = "CAtomLabel";
			label.innerHTML = this.value;
			var button = document.createElement("button");
			button.type = "button";
			button.className = "CAtomButtonDelete";
			//button.innerHTML = "x";
			button.onclick = function(){this.parentNode.parentNode.removeChild(this.parentNode)};
		theImage.appendChild(label);
		theImage.appendChild(button);
		return theImage;
	},
	
	function GetValue()
	{
		
	}
)