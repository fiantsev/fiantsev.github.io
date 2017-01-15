CEDLParser = CBase.Extend
(
	function Constructor()
	{
		this.class = CEDLParser;
		this.class.className = "CEDLParser";

		this.configuration = {};
		this.configuration.entityDelimiter = "\r\n";
		this.configuration.atomDelimiter = "!";
		this.configuration.convertToLowerCase = true;

		this.atomLib = [];
	},
	//Methods
	function Parse(pSource)
	{
		var _result = [];
		var entities = pSource.split(this.configuration.entityDelimiter);
		for(var iX=0; iX<entities.length; ++iX)
		{
			var atoms = entities[iX].split(this.configuration.atomDelimiter);
			_result[iX] = {};
			_result[iX].atoms = [];
			for(var iY=1; iY<atoms.length; ++iY)
			{
				if(atoms[iY] != "")
				{
					_result[iX].atoms.push(atoms[iY]);
					this.ContributeGeneralValue(atoms[iY]);
					/*
					if(this.atomLib[atoms[iY]])
						this.atomLib[atoms[iY]] += 1;
					else
						this.atomLib[atoms[iY]] = 1;
					*/
				}

			}
			var name = "";
			if(atoms[0] != "")
				name = atoms[0];
			else
				name = "unknown";
			_result[iX].name = name;
			//_result[iX] = new CAtomStructure.Create(name, atoms.length, this.CalculateGeneralValue(atomLib));

		}
		return _result;
	},
	function ContributeGeneralValue(pAtomName)
	{
		var isNew = true;

		for(var name in this.atomLib)
		{
			if(pAtomName === name)
			{
				this.atomLib[name] += 1;
				isNew = false;
			}
		}
		if(isNew)
			this.atomLib[pAtomName] = 1;
	},
	function GiveRise(pSource)
	{
		for(var iX=0; iX<pSource.length; iX)
		{

		}
	}
);

CEDLReproductor = CBase.Extend
(
	function Constructor()
	{
		this.class = CEDLReproductor;
		this.class.className = "CEDLReproductor";

		this.configuration = {};
		this.configuration.originPositionXY = {x:500,y:500};
		this.configuration.distributionRadius = 800;
		this.configuration.entityRadiusMin = 5;
		this.configuration.entityRadiusMax = 20;
		this.configuration.rotationStep = 15;
	},
	//Methods
	function GiveRise(pEntities, pAtomValues)
	{
		var entityValues = [];
		var maxEntityValue = 0;
		var minEntityValue = 0;
		var maxAtomQuantity = 0;
		var minAtomQuantity = 0;
		for(var iX=0; iX<pEntities.length; ++iX)
		{
			entityValues[iX] = 0;
			for(var iY=0; iY<pEntities[iX].atoms.length; ++iY)
			{
				entityValues[iX] += pAtomValues[pEntities[iX].atoms[iY]];
			}
			if(maxEntityValue < entityValues[iX])
				maxEntityValue = entityValues[iX];
			if(minEntityValue > entityValues[iX])
				minEntityValue = entityValues[iX];
			if(maxAtomQuantity < pEntities[iX].atoms.length)
				maxAtomQuantity = pEntities[iX].atoms.length;
			if(minAtomQuantity > pEntities[iX].atoms.length)
				minAtomQuantity = pEntities[iX].atoms.length;
		}
		var rotationAngle = 0;
		for(var iX=0; iX<pEntities.length; ++iX)
		{
			var positionRadius = this.configuration.distributionRadius *(1 - ((entityValues[iX] - minEntityValue)/(maxEntityValue - minEntityValue)) );
			pEntities[iX].x = this.configuration.originPositionXY.x + (Math.cos(Math.PI*(rotationAngle/360))*positionRadius);
			pEntities[iX].y = this.configuration.originPositionXY.y + (Math.sin(Math.PI*(rotationAngle/360))*positionRadius);
			var entityRadius = this.configuration.entityRadiusMin + (this.configuration.entityRadiusMax - this.configuration.entityRadiusMin)*((pEntities[iX].atoms.length - minAtomQuantity)/(maxAtomQuantity - minAtomQuantity));
			new CEntity.Create(pEntities[iX].name, "", pEntities[iX].atoms.join("!"), pEntities[iX].x, pEntities[iX].y, entityRadius).avatar.Visualize();
			CRelation.RecalculateAllAgainst(CEntity.heap[CEntity.heap.length - 1]);
			rotationAngle += this.configuration.rotationStep;
		}
	},
	function Initialize(pConfiguration)
	{
		this.configuration.originPositionXY = pConfiguration.originPositionXY || this.configuration.originPositionXY;
		this.configuration.distributionRadius = pConfiguration.distributionRadius || this.configuration.distributionRadius;
		this.configuration.entityRadiusMin = pConfiguration.entityRadiusMin || this.configuration.entityRadiusMin;
		this.configuration.entityRadiusMax = pConfiguration.entityRadiusMax || this.configuration.entityRadiusMax;
		this.configuration.rotationStep = pConfiguration.rotationStep || this.configuration.rotationStep;
	}
);
