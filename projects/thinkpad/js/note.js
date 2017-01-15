class Note extends BaseCtrl
{
    constructor(pCore){
        super(pCore);
        this.isFolded = true;
        this.isHidden = false;
        this.noteHandle = null
        this.noteBody = null
        this.noteTitle = null
        this.noteDesc = null
        this.noteTagField = null
        //Присоединяем метаданные
        this.ct = this.ct || util.Time();
        this.id = this.id || util.UUID();
        this.status = NoteStatus.EXIST;
    }
    Render(){
        let theView = document.createElement("div");
        this.view = theView;
        theView.ctrl = this;
        theView.className = "note";
        let hammerManager = new Hammer.Manager(this.view, {
            recognizers:[
                [Hammer.Swipe, {direction:Hammer.DIRECTION_ALL}],
                [Hammer.Tap]
            ]
        });
        hammerManager.on("swipe", function(pEvent){
            let note = util.FindParent(pEvent.target, ".note", true);
            switch(pEvent.direction)
            {
                case Hammer.DIRECTION_UP:note.ctrl.Emit("swipeUp", note);break;
                case Hammer.DIRECTION_DOWN:note.ctrl.Emit("swipeDown", note);break;
                case Hammer.DIRECTION_LEFT:note.ctrl.Emit("swipeLeft", note);break;
                case Hammer.DIRECTION_RIGHT:note.ctrl.Emit("swipeRight", note);break;
            }
        });
        hammerManager.on("tap", function(pEvent){
            let note = util.FindParent(pEvent.target, ".note", true);
            note.ctrl.Emit("tap", note);
        });
            let theHandle = document.createElement("div");
            this.noteHandle = theHandle;
            theHandle.className = "noteHandle";
        theView.appendChild(theHandle);
            let theBody = document.createElement("div");
            this.noteBody = theBody;
            theBody.className = "noteBody";
                let theTitle = document.createElement("div");
                this.noteTitle = theTitle;
                theTitle.className = "noteTitle";
                theTitle.innerHTML = this.title;
                let theDesc = document.createElement("div");
                this.noteDesc = theDesc;
                theDesc.className = "noteDesc";
                theDesc.innerHTML = this.desc;
                let theTagField = document.createElement("div");
                this.noteTagField = theTagField;
                theTagField.className = "noteTagField";
                if(this.tags.length == 0)
                    theTagField.innerHTML = "";
                else
                    theTagField.innerHTML = "<span class='tagHash'>" + this.tags.join("</span> <span class='tagHash'>");
            theBody.appendChild(theTitle);
            theBody.appendChild(theDesc);
            theBody.appendChild(theTagField);
        theView.appendChild(theBody);
        return theView;
    }
    PreSerialize(){
        return {
            title:this.title,
            desc:this.desc,
            tags:this.tags,
            id:this.id,
            ct:this.ct,
            status:this.status
        };
    }
    ReplaceContent(pNoteSource){
        this.title = this.noteTitle.innerHTML = pNoteSource.title;
        this.desc = this.noteDesc.innerHTML = pNoteSource.desc;
        this.tags = pNoteSource.tags;
        if(this.tags.length == 0)
            this.noteTagField.innerHTML = "";
        else
            this.noteTagField.innerHTML = "<span class='tagHash'>" + this.tags.join("</span> <span class='tagHash'>");
        return this;
    }
    //Inner Methods
    Expand(){
        let desc = this.view.querySelector(".noteDesc");
        let tagField = this.view.querySelector(".noteTagField");
        if(desc.style.animationName === "yScaleDownDiary" || desc.style.animationName === "")
        {
            desc.style.display = "initial";
            tagField.style.display = "initial";
            desc.style.animation = "yScaleUpDiary 0.3s forwards";
            tagField.style.animation = "yScaleUpDiary 0.3s forwards ease-out";
            this.view.querySelector(".noteBody").classList.add("noteBodyFullView");
        }
    }
    Fold(){
        let desc = this.view.querySelector(".noteDesc");
        let tagField = this.view.querySelector(".noteTagField");
        if(desc.style.animationName === "yScaleUpDiary")
        {
            desc.style.animation = "yScaleDownDiary 0.3s reverse forwards";
            tagField.style.animation = "yScaleDownDiary 0.3s reverse forwards ease-out";
            this.view.querySelector(".noteBody").classList.remove("noteBodyFullView");
        }
    }
    InstaFold(){
    //Для случая когда мы делаем поисковый запрос - необходимо моментально сворачивать запись кая отсеивается - иначе потом при появлении она будет проигрывать анимацию скрывания - выглядит как глюк 
        let desc = this.view.querySelector(".noteDesc");
        let tagField = this.view.querySelector(".noteTagField");
        if(desc.style.animationName === "yScaleUpDiary")
        {
            desc.style.animation = "yScaleDownDiary 0s reverse forwards";
            tagField.style.animation = "yScaleDownDiary 0s reverse forwards ease-out";
            this.view.querySelector(".noteBody").classList.remove("noteBodyFullView");
        }
    }
    Toogle(){
        let desc = this.view.querySelector(".noteDesc");
        let tagField = this.view.querySelector(".noteTagField");
        if(desc.style.animationName === "yScaleDownDiary" || desc.style.animationName === "")
        {
            desc.style.display = "initial";
            tagField.style.display = "initial";
            desc.style.animation = "yScaleUpDiary 0.3s forwards";
            tagField.style.animation = "yScaleUpDiary 0.3s forwards ease-out";
            this.view.querySelector(".noteBody").classList.add("noteBodyFullView");
        }
        else
        {
            desc.style.animation = "yScaleDownDiary 0.3s reverse forwards";
            tagField.style.animation = "yScaleDownDiary 0.3s reverse forwards ease-out";
            this.view.querySelector(".noteBody").classList.remove("noteBodyFullView");
        }
    }
    Show(){
        if(this.isHidden)
        {
            this.view.style.display = "";
            this.isHidden = false;
            this.status = NoteStatus.EXIST;
        }
    }
    Hide(){
        if(this.isHidden === false)
        {
            this.InstaFold();
            this.view.style.display = "none";
            this.isHidden = true;
            this.status = NoteStatus.HIDDEN;
        }

    }
    HasText(pText, pCaseSensitive = false){
        let title = pCaseSensitive?this.title:this.title.toLowerCase();
        let desc = pCaseSensitive?this.desc:this.desc.toLowerCase();
        let text = pCaseSensitive?pText:pText.toLowerCase();
        if(title.indexOf(text) === -1 && desc.toLowerCase().indexOf(text) === -1)
            return false;
        else
            return true;
    }
    HasTags(pTags, pCaseSensitive = false)
    {
        if(pTags.length === 0)
            return true;
        else
        {
            let maskTagCounter = 0;
            for(let noteTag of this.tags)
                for(let maskTag of pTags)
                    if(pCaseSensitive)
                    {
                        if(maskTag === noteTag)
                            ++maskTagCounter;
                    }
                    else
                    {
                        if(maskTag.toLowerCase() === noteTag.toLowerCase())
                            ++maskTagCounter;
                    }
            if(maskTagCounter === pTags.length)
                return true;
            else
                return false;
        }
    }
    //Inner Handlers
    NoteBodyClickHandler(pEvent){
        util.FindParent(pEvent.target, ".note").ctrl.Expand();
    }
    //Delegates
    //Events
}