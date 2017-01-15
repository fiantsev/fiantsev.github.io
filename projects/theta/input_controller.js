var CInputController = {};
	CInputController.Selection = {};
	CInputController.Selection.currentSelection = null;
	
	CInputController.KeyboardHandler = function(pEvent)
	{
		console.log(pEvent.keyCode);
		switch(pEvent.keyCode)
		{
			//[delete]
			case 46:
				if(CInputController.Selection.currentSelection)
				{
					CInputController.Selection.currentSelection.Delete();
					CInputController.Selection.currentSelection = null;
				}
			break;
			//[+]
			case 61:
				CMedium.heap[0].avatar.ZoomIn();
			break;
			//[-]
			case 173:
				CMedium.heap[0].avatar.ZoomOut();
			break;
			//[left][up][right][down]
			case 37:
				CMedium.heap[0].avatar.PanLeft();
			break;
			case 38:
				CMedium.heap[0].avatar.PanUp();
			break;
			case 39:
				CMedium.heap[0].avatar.PanRight();
			break;
			case 40:
				CMedium.heap[0].avatar.PanDown();
			break;
		}
		/*
		if(pEvent.keyCode === 46)
			if(CInputController.Selection.currentSelection)
			{
				CInputController.Selection.currentSelection.Delete();
				CInputController.Selection.currentSelection = null;
			}
		if(pEvent.keyCode === 61)
			CMedium.heap[0].avatar.ZoomIn();
		if(pEvent.keyCode === 173)
			CMedium.heap[0].avatar.ZoomOut();
		*/
	}
	CInputController.MouseWheelHandler = function(pEvent)
	{
		//console.log(pEvent);
		//Wheel up
		if(pEvent.deltaY < 0)
			CMedium.heap[0].avatar.ZoomIn();
		else
			CMedium.heap[0].avatar.ZoomOut();
	}
	CInputController.MouseHandler = function(pEvent)
	{
		var startX = pEvent.clientX + scrollX;
		var startY = pEvent.clientY + scrollY;
		
		//console.log(pEvent);
		if(pEvent.button === 1)
		{
			
			function moveHandler(ppEvent) {
				var deltaX = ppEvent.clientX - startX;
				var deltaY = ppEvent.clientY - startY;
				startX = ppEvent.clientX;
				startY = ppEvent.clientY;
				if(deltaX > 0)
					theScreen.avatar.PanRight();
				else
					if(deltaX < 0)
						theScreen.avatar.PanLeft();
				
				if(deltaY > 0)
					theScreen.avatar.PanDown();
				else
					if(deltaY < 0)
						theScreen.avatar.PanUp();
					
				//tempImage.aaa.avatar.Move(startPosX + posX - startX, startPosY + posY - startY);
				//CEntity.avatar.image.Move(tempImage, startPosX + posX - startX, startPosY + posY - startY);
				ppEvent.stopPropagation();
			};
			function upHandler(ppEvent) {
				if(ppEvent.button === 1)
				{
					document.removeEventListener("mouseup", upHandler, true);
					document.removeEventListener("mousemove", moveHandler, true);
					ppEvent.stopPropagation(); // Standard model
				}
			};
			if (document.addEventListener) {
				document.addEventListener("mousemove", moveHandler, true);
				document.addEventListener("mouseup", upHandler, true);
			}
		}
	}
