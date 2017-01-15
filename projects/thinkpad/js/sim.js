"use strict";
class SIM extends BaseCtrl
{
    constructor(pCore){
        super(pCore);
        this.Trap("noteCreated", this.OutNoteCreated);
        this.Trap("editSubmitted", this.OutEditSubmitted);
        this.mode = SIMMode.ZERO;
        this.enviroment = util.DefineEnviroment();//Не оч красивое решение, но на первое время норм
        this.titleInput = null;
        this.descInput = null;
        this.tagInput = null;
        this.tagField = null;
        this.modeIcon = null;
        //SEARCH setup
        this.searchEventDelay = 100;//ms
        this.searchEventHandler = null;
        //EDIT setup
        this.editedNoteID = null;
    }
    AttachTo(pView){
        super.AttachTo(pView);
        this.titleInput = this.view.querySelector("#titleInput");
        this.descInput = this.view.querySelector("#descInput");
        this.tagInput = this.view.querySelector("#tagInput");
        this.tagField = this.view.querySelector("#tagField");
        this.modeIcon = this.view.querySelector("#modeIcon");
        this.AssignHandlers("#titleInput", "input", [this.TitleFirstCharHandler]);
        this.AssignHandlers("#titleInput", "keyup", [this.TitleAnyKeyHandler]);
        this.AssignHandlers("#titleInput", "keydown", [this.TitleBackspaceHandler, this.TitleEnterHandler, this.TabHandler]);
        this.AssignHandlers("#descInput", "keydown", [this.DescBackspaceHandler, this.DescEnterHandler, this.TabHandler]);
        this.AssignHandlers("#tagInput", "keydown", [this.TagBackspaceHandler, this.TagEnterHandler]);
        let tapEventName = document.body.ontouchstart?"touchstart":"click";
        this.AssignHandlers("#tagBar", tapEventName, [this.TagBarClickHandler]);
        this.AssignHandlers("#tagFieldBar", tapEventName, [this.TagBarClickHandler]);
        this.AssignHandlers(".preLabel", tapEventName, [this.PreLabelTapHandler])
    }
    //Inner Methods
    ChangeMode(pMode){
        this.mode = pMode;
        {
            "debug";
            console.log(`%c${this.constructor.name}[Mode changed] ${SIMModetoName[pMode]}`, "color:darkslategrey;font-size:1.25em;");
        }
        switch(pMode)
        {
            case SIMMode.ZERO:{
                this.view.querySelector("#modeIcon").ctrl.Hide();
                this.view.querySelector("#titleLabel").ctrl.Hide();
                this.view.classList.remove("editMode");
                this.Emit("modeChanged", this.mode);
            };break;
            case SIMMode.COMP:{
                this.view.querySelector("#titleLabel").ctrl.Show();
                this.Emit("modeChanged", this.mode);
            };break;
            case SIMMode.SEARCH:{
                this.view.querySelector("#modeIcon").ctrl.ChangeMode(this.mode);
                this.Emit("modeChanged", this.mode);
            };break;
            case SIMMode.SYNC:{
                this.view.querySelector("#modeIcon").ctrl.ChangeMode(this.mode);
                this.Emit("modeChanged", this.mode);
            };break;
            case SIMMode.EDIT:{
                this.view.querySelector("#modeIcon").ctrl.Hide();
                this.view.classList.add("editMode");
                this.Emit("modeChanged", this.mode);
            };break;
            case SIMMode.CMD:{
                this.view.querySelector("#modeIcon").ctrl.ChangeMode(this.mode);
                this.Emit("modeChanged", this.mode);
            };break;
        }
    }
    GotoTitleInput(){
        this.FocusTo(this.view.querySelector("#titleInput"));//Фокусировка в Chrome
        this.view.querySelector("#titleInput").focus();//Фокусировка в Firefox
        this.view.querySelector("#descLabel").ctrl.Hide();
        this.view.querySelector("#descBar").ctrl.Hide();
        this.view.querySelector("#descUnderline").ctrl.Hide();
        this.view.querySelector("#titleUnderline").ctrl.Hide();
    }
    GotoDescInput(){
        this.view.querySelector("#tagLabel").ctrl.Hide();
        this.view.querySelector("#tagBar").ctrl.Hide();
        this.view.querySelector("#descBar").ctrl.Show();
        this.view.querySelector("#descLabel").ctrl.Show();
        this.view.querySelector("#descUnderline").ctrl.Hide();
        this.view.querySelector("#titleUnderline").ctrl.Show();
        this.FocusTo(this.view.querySelector("#descInput"));//Фокусировка в Chrome
        this.view.querySelector("#descInput").focus();//Фокусировка в Firefox
    }
    GotoTagInput(){
        this.view.querySelector("#tagBar").ctrl.Show();
        this.view.querySelector("#tagLabel").ctrl.Show();
        this.view.querySelector("#descUnderline").ctrl.Show();
        // this(this.view.querySelector("#tagInput").innerHTML === "")
        // {
        //     this.view.querySelector("#tagInput").innerHTML = "<br>";
        // }
        this.FocusTo(this.view.querySelector("#tagInput"));//Фокусировка в Chrome
        this.view.querySelector("#tagInput").focus();//Фокусировка в Firefox
    }
    FocusTo(pElement, pCollapseToStart){
        let wasEmptyInput = false;
        let selection = window.getSelection();
        let range = document.createRange();
        // range.setStart(pElement, 0);
        // range.setEnd(pElement, 0);
        if(pElement.innerHTML === "")
        {
            wasEmptyInput = true;
            pElement.innerText = ".";
        }
        range.selectNodeContents(pElement);
        range.collapse(pCollapseToStart);
        selection.removeAllRanges();
        selection.addRange(range);
        if(wasEmptyInput)
            pElement.innerHTML = "";
    }
    Reset(){
        //Hide all stuff
        this.view.querySelector("#tagLabel").ctrl.Hide();
        this.view.querySelector("#tagBar").ctrl.Hide();
        this.view.querySelector("#descUnderline").ctrl.Hide();
        this.view.querySelector("#descLabel").ctrl.Hide();
        this.view.querySelector("#descBar").ctrl.Hide();
        this.view.querySelector("#titleUnderline").ctrl.Hide();
        this.view.querySelector("#titleLabel").ctrl.Hide();
        //Clear all inputs
        this.view.querySelector("#tagField").innerHTML = "";
        this.view.querySelector("#tagInput").innerHTML = "";
        this.view.querySelector("#descInput").innerHTML = "";
        this.view.querySelector("#titleInput").innerHTML = "";
        //Init setup
        this.mode = SIMMode.ZERO;
        //Focus
        this.FocusTo(this.view.querySelector("#titleInput"));//Фокусировка в Chrome
        this.view.querySelector("#titleInput").focus();//Фокусировка в Firefox
    }
    Expand(){
        //Hide all stuff
        this.view.querySelector("#tagLabel").ctrl.Show();
        this.view.querySelector("#tagBar").ctrl.Show();
        this.view.querySelector("#descUnderline").ctrl.Show();
        this.view.querySelector("#descLabel").ctrl.Show();
        this.view.querySelector("#descBar").ctrl.Show();
        this.view.querySelector("#titleUnderline").ctrl.Show();
        this.view.querySelector("#titleLabel").ctrl.Show();
        //Focus
        this.FocusTo(this.tagInput);//Фокусировка в Chrome
        this.tagInput.focus();//Фокусировка в Firefox
    }
    InsertNote(pNote){
        this.titleInput.innerHTML = pNote.ctrl.title;
        this.descInput.innerHTML = pNote.ctrl.desc;
        this.tagInput.innerHTML = "&nbsp;";
        this.tagField.innerHTML = "";
        this.AddTags(pNote.ctrl.tags);
        this.Expand();
    }
    AddTags(pTags){
        if(typeof(pTags) === "string")
            this.tagField.appendChild(new Tag(pTags.trim()).Render());
        else
            if(Array.isArray(pTags))
                for(let tag of pTags)
                {
                    this.tagField.appendChild(new Tag(tag.trim()).Render());
                }
    }
    CreateNoteInfo(pCore){
        let title = this.titleInput.innerText.trim();
        let desc = this.descInput.innerText.trim();
        let tags = [];
        for(let tag of this.tagField.children)
            tags.push(tag.firstElementChild.innerText.trim());
        let noteInfo = {
            title,
            desc,
            tags
        };
        Object.assign(noteInfo, pCore);
        return noteInfo;
    }
    HideAndClearTitle(){
        this.view.querySelector("#titleInput").innerHTML = "";
    }
    HideAndClearDesc(){
        this.view.querySelector("#descInput").innerHTML = "";
        this.view.querySelector("#titleUnderline").ctrl.Hide();
        this.view.querySelector("#descLabel").ctrl.Hide();
        this.view.querySelector("#descBar").ctrl.Hide();
    }
    HideAndClearTags(){
        this.view.querySelector("#tagInput").innerHTML = "";
        this.tagField.innerHTML = "";
        this.view.querySelector("#descUnderline").ctrl.Hide();
        // this.view.querySelector("#descUnderline").ctrl.Hide();
        this.view.querySelector("#tagLabel").ctrl.Hide();
        this.view.querySelector("#tagBar").ctrl.Hide();
    }
    ExecCMD(){
        this.Emit("cmd",this.titleInput.innerText.trim());
        this.titleInput.innerHTML = "";
    }
    //Inner Handlers
    TitleFirstCharHandler(pEvent){
        if(this.mode === SIMMode.ZERO)
        {
            let inputText = pEvent.target.innerText.trim();
            if( inputText === "")
                return;
            switch(inputText[0])
            {
                case "?": this.ChangeMode(SIMMode.SEARCH);pEvent.target.innerHTML="";break;
                case "@": this.ChangeMode(SIMMode.SYNC);pEvent.target.innerHTML="";break;
                case ">": this.ChangeMode(SIMMode.CMD);pEvent.target.innerHTML="";break;
                default : this.ChangeMode(SIMMode.COMP);break;
            }
        }
    }
    TitleEnterHandler(pEvent){
        if(pEvent.key === "Enter")
        {
            switch(this.mode)
            {
                case SIMMode.ZERO:break;
                case SIMMode.SEARCH:break;
                case SIMMode.COMP:
                case SIMMode.EDIT:this.GotoDescInput();break;
                case SIMMode.SYNC:
                case SIMMode.CMD:this.ExecCMD();break;
            }
            if(this.mode === SIMMode.ZERO)
            {
                
            }
            else
            {
                
            }
            pEvent.preventDefault();
        }
    }
    TitleBackspaceHandler(pEvent){
        if(pEvent.key === "Backspace" && pEvent.target.innerText.trim() === "")
        {
            pEvent.target.innerHTML = "";
            pEvent.preventDefault();
            this.ChangeMode(SIMMode.ZERO);
        }
    }
    TitleAnyKeyHandler(pEvent){
        if(this.mode === SIMMode.SEARCH)
        {
            // let elapsedTime = Date.now() - this.searchEventTime;
            // if(elapsedTime < this.searchEventDelay && this.searchEventHandler !== null)
            window.clearTimeout(this.searchEventHandler)
            this.searchEventHandler = setTimeout(this.Emit.bind(this, "search", this.titleInput.innerText.trim()), this.searchEventDelay);
        }
    }
    DescEnterHandler(pEvent){
        if(pEvent.key === "Enter")
        {
            let theTarget = pEvent.target;
            let theText = theTarget.innerText;
            //Если поле пустое - то однозначно переходим к след полю
            if(theText === "")
            {
                this.GotoTagInput();
                pEvent.preventDefault();
            }
            else
            {
                //Версия для Chrome
                let newlinePosition = theText.indexOf("\n\n");
                if((newlinePosition !== -1) && (newlinePosition === (theText.length - 2)))
                {
                    this.GotoTagInput();
                    pEvent.preventDefault();
                    //Версия для Firefox
                    for(var iX=theTarget.childNodes.length-1; iX>=0; --iX)
                    {
                        if(theTarget.childNodes[iX].nodeName === "BR")
                            theTarget.removeChild(theTarget.childNodes[iX]);
                        else
                            break;
                    }
                    //Версия для Chrome
                    for(var iX=theTarget.childNodes.length-1; iX>=0; --iX)
                    {
                        if(theTarget.childNodes[iX].nodeName === "DIV" && theTarget.childNodes[iX].innerText.trim() === "")
                            theTarget.removeChild(theTarget.childNodes[iX]);
                        else
                            break;
                    }

                }
            }
        }
    }
    DescBackspaceHandler(pEvent){
        if(pEvent.key === "Backspace" && pEvent.target.innerText.trim() === "")
        {
            pEvent.target.innerHTML = "";
            pEvent.preventDefault();
            this.GotoTitleInput();
        }
    }
    TagBackspaceHandler(pEvent){
        if(pEvent.key === "Backspace" && pEvent.target.innerText.trim() === "")
        {
            pEvent.target.innerHTML = "&nbsp;";
            pEvent.preventDefault();
            this.GotoDescInput();
        }
    }
    TagEnterHandler(pEvent){
        if(pEvent.key === "Enter")
        {
            if(pEvent.target.innerText.trim() === "")
                switch(this.mode)
                {
                    case SIMMode.COMP:this.Emit("noteCreated", this.CreateNoteInfo());break;//this.OutEventNoteCreated();this.ChangeMode(SIMMode.ZERO);break;
                    case SIMMode.EDIT:this.Emit("editSubmitted", this.CreateNoteInfo({id:this.editedNoteID}));break;//this.OutEditSubmitted();this.ChangeMode(SIMMode.ZERO);break;
                }
            else
            {
                this.view.querySelector("#tagField").appendChild(new Tag(pEvent.target.innerText.trim()).Render());
                pEvent.target.innerHTML = "&nbsp;";
            }
            pEvent.preventDefault();
        }
    }
    TabHandler(pEvent){
        if(pEvent.key === "Tab")
        {
            pEvent.preventDefault();
            if(this.mode === SIMMode.COMP || this.mode === SIMMode.EDIT)
            {
                if(pEvent.target.id === "titleInput")
                    this.GotoDescInput();
                if(pEvent.target.id === "descInput")
                    this.GotoTagInput();
            }
        }
    }
    TagBarClickHandler(pEvent){
        this.FocusTo(this.view.querySelector("#tagInput"));//Фокусировка в Chrome
        this.view.querySelector("#tagInput").focus();//Фокусировка в Firefox
    }
    PreLabelTapHandler(pEvent){
        let whichBar = util.FindParent(pEvent.target, ".bar");
        if(whichBar.id === "tagBar")
            this.HideAndClearTags();
        if(whichBar.id === "descBar")
            this.HideAndClearDesc();
        if(whichBar.id === "titleBar")
            this.HideAndClearTitle();
    }
    //Delegates - IN/ON
    OnNoteEdited(pNote){
        this.ChangeMode(SIMMode.EDIT);
        this.InsertNote(pNote);
        this.editedNoteID = pNote.ctrl.id;
    }
    //Event Traps - OUT/AFTER
    OutNoteCreated(){
        this.Reset();
        this.ChangeMode(SIMMode.ZERO);
    }
    OutEditSubmitted(){
        this.Reset();
        this.ChangeMode(SIMMode.ZERO);
    }
    OutEditRejected(){
        this.Reset();
        this.ChangeMode(SIMMode.ZERO);
    }
}