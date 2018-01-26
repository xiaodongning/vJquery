
function addEvent(obj, event, fn) { 
    console.log(obj.attachEvent);
    if (obj.attachEvent) {
        obj.attachEvent('on' + event, function () { 
            fn.call(obj);
        });
    } else { 
        obj.addEventListener(event,fn,false);
    }
}
function getClass(parent,cls) { 
    var tag = parent.getElementsByTagName('*');
    var el = [];
    var i = 0;
    for (i = 0; i < tag.length; i++) { 
        if (tag[i].className == cls) { 
            el.push(tag[i]);
        }
    }
    return el;
}
function getStyle(obj,attr) { 
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else { 
        return getComputedStyle(obj, false)[attr];
    }
}
function vQuery(arg) {
    this.element = [];
    switch (typeof arg) { 
        case 'function':
            window.onload = addEvent(window, 'load', arg);
            break;
        case 'string':
            switch (arg.charAt(0)) { 
                case '#':
                    var obj = document.getElementById(arg.substring(1));
                    this.element.push(obj);
                    break;
                case '.':
                    var obj = getClass(document, arg.substring(1));
                    this.element = obj;
                    break;
                default:
                    var obj = document.getElementsByTagName(arg);
                    this.element = obj
            } 
        case 'object':
            this.element.push(arg);    
    }
}

vQuery.prototype.click = function (fn) {
    var i = 0;
    for (i = 0; i < this.element.length; i++) {
        addEvent(this.element[i], 'click', fn);
    }
};

vQuery.prototype.hover = function (fnOver, fnOut) { 
    var i = 0;
    for (i = 0; i < this.element.length; i++) { 
        addEvent(this.element[i], 'mouseover', fnOver);
        addEvent(this.element[i], 'mouseout', fnOut);
    }
}

vQuery.prototype.show = function () { 
    var i = 0;
    for (i = 0; i < this.element.length; i++) { 
        this.element[i].style.display = 'block';
    }
}

vQuery.prototype.hide = function () { 
    var i = 0;
    for (i = 0; i < this.element.length; i++) { 
        this.element[i].style.display = 'none';
    }
}

vQuery.prototype.css = function (attr,value) { 
    if (arguments.length == 2) {
        var i = 0;
        for (i = 0; i < this.element.length; i++) {
            this.element[i].style[attr] = value;
        }
    } else { 
        return getStyle(this.element[0], attr);
    }
}

function $(arg) { 
    return new vQuery(arg);
}