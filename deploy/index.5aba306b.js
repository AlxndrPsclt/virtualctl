var $parcel$global=globalThis,$parcel$modules={},$parcel$inits={},parcelRequire=$parcel$global.parcelRequire94c2;null==parcelRequire&&((parcelRequire=function(t){if(t in $parcel$modules)return $parcel$modules[t].exports;if(t in $parcel$inits){var e=$parcel$inits[t];delete $parcel$inits[t];var i={id:t,exports:{}};return $parcel$modules[t]=i,e.call(i.exports,i,i.exports),i.exports}var s=Error("Cannot find module '"+t+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(t,e){$parcel$inits[t]=e},$parcel$global.parcelRequire94c2=parcelRequire);var parcelRegister=parcelRequire.register;parcelRegister("kQ28o",function(module,exports){if(window.customElements){let styles=document.createElement("style");styles.innerHTML=`#webaudioctrl-context-menu {
  display: none;
  position: absolute;
  z-index: 10;
  padding: 0;
  width: 100px;
  color:#eee;
  background-color: #268;
  border: solid 1px #888;
  box-shadow: 1px 1px 2px #888;
  font-family: sans-serif;
  font-size: 11px;
  line-height:1.7em;
  text-align:center;
  cursor:pointer;
  color:#fff;
  list-style: none;
}
#webaudioctrl-context-menu.active {
  display: block;
}
.webaudioctrl-context-menu__item {
  display: block;
  margin: 0;
  padding: 0;
  color: #000;
  background-color:#eee;
  text-decoration: none;
}
.webaudioctrl-context-menu__title{
  font-weight:bold;
}
.webaudioctrl-context-menu__item:last-child {
  margin-bottom: 0;
}
.webaudioctrl-context-menu__item:hover {
  background-color: #b8b8b8;
}
`,document.head.appendChild(styles);let midimenu=document.createElement("ul");midimenu.id="webaudioctrl-context-menu",midimenu.innerHTML=`<li class="webaudioctrl-context-menu__title">MIDI Learn</li>
<li class="webaudioctrl-context-menu__item" id="webaudioctrl-context-menu-learn" onclick="webAudioControlsWidgetManager.contextMenuLearn()">Learn</li>
<li class="webaudioctrl-context-menu__item" onclick="webAudioControlsWidgetManager.contextMenuClear()">Clear</li>
<li class="webaudioctrl-context-menu__item" onclick="webAudioControlsWidgetManager.contextMenuClose()">Close</li>
`;let opt={useMidi:0,preserveMidiLearn:0,preserveValue:0,midilearn:0,mididump:0,outline:null,knobSrc:null,knobSprites:null,knobWidth:null,knobHeight:null,knobDiameter:null,knobColors:"#e00;#000;#fff",sliderSrc:null,sliderWidth:null,sliderHeight:null,sliderKnobSrc:null,sliderKnobWidth:null,sliderKnobHeight:null,sliderDitchlength:null,sliderColors:"#e00;#333;#fcc",switchWidth:null,switchHeight:null,switchDiameter:null,switchColors:"#e00;#000;#fcc",paramWidth:null,paramHeight:null,paramFontSize:9,paramColors:"#fff;#000",valuetip:0,xypadColors:"#e00;#000;#fcc"};window.WebAudioControlsOptions&&Object.assign(opt,window.WebAudioControlsOptions);class WebAudioControlsWidget extends HTMLElement{constructor(){super(),this.addEventListener("keydown",this.keydown),this.addEventListener("mousedown",this.pointerdown,{passive:!1}),this.addEventListener("touchstart",this.pointerdown,{passive:!1}),this.addEventListener("wheel",this.wheel,{passive:!1}),this.addEventListener("mouseover",this.pointerover),this.addEventListener("mouseout",this.pointerout),this.addEventListener("contextmenu",this.contextMenu),this.hover=this.drag=0,document.body.appendChild(midimenu),this.basestyle=`
.webaudioctrl-tooltip{
  display:inline-block;
  position:absolute;
  margin:0 -1000px;
  z-index: 999;
  background:#eee;
  color:#000;
  border:1px solid #666;
  border-radius:4px;
  padding:5px 10px;
  text-align:center;
  left:0; top:0;
  font-size:11px;
  opacity:0;
  visibility:hidden;
}
.webaudioctrl-tooltip:before{
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -8px;
  border: 8px solid transparent;
  border-top: 8px solid #666;
}
.webaudioctrl-tooltip:after{
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -6px;
  border: 6px solid transparent;
  border-top: 6px solid #eee;
}
`,this.onblur=()=>{this.elem.style.outline="none"},this.onfocus=()=>{switch(+this.outline){case null:case 0:this.elem.style.outline="none";break;case 1:this.elem.style.outline="1px solid #444";break;default:this.elem.style.outline=this.outline}}}sendEvent(t){let e;(e=document.createEvent("HTMLEvents")).initEvent(t,!1,!0),this.dispatchEvent(e)}getAttr(t,e){let i=this.getAttribute(t);if(null==i)return e;if("number"==typeof e){if("true"==i)return 1;if(isNaN(i=+i))return 0}return i}showtip(t){function e(t,e,i){switch(i){case"x":return(0|t).toString(16);case"X":return(0|t).toString(16).toUpperCase();case"d":return(0|t).toString();case"f":return parseFloat(t).toFixed(e);case"s":return t.toString()}return""}function i(t,i){let s=t.indexOf("%"),h=s+1;s<0&&(h=t.length);let n=[0,0],o=0,l=0,r="";if(t.indexOf("%s")>=0)return t.replace("%s",i);for(;h<t.length;++h){if("dfxXs".indexOf(t[h])>=0){o=t[h];break}"."==t[h]?l=1:n[l]=10*n[l]+parseInt(t[h])}return r=e(i,n[1],o),n[0]>0&&(r=("               "+r).slice(-n[0])),r=t.replace(/%.*[xXdfs]/,r)}let s=this.tooltip;if((this.drag||this.hover)&&(this.valuetip&&(null==s?s="%s":0>s.indexOf("%")&&(s+=" : %s")),s)){this.ttframe.innerHTML=i(s,this.convValue),this.ttframe.style.display="inline-block",this.ttframe.style.width="auto",this.ttframe.style.height="auto",this.ttframe.style.transition="opacity 0.5s "+t+"s,visibility 0.5s "+t+"s",this.ttframe.style.opacity=.9,this.ttframe.style.visibility="visible";let e=this.getBoundingClientRect(),h=this.ttframe.getBoundingClientRect();document.documentElement.getBoundingClientRect(),this.ttframe.style.left=(e.width-h.width)*.5+1e3+"px",this.ttframe.style.top=-h.height-8+"px";return}this.ttframe.style.transition="opacity 0.1s "+t+"s,visibility 0.1s "+t+"s",this.ttframe.style.opacity=0,this.ttframe.style.visibility="hidden"}setupLabel(){this.labelpos=this.getAttr("labelpos","bottom 0px");let t=this.labelpos.split(" "),e="";switch(3==t.length&&(e=`translate(${t[1]},${t[2]})`),this.label.style.position="absolute",t[0]){case"center":this.label.style.top="50%",this.label.style.left="50%",this.label.style.transform=`translate(-50%,-50%) ${e}`;break;case"right":this.label.style.top="50%",this.label.style.left="100%",this.label.style.transform=`translateY(-50%) ${e}`;break;case"left":this.label.style.top="50%",this.label.style.left="0%",this.label.style.transform=`translate(-100%,-50%) ${e}`;break;case"bottom":this.label.style.top="100%",this.label.style.left="50%",this.label.style.transform=`translateX(-50%) ${e}`;break;case"top":this.label.style.top="0%",this.label.style.left="50%",this.label.style.transform=`translate(-50%,-100%) ${e}`}}pointerover(t){this.hover=1,this.showtip(.6)}pointerout(t){this.hover=0,this.showtip(0)}contextMenu(t){window.webAudioControlsWidgetManager&&this.midilearn&&webAudioControlsWidgetManager.contextMenuOpen(t,this),t.preventDefault(),t.stopPropagation()}setMidiController(t,e){this.listeningToThisMidiController(t,e)||(this.midiController={channel:t,cc:e},console.log("Added mapping for channel="+t+" cc="+e+" tooltip="+this.tooltip))}listeningToThisMidiController(t,e){let i=this.midiController;return(i.channel===t||i.channel<0)&&i.cc===e}processMidiEvent(t){let e=15&t.data[0],i=t.data[1];if("learn"==this.midiMode&&(this.setMidiController(e,i),webAudioControlsWidgetManager.contextMenuClose(),this.midiMode="normal",webAudioControlsWidgetManager.preserveMidiLearn()),this.listeningToThisMidiController(e,i)){if("WEBAUDIO-SWITCH"==this.tagName)switch(this.type){case"toggle":t.data[2]>=64&&this.setValue(1-this.value,!0);break;case"kick":this.setValue(t.data[2]>=64?1:0);break;case"radio":let e=document.querySelectorAll("webaudio-switch[type='radio'][group='"+this.group+"']");for(let t=0;t<e.length;++t)e[t]==this?e[t].setValue(1):e[t].setValue(0)}else{let e=this.min+(this.max-this.min)*t.data[2]/127;this.setValue(e,!0)}}}}try{customElements.define("webaudio-knob",class WebAudioKnob extends WebAudioControlsWidget{constructor(){super()}connectedCallback(){let root;if(root=this.attachShadow?this.attachShadow({mode:"open"}):this,root.innerHTML=`<style>
${this.basestyle}
:host{
  display:inline-block;
  margin:0;
  padding:0;
  cursor:pointer;
  font-family: sans-serif;
  font-size: 11px;
}
.webaudio-knob-body{
  display:inline-block;
  position:relative;
  margin:0;
  padding:0;
  vertical-align:bottom;
  white-space:pre;
}
</style>
<div class='webaudio-knob-body' tabindex='1' touch-action='none'><div class='webaudioctrl-tooltip'></div><div part="label" class="webaudioctrl-label"><slot></slot></div></div>
`,this.elem=root.childNodes[2],this.ttframe=this.elem.firstChild,this.label=this.ttframe.nextSibling,this.enable=this.getAttr("enable",1),this._src=this.getAttr("src",opt.knobSrc),this.hasOwnProperty("src")||Object.defineProperty(this,"src",{get:()=>this._src,set:t=>{this._src=t,this.setupImage()}}),this._value=this.getAttr("value",0),this.hasOwnProperty("value")||Object.defineProperty(this,"value",{get:()=>this._value,set:t=>{this._value=t,this.redraw()}}),this.defvalue=this.getAttr("defvalue",this._value),this._min=this.getAttr("min",0),this.hasOwnProperty("min")||Object.defineProperty(this,"min",{get:()=>this._min,set:t=>{this._min=+t,this.redraw()}}),this._max=this.getAttr("max",100),this.hasOwnProperty("max")||Object.defineProperty(this,"max",{get:()=>this._max,set:t=>{this._max=+t,this.redraw()}}),this._step=this.getAttr("step",1),this.hasOwnProperty("step")||Object.defineProperty(this,"step",{get:()=>this._step,set:t=>{this._step=+t,this.redraw()}}),this._sprites=this.getAttr("sprites",opt.knobSprites),this.hasOwnProperty("sprites")||Object.defineProperty(this,"sprites",{get:()=>this._sprites,set:t=>{this._sprites=t,this.setupImage()}}),this._width=this.getAttr("width",null),this.hasOwnProperty("width")||Object.defineProperty(this,"width",{get:()=>this._width,set:t=>{this._width=t,this.setupImage()}}),this._height=this.getAttr("height",null),this.hasOwnProperty("height")||Object.defineProperty(this,"height",{get:()=>this._height,set:t=>{this._height=t,this.setupImage()}}),this._diameter=this.getAttr("diameter",null),this.hasOwnProperty("diameter")||Object.defineProperty(this,"diameter",{get:()=>this._diameter,set:t=>{this._diameter=t,this.setupImage()}}),this._colors=this.getAttr("colors",opt.knobColors),this.hasOwnProperty("colors")||Object.defineProperty(this,"colors",{get:()=>this._colors,set:t=>{this._colors=t,this.setupImage()}}),this.outline=this.getAttr("outline",opt.outline),this.setupLabel(),this.log=this.getAttr("log",0),this.sensitivity=this.getAttr("sensitivity",1),this.valuetip=this.getAttr("valuetip",opt.valuetip),this.tooltip=this.getAttr("tooltip",null),this.conv=this.getAttr("conv",null),this.conv){let x=this._value;this.convValue=eval(this.conv),"function"==typeof this.convValue&&(this.convValue=this.convValue(x))}else this.convValue=this._value;if(this.midilearn=this.getAttr("midilearn",opt.midilearn),this.midicc=this.getAttr("midicc",null),this.midiController={},this.midiMode="normal",this.midicc){let ch=parseInt(this.midicc.substring(0,this.midicc.lastIndexOf(".")))-1,cc=parseInt(this.midicc.substring(this.midicc.lastIndexOf(".")+1));this.setMidiController(ch,cc)}if(this.midilearn&&this.id&&webAudioControlsWidgetManager&&webAudioControlsWidgetManager.midiLearnTable){let ml=webAudioControlsWidgetManager.midiLearnTable;for(let i=0;i<ml.length;++i)if(ml[i].id==this.id){this.setMidiController(ml[i].cc.channel,ml[i].cc.cc);break}}if(this.setupImage(),this.digits=0,this.step&&this.step<1)for(let n=this.step;n<1;n*=10)++this.digits;this._setValue(this._value),this.coltab=["#e00","#000","#000"],window.webAudioControlsWidgetManager&&window.webAudioControlsWidgetManager.addWidget(this)}disconnectedCallback(){}setupImage(){if(this.kw=this._width||this._diameter||opt.knobWidth||opt.knobDiameter,this.kh=this._height||this._diameter||opt.knobHeight||opt.knobDiameter,this.src)this.img=new Image,this.img.onload=()=>{this.elem.style.backgroundImage="url("+this.src+")",null==this._sprites?this._sprites=this.img.height/this.img.width-1:this._sprites=+this._sprites,null==this.kw&&(this.kw=this.img.width),null==this.kh&&(this.kh=this.img.height/(this.sprites+1)),this.sprites?this.elem.style.backgroundSize=`${this.kw}px ${this.kh*(this.sprites+1)}px`:this.elem.style.backgroundSize="100% 100%",this.elem.style.width=this.kw+"px",this.elem.style.height=this.kh+"px",this.style.height=this.kh+"px",this.redraw()},this.img.src=this.src;else{this.colors&&(this.coltab=this.colors.split(";")),this.coltab||(this.coltab=["#e00","#000","#000"]);let t=`<svg xmlns="http://www.w3.org/2000/svg" width="64" height="6464" preserveAspectRatio="none">
<defs>
  <filter id="f1">
    <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" />
  </filter>
  <radialGradient id="g1" cx="50%" cy="10%">
    <stop offset="0%" stop-color="${this.coltab[2]}"/>
    <stop offset="100%" stop-color="${this.coltab[1]}"/>
  </radialGradient>
  <linearGradient id="g2" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" stop-color="#000" stop-opacity="0"/>
    <stop offset="100%" stop-color="#000" stop-opacity="0.3"/>
  </linearGradient>
  <g id="B">
    <circle cx="32" cy="32" r="31" fill="#000"/>
    <circle cx="32" cy="32" r="29" fill="url(#g1)"/>
    <circle cx="32" cy="32" r="29" fill="url(#g2)"/>
    <circle cx="32" cy="32" r="25" fill="${this.coltab[1]}" filter="url(#f1)"/>
    <circle cx="32" cy="32" r="29" fill="url(#g2)"/>
  </g>
  <line id="K" x1="32" y1="25" x2="32" y2="11" stroke-linecap="round" stroke-width="6" stroke="${this.coltab[0]}"/>
</defs>`;for(let e=0;e<101;++e)t+=`<use href="#B" y="${64*e}"/><use href="#K" y="${64*e}" transform="rotate(${(-135+270*e/101).toFixed(2)},32,${64*e+32})"/>`;t+="</svg>",this.elem.style.backgroundImage="url(data:image/svg+xml;base64,"+btoa(t)+")",null==this.kw&&(this.kw=64),null==this.kh&&(this.kh=64),this.elem.style.backgroundSize=`${this.kw}px ${101*this.kh}px`,this.elem.style.width=this.kw+"px",this.elem.style.height=this.kh+"px",this.style.height=this.kh+"px",this.fireflag=!0,this.redraw();return}}redraw(){let t;if(this.digits=0,this.step&&this.step<1)for(let t=this.step;t<1;t*=10)++this.digits;this.value<this.min&&(this.value=this.min),this.value>this.max&&(this.value=this.max),t=this.log?Math.log(this.value/this.min)/Math.log(this.max/this.min):(this.value-this.min)/(this.max-this.min);let e=this.elem.style,i=this.src?this.sprites:100;if(i>=1){let s=i*t|0;e.backgroundPosition="0px "+-s*this.kh+"px",e.transform="rotate(0deg)"}else{let i=270*(t-.5);e.backgroundPosition="0px 0px",e.transform="rotate("+i+"deg)"}}_setValue(v){if(this.step&&(v=Math.round((v-this.min)/this.step)*this.step+this.min),this._value=Math.min(this.max,Math.max(this.min,v)),this._value!=this.oldvalue){if(this.fireflag=!0,this.oldvalue=this._value,this.conv){let x=this._value;this.convValue=eval(this.conv),"function"==typeof this.convValue&&(this.convValue=this.convValue(x))}else this.convValue=this._value;return"number"==typeof this.convValue&&(this.convValue=this.convValue.toFixed(this.digits)),this.redraw(),this.showtip(0),1}return 0}setValue(t,e){this._setValue(t)&&e&&(this.sendEvent("input"),this.sendEvent("change"))}keydown(t){let e=this.step;switch(0==e&&(e=1),t.key){case"ArrowUp":this.setValue(this.value+e,!0);break;case"ArrowDown":this.setValue(this.value-e,!0);break;default:return}t.preventDefault(),t.stopPropagation()}wheel(t){if(this.enable){if(this.log){let e=Math.log(this.value/this.min)/Math.log(this.max/this.min),i=t.deltaY>0?-.01:.01;t.shiftKey||(i*=5),e+=i,this.setValue(this.min*Math.pow(this.max/this.min,e),!0)}else{let e=Math.max(this.step,(this.max-this.min)*.05);t.shiftKey&&(e=this.step?this.step:1),e=t.deltaY>0?-e:e,this.setValue(+this.value+e,!0)}t.preventDefault(),t.stopPropagation()}}pointerdown(t){if(!this.enable)return;let e=t;if(t.touches)e=t.changedTouches[0],this.identifier=e.identifier;else if(1!=e.buttons&&0!=e.button)return;this.elem.focus(),this.drag=1,this.showtip(0),this.oldvalue=this._value;let i=t=>{let e=t;if(t.touches){for(let i=0;i<t.touches.length;++i)if(t.touches[i].identifier==this.identifier){e=t.touches[i];break}}this.lastShift!==e.shiftKey&&(this.lastShift=e.shiftKey,this.startPosX=e.pageX,this.startPosY=e.pageY,this.startVal=this.value);let i=(this.startPosY-e.pageY-this.startPosX+e.pageX)*this.sensitivity;if(this.log){let t=Math.log(this.startVal/this.min)/Math.log(this.max/this.min);(t+=i/((e.shiftKey?4:1)*128))<0&&(t=0),t>1&&(t=1),this._setValue(this.min*Math.pow(this.max/this.min,t))}else this._setValue(this.min+((this.startVal+(this.max-this.min)*i/((e.shiftKey?4:1)*128)-this.min)/this.step|0)*this.step);return this.fireflag&&(this.sendEvent("input"),this.fireflag=!1),e.preventDefault&&e.preventDefault(),e.stopPropagation&&e.stopPropagation(),!1},s=t=>{if(t.touches){for(let e=0;t.changedTouches[e].identifier!=this.identifier;)if(++e>=t.changedTouches.length)return}this.drag=0,this.showtip(0),this.startPosX=this.startPosY=null,window.removeEventListener("mousemove",i),window.removeEventListener("touchmove",i,{passive:!1}),window.removeEventListener("mouseup",s),window.removeEventListener("touchend",s),window.removeEventListener("touchcancel",s),document.body.removeEventListener("touchstart",h,{passive:!1}),this.sendEvent("change")},h=t=>{t.preventDefault()};return e.ctrlKey||e.metaKey?this.setValue(this.defvalue,!0):(this.startPosX=e.pageX,this.startPosY=e.pageY,this.startVal=this.value,window.addEventListener("mousemove",i),window.addEventListener("touchmove",i,{passive:!1})),window.addEventListener("mouseup",s),window.addEventListener("touchend",s),window.addEventListener("touchcancel",s),document.body.addEventListener("touchstart",h,{passive:!1}),t.preventDefault(),t.stopPropagation(),!1}})}catch(error){console.log("webaudio-knob already defined")}try{customElements.define("webaudio-slider",class WebAudioSlider extends WebAudioControlsWidget{constructor(){super()}connectedCallback(){let root;if(root=this.attachShadow?this.attachShadow({mode:"open"}):this,root.innerHTML=`<style>
${this.basestyle}
:host{
  display:inline-block;
  position:relative;
  margin:0;
  padding:0;
  font-family: sans-serif;
  font-size: 11px;
  cursor:pointer;
}
.webaudio-slider-body{
  display:inline-block;
  position:relative;
  margin:0;
  padding:0;
  vertical-align:bottom;
  white-space:pre;
}
.webaudio-slider-knob{
  display:inline-block;
  position:absolute;
  margin:0;
  padding:0;
}
</style>
<div class='webaudio-slider-body' tabindex='1' touch-action='none'><div class='webaudio-slider-knob' touch-action='none'></div><div class='webaudioctrl-tooltip'></div><div part="label" class="webaudioctrl-label"><slot></slot></div></div>
`,this.elem=root.childNodes[2],this.knob=this.elem.firstChild,this.ttframe=this.knob.nextSibling,this.label=this.ttframe.nextSibling,this.enable=this.getAttr("enable",1),this.tracking=this.getAttr("tracking","rel"),this._src=this.getAttr("src",opt.sliderSrc),this.hasOwnProperty("src")||Object.defineProperty(this,"src",{get:()=>this._src,set:t=>{this._src=t,this.setupImage()}}),this._knobsrc=this.getAttr("knobsrc",opt.sliderKnobSrc),this.hasOwnProperty("knobsrc")||Object.defineProperty(this,"knobsrc",{get:()=>this._knobsrc,set:t=>{this._knobsrc=t,this.setupImage()}}),this._value=this.getAttr("value",0),this.hasOwnProperty("value")||Object.defineProperty(this,"value",{get:()=>this._value,set:t=>{this._value=t,this.redraw()}}),this.defvalue=this.getAttr("defvalue",this._value),this._min=this.getAttr("min",0),this.hasOwnProperty("min")||Object.defineProperty(this,"min",{get:()=>this._min,set:t=>{this._min=t,this.redraw()}}),this._max=this.getAttr("max",100),this.hasOwnProperty("max")||Object.defineProperty(this,"max",{get:()=>this._max,set:t=>{this._max=t,this.redraw()}}),this._step=this.getAttr("step",1),this.hasOwnProperty("step")||Object.defineProperty(this,"step",{get:()=>this._step,set:t=>{this._step=t,this.redraw()}}),this._sprites=this.getAttr("sprites",0),this.hasOwnProperty("sprites")||Object.defineProperty(this,"sprites",{get:()=>this._sprites,set:t=>{this._sprites=t,this.setupImage()}}),this._direction=this.getAttr("direction",null),this.hasOwnProperty("direction")||Object.defineProperty(this,"direction",{get:()=>this._direction,set:t=>{this._direction=t,this.setupImage()}}),this.log=this.getAttr("log",0),this._width=this.getAttr("width",opt.sliderWidth),this.hasOwnProperty("width")||Object.defineProperty(this,"width",{get:()=>this._width,set:t=>{this._width=t,this.setupImage()}}),this._height=this.getAttr("height",opt.sliderHeight),this.hasOwnProperty("height")||Object.defineProperty(this,"height",{get:()=>this._height,set:t=>{this._height=t,this.setupImage()}}),this._knobwidth=this.getAttr("knobwidth",opt.sliderKnobWidth),this.hasOwnProperty("knobwidth")||Object.defineProperty(this,"knobwidth",{get:()=>this._knobwidth,set:t=>{this._knobwidth=t,this.setupImage()}}),this._knobheight=this.getAttr("knobheight",opt.sliderKnobHeight),this.hasOwnProperty("knobheight")||Object.defineProperty(this,"knobheight",{get:()=>this._knobheight,set:t=>{this._knobheight=t,this.setupImage()}}),this._ditchlength=this.getAttr("ditchlength",opt.sliderDitchlength),this.hasOwnProperty("ditchlength")||Object.defineProperty(this,"ditchlength",{get:()=>this._ditchlength,set:t=>{this._ditchlength=t,this.setupImage()}}),this._colors=this.getAttr("colors",opt.sliderColors),this.hasOwnProperty("colors")||Object.defineProperty(this,"colors",{get:()=>this._colors,set:t=>{this._colors=t,this.setupImage()}}),this.outline=this.getAttr("outline",opt.outline),this.setupLabel(),this.sensitivity=this.getAttr("sensitivity",1),this.valuetip=this.getAttr("valuetip",opt.valuetip),this.tooltip=this.getAttr("tooltip",null),this.conv=this.getAttr("conv",null),this.conv){let x=this._value;this.convValue=eval(this.conv),"function"==typeof this.convValue&&(this.convValue=this.convValue(x))}else this.convValue=this._value;if(this.midilearn=this.getAttr("midilearn",opt.midilearn),this.midicc=this.getAttr("midicc",null),this.midiController={},this.midiMode="normal",this.midicc){let ch=parseInt(this.midicc.substring(0,this.midicc.lastIndexOf(".")))-1,cc=parseInt(this.midicc.substring(this.midicc.lastIndexOf(".")+1));this.setMidiController(ch,cc)}if(this.midilearn&&this.id&&webAudioControlsWidgetManager&&webAudioControlsWidgetManager.midiLearnTable){let ml=webAudioControlsWidgetManager.midiLearnTable;for(let i=0;i<ml.length;++i)if(ml[i].id==this.id){this.setMidiController(ml[i].cc.channel,ml[i].cc.cc);break}}if(this.setupImage(),this.digits=0,this.step&&this.step<1)for(let n=this.step;n<1;n*=10)++this.digits;this.fireflag=!0,window.webAudioControlsWidgetManager&&window.webAudioControlsWidgetManager.addWidget(this),this.elem.onclick=t=>{t.stopPropagation()}}disconnectedCallback(){}setupImage(){if(this.coltab=this.colors.split(";"),this.bodyimg=new Image,this.knobimg=new Image,this.srcurl=null,null==this.src||""==this.src){this.sw=+this._width,this.sh=+this.height,"horz"==this._direction?(null==this._width&&(this.sw=128),null==this._height&&(this.sh=24)):"vert"==this._direction?(null==this._width&&(this.sw=24),null==this._height&&(this.sh=128)):(null==this._width&&(this.sw=128),null==this._height&&(this.sh=24));let t=.5*Math.min(this.sw,this.sh),e=`<svg xmlns="http://www.w3.org/2000/svg" width="${this.sw}" height="${this.sh}" preserveAspectRatio="none">
<defs>
  <filter id="f1">
    <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" />
  </filter>
  <linearGradient id="g1" x1="0%" y1="0%" ${this.sw>this.sh?'x2="0%" y2="100%"':'x2="100%" y2="0%"'}>
    <stop offset="0%" stop-color="#000" stop-opacity="0"/>
    <stop offset="100%" stop-color="#000" stop-opacity="0.3"/>
  </linearGradient>
</defs>
<rect x="1" y="1" rx="${t}" ry="${t}" width="${this.sw-2}" height="${this.sh-2}" fill="#000"/>
<rect x="3" y="3" rx="${t}" ry="${t}" width="${this.sw-6}" height="${this.sh-6}" fill="${this.coltab[1]}" filter="url(#f1)"/>
<rect x="1" y="1" rx="${t}" ry="${t}" width="${this.sw-2}" height="${this.sh-2}" fill="url(#g1)"/>
</svg>`;this.srcurl="data:image/svg+xml;base64,"+btoa(e)}else this.srcurl=this.src;this.bodyimg.onload=()=>{if(""!=this.src&&(this.elem.style.backgroundImage="url("+this.srcurl+")"),this.sw=+this._width,this.sh=+this._height,null==this._width&&(this.sw=this.bodyimg.width),null==this._height&&(this.sh=this.bodyimg.height),null==this.dr&&(this.sw>this.sh?this.dr="horz":this.dr="vert"),this.kw=+this._knobwidth,this.kh=+this._knobheight,null==this._knobsrc){null==this._knobwidth&&(this.kw=Math.min(this.sw,this.sh)),null==this._knobheight&&(this.kh=Math.min(this.sw,this.sh));let t=.5*Math.min(this.kw,this.kh),e=Math.max(1,this.kw-12),i=Math.max(1,this.kh-12),s=`<svg xmlns="http://www.w3.org/2000/svg" width="${this.kw}" height="${this.kh}" preserveAspectRatio="none">
<defs>
  <filter id="f1">
    <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" />
  </filter>
  <linearGradient id="g1" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" stop-color="${this.coltab[2]}"/>
    <stop offset="50%" stop-color="${this.coltab[0]}"/>
    <stop offset="100%" stop-color="${this.coltab[0]}" stop-opacity="0.5"/>
  </linearGradient>
  <linearGradient id="g2" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" stop-color="${this.coltab[0]}"/>
    <stop offset="100%" stop-color="${this.coltab[0]}"/>
  </linearGradient>
  <linearGradient id="g3" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" stop-color="#000" stop-opacity="0"/>
    <stop offset="100%" stop-color="#000" stop-opacity="0.3"/>
  </linearGradient>
</defs>
<rect x="2" y="2" width="${this.kw-4}" height="${this.kh-4}" rx="${t}" ry="${t}" fill="#000"/>
<rect x="3" y="3" width="${this.kw-6}" height="${this.kh-6}" rx="${t}" ry="${t}" fill="url(#g1)"/>
<rect x="6" y="6" width="${e}" height="${i}" rx="${t}" ry="${t}" fill="url(#g2)" filter="url(#f1)"/>
<rect x="3" y="3" width="${this.kw-6}" height="${this.kh-6}" rx="${t}" ry="${t}" fill="url(#g3)"/>
</svg>`;this.knobsrcurl="data:image/svg+xml;base64,"+btoa(s)}else this.knobsrcurl=this.knobsrc;this.knobimg.onload=()=>{this.knob.style.backgroundImage="url("+this.knobsrcurl+")",null==this._knobwidth&&(this.kw=this.knobimg.width),null==this._knobheight&&(this.kh=this.knobimg.height),this.dlen=this.ditchlength,null==this.dlen&&("horz"==this.dr?this.dlen=this.sw-this.kw:this.dlen=this.sh-this.kh),this.knob.style.backgroundSize="100% 100%",this.knob.style.width=this.kw+"px",this.knob.style.height=this.kh+"px",this.elem.style.backgroundSize="100% 100%",this.elem.style.width=this.sw+"px",this.elem.style.height=this.sh+"px",this.redraw()},this.knobimg.src=this.knobsrcurl},this.bodyimg.src=this.srcurl}redraw(){let t;if(this.digits=0,this.step&&this.step<1)for(let t=this.step;t<1;t*=10)++this.digits;this.value<this.min&&(this.value=this.min),this.value>this.max&&(this.value=this.max),t=this.log?Math.log(this.value/this.min)/Math.log(this.max/this.min):(this.value-this.min)/(this.max-this.min);let e=this.knob.style;"horz"==this.dr?(e.top=(this.sh-this.kh)*.5+"px",e.left=(this.sw-this.kw-this.dlen)*.5+t*this.dlen+"px",this.sensex=1,this.sensey=0):(e.left=(this.sw-this.kw)*.5+"px",e.top=(this.sh-this.kh-this.dlen)*.5+(1-t)*this.dlen+"px",this.sensex=0,this.sensey=1)}_setValue(v){if(v=Math.round((v-this.min)/this.step)*this.step+this.min,this._value=Math.min(this.max,Math.max(this.min,v)),this._value!=this.oldvalue){if(this.oldvalue=this._value,this.fireflag=!0,this.conv){let x=this._value;this.convValue=eval(this.conv),"function"==typeof this.convValue&&(this.convValue=this.convValue(x))}else this.convValue=this._value;return"number"==typeof this.convValue&&(this.convValue=this.convValue.toFixed(this.digits)),this.redraw(),this.showtip(0),1}return 0}setValue(t,e){this._setValue(t)&&e&&(this.sendEvent("input"),this.sendEvent("change"))}keydown(t){let e=this.step;switch(0==e&&(e=1),t.key){case"ArrowUp":this.setValue(this.value+e,!0);break;case"ArrowDown":this.setValue(this.value-e,!0);break;default:return}t.preventDefault(),t.stopPropagation()}wheel(t){if(this.enable){if(this.log){let e=Math.log(this.value/this.min)/Math.log(this.max/this.min),i=t.deltaY>0?-.01:.01;t.shiftKey||(i*=5),e+=i,this.setValue(this.min*Math.pow(this.max/this.min,e),!0)}else{let e=Math.max(this.step,(this.max-this.min)*.05);t.shiftKey&&(e=this.step?this.step:1),e=t.deltaY>0?-e:e,this.setValue(+this.value+e,!0)}t.preventDefault(),t.stopPropagation()}}pointerdown(t){if(!this.enable)return;let e=t;if(t.touches)e=t.changedTouches[0],this.identifier=e.identifier;else if(1!=e.buttons&&0!=e.button)return;this.elem.focus(),this.drag=1,this.showtip(0);let i=t=>{let e=t;if(t.touches){for(let i=0;i<t.touches.length;++i)if(t.touches[i].identifier==this.identifier){e=t.touches[i];break}}if(this.lastShift!==e.shiftKey&&(this.lastShift=e.shiftKey,this.startPosX=e.pageX,this.startPosY=e.pageY,this.startVal=this.value),"abs"==this.tracking){let t;let i=this.getBoundingClientRect();t="horz"==this.dr?Math.max(0,Math.min(1,(e.pageX-i.left-window.pageXOffset-.5*this.kw)/(this.width-this.kw))):1-Math.max(0,Math.min(1,(e.pageY-i.top-window.pageYOffset-.5*this.kh)/(this.height-this.kh))),this.log?this._setValue(this.min*Math.pow(this.max/this.min,t)):this._setValue(this.min+(this.max-this.min)*t)}else{let t=((this.startPosY-e.pageY)*this.sensey-(this.startPosX-e.pageX)*this.sensex)*this.sensitivity;if(this.log){let i=Math.log(this.startVal/this.min)/Math.log(this.max/this.min);(i+=t/((e.shiftKey?4:1)*128))<0&&(i=0),i>1&&(i=1),this._setValue(this.min*Math.pow(this.max/this.min,i))}else this._setValue(this.min+((this.startVal+(this.max-this.min)*t/((e.shiftKey?4:1)*this.dlen)-this.min)/this.step|0)*this.step)}return this.fireflag&&(this.sendEvent("input"),this.fireflag=!1),e.preventDefault&&e.preventDefault(),e.stopPropagation&&e.stopPropagation(),!1},s=t=>{if(t.touches){for(let e=0;t.changedTouches[e].identifier!=this.identifier;)if(++e>=t.changedTouches.length)return}this.drag=0,this.showtip(0),this.startPosX=this.startPosY=null,window.removeEventListener("mousemove",i),window.removeEventListener("touchmove",i,{passive:!1}),window.removeEventListener("mouseup",s),window.removeEventListener("touchend",s),window.removeEventListener("touchcancel",s),document.body.removeEventListener("touchstart",h,{passive:!1}),this.sendEvent("change")},h=t=>{t.preventDefault()};return e.touches&&(e=e.touches[0]),e.ctrlKey||e.metaKey?this.setValue(this.defvalue,!0):(this.startPosX=e.pageX,this.startPosY=e.pageY,this.startVal=this.value,window.addEventListener("mousemove",i),window.addEventListener("touchmove",i,{passive:!1}),i(t)),window.addEventListener("mouseup",s),window.addEventListener("touchend",s),window.addEventListener("touchcancel",s),document.body.addEventListener("touchstart",h,{passive:!1}),e.preventDefault(),e.stopPropagation(),!1}})}catch(error){console.log("webaudio-slider already defined")}try{customElements.define("webaudio-switch",class extends WebAudioControlsWidget{constructor(){super()}connectedCallback(){let t;if((t=this.attachShadow?this.attachShadow({mode:"open"}):this).innerHTML=`<style>
${this.basestyle}
:host{
  display:inline-block;
  position:relative;
  margin:0;
  padding:0;
  font-family: sans-serif;
  font-size: 11px;
  cursor:pointer;
}
.webaudio-switch-body{
  display:inline-block;
  position:relative;
  margin:0;
  padding:0;
  vertical-align:bottom;
  white-space:pre;
}
.webaudioctrl-label{
  position:absolute;
  left:50%;
  top:50%;
}
</style>
<div class='webaudio-switch-body' tabindex='1' touch-action='none'><div class='webaudioctrl-tooltip'></div><div part="label" class="webaudioctrl-label"><slot></slot></div></div>
`,this.elem=t.childNodes[2],this.ttframe=this.elem.firstChild,this.label=this.ttframe.nextSibling,this.enable=this.getAttr("enable",1),this._src=this.getAttr("src",null),this.hasOwnProperty("src")||Object.defineProperty(this,"src",{get:()=>this._src,set:t=>{this._src=t,this.setupImage()}}),this._value=this.getAttr("value",0),this.hasOwnProperty("value")||Object.defineProperty(this,"value",{get:()=>this._value,set:t=>{this._value=t,this.redraw()}}),this.defvalue=this.getAttr("defvalue",this._value),this.type=this.getAttr("type","toggle"),this.group=this.getAttr("group",""),this._width=this.getAttr("width",null),this.hasOwnProperty("width")||Object.defineProperty(this,"width",{get:()=>this._width,set:t=>{this._width=t,this.setupImage()}}),this._height=this.getAttr("height",null),this.hasOwnProperty("height")||Object.defineProperty(this,"height",{get:()=>this._height,set:t=>{this._height=t,this.setupImage()}}),this._diameter=this.getAttr("diameter",null),this.hasOwnProperty("diameter")||Object.defineProperty(this,"diameter",{get:()=>this._diameter,set:t=>{this._diameter=t,this.setupImage()}}),this.invert=this.getAttr("invert",0),this._colors=this.getAttr("colors",opt.switchColors),this.hasOwnProperty("colors")||Object.defineProperty(this,"colors",{get:()=>this._colors,set:t=>{this._colors=t,this.setupImage()}}),this.outline=this.getAttr("outline",opt.outline),this.setupLabel(),this.valuetip=0,this.tooltip=this.getAttr("tooltip",null),this.midilearn=this.getAttr("midilearn",opt.midilearn),this.midicc=this.getAttr("midicc",null),this.midiController={},this.midiMode="normal",this.midicc){let t=parseInt(this.midicc.substring(0,this.midicc.lastIndexOf(".")))-1,e=parseInt(this.midicc.substring(this.midicc.lastIndexOf(".")+1));this.setMidiController(t,e)}if(this.midilearn&&this.id&&webAudioControlsWidgetManager&&webAudioControlsWidgetManager.midiLearnTable){let t=webAudioControlsWidgetManager.midiLearnTable;for(let e=0;e<t.length;++e)if(t[e].id==this.id){this.setMidiController(t[e].cc.channel,t[e].cc.cc);break}}if(this.setupImage(),this.digits=0,this.step&&this.step<1)for(let t=this.step;t<1;t*=10)++this.digits;window.webAudioControlsWidgetManager&&window.webAudioControlsWidgetManager.addWidget(this),this.elem.onclick=t=>{t.stopPropagation()}}disconnectedCallback(){}setupImage(){if(this.coltab=this.colors.split(";"),this.kw=this._width||this._diameter||opt.switchWidth||opt.switchDiameter,this.kh=this._height||this._diameter||opt.switchHeight||opt.switchDiameter,this.img=new Image,this.srcurl=null,null==this.src||""==this.src){null==this.kw&&(this.kw=32),null==this.kh&&(this.kh=32);let t=Math.min(this.kw,this.kh),e=this.kw,i=this.kh,s=`<svg xmlns="http://www.w3.org/2000/svg" width="${this.kw}" height="${2*this.kh}" preserveAspectRatio="none">
<defs>
<linearGradient id="g1" x1="0%" y1="0%" x2="0%" y2="100%">
  <stop offset="0%" stop-color="#000" stop-opacity="0"/>
  <stop offset="100%" stop-color="#000" stop-opacity="0.2"/>
</linearGradient>
<radialGradient id="g2" cx="50%" cy="30%">
    <stop offset="0%" stop-color="${this.coltab[2]}"/>
    <stop offset="100%" stop-color="${this.coltab[0]}"/>
  </radialGradient>
  <filter id="f1">
    <feGaussianBlur in="SourceGraphic" stdDeviation=".4" />
  </filter>
</defs>
<g id="p1">
  <rect x="${.075*e}" y="${.075*i}" width="${.85*e}" height="${.85*i}" rx="${.1*t}" ry="${.1*t}" fill="#000"/>
  <rect x="${.1*e}" y="${.1*i}" width="${.8*e}" height="${.8*i}" rx="${.1*t}" ry="${.1*t}" fill="${this.coltab[1]}"/>
</g>
<g id="p2">
  <circle cx="${.5*e}" cy="${.5*i}" r="${.35*t}" stroke="#000" stroke-width="${.03*t}" fill="${this.coltab[0]}" filter="url(#f1)"/>
  <circle cx="${.5*e}" cy="${.5*i}" r="${.27*t}" stroke="#000" stroke-width="${.03*t}" fill="#000" filter="url(#f1)"/>
  <rect x="${.075*e}" y="${.075*i}" width="${.85*e}" height="${.85*i}" rx="${.1*t}" ry="${.1*t}" fill="url(#g1)"/>
</g>
<use href="#p1" y="${i}"/>
<use href="#p2" y="${i}"/>
<circle cx="${.5*e}" cy="${1.5*i}" r="${.25*t}" fill="url(#g2)" filter="url(#f1)"/>
<circle cx="${.5*e}" cy="${1.5*i}" r="${.25*t}" fill="url(#g1)"/>
</svg>`;this.srcurl="data:image/svg+xml;base64,"+btoa(s)}else this.srcurl=this.src;this.img.onload=()=>{null==this.kw&&(this.kw=this.img.width),null==this.kh&&(this.kh=.5*this.img.height),this.elem.style.backgroundImage="url("+this.srcurl+")",this.elem.style.backgroundSize="100% 200%",this.elem.style.width=this.kw+"px",this.elem.style.height=this.kh+"px",this.redraw()},this.img.src=this.srcurl}redraw(){let t=this.elem.style;this.value^this.invert?t.backgroundPosition="0px -100%":t.backgroundPosition="0px 0px"}setValue(t,e){this.value=t,this.checked=!!t,this.value!=this.oldvalue&&(this.redraw(),this.showtip(0),e&&(this.sendEvent("input"),this.sendEvent("change")),this.oldvalue=this.value)}pointerdown(t){if(!this.enable)return;let e=t;if(t.touches)e=t.changedTouches[0],this.identifier=e.identifier;else if(1!=e.buttons&&0!=e.button)return;this.elem.focus(),this.drag=1,this.showtip(0);let i=t=>(t.preventDefault(),t.stopPropagation(),!1),s=t=>{this.drag=0,this.showtip(0),window.removeEventListener("mousemove",i),window.removeEventListener("touchmove",i,{passive:!1}),window.removeEventListener("mouseup",s),window.removeEventListener("touchend",s),window.removeEventListener("touchcancel",s),document.body.removeEventListener("touchstart",h,{passive:!1}),"kick"==this.type&&(this.value=0,this.checked=!1,this.redraw(),this.sendEvent("change")),this.sendEvent("click"),t.preventDefault(),t.stopPropagation()},h=t=>{t.preventDefault()};switch(this.type){case"kick":this.setValue(1),this.sendEvent("change");break;case"toggle":e.ctrlKey||e.metaKey?this.value=defvalue:this.value=1-this.value,this.checked=!!this.value,this.sendEvent("change");break;case"radio":let n=document.querySelectorAll("webaudio-switch[type='radio'][group='"+this.group+"']");for(let t=0;t<n.length;++t)n[t]==this?n[t].setValue(1):n[t].setValue(0);this.sendEvent("change")}return window.addEventListener("mouseup",s),window.addEventListener("touchend",s),window.addEventListener("touchcancel",s),document.body.addEventListener("touchstart",h,{passive:!1}),this.redraw(),t.preventDefault(),t.stopPropagation(),!1}})}catch(error){console.log("webaudio-switch already defined")}try{customElements.define("webaudio-param",class WebAudioParam extends WebAudioControlsWidget{constructor(){super(),this.addEventListener("keydown",this.keydown),this.addEventListener("mousedown",this.pointerdown,{passive:!1}),this.addEventListener("touchstart",this.pointerdown,{passive:!1}),this.addEventListener("wheel",this.wheel),this.addEventListener("mouseover",this.pointerover),this.addEventListener("mouseout",this.pointerout),this.addEventListener("contextmenu",this.contextMenu)}connectedCallback(){let root;if(root=this.attachShadow?this.attachShadow({mode:"open"}):this,root.innerHTML=`<style>
${this.basestyle}
:host{
  display:inline-block;
  user-select:none;
  margin:0;
  padding:0;
  font-family: sans-serif;
  font-size: 8px;
  cursor:pointer;
  position:relative;
  vertical-align:baseline;
}
.webaudio-param-body{
  display:inline-block;
  position:relative;
  text-align:center;
  background:none;
  margin:0;
  padding:0;
  font-family:sans-serif;
  font-size:11px;
  vertical-align:bottom;
  border:none;
}
</style>
<input class='webaudio-param-body' value='0' tabindex='1' touch-action='none'/><div class='webaudioctrl-tooltip'></div>
`,this.elem=root.childNodes[2],this.ttframe=root.childNodes[3],this.enable=this.getAttr("enable",1),this._value=this.getAttr("value",0),this.hasOwnProperty("value")||Object.defineProperty(this,"value",{get:()=>this._value,set:t=>{this._value=t,this.redraw()}}),this.defvalue=this.getAttr("defvalue",0),this._fontsize=this.getAttr("fontsize",9),this.hasOwnProperty("fontsize")||Object.defineProperty(this,"fontsize",{get:()=>this._fontsize,set:t=>{this._fontsize=t,this.setupImage()}}),this._src=this.getAttr("src",opt.paramSrc),this.hasOwnProperty("src")||Object.defineProperty(this,"src",{get:()=>this._src,set:t=>{this._src=t,this.setupImage()}}),this.link=this.getAttr("link",""),this._width=this.getAttr("width",opt.paramWidth),this.hasOwnProperty("width")||Object.defineProperty(this,"width",{get:()=>this._width,set:t=>{this._width=t,this.setupImage()}}),this._height=this.getAttr("height",opt.paramHeight),this.hasOwnProperty("height")||Object.defineProperty(this,"height",{get:()=>this._height,set:t=>{this._height=t,this.setupImage()}}),this._colors=this.getAttr("colors",opt.paramColors),this.hasOwnProperty("colors")||Object.defineProperty(this,"colors",{get:()=>this._colors,set:t=>{this._colors=t,this.setupImage()}}),this.outline=this.getAttr("outline",opt.outline),this.rconv=this.getAttr("rconv",null),this.midiController={},this.midiMode="normal",this.currentLink=null,this.midicc){let ch=parseInt(this.midicc.substring(0,this.midicc.lastIndexOf(".")))-1,cc=parseInt(this.midicc.substring(this.midicc.lastIndexOf(".")+1));this.setMidiController(ch,cc)}this.setupImage(),window.webAudioControlsWidgetManager&&window.webAudioControlsWidgetManager.addWidget(this),this.fromLink=(t=>{this.setValue(t.target.convValue.toFixed(t.target.digits))}).bind(this),this.elem.onchange=()=>{if(!this.currentLink.target.conv||this.currentLink.target.conv&&this.rconv){let val=this.value=this.elem.value;if(this.rconv){let x=+this.elem.value;val=eval(this.rconv)}this.currentLink&&this.currentLink.target.setValue(val,!0)}}}disconnectedCallback(){}setupImage(){this.imgloaded=()=>{""!=this.src&&null!=this.src?(this.elem.style.backgroundImage="url("+this.src+")",this.elem.style.backgroundSize="100% 100%",null==this._width&&(this._width=this.img.width),null==this._height&&(this._height=this.img.height)):(null==this._width&&(this._width=32),null==this._height&&(this._height=20)),this.elem.style.width=this._width+"px",this.elem.style.height=this._height+"px",this.elem.style.fontSize=this.fontsize+"px";let t=document.getElementById(this.link);t&&void 0!==t.value&&("number"==typeof t.convValue?this.setValue(t.convValue.toFixed(t.digits)):this.setValue(t.convValue),this.currentLink&&this.currentLink.removeEventListener("input",this.currentLink.func),this.currentLink={target:t,func:e=>{"number"==typeof t.convValue?this.setValue(t.convValue.toFixed(t.digits)):this.setValue(t.convValue)}},this.currentLink.target.addEventListener("input",this.currentLink.func)),this.redraw()},this.coltab=this.colors.split(";"),this.elem.style.color=this.coltab[0],this.img=new Image,this.img.onload=this.imgloaded.bind(),null==this.src?(this.elem.style.backgroundColor=this.coltab[1],this.imgloaded()):""==this.src?(this.elem.style.background="none",this.imgloaded()):this.img.src=this.src}redraw(){this.elem.value=this.value}setValue(t,e){if(this.value=t,this.value!=this.oldvalue){if(this.redraw(),this.showtip(0),e){let t=document.createEvent("HTMLEvents");t.initEvent("change",!1,!0),this.dispatchEvent(t)}this.oldvalue=this.value}}pointerdown(t){if(!this.enable)return;let e=t;if(t.touches)e=t.touches[0];else if(1!=e.buttons&&0!=e.button)return;this.elem.focus(),this.redraw()}})}catch(error){console.log("webaudio-param already defined")}try{customElements.define("webaudio-keyboard",class extends WebAudioControlsWidget{constructor(){super()}connectedCallback(){let t;if((t=this.attachShadow?this.attachShadow({mode:"open"}):this).innerHTML=`<style>
${this.basestyle}
:host{
  display:inline-block;
  position:relative;
  margin:0;
  padding:0;
  font-family: sans-serif;
  font-size: 11px;
}
.webaudio-keyboard-body{
  display:inline-block;
  margin:0;
  padding:0;
  vertical-align:bottom;
}
</style>
<canvas class='webaudio-keyboard-body' tabindex='1' touch-action='none'></canvas><div class='webauioctrl-tooltip'></div>
`,this.elem=this.cv=t.childNodes[2],this.ttframe=t.childNodes[3],this.ctx=this.cv.getContext("2d"),this._values=[],this.enable=this.getAttr("enable",1),this._width=this.getAttr("width",480),this.hasOwnProperty("width")||Object.defineProperty(this,"width",{get:()=>this._width,set:t=>{this._width=t,this.setupImage()}}),this._height=this.getAttr("height",128),this.hasOwnProperty("height")||Object.defineProperty(this,"height",{get:()=>this._height,set:t=>{this._height=t,this.setupImage()}}),this._min=this.getAttr("min",0),this.hasOwnProperty("min")||Object.defineProperty(this,"min",{get:()=>this._min,set:t=>{this._min=+t,this.redraw()}}),this._keys=this.getAttr("keys",25),this.hasOwnProperty("keys")||Object.defineProperty(this,"keys",{get:()=>this._keys,set:t=>{this._keys=+t,this.setupImage()}}),this._colors=this.getAttr("colors","#222;#eee;#ccc;#333;#000;#e88;#c44;#c33;#800"),this.hasOwnProperty("colors")||Object.defineProperty(this,"colors",{get:()=>this._colors,set:t=>{this._colors=t,this.setupImage()}}),this.outline=this.getAttr("outline",opt.outline),this.midilearn=this.getAttr("midilearn",0),this.midicc=this.getAttr("midicc",null),this.press=0,this.keycodes1=[90,83,88,68,67,86,71,66,72,78,74,77,188,76,190,187,191,226],this.keycodes2=[81,50,87,51,69,82,53,84,54,89,55,85,73,57,79,48,80,192,222,219],this.addEventListener("keyup",this.keyup),this.midiController={},this.midiMode="normal",this.midicc){let t=parseInt(this.midicc.substring(0,this.midicc.lastIndexOf(".")))-1,e=parseInt(this.midicc.substring(this.midicc.lastIndexOf(".")+1));this.setMidiController(t,e)}if(this.setupImage(),this.digits=0,this.step&&this.step<1)for(let t=this.step;t<1;t*=10)++this.digits;window.webAudioControlsWidgetManager&&window.webAudioControlsWidgetManager.addWidget(this)}disconnectedCallback(){}setupImage(){this.cv.style.width=this.width+"px",this.cv.style.height=this.height+"px",this.bheight=.55*this.height,this.kp=[0,7/12,1,1.75,2,3,3.5,4,56/12,5,70/12,6],this.kf=[0,1,0,1,0,0,1,0,1,0,1,0],this.ko=[0,0,14/12-1,0,28/12-2,35/12-3,0,49/12-4,0,.25,0,77/12-6],this.kn=[0,2,4,5,7,9,11],this.coltab=this.colors.split(";"),this.cv.width=this.width,this.cv.height=this.height,this.cv.style.width=this.width+"px",this.cv.style.height=this.height+"px",this.style.height=this.height+"px",this.cv.style.outline=this.outline?"":"none",this.bheight=.55*this.height,this.max=this.min+this.keys-1,this.dispvalues=[],this.valuesold=[],this.kf[this.min%12]&&--this.min,this.kf[this.max%12]&&++this.max,this.redraw()}redraw(){function t(t,e,i,s,h,n,o,l){if(l){let h=t.createLinearGradient(e,i,e+s,i);h.addColorStop(0,o),h.addColorStop(1,l),t.fillStyle=h}else t.fillStyle=o;t.beginPath(),t.moveTo(e,i),t.lineTo(e+s,i),t.lineTo(e+s,i+h-n),t.quadraticCurveTo(e+s,i+h,e+s-n,i+h),t.lineTo(e+n,i+h),t.quadraticCurveTo(e,i+h,e,i+h-n),t.lineTo(e,i),t.fill()}this.ctx.fillStyle=this.coltab[0],this.ctx.fillRect(0,0,this.width,this.height);let e=7*(this.min/12|0)+this.kp[this.min%12],i=7*(this.max/12|0)+this.kp[this.max%12]-e;this.wwidth=(this.width-1)/(i+1),this.bwidth=7*this.wwidth/12;let s=this.bheight,h=Math.min(8,.2*this.wwidth);for(let e=this.min,i=0;e<=this.max;++e)if(0==this.kf[e%12]){let s=this.wwidth*i+++1;this.dispvalues.indexOf(e)>=0?t(this.ctx,s,1,this.wwidth-1,this.height-2,h,this.coltab[5],this.coltab[6]):t(this.ctx,s,1,this.wwidth-1,this.height-2,h,this.coltab[1],this.coltab[2])}h=Math.min(8,.3*this.bwidth);for(let e=this.min;e<this.max;++e)if(this.kf[e%12]){let i=this.wwidth*this.ko[this.min%12]+this.bwidth*(e-this.min)+1;this.dispvalues.indexOf(e)>=0?t(this.ctx,i,1,this.bwidth,s,h,this.coltab[7],this.coltab[8]):t(this.ctx,i,1,this.bwidth,s,h,this.coltab[3],this.coltab[4]),this.ctx.strokeStyle=this.coltab[0],this.ctx.stroke()}}_setValue(t){return(this.step&&(t=Math.round((t-this.min)/this.step)*this.step+this.min),this._value=Math.min(this.max,Math.max(this.min,t)),this._value!=this.oldvalue)?(this.oldvalue=this._value,this.redraw(),this.showtip(0),1):0}setValue(t,e){this._setValue(t)&&e&&(this.sendEvent("input"),this.sendEvent("change"))}wheel(t){}keydown(t){let e=12*Math.floor((this.min+11)/12),i=this.keycodes1.indexOf(t.keyCode);i<0&&(i=this.keycodes2.indexOf(t.keyCode))>=0&&(i+=12),i>=0&&(i+=e,this.currentKey!=i&&(this.currentKey=i,this.sendEventFromKey(1,i),this.setNote(1,i)))}keyup(t){let e=12*Math.floor((this.min+11)/12),i=this.keycodes1.indexOf(t.keyCode);i<0&&(i=this.keycodes2.indexOf(t.keyCode))>=0&&(i+=12),i>=0&&(i+=e,this.currentKey=-1,this.sendEventFromKey(0,i),this.setNote(0,i))}pointerdown(t){this.cv.focus(),this.enable&&++this.press;let e=t=>{if(!this.enable)return;let e=this.getBoundingClientRect(),i=[],s;(s=t.touches?t.targetTouches:this.press?[t]:[]).length>0&&(this.drag=1);for(let t=0;t<s.length;++t){let h,n,o,l=s[t].clientX-e.left,r=s[t].clientY-e.top;r>=0&&r<this.height&&(r<this.bheight?(h=l-this.wwidth*this.ko[this.min%12],n=this.min+(h/this.bwidth|0)):(n=l/this.wwidth|0,o=this.kp[this.min%12],n+=o,n=this.min+(n/7|0)*12+this.kn[n%7]-this.kn[o%7]),n>=this.min&&n<=this.max&&i.push(n))}i.sort(),this.values=i,this.sendevent(),this.redraw()},i=t=>{this.enable&&(t.touches?this.press=t.touches.length:this.press=0,e(t),this.sendevent(),0==this.press&&(window.removeEventListener("mousemove",e),window.removeEventListener("touchmove",e,{passive:!1}),window.removeEventListener("mouseup",i),window.removeEventListener("touchend",i),window.removeEventListener("touchcancel",i),document.body.removeEventListener("touchstart",s,{passive:!1})),this.redraw()),this.drag=0,t.preventDefault()},s=t=>{t.preventDefault()};window.addEventListener("mousemove",e),window.addEventListener("touchmove",e,{passive:!1}),window.addEventListener("mouseup",i),window.addEventListener("touchend",i),window.addEventListener("touchcancel",i),document.body.addEventListener("touchstart",s,{passive:!1}),e(t),t.preventDefault(),t.stopPropagation()}sendEventFromKey(t,e){let i=document.createEvent("HTMLEvents");i.initEvent("change",!0,!0),i.note=[t,e],this.dispatchEvent(i)}sendevent(){let t=[];for(let e=0,i=this.valuesold.length;e<i;++e)0>this.values.indexOf(this.valuesold[e])&&t.push([0,this.valuesold[e]]);for(let e=0,i=this.values.length;e<i;++e)0>this.valuesold.indexOf(this.values[e])&&t.push([1,this.values[e]]);if(t.length){this.valuesold=this.values;for(let e=0;e<t.length;++e){this.setdispvalues(t[e][0],t[e][1]);let i=document.createEvent("HTMLEvents");i.initEvent("change",!0,!0),i.note=t[e],this.dispatchEvent(i)}}}setdispvalues(t,e){let i=this.dispvalues.indexOf(e);t?i<0&&this.dispvalues.push(e):i>=0&&this.dispvalues.splice(i,1)}setNote(t,e,i,s){let h=i&&s-i.currentTime;h>0?setTimeout(()=>{this.setNote(t,e)},1e3*h):(this.setdispvalues(t,e),this.redraw())}})}catch(error){console.log("webaudio-keyboard already defined")}class WebAudioControlsWidgetManager{constructor(){this.midiAccess=null,this.listOfWidgets=[],this.listOfExternalMidiListeners=[],this.updateWidgets(),opt.preserveMidiLearn?this.midiLearnTable=JSON.parse(localStorage.getItem("WebAudioControlsMidiLearn")):this.midiLearnTable=null,this.initWebAudioControls()}addWidget(t){this.listOfWidgets.push(t)}updateWidgets(){}initWebAudioControls(){navigator.requestMIDIAccess&&navigator.requestMIDIAccess().then(t=>{this.midiAccess=t,this.enableInputs()},t=>{console.log("MIDI not initialized - error encountered:"+t.code)})}enableInputs(){let t=this.midiAccess.inputs.values();console.log("Found "+this.midiAccess.inputs.size+" MIDI input(s)");for(let e=t.next();e&&!e.done;e=t.next())console.log("Connected input: "+e.value.name),e.value.onmidimessage=this.handleMIDIMessage.bind(this)}midiConnectionStateChange(t){console.log("connection: "+t.port.name+" "+t.port.connection+" "+t.port.state),enableInputs()}onMIDIStarted(t){this.midiAccess=t,t.onstatechange=this.midiConnectionStateChange,enableInputs(t)}addMidiListener(t){this.listOfExternalMidiListeners.push(t)}getCurrentConfigAsJSON(){return currentConfig.stringify()}handleMIDIMessage(t){if(this.listOfExternalMidiListeners.forEach(function(e){e(t)}),(240&t.data[0])!=240&&((240&t.data[0])!=176||!(t.data[1]>=120))){for(let e of this.listOfWidgets)e.processMidiEvent&&e.processMidiEvent(t);opt.mididump&&console.log(t.data)}}contextMenuOpen(t,e){if(!this.midiAccess)return;let i=document.getElementById("webaudioctrl-context-menu");i.style.left=t.pageX+"px",i.style.top=t.pageY+"px",i.knob=e,i.classList.add("active"),i.knob.focus(),i.knob.addEventListener("keydown",this.contextMenuCloseByKey.bind(this))}contextMenuCloseByKey(t){27==t.keyCode&&this.contextMenuClose()}contextMenuClose(){let t=document.getElementById("webaudioctrl-context-menu");t.knob.removeEventListener("keydown",this.contextMenuCloseByKey),t.classList.remove("active"),document.getElementById("webaudioctrl-context-menu-learn").innerHTML="Learn",t.knob.midiMode="normal"}contextMenuLearn(){let t=document.getElementById("webaudioctrl-context-menu");document.getElementById("webaudioctrl-context-menu-learn").innerHTML="Listening...",t.knob.midiMode="learn"}contextMenuClear(t){document.getElementById("webaudioctrl-context-menu").knob.midiController={},this.contextMenuClose()}preserveMidiLearn(){if(!opt.preserveMidiLearn)return;let t=[];for(let e of this.listOfWidgets)e.id&&t.push({id:e.id,cc:e.midiController});let e=JSON.stringify(t);localStorage.setItem("WebAudioControlsMidiLearn",e)}}(window.UseWebAudioControlsMidi||opt.useMidi)&&(window.webAudioControlsWidgetManager=window.webAudioControlsMidiManager=new WebAudioControlsWidgetManager)}}),parcelRequire("kQ28o");
//# sourceMappingURL=index.5aba306b.js.map
