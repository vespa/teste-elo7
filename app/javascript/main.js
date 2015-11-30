(function(w, name){
    "use strict";
    var _lib = {
      javascriptPath: "./javascript/",
      loadScript: function(url, callback){
        var css = /\.(css)$/.test(url);
         var script;
        if(!css){
            script = _lib.createElem("script", {src:url});
        } else{
            script = _lib.createElem("link", {href:url, rel: "stylesheet"});
        }
        if (script.readyState) { //IE
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else { //Others
            script.onload = function (msg) {
                if (typeof callback != "undefined"){
                    callback();
                }
            };
            script.onerror = function () {
                var msg = "não foi possível carregar o arquivo " + url;
                callback(msg);
                throw new Error(msg);
            };
        }
        document.getElementsByTagName("head")[0].appendChild(script);
        return script;
      },
      createElem: function(elem, attrs){
          elem = document.createElement(elem);
          attrs = attrs || {};
          for(var x in attrs){
              if(attrs.hasOwnProperty(x)){
                  elem.setAttribute(x, attrs[x]);
              }
          }
          return elem;
      },
      extends: function(obj){
        for(var x in obj){
          if(obj.hasOwnProperty(x)){
            this[x] = obj[x];
          }
        }
        return this;
      },
      seekAndLoad: function(){
        var scripts = document.getElementsByTagName("script"),
            count = scripts.length,
            filesToLoad = [];
          while(count--){
            var scr = scripts[count],
                attr = scr.getAttribute("data-load");
            if(attr!==null){
              var arr = attr.split("|");
              filesToLoad = filesToLoad.concat(arr);
            }
          }
          return filesToLoad;
      },
      load: function(filesToLoad){
        var filesToLoad = filesToLoad || this.seekAndLoad(),
            count = filesToLoad.length;
          if(count > 0){
              var file = _lib.javascriptPath + filesToLoad[0];
              _lib.loadScript(file, function(){
                filesToLoad.shift();
                _lib.load(filesToLoad);
              });
          }
      }
    };
    w[name] = _lib;
    w[name].load();
})(window, "_lib");
