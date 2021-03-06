/**
 * @file 嵌入执行开始脚本
 * @author wangjie
 */

(function (global) {
    //  在开发环境下，直接使用window挂载amd loader
    //  因为开发环境define是直接访问window的，只有压缩过才会包装为访问局部define
    //  在编译脚本里会替换window 为false
    var embedContainer = window || document.getElementById('embed_contain');
    !function(n){function e(n,e){return N(n,e)}function t(n,e,t){if(null==t&&(null==e?(t=n,n=null):(t=e,e=null,n instanceof Array&&(e=n,n=null))),null!=t){var r=window.opera;if(!n&&document.attachEvent&&(!r||"[object Opera]"!==r.toString())){var a=R();n=a&&a.getAttribute("data-require-id")}n?(i(n,e,t),P&&clearTimeout(P)):C[0]={deps:e,factory:t}}}function r(){var n=H.config[this.id];return n&&"object"==typeof n?n:{}}function i(n,e,t){O[n]||(O[n]={id:n,depsDec:e,deps:e||["require","exports","module"],factoryDeps:[],factory:t,exports:{},config:r,state:F,require:q(n),depMs:[],depMkv:{},depRs:[],depPMs:[]})}function a(n){var e=O[n];if(e&&!c(n,T)){var t=e.deps,r=e.factory,i=0;"function"==typeof r&&(i=Math.min(r.length,t.length),!e.depsDec&&r.toString().replace(/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,"").replace(/require\(\s*(['"'])([^'"]+)\1\s*\)/g,function(n,e,r){t.push(r)}));var a=[];U(t,function(t,r){var o,u,f=I(t),c=A(f.mod,n);c&&!_[c]?(f.res&&(u={id:t,mod:c,res:f.res},j[c]=1,e.depPMs.push(c),e.depRs.push(u)),o=e.depMkv[c],o||(o={id:f.mod,absId:c,hard:i>r},e.depMs.push(o),e.depMkv[c]=o,a.push(c))):o={absId:c},i>r&&e.factoryDeps.push(u||o)}),e.state=T,f(n),m(a)}}function o(){for(var n in j)u(n),s(n)}function u(n){function e(n){if(!c(n,T))return!1;if(c(n,z)||t[n])return!0;t[n]=1;var r=O[n],i=!0;return U(r.depMs,function(n){return i=e(n.absId)}),i&&U(r.depRs,function(n){return i=!(!n.absId||!c(n.absId,B))}),i&&(r.state=z),i}var t={};e(n)}function f(e){function t(){if(!r&&i.state===z){r=1;var t=1,a=[];if(U(i.factoryDeps,function(n){var e=n.absId;return _[e]||(s(e),c(e,B))?void a.push(e):(t=0,!1)}),t){try{var o=l(a,{require:i.require,exports:i.exports,module:i}),u=i.factory,f="function"==typeof u?u.apply(n,o):u;null!=f&&(i.exports=f),i.invokeFactory=null,delete j[e]}catch(d){if(r=0,/^\[MODULE_MISS\]"([^"]+)/.test(d.message)){var v=i.depMkv[RegExp.$1];return void(v&&(v.hard=1))}throw d}p(e)}}}var r,i=O[e];i.invokeFactory=t,U(i.depPMs,function(n){d(n,function(){U(i.depRs,function(t){t.absId||t.mod!==n||(t.absId=A(t.id,e),m([t.absId],o))})})})}function c(n,e){return O[n]&&O[n].state>=e}function s(n){var e=O[n];e&&e.invokeFactory&&e.invokeFactory()}function l(n,e){var t=[];return U(n,function(n,r){t[r]=e[n]||v(n)}),t}function d(n,e){if(c(n,B))return void e();var t=L[n];t||(t=L[n]=[]),t.push(e)}function p(n){var e=L[n]||[],t=O[n];t.state=B;for(var r=e.length;r--;)e[r]();e.length=0,delete L[n]}function v(n){return c(n,B)?O[n].exports:null}function g(n){U(C,function(e){i(n,e.deps,e.factory)}),C.length=0,a(n)}function m(e,t,r,i){function u(){if(!f){var r=1;U(e,function(n){return _[n]?void 0:r=!!c(n,B)}),r&&(f=1,"function"==typeof t&&t.apply(n,l(e,_)))}}if("string"==typeof e){if(s(e),!c(e,B))throw new Error('[MODULE_MISS]"'+e+'" is not exists!');return v(e)}i=i||{};var f=0;e instanceof Array&&(u(),f||(U(e,function(n){_[n]||c(n,B)||(d(n,u),i[n]||(n.indexOf("!")>0?y:h)(n,r),a(n))}),o()))}function h(n){function e(){var e=t.readyState;if("undefined"==typeof e||/^(loaded|complete)$/.test(e)){t.onload=t.onreadystatechange=null,t=null,g(n);for(var r in j)a(r);o()}}if(!G[n]&&!O[n]){G[n]=1;var t=document.createElement("script");t.setAttribute("charset", "utf-8");t.setAttribute("data-require-id",n),t.src=M(n+".js"),t.async=!0,t.readyState?t.onreadystatechange=e:t.onload=e,$(t)}}function y(n,e){function t(e){o.exports=e||!0,p(n)}function i(i){var o=e?O[e].require:N;i.load(a.res,o,t,r.call({id:n}))}if(!O[n]){var a=I(n),o={id:n,state:T};O[n]=o,t.fromText=function(n,e){j[n]=1,new Function(e)(),g(n)},i(v(a.mod))}}function b(n,e){var t=S(n,1,e);return t.sort(D),t}function k(){H.baseUrl=H.baseUrl.replace(/\/$/,"")+"/",J=b(H.paths),Q=b(H.map,1),U(Q,function(n){n.v=b(n.v)}),K=[],U(H.packages,function(n){var e=n;"string"==typeof n&&(e={name:n.split("/")[0],location:n,main:"main"}),e.location=e.location||e.name,e.main=(e.main||"main").replace(/\.js$/i,""),e.reg=w(e.name),K.push(e)}),K.sort(D),V=b(H.urlArgs,1),W=b(H.noRequests),U(W,function(n){var e=n.v,t={};n.v=t,e instanceof Array||(e=[e]),U(e,function(n){t[n]=1})})}function x(n,e,t){U(e,function(e){return e.reg.test(n)?(t(e.v,e.k,e),!1):void 0})}function M(n){var e=/(\.[a-z0-9]+)$/i,t=/(\?[^#]*)$/,r="",i=n,a="";t.test(n)&&(a=RegExp.$1,n=n.replace(t,"")),e.test(n)&&(r=RegExp.$1,i=n.replace(e,""));var o,u=i;return x(i,J,function(n,e){u=u.replace(e,n),o=1}),o||x(i,K,function(n,e,t){u=u.replace(t.name,t.location)}),/^([a-z]{2,10}:\/)?\//i.test(u)||(u=H.baseUrl+u),u+=r+a,x(i,V,function(n){u+=(u.indexOf("?")>0?"&":"?")+n}),u}function q(n){function e(e,r){if("string"==typeof e)return t[e]||(t[e]=m(A(e,n))),t[e];if(e instanceof Array){var i=[],a=[],o=[];U(e,function(e,t){var r=I(e),u=A(r.mod,n);a.push(u),j[u]=1,r.res?(i.push(u),o[t]=null):o[t]=u});var u={};U(a,function(n){var e;x(n,W,function(n){e=n}),e&&(e["*"]?u[n]=1:U(a,function(t){return e[t]?(u[n]=1,!1):void 0}))}),m(a,function(){U(o,function(t,r){null==t&&(o[r]=A(e[r],n))}),m(o,r,n)},n,u)}}var t={};return e.toUrl=function(e){return M(A(e,n))},e}function A(n,e){if(!n)return"";e=e||"";var t=I(n);if(!t)return n;var r=t.res,i=E(t.mod,e);if(U(K,function(n){var e=n.name;return e===i?(i=e+"/"+n.main,!1):void 0}),x(e,Q,function(n){x(i,n,function(n,e){i=i.replace(e,n)})}),r){var a=v(i);r=a.normalize?a.normalize(r,function(n){return A(n,e)}):A(r,e),i+="!"+r}return i}function E(n,e){if(0===n.indexOf(".")){var t=e.split("/"),r=n.split("/"),i=t.length-1,a=r.length,o=0,u=0;n:for(var f=0;a>f;f++){var c=r[f];switch(c){case"..":if(!(i>o))break n;o++,u++;break;case".":u++;break;default:break n}}return t.length=i-o,r=r.slice(u),t.concat(r).join("/")}return n}function I(n){var e=n.split("!");return e[0]?{mod:e[0],res:e[1]}:null}function S(n,e,t){var r=[];for(var i in n)if(n.hasOwnProperty(i)){var a={k:i,v:n[i]};r.push(a),e&&(a.reg="*"===i&&t?/^/:w(i))}return r}function R(){if(X)return X;if(Y&&"interactive"===Y.readyState)return Y;for(var n=document.getElementsByTagName("script"),e=n.length;e--;){var t=n[e];if("interactive"===t.readyState)return Y=t,t}}function $(n){X=n,ne?Z.insertBefore(n,ne):Z.appendChild(n),X=null}function w(n){return new RegExp("^"+n+"(/|$)")}function U(n,e){if(n instanceof Array)for(var t=0,r=n.length;r>t&&e(n[t],t)!==!1;t++);}function D(n,e){var t=n.k||n.name,r=e.k||e.name;return"*"===r?-1:"*"===t?1:r.length-t.length}var O={},j={},F=1,T=2,z=3,B=4,N=q();e.version="1.8.6",e.loader="esl",e.toUrl=N.toUrl;var P;t.amd={};var L={},_={require:e,exports:1,module:1},C=[],G={},H={baseUrl:"./",paths:{},config:{},map:{},packages:[],noRequests:{},urlArgs:{}};e.config=function(n){function e(n){i.push(n)}if(n){for(var t in H){var r=n[t],i=H[t];if(r)if("urlArgs"===t&&"string"==typeof r)H.urlArgs["*"]=r;else if(i instanceof Array)U(r,e);else if("object"==typeof i)for(var t in r)i[t]=r[t];else H[t]=r}k()}},k();var J,K,Q,V,W,X,Y,Z=document.getElementsByTagName("head")[0],ne=document.getElementsByTagName("base")[0];ne&&(Z=ne.parentNode),n.define||(n.define=t,n.require||(n.require=e),n.esl=e)}(embedContainer);
    var require = embedContainer.require;
    var define = embedContainer.define;

    require.config({
        baseUrl: '../src',
        paths: {},
        packages: [
        {
            name: 'ajax',
            location: './base',
            main: 'ajax'
        },
        {
            name: 'template',
            location: './common',
            main: 'template'
        },
        {
            name: 'event',
            location: './common',
            main: 'handle'
        },
        {
            name: 'dom',
            location: './common',
            main: 'dom'
        },
        {
            name: 'cl',
            location: './base',
            main: 'css'
        }
        ]
    });

    // 此行为了保存define的引用，防止压缩时把define压缩没了
    // 在编译后把这句话替换为main.js打包后的内容
    define('xxxxxx', [], function () {});

    require(['main'], function () {
            
    });
    
})(this);