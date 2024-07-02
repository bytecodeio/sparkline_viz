!function(e,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.sparkline_with_single_value=n():e.sparkline_with_single_value=n()}(self,(()=>(()=>{var __webpack_modules__={327:module=>{eval('module.exports=function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=1)}([function(t,e,r){var n=r(2),o=r(3),i=r(4);t.exports=function(t){return n(t)||o(t)||i()}},function(t,e,r){"use strict";r.r(e),r.d(e,"sparkline",function(){return c});var n=r(0),o=r.n(n);function i(t,e,r,n){return parseFloat((e-n*e/t+r).toFixed(2))}function a(t){return t.value}function u(t,e){var r=document.createElementNS("http://www.w3.org/2000/svg",t);for(var n in e)r.setAttribute(n,e[n]);return r}function c(t,e,r){var n;if(n=t,o()(n.querySelectorAll("*")).forEach(function(t){return n.removeChild(t)}),!(e.length<=1)){r=r||{},"number"==typeof e[0]&&(e=e.map(function(t){return{value:t}}));var c=r.onmousemove,l=r.onmouseout,s="interactive"in r?r.interactive:!!c,f=r.spotRadius||2,p=2*f,d=r.cursorWidth||2,v=parseFloat(t.attributes["stroke-width"].value),b=r.fetch||a,h=e.map(function(t){return b(t)}),y=parseFloat(t.attributes.width.value)-2*p,x=parseFloat(t.attributes.height.value),m=x-2*v-p,g=Math.max.apply(Math,o()(h)),A=-1e3,w=h.length-1,j=y/w,O=[],k=i(g,m,v+f,h[0]),S="M".concat(p," ").concat(k);h.forEach(function(t,r){var n=r*j+p,o=i(g,m,v+f,t);O.push(Object.assign({},e[r],{index:r,x:n,y:o})),S+=" L ".concat(n," ").concat(o)});var M=u("path",{class:"sparkline--line",d:S,fill:"none"}),C=u("path",{class:"sparkline--fill",d:"".concat(S," V ").concat(x," L ").concat(p," ").concat(x," Z"),stroke:"none"});if(t.appendChild(C),t.appendChild(M),s){var E=u("line",{class:"sparkline--cursor",x1:A,x2:A,y1:0,y2:x,"stroke-width":d}),_=u("circle",{class:"sparkline--spot",cx:A,cy:A,r:f});t.appendChild(E),t.appendChild(_);var F=u("rect",{width:t.attributes.width.value,height:t.attributes.height.value,style:"fill: transparent; stroke: transparent",class:"sparkline--interaction-layer"});t.appendChild(F),F.addEventListener("mouseout",function(t){E.setAttribute("x1",A),E.setAttribute("x2",A),_.setAttribute("cx",A),l&&l(t)}),F.addEventListener("mousemove",function(t){var e=t.offsetX,r=O.find(function(t){return t.x>=e});r||(r=O[w]);var n,o=O[O.indexOf(r)-1],i=(n=o?o.x+(r.x-o.x)/2<=e?r:o:r).x,a=n.y;_.setAttribute("cx",i),_.setAttribute("cy",a),E.setAttribute("x1",i),E.setAttribute("x2",i),c&&c(t,n)})}}}e.default=c},function(t,e){t.exports=function(t){if(Array.isArray(t)){for(var e=0,r=new Array(t.length);e<t.length;e++)r[e]=t[e];return r}}},function(t,e){t.exports=function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}},function(t,e){t.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}}]);\n//# sourceMappingURL=sparkline.commonjs2.js.map\n\n//# sourceURL=webpack:///./node_modules/@fnando/sparkline/dist/sparkline.commonjs2.js?')},731:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   viz: () => (/* binding */ viz)\n/* harmony export */ });\n/* harmony import */ var _fnando_sparkline__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(327);\n/* harmony import */ var _fnando_sparkline__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_fnando_sparkline__WEBPACK_IMPORTED_MODULE_0__);\n\n\nfunction findClosest(target, tagName) {\n\n  if (target.tagName === tagName) {\n    return target;\n  }\n\n  while ((target = target.parentNode)) {\n    if (target.tagName === tagName) {\n      return target;\n    }\n  }\n\n  return target;\n}\n\nlet sparkline_options = {\n  onmousemove(event, datapoint) {\n    var svg = findClosest(event.target, "svg");\n\n    var tooltip = svg.nextElementSibling;\n    var date = (new Date(datapoint.date)).toLocaleString(\'en\')\n    // .toUTCString().replace(/^.*?, (.*?) \\\\d{2}:\\\\d{2}:\\\\d{2}.*?$/, "$1")\n   \n    var container = document.querySelector(".sparkline");\n\n    tooltip.hidden = false;\n    tooltip.textContent = `${date}: ${datapoint.html}`;\n\n\n    // tooltip.style.top = `${event.offsetY + 35}px`;\n    // tooltip.style.left = `${event.offsetX - 20}px`;\n    tooltip.style.top = `${container.clientHeight + 35}px`;\n    tooltip.style.left = `20px`;\n\n    // tooltip.textContent = JSON.stringify(document.querySelector(".sparkline").clientHeight)\n  },\n\n  onmouseout() {\n    var svg = findClosest(event.target, "svg");\n    var tooltip = svg.nextElementSibling;\n    tooltip.hidden = true;\n  }\n};\n\n\nconst viz = looker.plugins.visualizations.add({\n  options: {\n    stroke: {\n      section: "Sparkline",\n      type: "array",\n      label: "Stroke color",\n      display: "color",\n      default: ["#353b49"]\n    },\n    strokeWidth: {\n      label: "Stroke width",\n      section: "Sparkline",\n      type: "number",\n      default: 3\n    },\n    fill: {\n      section: "Sparkline",\n      type: "array",\n      label: "Fill color",\n      display: "color"\n    },\n    top_label: {\n      section: "Header",\n      type: "string",\n      label: "Label (for top)",\n      placeholder: "My Great Chart"\n    },\n    last: {\n      section: "Header",\n      type: "boolean",\n      label: "Use the last value?"\n    },\n    headerFontSize: {\n      section: "Header",\n      type: "number",\n      label: "Header Font Size",\n      default: 32\n    },\n    comparisonFontSize: {\n      section: "Header",\n      type: "number",\n      label: "Comparison Font Size",\n      default: 18\n    },\n    precision: {\n      section: "Header",\n      type: "number",\n      label: "Decimal Precision",\n      default: 2\n    },\n    units: {\n      section: "Header",\n      type: "string",\n      label: "Units",\n      default: ""\n    },\n    useHTML: {\n      section: "Header",\n      type: "boolean",\n      label: "Use the formatted HTML?"\n    },\n  },\n  create: function (element, config) {\n    element.innerHTML = `<svg class="sparkline" width="${element.offsetWidth}" height="${element.offsetHeight - 37}" stroke-width="3"></svg>`;\n  },\n  updateAsync: function (data, element, config, queryResponse, details, doneRendering) {\n\n    let values = queryResponse.fields.measure_like.map((field) => {\n      let key = field.label\n      let value = field.name\n      return { [key]: value }\n    })\n    let firstDimension = queryResponse.fields.dimensions[0].name;\n    let options = this.options;\n    options["sparklineData"] =\n    {\n      section: "Sparkline",\n      type: "string",\n      label: "Measure for Sparkline",\n      display: "select",\n      values: values\n    }\n    options["headerData"] =\n    {\n      section: "Header",\n      type: "string",\n      label: "Measure for Header",\n      display: "select",\n      values: values,\n    }\n    options["comparisonData"] =\n    {\n      section: "Header",\n      type: "string",\n      label: "Measure for Comparison",\n      display: "select",\n      values: values,\n    }\n\n\n    // if (config.sparklineData == null) {\n      this.trigger(\'registerOptions\', options) // register options with parent page to update visConfig\n    // }\n\n\n    // Grab the header cell\n    var headerRow = config.last ? data[data.length - 1] : data[0];\n    var headerCell = headerRow[config.headerData];\n    \n    var header = rounder(LookerCharts.Utils.textForCell(headerCell), config.precision || 0);\n    if(isNaN(header)){\n      header = LookerCharts.Utils.textForCell(headerCell)\n    }\n\n    if(LookerCharts.Utils.htmlForCell(headerCell) && config.useHTML){\n      header = LookerCharts.Utils.htmlForCell(headerCell)\n    }\n\n    // Grab the comparison cell\n    var comparisonRow = config.last ? data[data.length - 1] : data[0];\n    var comparisonCell = comparisonRow[config.comparisonData];\n    var comparison = rounder(LookerCharts.Utils.textForCell(comparisonCell), config.precision || 0);\n    var comparisonColor = \'black\'\n    if(isNaN(comparison)){\n        comparison = LookerCharts.Utils.textForCell(comparisonCell)\n    } else {\n      comparisonColor = comparison >= 0 ? \'green\' : \'red\';\n      comparison = comparison > 0 ? \'+\' + comparison : comparison;\n    }\n    if(LookerCharts.Utils.htmlForCell(comparisonCell) && config.useHTML){\n      comparison = LookerCharts.Utils.htmlForCell(comparisonCell)\n    }\n\n    var dataArray = [];\n    for (var row of data) {\n      var measureCell = row[config.sparklineData];\n      var dateCell = row[firstDimension];\n      dataArray.push({\n        "name": config.top_label,\n        "value": parseFloat(LookerCharts.Utils.textForCell(measureCell).replace(\'[^0-9.]/g,\',\'\')),\n        "date": LookerCharts.Utils.textForCell(dateCell),\n        "html": LookerCharts.Utils.textForCell(measureCell)\n      });\n    }\n\n    //  Montserrat:\n    //  https://fonts.gstatic.com/s/montserrat/v14/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2);}\\\'+\n\n    var styleEl = document.createElement(\'style\');\n    styleEl.setAttribute(\'type\', "text/css")\n    styleEl.innerHTML = \'@font-face \' +\n      \'{font-family: Open Sans;\' +\n      \'src: url( https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0b.woff2 );}\' +\n      \'div {font-family: Open Sans;};\'\n\n\n    document.head.appendChild(styleEl);\n  \n    var onClick = () => window.alert(\'Popup Modal placeholder\')\n\n\n    element.innerHTML = `\n         \n         <div class="headerdiv" style=" font-style: normal; font-weight: 300; font-size: 16px;" onclick="${onClick()}"=>\n         ${config.top_label}\n         <div style="display: flex; align-items: center; gap: 15px;">\n          <div style="font-size: ${config.headerFontSize}px; font-weight: bolder;">${header} ${config.units || \'\'}</div>\n          <div style="font-size: ${config.comparisonFontSize}px; font-weight: bolder; color:${comparisonColor};">${comparison}%</div>\n         </div>\n          <svg class="sparkline" width="${element.offsetWidth}" height="${element.offsetHeight - 32}" stroke-width="${config.strokeWidth}"\n          stroke="${config.stroke}"  fill="${config.fill}">\n            \n    </svg>\n          <span class="tooltip" style="position: absolute; \n            background: rgba(0, 0, 0, .7);\n            color: #fff;\n            padding: 2px 5px;\n            font-size: 12px;\n            white-space: nowrap;\n            z-index: 9999;\n          }" hidden="true"></span>`;\n\n    _fnando_sparkline__WEBPACK_IMPORTED_MODULE_0___default()(document.querySelector(".sparkline"), dataArray, sparkline_options);\n    \n    // Apply the gradient fill to the sparkline after it has been rendered\n    setTimeout(() => {\n        const sparklineSvg = document.querySelector(".sparkline");\n        let defs = document.createElementNS(\'http://www.w3.org/2000/svg\', \'defs\');\n        defs.innerHTML = `<linearGradient id="gradientFill" x1="0%" y1="0%" x2="0%" y2="100%">\n          <stop offset="0%" stop-color="${config.fill}" />\n          <stop offset="100%" stop-color="white" stop-opacity="0" />`\n        sparklineSvg.appendChild(defs)\n        const fillPath = sparklineSvg.querySelector(\'.sparkline--fill\');\n        fillPath.setAttribute(\'fill\', \'url(#gradientFill)\');\n        \n    }, 10); // Adjust the timeout as necessary\n\n    doneRendering()\n  }\n});\n\nconst rounder = (float, digits) => {\n  let rounded = Math.round(float * 10 ** digits) / 10 ** digits;\n  return rounded;\n};\n\n\n\n//# sourceURL=webpack:///./src/visualizations/sparkline_with_single_value.js?')}},__webpack_module_cache__={};function __webpack_require__(e){var n=__webpack_module_cache__[e];if(void 0!==n)return n.exports;var t=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e](t,t.exports,__webpack_require__),t.exports}__webpack_require__.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return __webpack_require__.d(n,{a:n}),n},__webpack_require__.d=(e,n)=>{for(var t in n)__webpack_require__.o(n,t)&&!__webpack_require__.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:n[t]})},__webpack_require__.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),__webpack_require__.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var __webpack_exports__=__webpack_require__(731);return __webpack_exports__})()));