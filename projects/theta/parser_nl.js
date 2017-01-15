CNLParser = CEDLParser.Extend
(
	function Constructor()
	{
		this.class = CNLParser;
		this.class.className = "CNLParser";

		//this.configuration = {};
		//this.configuration.entityDelimiters = ["\\r\\n", "\\.", "\\!", "\\?", "\\(", "\\)"];
		this.configuration.entityDelimiters = ["\\r\\n", "\\n"];
		this.configuration.atomDelimiter = " ";
		this.configuration.atomMinLength = 3;
		this.configuration.convertToLowerCase = true;
		this.configuration.search = [];
		this.configuration.exclusions = [];

		this.atomLib = [];
	},
	//Methods
	function Parse(pSource)
	{
		var _result = [];
		var entities = pSource.split(new RegExp(this.configuration.entityDelimiters.join("|"), "g"));
		for(var iX=0; iX<entities.length; ++iX)
		{
			var atoms = entities[iX].split(this.configuration.atomDelimiter);
			if(atoms[0] !== "")
			{
				var ens = {};
				ens.atoms = [];
				//_result[iX] = {};
				//_result[iX].atoms = [];
				for(var iY=0; iY<atoms.length; ++iY)
				{
					if(atoms[iY].length >= this.configuration.atomMinLength)
					{
						var permission = true;
						for(var iZ=0; iZ<this.configuration.exclusions.length; ++iZ)
							if(atoms[iY] === this.configuration.exclusions[iZ])
								permission = false;
						if(permission)
						{
							ens.atoms.push(atoms[iY]);
							this.ContributeGeneralValue(atoms[iY]);
						}
					}

				}
				var name = "";
				if(ens.atoms[0] != "")
					name = ens.atoms[0];
				else
					name = "unknown";
				ens.name = name;
				if(!(ens.atoms.length === 0))
					if(this.SearchCheck(ens.atoms))
						_result.push(ens);
			}
		}
		return _result;
	},
	function Initialize(pConfiguration)
	{
		this.configuration.entityDelimiters = pConfiguration.entityDelimiters || this.configuration.entityDelimiters;
		this.configuration.atomDelimiter = pConfiguration.atomDelimiter || this.configuration.atomDelimiter;
		this.configuration.atomMinLength = pConfiguration.atomMinLength || this.configuration.atomMinLength;
		this.configuration.search = pConfiguration.search || this.configuration.search;
		this.configuration.exclusions = pConfiguration.exclusions || this.configuration.exclusions;
	},
	function SearchCheck(pAtoms)
	{
		if(this.configuration.search.length != 0)
		{
			for(var iX=0; iX<pAtoms.length; ++iX)
				for(var iY=0; iY<this.configuration.search.length; ++iY)
					if(pAtoms[iX] === this.configuration.search[iY])
						return true;
			return false;
		}
		return true;
	}
);