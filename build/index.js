(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{3:function(e,t,n){}}]),function(e){function t(t){for(var r,i,a=t[0],u=t[1],l=t[2],s=0,f=[];s<a.length;s++)i=a[s],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&f.push(o[i][0]),o[i]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);for(p&&p(t);f.length;)f.shift()();return c.push.apply(c,l||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],r=!0,a=1;a<n.length;a++){var u=n[a];0!==o[u]&&(r=!1)}r&&(c.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},o={0:0},c=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var a=window.webpackJsonp=window.webpackJsonp||[],u=a.push.bind(a);a.push=t,a=a.slice();for(var l=0;l<a.length;l++)t(a[l]);var p=u;c.push([5,1]),n()}([function(e,t){!function(){e.exports=this.wp.i18n}()},function(e,t){!function(){e.exports=this.wp.element}()},function(e,t){!function(){e.exports=this.wp.blocks}()},,function(e,t,n){},function(e,t,n){"use strict";n.r(t);var r=n(2),o=n(0),c=(n(3),n(1));n(4);Object(r.registerBlockType)("create-block/image-comparison",{title:Object(o.__)("Image Comparison","create-block"),description:Object(o.__)("Example block written with ESNext standard and JSX support – build step required.","create-block"),category:"widgets",icon:"smiley",supports:{html:!1},edit:function(e){var t=e.className;return Object(c.createElement)("p",{className:t},Object(o.__)("Image Comparison – hello from the editor!","create-block"))},save:function(){return Object(c.createElement)("p",null,Object(o.__)("Image Comparison – hello from the saved content!","create-block"))}})}]);