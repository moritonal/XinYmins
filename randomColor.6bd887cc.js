parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"krLc":[function(require,module,exports) {
var define;
var r;!function(e,n){if("object"==typeof exports){var t=n();"object"==typeof module&&module&&module.exports&&(exports=module.exports=t),exports.randomColor=t}else"function"==typeof r&&r.amd?r([],n):e.randomColor=n()}(this,function(){var r=null,e={};o("monochrome",null,[[0,0],[100,0]]),o("red",[-26,18],[[20,100],[30,92],[40,89],[50,85],[60,78],[70,70],[80,60],[90,55],[100,50]]),o("orange",[19,46],[[20,100],[30,93],[40,88],[50,86],[60,85],[70,70],[100,70]]),o("yellow",[47,62],[[25,100],[40,94],[50,89],[60,86],[70,84],[80,82],[90,80],[100,75]]),o("green",[63,178],[[30,100],[40,90],[50,85],[60,81],[70,74],[80,64],[90,50],[100,40]]),o("blue",[179,257],[[20,100],[30,86],[40,80],[50,74],[60,60],[70,52],[80,44],[90,39],[100,35]]),o("purple",[258,282],[[20,100],[30,87],[40,79],[50,70],[60,65],[70,59],[80,52],[90,45],[100,42]]),o("pink",[283,334],[[20,100],[30,90],[40,86],[60,84],[80,80],[90,75],[100,73]]);var n=function(o){if(void 0!==(o=o||{}).seed&&null!==o.seed&&o.seed===parseInt(o.seed,10))r=o.seed;else if("string"==typeof o.seed)r=function(r){for(var e=0,n=0;n!==r.length&&!(e>=Number.MAX_SAFE_INTEGER);n++)e+=r.charCodeAt(n);return e}(o.seed);else{if(void 0!==o.seed&&null!==o.seed)throw new TypeError("The seed value must be an integer or string");r=null}var i,l;if(null!==o.count&&void 0!==o.count){var c=o.count,f=[];for(o.count=null;c>f.length;)r&&o.seed&&(o.seed+=1),f.push(n(o));return o.count=c,f}return function(r,e){switch(e.format){case"hsvArray":return r;case"hslArray":return s(r);case"hsl":var n=s(r);return"hsl("+n[0]+", "+n[1]+"%, "+n[2]+"%)";case"hsla":var t=s(r),a=e.alpha||Math.random();return"hsla("+t[0]+", "+t[1]+"%, "+t[2]+"%, "+a+")";case"rgbArray":return u(r);case"rgb":var o=u(r);return"rgb("+o.join(", ")+")";case"rgba":var i=u(r),a=e.alpha||Math.random();return"rgba("+i.join(", ")+", "+a+")";default:return function(r){var e=u(r);function n(r){var e=r.toString(16);return 1==e.length?"0"+e:e}return"#"+n(e[0])+n(e[1])+n(e[2])}(r)}}([i=function(r){var n=a(function(r){if("number"==typeof parseInt(r)){var n=parseInt(r);if(n<360&&n>0)return[n,n]}if("string"==typeof r)if(e[r]){var t=e[r];if(t.hueRange)return t.hueRange}else if(r.match(/^#?([0-9A-F]{3}|[0-9A-F]{6})$/i)){var a=function(r){r=3===(r=r.replace(/^#/,"")).length?r.replace(/(.)/g,"$1$1"):r;var e=parseInt(r.substr(0,2),16)/255,n=parseInt(r.substr(2,2),16)/255,t=parseInt(r.substr(4,2),16)/255,a=Math.max(e,n,t),o=a-Math.min(e,n,t),u=a?o/a:0;switch(a){case e:return[(n-t)/o%6*60||0,u,a];case n:return[60*((t-e)/o+2)||0,u,a];case t:return[60*((e-n)/o+4)||0,u,a]}}(r)[0];return[a,a]}return[0,360]}(r.hue));n<0&&(n=360+n);return n}(o),l=function(r,e){if("monochrome"===e.hue)return 0;if("random"===e.luminosity)return a([0,100]);var n=function(r){return t(r).saturationRange}(r),o=n[0],u=n[1];switch(e.luminosity){case"bright":o=55;break;case"dark":o=u-10;break;case"light":u=55}return a([o,u])}(i,o),function(r,e,n){var o=function(r,e){for(var n=t(r).lowerBounds,a=0;a<n.length-1;a++){var o=n[a][0],u=n[a][1],s=n[a+1][0],i=n[a+1][1];if(e>=o&&e<=s){var l=(i-u)/(s-o),c=u-l*o;return l*e+c}}return 0}(r,e),u=100;switch(n.luminosity){case"dark":u=o+20;break;case"light":o=(u+o)/2;break;case"random":o=0,u=100}return a([o,u])}(i,l,o)],o)};function t(r){for(var n in r>=334&&r<=360&&(r-=360),e){var t=e[n];if(t.hueRange&&r>=t.hueRange[0]&&r<=t.hueRange[1])return e[n]}return"Color not found"}function a(e){if(null===r)return Math.floor(e[0]+Math.random()*(e[1]+1-e[0]));var n=e[1]||1,t=e[0]||0,a=(r=(9301*r+49297)%233280)/233280;return Math.floor(t+a*(n-t))}function o(r,n,t){var a=t[0][0],o=t[t.length-1][0],u=t[t.length-1][1],s=t[0][1];e[r]={hueRange:n,lowerBounds:t,saturationRange:[a,o],brightnessRange:[u,s]}}function u(r){var e=r[0];0===e&&(e=1),360===e&&(e=359),e/=360;var n=r[1]/100,t=r[2]/100,a=Math.floor(6*e),o=6*e-a,u=t*(1-n),s=t*(1-o*n),i=t*(1-(1-o)*n),l=256,c=256,f=256;switch(a){case 0:l=t,c=i,f=u;break;case 1:l=s,c=t,f=u;break;case 2:l=u,c=t,f=i;break;case 3:l=u,c=s,f=t;break;case 4:l=i,c=u,f=t;break;case 5:l=t,c=u,f=s}return[Math.floor(255*l),Math.floor(255*c),Math.floor(255*f)]}function s(r){var e=r[0],n=r[1]/100,t=r[2]/100,a=(2-n)*t;return[e,Math.round(n*t/(a<1?a:2-a)*1e4)/100,a/2*100]}return n});
},{}]},{},["krLc"], null)
//# sourceMappingURL=randomColor.6bd887cc.map