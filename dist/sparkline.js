!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.sparkline=t():e.sparkline=t()}(window,function(){return d={"./node_modules/@fnando/sparkline/dist/sparkline.commonjs2.js":
/*!********************************************************************!*\
  !*** ./node_modules/@fnando/sparkline/dist/sparkline.commonjs2.js ***!
  \********************************************************************/
/*! no static exports found */function(module,exports){eval('module.exports=function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=1)}([function(t,e,r){var n=r(2),o=r(3),i=r(4);t.exports=function(t){return n(t)||o(t)||i()}},function(t,e,r){"use strict";r.r(e),r.d(e,"sparkline",function(){return c});var n=r(0),o=r.n(n);function i(t,e,r,n){return parseFloat((e-n*e/t+r).toFixed(2))}function a(t){return t.value}function u(t,e){var r=document.createElementNS("http://www.w3.org/2000/svg",t);for(var n in e)r.setAttribute(n,e[n]);return r}function c(t,e,r){var n;if(n=t,o()(n.querySelectorAll("*")).forEach(function(t){return n.removeChild(t)}),!(e.length<=1)){r=r||{},"number"==typeof e[0]&&(e=e.map(function(t){return{value:t}}));var c=r.onmousemove,l=r.onmouseout,s="interactive"in r?r.interactive:!!c,f=r.spotRadius||2,p=2*f,d=r.cursorWidth||2,v=parseFloat(t.attributes["stroke-width"].value),b=r.fetch||a,h=e.map(function(t){return b(t)}),y=parseFloat(t.attributes.width.value)-2*p,x=parseFloat(t.attributes.height.value),m=x-2*v-p,g=Math.max.apply(Math,o()(h)),A=-1e3,w=h.length-1,j=y/w,O=[],k=i(g,m,v+f,h[0]),S="M".concat(p," ").concat(k);h.forEach(function(t,r){var n=r*j+p,o=i(g,m,v+f,t);O.push(Object.assign({},e[r],{index:r,x:n,y:o})),S+=" L ".concat(n," ").concat(o)});var M=u("path",{class:"sparkline--line",d:S,fill:"none"}),C=u("path",{class:"sparkline--fill",d:"".concat(S," V ").concat(x," L ").concat(p," ").concat(x," Z"),stroke:"none"});if(t.appendChild(C),t.appendChild(M),s){var E=u("line",{class:"sparkline--cursor",x1:A,x2:A,y1:0,y2:x,"stroke-width":d}),_=u("circle",{class:"sparkline--spot",cx:A,cy:A,r:f});t.appendChild(E),t.appendChild(_);var F=u("rect",{width:t.attributes.width.value,height:t.attributes.height.value,style:"fill: transparent; stroke: transparent",class:"sparkline--interaction-layer"});t.appendChild(F),F.addEventListener("mouseout",function(t){E.setAttribute("x1",A),E.setAttribute("x2",A),_.setAttribute("cx",A),l&&l(t)}),F.addEventListener("mousemove",function(t){var e=t.offsetX,r=O.find(function(t){return t.x>=e});r||(r=O[w]);var n,o=O[O.indexOf(r)-1],i=(n=o?o.x+(r.x-o.x)/2<=e?r:o:r).x,a=n.y;_.setAttribute("cx",i),_.setAttribute("cy",a),E.setAttribute("x1",i),E.setAttribute("x2",i),c&&c(t,n)})}}}e.default=c},function(t,e){t.exports=function(t){if(Array.isArray(t)){for(var e=0,r=new Array(t.length);e<t.length;e++)r[e]=t[e];return r}}},function(t,e){t.exports=function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}},function(t,e){t.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}}]);\n//# sourceMappingURL=sparkline.commonjs2.js.map\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/@fnando/sparkline/dist/sparkline.commonjs2.js?')},"./src/visualizations/sparkline.js":
/*!*****************************************!*\
  !*** ./src/visualizations/sparkline.js ***!
  \*****************************************/
/*! exports provided: viz */function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "viz", function() { return viz; });\n/* harmony import */ var _fnando_sparkline__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @fnando/sparkline */ "./node_modules/@fnando/sparkline/dist/sparkline.commonjs2.js");\n/* harmony import */ var _fnando_sparkline__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_fnando_sparkline__WEBPACK_IMPORTED_MODULE_0__);\n\n\nconst viz = looker.plugins.visualizations.add({\n    options: {\n        width: {\n          label: "Width",\n          section: "Layout",\n          type: "number",\n          default: "300"\n        },\n        // height: {\n        //     label: "Height",\n        //     section: "Layout",\n        //     type: "number",\n        //     default: "100"  \n        // },\n        // headerOffset: {\n        //     label: "Header Offset",\n        //     section: "Layout",\n        //     type: "number",\n        //     default: "100"  \n        // },\n        stroke: {\n          section: "Sparkline",\n          type: "array",\n          label: "Stroke color",\n          display: "color",\n          default: ["#353b49"]\n        },\n        strokeWidth: {\n            label: "Stroke width",\n            section: "Sparkline",\n            type: "number",\n            default: "3"  \n        },\n        fill: {\n            section: "Sparkline",\n            type: "array",\n            label: "Fill color",\n            display: "color"\n        },\n        top_label: {\n          section: "Layout",\n          type: "string",\n          label: "Label (for top)",\n          placeholder: "My Great Chart"\n        }\n    },\n\tcreate: function(element, config){\n\t\telement.innerHTML = "<svg class=\\"sparkline\\" width=\\"100\\" height=\\"30\\" stroke-width=\\"3\\"></svg>";\n\t},\n\tupdateAsync: function(data, element, config, queryResponse, details, doneRendering){\n        \n        const height1 = element.offsetHeight;\n\n\n        // if (height1 != config.height) {\n        //     this.trigger("updateConfig", [{height: height1}])\n        // }\n\n        \n        // Create an option for each measure in your query\n        let values = queryResponse.fields.measures.map((field) => {\n            let key =    field.label\n            let value =  field.name\n            return {[key]: value}\n        })\n        let options = this.options;\n        options["sparklineData"] =\n        {\n            section: "Sparkline",\n            type: "string",\n            label: "Measure for Sparkline",\n            display: "select",\n            values: values\n        }\n        options["headerData"] =\n        {\n            section: "Header",\n            type: "string",\n            label: "Measure for Header",\n            display: "select",\n            values: values,\n        }\n        if (config.sparklineData == null) {\n            this.trigger(\'registerOptions\', options) // register options with parent page to update visConfig\n        }\n\n        \n        // let options = this.options\n        // Create an option for each measure in your query\n        // queryResponse.fields.measure_like.forEach(function(field) {\n        //   let id = "color_" + field.name\n        //   options[id] =\n        //   {\n        // label: "Based on " +field.label_short,\n        // default: "no",\n        // section: "Style",\n        // type: "string",\n        // display: "color"\n        //   }\n        // })\n        // this.trigger(\'registerOptions\', options) // register options with parent page to update visConfig\n\n        element.innerHTML = `<h1 class="sparklineTitle"><center>${config.top_label}${JSON.stringify(options)}</center></h1>`+\n        `<center><svg class="sparkline" width="${config.width}" height="${height1}" stroke-width="${config.strokeWidth}"`+\n        ` stroke="${config.stroke}"  fill="${config.fill}"></svg></center>`;\n        \n        // values: [\n        //     {"Center": "c"},\n        //     {"Left": "l"},\n        //     {"Right": "r"}\n        // ]\n       \n        var dataArray = [];\n        for(var row of data) {\n            \tvar cell = row[config.sparklineData];\n                dataArray.push(LookerCharts.Utils.textForCell(cell)*1);\n         }\n        _fnando_sparkline__WEBPACK_IMPORTED_MODULE_0___default()(document.querySelector(".sparkline"), dataArray);\n\t\tdoneRendering()\n\t}\n});\n\n//# sourceURL=webpack://%5Bname%5D/./src/visualizations/sparkline.js?')}},e={},f.m=d,f.c=e,f.d=function(e,t,n){f.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},f.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},f.t=function(t,e){if(1&e&&(t=f(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(f.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)f.d(n,r,function(e){return t[e]}.bind(null,r));return n},f.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return f.d(t,"a",t),t},f.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},f.p="",f(f.s="./src/visualizations/sparkline.js");function f(t){if(e[t])return e[t].exports;var n=e[t]={i:t,l:!1,exports:{}};return d[t].call(n.exports,n,n.exports,f),n.l=!0,n.exports}var d,e});