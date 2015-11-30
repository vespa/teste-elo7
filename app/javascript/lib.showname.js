(function(w, name, moduleName){
  "use strict";
  // privados
  var lib = w[name];
  var _mod = {
    dataTarget: "data-show-name",
    //normalmente prefiro jogar isso pra uma css, mas assim garante que o plugin é auto-suficiente
    boxStyle : "position:relative; background-color: #359C9C; width:96.67%; line-height;40px;margin:10px 0 0;color:#fff; padding:0 6px;opacity:0.8",
    findBoxes: function(){
      var objs = document.getElementsByTagName("*"),
          objsList = [],
          count = objs.length;
      while(count--){
        var obj = objs[count];
        if(obj.getAttribute(_mod.dataTarget)!==null){
          objsList.push(objs[count]);
        }
      }
      return objsList;
    },
    createBoxesName: function(box){
      var boxeName = null,
          name = box.getAttribute("alt");
      if(name !== null){
        boxeName = _lib.createElem("div", {class: "boxName", style: _mod.boxStyle});
        boxeName.innerHTML = name;
        box.parentNode.style.overflow = "hidden";
        box.parentNode.style.height = window.getComputedStyle(box, null).height;
        setTimeout(function(){
          box.parentNode.appendChild(boxeName);
        },100);
      };
      return boxeName;
    },
    addBehaviors: function(objects){
      var img = objects[0],
          boxName = objects[1];
      var interval = null;
      img.onmouseover = function(){
          var limit = -25;
          if(interval){
            clearInterval(interval);
          }
          interval = setInterval(function(){
            var current = parseInt(boxName.style.marginTop.replace(/px/gi, ""),"");
            if(current < limit){
              boxName.style.marginTop=limit+"px";
              clearInterval(interval);
            }
            boxName.style.marginTop= (current-3) + "px";
          }, 30);
      };
      img.onmouseout = function(){
        var limit = 0;
        if(interval){
          clearInterval(interval);
        }
        interval = setInterval(function(){
          var current = parseInt(boxName.style.marginTop.replace(/px/gi, ""),"");
          if(current > limit){
            boxName.style.marginTop=0;
            clearInterval(interval);
          }
          boxName.style.marginTop= (current+3) + "px";
        }, 30);
      }
    }
  };
  //
  var mod = {
    createBoxesName: function(objs){
      var boxes = objs,
          count = objs.length,
          boxesArr =[];
      while(count--){
        var target = boxes[count];
        var obj = _mod.createBoxesName(target);
        if(obj){
          boxesArr.push([target, obj]);
        }
      }
      return boxesArr;
    },
    addBehaviors: function(objects){
      var objs = objects,
          count = objs.length;
      while(count--){
        _mod.addBehaviors(objs[count]);
      }
    },
    load: function(){
      var boxes = _mod.findBoxes(),
          boxesNames = this.createBoxesName(boxes);
          this.addBehaviors(boxesNames);
      ;
    }
  };
  // acrescenta o comportamento a uma global facilitando criação de testes
  w[name].extends(moduleName,mod);
  w[name][moduleName].load();
})(window, "_lib", "showname");
