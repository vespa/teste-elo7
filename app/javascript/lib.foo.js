(function(w, name){
  "use strict";
  var _lib = {
    fooo: function(){
      // validando multiplas chamadas na lib principal
    }
  };
  w[name].extends("foo",_lib);
})(window, "_lib");
