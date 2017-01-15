var CAtomField = CBase.Extend
(
	function Constructor(pAtoms)
	{
		this.class = CAtomField;
		this.class.className = "CAtomField";
		
		this.atoms = pAtoms || [];
	},
	//Methods
	function RenderHere()
	{
		var theImage = document.createElement("div");
		theImage.className = "CAtomField";
		theImage.onclick = function()
		{
			this.lastChild.focus();
		}
		for(var iX=0; iX<this.atoms.length; ++iX)
		{
			theImage.appendChild(new CAtom.Create(this.atoms[iX]).RenderHere());
		}
			var input = document.createElement("input");
			input.className = "CAtomFieldInput";
			input.type = "text";
			input.onkeydown = function(pEvent)
			{
				if(pEvent.keyCode === 9)
				{
					var inputText = this.value;
					this.value = "";
					if(inputText !== "")
						this.parentNode.insertBefore(new CAtom.Create(inputText.split("!")[0]).RenderHere(), this);
					pEvent.preventDefault();
				}
				this.focus();
				
			}
		theImage.appendChild(input);
		this.image = theImage;
		theImage.aaa = {};
		theImage.aaa.origin = this;
		return theImage;
	},
	
	function GetAtoms()
	{
		var _result = [];
		for(var iX=0; iX<this.image.children.length - 1; ++iX)
		{
			_result.push(this.image.children[iX].firstChild.innerHTML);
		}
		return _result;
	},
	function DeleteAtoms()
	{
		this.atoms = [];
		while(this.image.children.length > 1)
		{
			this.image.removeChild(this.image.firstChild);
		}
		//for(var iX=0; iX<this.image.children.length - 1; ++iX)
	},
	function AddAtom(pAtom)
	{
		this.atoms.push(pAtom);
		this.image.insertBefore(new CAtom.Create(pAtom).RenderHere(), this.image.lastChild);
	}
)