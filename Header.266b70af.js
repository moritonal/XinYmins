parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"K/mD":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e={name:"header-component",data:function(){return{numberOfItems:6,numberOfMinutes:60}},methods:{newNumberOfItems:function(){this.$emit("numberOfItemsChange",numberOfItems)},newNumberOfMinutes:function(){this.$emit("numberOfMinutesChange",numberOfMinutes)}}};exports.default=e;
(function(){var t=exports.default||module.exports;"function"==typeof t&&(t=t.options),Object.assign(t,{render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row py-4 justify-content-center d-flex"},[s("div",{staticClass:"col m-1"},[s("div",{staticClass:"input-group"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.numberOfItems,expression:"numberOfItems"}],staticClass:"form-control",attrs:{type:"number",value:"1"},domProps:{value:t.numberOfItems},on:{change:t.newNumberOfItems,input:function(e){e.target.composing||(t.numberOfItems=e.target.value)}}}),t._v(" "),t._m(0)])]),t._v(" "),t._m(1),t._v(" "),s("div",{staticClass:"col m-1"},[s("div",{staticClass:"input-group"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.numberOfMinutes,expression:"numberOfMinutes"}],staticClass:"form-control",attrs:{type:"number",value:"1"},domProps:{value:t.numberOfMinutes},on:{change:t.newNumberOfMinutes,input:function(e){e.target.composing||(t.numberOfMinutes=e.target.value)}}}),t._v(" "),t._m(2)])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"input-group-append"},[e("span",{staticClass:"input-group-text"},[this._v("items")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"col-1 justify-content-center align-items-center d-flex"},[e("span",[this._v("in")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"input-group-append"},[e("span",{staticClass:"input-group-text"},[this._v("mins")])])}],_compiled:!0,_scopeId:null,functional:void 0});})();
},{}]},{},["K/mD"], null)