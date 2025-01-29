const t$1=window,e$2=t$1.ShadowRoot&&(void 0===t$1.ShadyCSS||t$1.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$3=Symbol(),n$3=new WeakMap;let o$3=class o{constructor(t,e,o){if(this._$cssResult$=!0,o!==s$3)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let e=this.o;const o=this.t;if(e$2&&void 0===e){const t=void 0!==o&&1===o.length;t&&(e=n$3.get(o)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&n$3.set(o,e))}return e}toString(){return this.cssText}};const r$2=t=>new o$3("string"==typeof t?t:t+"",void 0,s$3),i$1=(i,...t)=>{const e=1===i.length?i[0]:t.reduce((t,e,o)=>t+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(e)+i[o+1],i[0]);return new o$3(e,i,s$3)},S$1=(i,t)=>{e$2?i.adoptedStyleSheets=t.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):t.forEach(t=>{const e=document.createElement("style"),o=t$1.litNonce;void 0!==o&&e.setAttribute("nonce",o),e.textContent=t.cssText,i.appendChild(e)})},c$1=e$2?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let o="";for(const t of e.cssRules)o+=t.cssText;return r$2(o)})(t):t;var s$2;const e$1=window,r$1=e$1.trustedTypes,h$1=r$1?r$1.emptyScript:"",o$2=e$1.reactiveElementPolyfillSupport,n$2={toAttribute(t,e){switch(e){case Boolean:t=t?h$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=null!==t;break;case Number:o=null===t?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch(t){o=null}}return o}},a$1=(t,e)=>e!==t&&(e==e||t==t),l$2={attribute:!0,type:String,converter:n$2,reflect:!1,hasChanged:a$1},d$1="finalized";let u$1=class u extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const i=[];return this.elementProperties.forEach((t,e)=>{const o=this._$Ep(e,t);void 0!==o&&(this._$Ev.set(o,e),i.push(o))}),i}static createProperty(o,i=l$2){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(o,i),!i.noAccessor&&!this.prototype.hasOwnProperty(o)){const t="symbol"==typeof o?Symbol():"__"+o,e=this.getPropertyDescriptor(o,t,i);void 0!==e&&Object.defineProperty(this.prototype,o,e)}}static getPropertyDescriptor(o,i,r){return{get(){return this[i]},set(t){const e=this[o];this[i]=t,this.requestUpdate(o,e,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||l$2}static finalize(){if(this.hasOwnProperty(d$1))return!1;this[d$1]=!0;const o=Object.getPrototypeOf(this);if(o.finalize(),void 0!==o.h&&(this.h=[...o.h]),this.elementProperties=new Map(o.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const o=this.properties,e=[...Object.getOwnPropertyNames(o),...Object.getOwnPropertySymbols(o)];for(const t of e)this.createProperty(t,o[t])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const o=[];if(Array.isArray(e)){const t=new Set(e.flat(1/0).reverse());for(const e of t)o.unshift(c$1(e))}else void 0!==e&&o.push(c$1(e));return o}static _$Ep(t,e){const o=e.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach(t=>t(this))}addController(t){var e,o;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(o=t.hostConnected)||void 0===o||o.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return S$1(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$EO(e,o,i=l$2){var r;const a=this.constructor._$Ep(e,i);if(void 0!==a&&!0===i.reflect){const t=(void 0!==(null===(r=i.converter)||void 0===r?void 0:r.toAttribute)?i.converter:n$2).toAttribute(o,i.type);this._$El=e,null==t?this.removeAttribute(a):this.setAttribute(a,t),this._$El=null}}_$AK(e,o){var i;const r=this.constructor,a=r._$Ev.get(e);if(void 0!==a&&this._$El!==a){const e=r.getPropertyOptions(a),t="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==(null===(i=e.converter)||void 0===i?void 0:i.fromAttribute)?e.converter:n$2;this._$El=a,this[a]=t.fromAttribute(o,e.type),this._$El=null}}requestUpdate(t,e,o){let i=!0;void 0!==t&&(((o=o||this.constructor.getPropertyOptions(t)).hasChanged||a$1)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===o.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,o))):i=!1),!this.isUpdatePending&&i&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((t,e)=>this[e]=t),this._$Ei=void 0);let e=!1;const o=this._$AL;try{e=this.shouldUpdate(o),e?(this.willUpdate(o),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)}),this.update(o)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(o)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach(t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach((t,e)=>this._$EO(e,this[e],t)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};u$1[d$1]=!0,u$1.elementProperties=new Map,u$1.elementStyles=[],u$1.shadowRootOptions={mode:"open"},null==o$2||o$2({ReactiveElement:u$1}),(null!==(s$2=e$1.reactiveElementVersions)&&void 0!==s$2?s$2:e$1.reactiveElementVersions=[]).push("1.6.2");var t;const i=window,s$1=i.trustedTypes,e=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,o$1="$lit$",n$1=`lit$${(Math.random()+"").slice(9)}$`,l$1="?"+n$1,h=`<${l$1}>`,r=document,u=()=>r.createComment(""),d=t=>null===t||"object"!=typeof t&&"function"!=typeof t,c=Array.isArray,v=t=>c(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),a="[ \t\n\f\r]",f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${a}(?:([^\\s"'>=/]+)(${a}*=${a}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,w=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),x=w(1),T=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),E=new WeakMap,C=r.createTreeWalker(r,129,null,!1);function P(t,o){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e?e.createHTML(o):o}const V=(s,t)=>{const n=s.length-1,l=[];let c,d=2===t?"<svg>":"",u=f;for(let a=0;a<n;a++){const n=s[a];let t,e,o=-1,i=0;for(;i<n.length&&(u.lastIndex=i,e=u.exec(n),null!==e);)i=u.lastIndex,u===f?"!--"===e[1]?u=_:void 0!==e[1]?u=m:void 0!==e[2]?(y.test(e[2])&&(c=RegExp("</"+e[2],"g")),u=p):void 0!==e[3]&&(u=p):u===p?">"===e[0]?(u=null!=c?c:f,o=-1):void 0===e[1]?o=-2:(o=u.lastIndex-e[2].length,t=e[1],u=void 0===e[3]?p:'"'===e[3]?$:g):u===$||u===g?u=p:u===_||u===m?u=f:(u=p,c=void 0);const r=u===p&&s[a+1].startsWith("/>")?" ":"";d+=u===f?n+h:o>=0?(l.push(t),n.slice(0,o)+o$1+n.slice(o)+n$1+r):n+n$1+(-2===o?(l.push(void 0),a):r)}return[P(s,d+(s[n]||"<?>")+(2===t?"</svg>":"")),l]};class N{constructor({strings:e,_$litType$:o},t){let i;this.parts=[];let r=0,a=0;const s=e.length-1,n=this.parts,[l,c]=V(e,o);if(this.el=N.createElement(l,t),C.currentNode=this.el.content,2===o){const e=this.el.content,o=e.firstChild;o.remove(),e.append(...o.childNodes)}for(;null!==(i=C.nextNode())&&n.length<s;){if(1===i.nodeType){if(i.hasAttributes()){const e=[];for(const o of i.getAttributeNames())if(o.endsWith(o$1)||o.startsWith(n$1)){const t=c[a++];if(e.push(o),void 0!==t){const e=i.getAttribute(t.toLowerCase()+o$1).split(n$1),o=/([.?@])?(.*)/.exec(t);n.push({type:1,index:r,name:o[2],strings:e,ctor:"."===o[1]?H:"?"===o[1]?L:"@"===o[1]?z:k})}else n.push({type:6,index:r})}for(const o of e)i.removeAttribute(o)}if(y.test(i.tagName)){const e=i.textContent.split(n$1),o=e.length-1;if(o>0){i.textContent=s$1?s$1.emptyScript:"";for(let t=0;t<o;t++)i.append(e[t],u()),C.nextNode(),n.push({type:2,index:++r});i.append(e[o],u())}}}else if(8===i.nodeType)if(i.data===l$1)n.push({type:2,index:r});else{let t=-1;for(;-1!==(t=i.data.indexOf(n$1,t+1));)n.push({type:7,index:r}),t+=n$1.length-1}r++}}static createElement(t,e){const o=r.createElement("template");return o.innerHTML=t,o}}function S(t,e,o=t,i){var r,a,s,n;if(e===T)return e;let l=void 0!==i?null===(r=o._$Co)||void 0===r?void 0:r[i]:o._$Cl;const c=d(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(a=null==l?void 0:l._$AO)||void 0===a||a.call(l,!1),void 0===c?l=void 0:(l=new c(t),l._$AT(t,o,i)),void 0!==i?(null!==(s=(n=o)._$Co)&&void 0!==s?s:n._$Co=[])[i]=l:o._$Cl=l),void 0!==l&&(e=S(t,l._$AS(t,e.values),l,i)),e}class M{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:o},parts:i}=this._$AD,a=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:r).importNode(o,!0);C.currentNode=a;let s=C.nextNode(),n=0,l=0,c=i[0];for(;void 0!==c;){if(n===c.index){let t;2===c.type?t=new R(s,s.nextSibling,this,e):1===c.type?t=new c.ctor(s,c.name,c.strings,this,e):6===c.type&&(t=new Z(s,this,e)),this._$AV.push(t),c=i[++l]}n!==(null==c?void 0:c.index)&&(s=C.nextNode(),n++)}return C.currentNode=r,a}v(e){let o=0;for(const t of this._$AV)void 0!==t&&(void 0!==t.strings?(t._$AI(e,t,o),o+=t.strings.length-2):t._$AI(e[o])),o++}}class R{constructor(t,e,o,i){var r;this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=i,this._$Cp=null===(r=null==i?void 0:i.isConnected)||void 0===r||r}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=S(this,t,e),d(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==T&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):v(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==A&&d(this._$AH)?this._$AA.nextSibling.data=t:this.$(r.createTextNode(t)),this._$AH=t}g(t){var e;const{values:o,_$litType$:i}=t,r="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=N.createElement(P(i.h,i.h[0]),this.options)),i);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===r)this._$AH.v(o);else{const t=new M(r,this),e=t.u(this.options);t.v(o),this.$(e),this._$AH=t}}_$AC(t){let e=E.get(t.strings);return void 0===e&&E.set(t.strings,e=new N(t)),e}T(e){c(this._$AH)||(this._$AH=[],this._$AR());const o=this._$AH;let i,r=0;for(const t of e)r===o.length?o.push(i=new R(this.k(u()),this.k(u()),this,this.options)):i=o[r],i._$AI(t),r++;r<o.length&&(this._$AR(i&&i._$AB.nextSibling,r),o.length=r)}_$AR(t=this._$AA.nextSibling,e){var o;for(null===(o=this._$AP)||void 0===o||o.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class k{constructor(t,e,o,i,r){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=A}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(o,i=this,r,a){const s=this.strings;let n=!1;if(void 0===s)o=S(this,o,i,0),n=!d(o)||o!==this._$AH&&o!==T,n&&(this._$AH=o);else{const a=o;let t,e;for(o=s[0],t=0;t<s.length-1;t++)e=S(this,a[r+t],i,t),e===T&&(e=this._$AH[t]),n||(n=!d(e)||e!==this._$AH[t]),e===A?o=A:o!==A&&(o+=(null!=e?e:"")+s[t+1]),this._$AH[t]=e}n&&!a&&this.j(o)}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class H extends k{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===A?void 0:t}}const I=s$1?s$1.emptyScript:"";class L extends k{constructor(){super(...arguments),this.type=4}j(t){t&&t!==A?this.element.setAttribute(this.name,I):this.element.removeAttribute(this.name)}}class z extends k{constructor(t,e,o,i,r){super(t,e,o,i,r),this.type=5}_$AI(t,e=this){var o;if((t=null!==(o=S(this,t,e,0))&&void 0!==o?o:A)===T)return;const i=this._$AH,r=t===A&&i!==A||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==A&&(i===A||r);r&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,o;"function"==typeof this._$AH?this._$AH.call(null!==(o=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==o?o:this.element,t):this._$AH.handleEvent(t)}}class Z{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t)}}const B=i.litHtmlPolyfillSupport;null==B||B(N,R),(null!==(t=i.litHtmlVersions)&&void 0!==t?t:i.litHtmlVersions=[]).push("2.7.5");const D=(t,e,o)=>{var i,r;const a=null!==(i=null==o?void 0:o.renderBefore)&&void 0!==i?i:e;let s=a._$litPart$;if(void 0===s){const t=null!==(r=null==o?void 0:o.renderBefore)&&void 0!==r?r:null;a._$litPart$=s=new R(e.insertBefore(u(),t),t,void 0,null!=o?o:{})}return s._$AI(t),s};var l,o;class s extends u$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const o=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=o.firstChild),o}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return T}}s.finalized=!0,s._$litElement$=!0,null===(l=globalThis.litElementHydrateSupport)||void 0===l||l.call(globalThis,{LitElement:s});const n=globalThis.litElementPolyfillSupport;null==n||n({LitElement:s});(null!==(o=globalThis.litElementVersions)&&void 0!==o?o:globalThis.litElementVersions=[]).push("3.3.2");const DEFAULT_EMOJIS="👍,thumbs-up;😄,smile-face;🎉,party-popper;😕,confused-face;❤️,red-heart;🚀,rocket;👀,eyes;👎,thumbs-down;";class EmojiReaction extends s{static properties={showAvailable:{attribute:false},availableReactions:{attribute:false},availableArrayString:{},endpoint:{},reactTargetId:{},theme:{}};static styles=i$1`
    .container {
      --start-smile-border-color-default: #d0d7de;
      --start-smile-border-color-hover-default: #1f232826;
      --start-smile-bg-color-default: #f6f8fa;
      --start-smile-svg-fill-color-default: #656d76;
      --reaction-got-not-reacted-bg-color-default: #fff;
      --reaction-got-not-reacted-bg-color-hover-default: #eaeef2;
      --reaction-got-not-reacted-border-color-default: #d0d7de;
      --reaction-got-not-reacted-text-color-default: #656d76;
      --reaction-got-reacted-bg-color-default: #ddf4ff;
      --reaction-got-reacted-bg-color-hover-default: #b6e3ff;
      --reaction-got-reacted-border-color-default: #0969da;
      --reaction-got-reacted-text-color-default: #0969da;
      --reaction-available-popup-bg-color-default: #fff;
      --reaction-available-popup-border-color-default: #d0d7de;
      --reaction-available-popup-box-shadow-default: #8c959f33 0px 8px 24px 0px;
      --reaction-available-emoji-reacted-bg-color-default: #ddf4ff;
      --reaction-available-emoji-bg-color-hover-default: #f3f4f6;
      --reaction-available-emoji-z-index-default: 100;
      --reaction-available-mask-z-index-default: 80;
    }
    .container-dark {
      --start-smile-border-color-default: #21262d;
      --start-smile-border-color-hover-default: #8b949e;
      --start-smile-bg-color-default: #30363d;
      --start-smile-svg-fill-color-default: #7d8590;
      --reaction-got-not-reacted-bg-color-default: #00000000;
      --reaction-got-not-reacted-bg-color-hover-default: #21262d;
      --reaction-got-not-reacted-border-color-default: #30363d;
      --reaction-got-not-reacted-text-color-default: #7d8590;
      --reaction-got-reacted-bg-color-default: #388bfd1a;
      --reaction-got-reacted-bg-color-hover-default: #0c2d6b;
      --reaction-got-reacted-border-color-default: #1f6feb;
      --reaction-got-reacted-text-color-default: #2f81f7;
      --reaction-available-popup-bg-color-default: #161b22;
      --reaction-available-popup-border-color-default: #30363d;
      --reaction-available-popup-box-shadow-default: #010409 0px 8px 24px 0px;
      --reaction-available-emoji-reacted-bg-color-default: #388bfd1a;
      --reaction-available-emoji-bg-color-hover-default: #30363d;
      --reaction-available-emoji-z-index-default: 100;
      --reaction-available-mask-z-index-default: 80;
    }
    .anim-scale-in {
      animation-name: scale-in;
      animation-duration: .15s;
      animation-timing-function: cubic-bezier(0.2, 0, 0.13, 1.5);
    }

    @keyframes scale-in {
      0% {
          opacity: 0;
          transform: scale(0.5);
      }
      100% {
          opacity: 1;
          transform: scale(1);
      }
    }
  `;render(){const t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";return x`
    <style>
      #start-smile {
        border-width: 1px;
        border-style: solid;
        border-color: var(--start-smile-border-color, var(--start-smile-border-color-default));
        background-color: var(--start-smile-bg-color, var(--start-smile-bg-color-default));
      }
      #start-smile:hover {
        border-color: var(--start-smile-border-color-hover, var(--start-smile-border-color-hover-default)) !important;
      }
      #start-smile-svg {
        fill: var(--start-smile-svg-fill-color, var(--start-smile-svg-fill-color-default));
      }
      .reaction-got-not-reacted {
        background-color: var(--reaction-got-not-reacted-bg-color, var(--reaction-got-not-reacted-bg-color-default));
        border-width: 1px;
        border-style: solid;
        border-color: var(--reaction-got-not-reacted-border-color, var(--reaction-got-not-reacted-border-color-default));
        color: var(--reaction-got-not-reacted-text-color, var(--reaction-got-not-reacted-text-color-default));
      }
      .reaction-got-not-reacted:hover {
        background-color: var(--reaction-got-not-reacted-bg-color-hover, var(--reaction-got-not-reacted-bg-color-hover-default));
      }
      .reaction-got-reacted {
        background-color: var(--reaction-got-reacted-bg-color, var(--reaction-got-reacted-bg-color-default));
        border-width: 1px;
        border-style: solid;
        border-color: var(--reaction-got-reacted-border-color, var(--reaction-got-reacted-border-color-default));
        color: var(--reaction-got-reacted-text-color, var(--reaction-got-reacted-text-color-default));
      }
      .reaction-got-reacted:hover {
        background-color: var(--reaction-got-reacted-bg-color-hover, var(--reaction-got-reacted-bg-color-hover-default));
      }
      .reaction-available-popup {
        background-color: var(--reaction-available-popup-bg-color, var(--reaction-available-popup-bg-color-default));
        border-width: 1px;
        border-style: solid;
        border-color: var(--reaction-available-popup-border-color, var(--reaction-available-popup-border-color-default));
        box-shadow: var(--reaction-available-popup-box-shadow, var(--reaction-available-popup-box-shadow-default));
      }
      .reaction-available-emoji {
        z-index: var(--reaction-available-emoji-z-index, var(--reaction-available-emoji-z-index-default));
      }
      .reaction-available-emoji:hover {
        background-color: var(--reaction-available-emoji-bg-color-hover, var(--reaction-available-emoji-bg-color-hover-default));
      }
      .reaction-available-emoji-reacted {
        background-color: var(--reaction-available-emoji-reacted-bg-color, var(--reaction-available-emoji-reacted-bg-color-default));
      }
      .reaction-available-popup::before {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: var(--reaction-available-mask-z-index, var(--reaction-available-mask-z-index-default));
        display: block;
        cursor: default;
        content: " ";
        background: transparent;
      }
    </style>
    <div style="flex-wrap: nowrap; max-width: 100%; display: flex; gap: 0.375rem; height: 1.5rem;" class="${this?.theme==="dark"||this?.theme==="system"&&t==="dark"?"container-dark":"container"}">
      <div style="position: relative; user-select: none; display: flex;">
        <div id="start-smile" @click="${this._showAvailable}"
          style="display: flex; align-self: center; border-radius: 800px; width: 1rem; height: 1rem; line-height: 1rem; padding: 0.25rem;">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="1rem" height="1rem" id="start-smile-svg" style="cursor: pointer;">
            <path
              d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm3.82 1.636a.75.75 0 0 1 1.038.175l.007.009c.103.118.22.222.35.31.264.178.683.37 1.285.37.602 0 1.02-.192 1.285-.371.13-.088.247-.192.35-.31l.007-.008a.75.75 0 0 1 1.222.87l-.022-.015c.02.013.021.015.021.015v.001l-.001.002-.002.003-.005.007-.014.019a2.066 2.066 0 0 1-.184.213c-.16.166-.338.316-.53.445-.63.418-1.37.638-2.127.629-.946 0-1.652-.308-2.126-.63a3.331 3.331 0 0 1-.715-.657l-.014-.02-.005-.006-.002-.003v-.002h-.001l.613-.432-.614.43a.75.75 0 0 1 .183-1.044ZM12 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM5 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm5.25 2.25.592.416a97.71 97.71 0 0 0-.592-.416Z">
            </path>
          </svg>
        </div>
        <div class="anim-scale-in reaction-available-popup" @click=${this._closePopup} style="display: ${this.showAvailable?"flex":"none"}; user-select: none; position: absolute; top: -3rem; font-size: 0.875rem; border-radius: 0.375rem; padding: 0 0.125rem; z-index: 1">
          <!-- reactions available -->
          ${this.availableReactions.map(t=>x`
            <span @click=${this._react} data-name="${t.reaction_name}" class="reaction-available-emoji ${t.meReacted?"reaction-available-emoji-reacted":""}" style="cursor: pointer; margin: 0.25rem 0.125rem; padding: 0.25rem; border-radius: 0.375rem;">${t.emoji}</span>
          `)}
        </div>
      </div>
      <div style="display: flex; gap: 0.375rem;">
        ${this.availableReactions.map(t=>x`
          <div @click=${this._react} data-name="${t.reaction_name}" class="${t.meReacted?"reaction-got-reacted":"reaction-got-not-reacted"}" style="display: ${t?.count&&t.count>0?"flex":"none"}; user-select: none; cursor: pointer; justify-content: center; align-items: center; border-radius: 108px; padding: 0 0.25rem; font-size: 0.75rem;">
            <span style="pointer-events: none;">${t.emoji}</span><span style="padding:0 0.375rem; pointer-events: none;">${t.count}</span>
          </div>
        `)}
      </div>
    </div>
    `}constructor(){super();this.showAvailable=false;this.availableReactions=[]}connectedCallback(){super.connectedCallback();this.initReactions()}async initReactions(){let t=this?.availableArrayString;if(!t){t=DEFAULT_EMOJIS}const o=t.split(";").map(t=>{const[e,o]=t.split(",");if(!e||!o){return null}return{emoji:e,reaction_name:o}}).filter(t=>t);if(!this?.endpoint){this.endpoint="https://api.emaction.cool"}let e="";const i=document.head.querySelector("link[rel='canonical']");e=i&&i.href?i.href:window.location.href;const r=new URL(e);const a=r.origin+r.pathname+r.search;if(!this?.reactTargetId){this.reactTargetId=await this._sha256(a)}const{data:{reactionsGot:s}}=await fetch(this.endpoint+"/reactions?"+new URLSearchParams({targetId:this.reactTargetId}),{method:"GET"}).then(t=>t.json()).then(t=>{if(!t?.data||!Array.isArray(t?.data?.reactionsGot)){throw new Error("获取 reactions 出错！")}return t});s.forEach(e=>{o.forEach(t=>{if(e.reaction_name===t.reaction_name){t.count=e.count}})});const n=`meReactedReactions_${this.reactTargetId}`;const l=JSON.parse(window.localStorage.getItem(n)||"[]");l.forEach(e=>{o.forEach(t=>{if(e===t.reaction_name){t.meReacted=true}})});this.availableReactions=o}_closePopup(t){console.log(t.target);this.showAvailable=false}async _react(t){const{name:e}=t.target.dataset;const o=this.availableReactions.find(t=>t.reaction_name===e);if(!o){console.error("未知的 reaction!");return}const i=o?.meReacted?true:false;const r=Math.max(0,o?.count?o.count+(i?-1:1):i?0:1);const a=!o.meReacted;this.availableReactions=this.availableReactions.map(t=>{if(t.reaction_name===e){t.count=r;t.meReacted=a}return t});this.showAvailable=false;await fetch(this.endpoint+"/reaction?"+new URLSearchParams({targetId:this.reactTargetId,reaction_name:e,diff:i?-1:1}),{method:"PATCH"});const s=`meReactedReactions_${this.reactTargetId}`;const n=new Set(JSON.parse(window.localStorage.getItem(s)||"[]"));if(i){n.delete(e)}else{n.add(e)}window.localStorage.setItem(s,JSON.stringify(Array.from(n)))}_showAvailable(t){t.preventDefault();this.showAvailable=!this.showAvailable}async _sha256(t){return Array.from(new Uint8Array(await crypto.subtle.digest("sha-256",(new TextEncoder).encode(t)))).map(t=>t.toString(16).padStart(2,"0")).join("")}}customElements.define("emoji-reaction",EmojiReaction);export{EmojiReaction};