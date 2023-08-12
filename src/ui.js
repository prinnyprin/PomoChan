//UTILITIES
export const ELEM = (()=>{
    const create = (type, vals, selector, attr) =>{ //CREATE
        let elem = document.createElement(type);
        if(vals != null){(typeof vals == "string") ? (elem.innerHTML = vals) : add(elem, vals);}
        if(selector != null){(typeof selector == "string") ? (elem.id = selector) : classIn(elem, selector);}
        if(attr != null){attrIn(elem, attr)}
        return elem;
    }
    const get = (selector) =>{//RETRIEVE
        return document.querySelector(selector);
    }
    const getAll = (selector) =>{//RETRIEVE
        return document.querySelectorAll(selector);
    }
    const add = (elem, children) =>{//UPDATE
        for(let i = 0; i < children.length; i++){
            elem.appendChild(children[i]);
        }
    }
    const classIn = (elem, classes) =>{//UPDATE
        for(let i = 0; i < classes.length; i++){
            elem.classList.add(classes[i]);
        }
    }
    const attrIn = (elem, attr) => {
        for(let i = 0; i < attr.length; i+=2){
            elem.setAttribute(attr[i], attr[i+1]);
        }
    }
    return {create, get, getAll, add, attrIn};
})();

export function Clock(){
    return ELEM.create("div", [ELEM.create("div", "20", "time")], "clock");
}

export function Buttons(){
    return ELEM.create("div", [ELEM.create("button", "POMO", ["pomo-btn"]), ELEM.create("button", "BREAK", ["break-btn"])], ["buttons"]);
}

export function Progress(){
    let content = [];
    for(let i = 0; i < 60; i++){
        content.push(ELEM.create("div", null, ["progress-bar"]));
    }
    return ELEM.create("div", content, "progress");
}

export function Alarm(){
    return ELEM.create("div", [ELEM.create("h1", "Hurray!"), ELEM.create("h3", "You completed a focus session"), Buttons()], "alarm");
}