var CApplication = {};
CApplication.id = 0;
CApplication.className = "CApplication";
CApplication.theApplication = null;
CApplication.theScreen = null;
CApplication.GetApplication = function(pConfiguration)
{
	if(!CApplication.theApplication)
		CApplication.theApplication = new CApplication.Create(pConfiguration);
	return CApplication.theApplication;
}
CApplication.GetScreen = function()
{
	if(!CApplication.theScreen)
		CApplication.theScreen = document.body;
	return CApplication.theScreen;
}
CApplication.Create = function(pConfiguration)
{
	this.id = (CApplication.id)++;
	this.selfClass = CApplication;
	this.name = CApplication.className + this.id;
	this.configuration = pConfiguration;
}
//
//Save to LocalStorage
//
CApplication.Create.prototype.SaveStateToLocalStorage = function(pObject)
{
	window.localStorage.setItem("state", pObject.Serialize());
}
CApplication.Create.prototype.LoadStateFromLocalStorage = function()
{
	return JSON.parse(window.localStorage.getItem("state"));
}
//
//Save to File
//
CApplication.Create.prototype.SaveStateToFile = function(pObject)
{
	var tempLink = document.createElement("a");
	tempLink.download = "constellation.txt";
	var auxString = pObject.Serialize();//.replace(" ", "%20");
	tempLink.href = "data:charset=utf-8," + encodeURI(auxString);
	tempLink.style.visibility = "collapse";
	document.body.appendChild(tempLink);
	tempLink.click();
	window.l = tempLink;
	document.body.removeChild(tempLink);
}
CApplication.Create.prototype.LoadStateFromFile = function()
{
	//return JSON.parse(window.localStorage.getItem("state"));
	var fileInput = document.createElement("input");
	fileInput.type = "file";
	fileInput.style.visibility = "collapse";
	fileInput.onchange = function()
	{
		var reader = new FileReader();
		reader.onload = function()
		{
			//console.log(this.result);
			CApplication.theApplication.RestoreState(JSON.parse(this.result));
		}
		reader.readAsText(fileInput.files[0]);
	}
	window.f = fileInput;
	document.body.appendChild(fileInput);
	fileInput.click();
}
//
//Save to Database
//
CApplication.Create.prototype.SaveStateToDB = function(pObject)
{
	var xhr = new XMLHttpRequest();
	xhr.open("POST","Server_Scripts/save_to_db.php");
	var data = [];
	data[0] = window.prompt();
	data[1] = pObject.Serialize();
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4 && xhr.status === 200)
			alert(xhr.responseText);
			//xyui.modal.showDialog(xhr.responseText);
	};
	xhr.send("[\""+data[0]+"\", " +data[1]+"]");
}
CApplication.Create.prototype.LoadStateFromDB = function()
{
	var xhr = new XMLHttpRequest();
	xhr.open("POST","Server_Scripts/load_from_db.php");
	var data = JSON.stringify(window.prompt());
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4 && xhr.status === 200)
			CApplication.theApplication.RestoreState(JSON.parse(xhr.responseText));
			//xyui.modal.showDialog(xhr.responseText);
	};
	xhr.send(data);
}
//
//
//
CApplication.Create.prototype.LoadConstellationFromEDLFile = function()
{
	//return JSON.parse(window.localStorage.getItem("state"));
	var fileInput = document.createElement("input");
	fileInput.type = "file";
	fileInput.style.visibility = "collapse";
	fileInput.onchange = function()
	{
		var reader = new FileReader();
		reader.onload = function()
		{
			var theParser = new CEDLParser.Create();
			var theReproductor = new CEDLReproductor.Create();
			var preEntities = theParser.Parse(this.result);
			console.log(theParser.atomLib);
			console.log(preEntities);
			theReproductor.GiveRise(preEntities, theParser.atomLib);
		}
		reader.readAsText(fileInput.files[0]);
	}
	window.f = fileInput;
	document.body.appendChild(fileInput);
	fileInput.click();
}
CApplication.Create.prototype.LoadConstellationFromNLFile = function()
{
	//return JSON.parse(window.localStorage.getItem("state"));
	var fileInput = document.createElement("input");
	fileInput.type = "file";
	fileInput.style.visibility = "collapse";
	fileInput.onchange = function()
	{
		var reader = new FileReader();
		reader.onload = function()
		{
			var theParser = new CNLParser.Create();
			//theParser.Initialize({atomMinLength:9});
			theParser.Initialize
			(
				{
					atomMinLength:3
					,exclusions:["википедия", "Википедия", "Википедии", "Википедией", "Википедии,",
					"Викимедиа", "Википедию", "Википедию,", "что", "то,", "очень", "или", "этим", "для", "того,",
					"чтобы", "нужно", "когда", "чем", "также", "без", "так", "как", "которые", "который", "было",
					"был", "была", "такой", "особено", "такие", "этот", "есть", "стала", "года", "год",
					"Сбербанк", "Сбербанка", "Сбербанку", "России", "банк", "банку", "Банк", "«Сбербанк", "России»",
					"ООО", "ЗАО"]
					//,search:["Исследование", "пользователи", "пользователей", "Сообщество", "возможность"]
				}
			);
			var theReproductor = new CEDLReproductor.Create();
			theReproductor.Initialize({distributionRadius:1200, rotationStep:5});
			var preEntities = theParser.Parse(this.result);
			//console.log(theParser.atomLib);
			//console.log(preEntities);
			theReproductor.GiveRise(preEntities, theParser.atomLib);
		}
		reader.readAsText(fileInput.files[0]);
	}
	window.f = fileInput;
	document.body.appendChild(fileInput);
	fileInput.click();
}
CApplication.Create.prototype.RestoreConstellation = function(pConstellation)
{
	var fileInput = document.createElement("input");
	fileInput.type = "file";
	fileInput.style.visibility = "collapse";
	fileInput.onchange = function()
	{
		var reader = new FileReader();
		reader.onload = function()
		{
			console.log(this.result);
			console.log("++++++++++++++++++++++");
			console.log(CEDLParser.Parse(this.result));
		}
		reader.readAsText(fileInput.files[0]);
	}
	window.f = fileInput;
	document.body.appendChild(fileInput);
	fileInput.click();
}
//
//
//
CApplication.Create.prototype.RestoreState = function(pState)
{
	//Creating all entities
	for(var iX=0; iX<pState.length; iX++)
	{
		(new CEntity.Create(pState[iX].name, pState[iX].specs, pState[iX].atoms.join("!"), pState[iX].x, pState[iX].y)).avatar.Visualize();
	}
	var entity1 = null;
	var entity2 = null;
	//Creating all relations
	for(var iX=0; iX<CEntity.heap.length; iX++)
	{
		entity1 = CEntity.heap[iX];
		for(var iY=iX+1; iY<CEntity.heap.length; iY++)
		{
			entity2 = CEntity.heap[iY];
			CRelation.VerifyAbout(entity1, entity2);
		}
	}
}

//Events
/*
CApplication.Create.prototype.events = [];
CApplication.Create.prototype.OnWindowResize = function(pEvent)
{
	
}
CApplication.Create.prototype.RegisterHandler = function(pEventName, pEventHandler)
{
	if(!this.events[pEventName])
		this.events[pEventName] = [];
	this.events[pEventName].push(pEventHandler);
}
*/