(function(w, name, moduleName){
  "use strict";
  // privados
  var lib = w[name];
  var _mod = {
    dataTarget: "data-show-name",
    //normalmente prefiro jogar isso pra uma css, mas assim garante que o plugin é auto-suficiente
    boxStyle : "position:relative; background-color: #359C9C; width:96.75%; line-height;40px;margin:-30px 0 0;color:#fff; padding:0 6px;opacity:0.8",
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
        box.parentNode.appendChild(boxeName);
      };
      return boxeName;
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
          boxesArr.push(obj);
        }
      }
      return boxesArr;
    },
    load: function(){
      var boxes = _mod.findBoxes(),
          boxesNames = this.createBoxesName(boxes);
      ;
    }
  };
  // acrescenta o comportamento a uma global facilitando criação de testes
  w[name].extends(moduleName,mod);
  w[name][moduleName].load();
})(window, "_lib", "showname");
