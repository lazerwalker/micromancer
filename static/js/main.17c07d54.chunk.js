(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{100:function(e,t,n){},101:function(e,t,n){},102:function(e,t,n){"use strict";n.r(t);var r,i=n(0),o=n.n(i),a=n(33),s=n.n(a),c=(n(40),n(4)),d=n(5),u=n(8),l=n(6),p=n(7),m=(n(41),n(34));!function(e){e[e.Debug=0]="Debug",e[e.Editor=1]="Editor"}(r||(r={}));var b=function(e){for(var t=[],n=0;n<10;n++)t.push([]);return Object(m.a)({code:t,cursor:{line:0,token:0,isMidOperand:!1},memory:[],warriors:[],isPlaying:!1,debugTicks:0,nextPC:0,uiMode:r.Editor,editingCode:[],viewingOwnCode:!0},e)};function f(e){return e.split("\n").map(function(e){return e.split(" ")})}var h,g=n(3),v=n.n(g);!function(e){e[e.Immediate=0]="Immediate",e[e.Direct=1]="Direct",e[e.Indirect=2]="Indirect",e[e.Autodecrement=3]="Autodecrement"}(h||(h={}));var M,y,O,k={$:h.Direct,"#":h.Immediate,"@":h.Indirect,">":h.Autodecrement,"":h.Direct};function w(e){return v.a.invert(k)[e]||""}function D(e){return k[e]}!function(e){e[e.DAT=0]="DAT",e[e.MOV=1]="MOV",e[e.ADD=2]="ADD",e[e.SUB=3]="SUB",e[e.JMZ=4]="JMZ",e[e.JMN=5]="JMN",e[e.JMP=6]="JMP",e[e.DJN=7]="DJN",e[e.CMP=8]="CMP",e[e.SLT=9]="SLT",e[e.SPL=10]="SPL",e[e.EQU=11]="EQU",e[e.END=12]="END"}(M||(M={})),function(e){e[e.Add=0]="Add",e[e.Divide=1]="Divide",e[e.Subtract=2]="Subtract",e[e.Multiply=3]="Multiply"}(y||(y={})),function(e){e[e.NextWord=0]="NextWord",e[e.TypeOpcode=1]="TypeOpcode",e[e.TypeOperandDigit=2]="TypeOperandDigit",e[e.TypeOperandMode=3]="TypeOperandMode",e[e.TypeOperandLabel=4]="TypeOperandLabel",e[e.SetCursor=5]="SetCursor",e[e.Backspace=6]="Backspace",e[e.DebugRestart=7]="DebugRestart",e[e.DebugUndo=8]="DebugUndo",e[e.DebugPause=9]="DebugPause",e[e.DebugNext=10]="DebugNext",e[e.DebugPlay=11]="DebugPlay",e[e.DebugFast=12]="DebugFast",e[e.SwitchToDebug=13]="SwitchToDebug",e[e.SwitchToEditor=14]="SwitchToEditor",e[e.ToggleWhoseCode=15]="ToggleWhoseCode"}(O||(O={}));var A=function(e){return{type:O.TypeOpcode,value:e}},E=function(e){return{type:O.TypeOperandMode,value:w(e)}},S=function(e){return{type:O.TypeOperandDigit,value:e.toString()}},C=function(e){return{type:O.TypeOperandLabel,value:e.toString()}},P=function(){return{type:O.NextWord,value:void 0}},x=function(e,t){return{type:O.SetCursor,value:{line:e,token:t,isMidOperand:!1}}},T=function(){return{type:O.Backspace,value:void 0}},j=function(){return{type:O.DebugRestart,value:void 0}},J=function(){return{type:O.DebugUndo,value:void 0}},N=function(){return{type:O.DebugPause,value:void 0}},F=function(){return{type:O.DebugPlay,value:void 0}},I=function(){return{type:O.DebugNext,value:void 0}},L=function(){return{type:O.DebugFast,value:void 0}},U=function(){return{type:O.SwitchToDebug,value:void 0}},B=function(){return{type:O.SwitchToEditor,value:void 0}},V=function(){return{type:O.ToggleWhoseCode,value:void 0}},_=n(13);var z=n(17),R=(n(98),function(e){function t(){var e,n;Object(c.a)(this,t);for(var r=arguments.length,i=new Array(r),o=0;o<r;o++)i[o]=arguments[o];return(n=Object(u.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(i)))).restart=function(){n.props.dispatch(j())},n.undo=function(){n.props.dispatch(J())},n.pause=function(){n.props.dispatch(N())},n.next=function(){console.log("In next",Object(z.a)(n)),n.props.dispatch(I())},n.play=function(){n.props.dispatch(F())},n.fast=function(){n.props.dispatch(L())},n}return Object(p.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){return i.createElement("div",{className:"debug-toolbar",style:{textAlign:"center"}},i.createElement("button",{onClick:this.restart},"<<<"),i.createElement("button",{onClick:this.undo},"<"),i.createElement("button",{onClick:this.pause},"||"),i.createElement("button",{onClick:this.next},">"),i.createElement("button",{onClick:this.play},">>"),i.createElement("button",{onClick:this.fast},">>>"))}}]),t}(i.Component)),W=n(12),Q=n.n(W),Z=n(11);function K(e){var t=e.owner,n=e.isPC,r=e.isNext,o=e.instruction,a=Q()({"memory-cell":!0,"warrior-1":0===t,"warrior-2":1===t,pc:n,next:r}),s=[Object(Z.printOpcode)(o),Object(Z.printOperandA)(o),Object(Z.printOperandB)(o)];o.label&&s.unshift(o.label);var c=s.map(function(e){return i.createElement("div",null,e)});return i.createElement("div",{className:a},c)}n(99);var q=function(e){function t(){return Object(c.a)(this,t),Object(u.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e=this,t=this.props.memory.map(function(t,n){var r=!!e.props.warriors.find(function(e){return v.a.includes(e.pc,n)}),o=n===e.props.nextPC;return i.createElement(K,{owner:t.owner,isPC:r,isNext:o,key:"memory-".concat(n),instruction:t})});return i.createElement("div",{className:"memory-view"},t)}}]),t}(i.Component),$=(n(100),function(e){function t(){var e,n;Object(c.a)(this,t);for(var r=arguments.length,i=new Array(r),o=0;o<r;o++)i[o]=arguments[o];return(n=Object(u.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(i)))).switchToEditor=function(){n.props.dispatch(B())},n}return Object(p.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){return i.createElement("div",{className:"debug"},i.createElement(q,{memory:this.props.memory,warriors:this.props.warriors,nextPC:this.props.nextPC}),i.createElement("button",{onClick:this.switchToEditor,id:"show-editor"},"edit"),i.createElement("div",{id:"logo"},"omega"),i.createElement(R,{dispatch:this.props.dispatch}))}}]),t}(i.Component)),Y=function(e){var t=0,n=function(n){return"spacer"===n?(t+=1,i.createElement("div",{className:"spacer",key:"spacer-".concat(t)})):i.createElement("button",{key:"key-".concat(n),className:"opcode",onClick:function(){return e.onKeyPress(n)}},n)},r=[["DAT","MOV","spacer","ADD","SUB","spacer","SPL"],["JMZ","JMN","JMP"],["DJN","CMP","SLT"]].map(function(e,t){var r=e.map(n);return i.createElement("div",{className:"opcode-row",key:"opcode-row-".concat(t)},r)});return i.createElement("div",{className:"opcode keyboard"},i.createElement("div",{className:"opcodes"},r),i.createElement("button",{key:"next",id:"next-key",onClick:e.onNext},"space"),i.createElement("button",{key:"backspace",id:"backspace-key",onClick:e.onBackspace},"del"))},G=function(e){var t,n=[1,2,3,4,5,6,7,8,9,0].map(function(t){return i.createElement("button",{key:"key-".concat(t),id:"numkey-".concat(t),className:"number",onClick:function(){return e.onKeyPress(t.toString())}},t)});return t=e.canAddAddressingMode?["#","@",">","-"].map(function(t){return i.createElement("button",{key:"key-".concat(t),className:"addressingMode",disabled:!e.canAddAddressingMode,onClick:function(){return e.onKeyPress(t.toString())}},t)}):["/","*","+","-"].map(function(t){return i.createElement("button",{key:"key-".concat(t),className:"addressingMode",disabled:"-"!==t&&e.canAddAddressingMode,onClick:function(){return e.onKeyPress(t)}},t)}),i.createElement("div",{className:"keyboard number"},i.createElement("div",{className:"leftKeys"},t),i.createElement("div",{className:"numbers"},n),i.createElement("button",{key:"done",id:"next-key",disabled:!e.canNext,onClick:function(){return e.onNext()}},e.isEndOfLine?"return":","),i.createElement("button",{key:"backspace",id:"backspace-key",onClick:function(){return e.onBackspace()}},"del"))};function H(e){var t=e.code[e.cursor.line][e.cursor.token];return!!t&&function(e){var t=function(e){return parseInt(e).toString()===e},n=function(e){return!(!t(e[0])&&"-"!==e[0])&&!!t(e[e.length-1])};if(t(e)||n(e))return!0;if(D(e[0])){var r=e.slice(1);return t(r)||n(r)}return!0}(t)}var X="#012849",ee="#a9bed8",te={color1:"#918988",color2:"#f579b2",color3:"#bbee78",color4:"#f5b378",color5:"#81b3ec",color6:"#bb79ec",color7:"#81eeb2",color8:"#f5eeec"},ne=(n(101),function(e){var t=e.code.map(function(t,n){var r=n===e.currentLine&&-1===e.currentToken,o=t.map(function(t,o){var a=n===e.currentLine&&o===e.currentToken,s=Q()("token",{opcode:0===o,"operand-1":1===o,"operand-2":2===o,selected:a,operand:0!==o,empty:v.a.isUndefined(t)}),c={};return c.color=te.color1,(a||r)&&(c.backgroundColor=ee,c.color=X),i.createElement("span",{className:s,key:"token-".concat(n,"-").concat(o),onClick:function(t){e.onTokenClick&&e.onTokenClick(n,o),t.stopPropagation()},style:c},t)}),a=Q()("code-line",{"current-line":n===e.currentLine});return i.createElement("div",{className:a,key:"line-".concat(n),onClick:function(){return e.onLineClick&&e.onLineClick(n)},style:{backgroundColor:r?ee:X,color:ee}},i.createElement("span",{className:"line-num relative",style:{backgroundColor:te.color1}},n-e.currentLine),i.createElement("span",{className:"code-instruction"},o))});return i.createElement("div",{className:"container"},i.createElement("div",{className:"code-box crt",style:{background:"linear-gradient(to right, ".concat(te.color1," 40px, ").concat(X," 40px)")}},t))}),re=function(e){function t(){var e,n;Object(c.a)(this,t);for(var r=arguments.length,i=new Array(r),o=0;o<r;o++)i[o]=arguments[o];return(n=Object(u.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(i)))).switchToDebug=function(){n.codeIsValid()&&n.props.dispatch(U())},n.showOtherCode=function(){n.props.dispatch(V())},n.clickLine=function(e){n.props.dispatch(x(e,-1))},n.clickToken=function(e,t){console.log("Click token"),n.props.dispatch(x(e,t))},n.typeOpcode=function(e){n.props.dispatch(A(e))},n.typeDigitOrMode=function(e){var t;t=parseInt(e,10).toString()===e?S(parseInt(e)):v.a.isUndefined(D(e))?C(e):E(D(e)),n.props.dispatch(t)},n.next=function(){n.props.dispatch(P())},n.didTypeBackspace=function(){n.props.dispatch(T())},n.codeIsValid=function(){return!n.props.code.find(function(e){return e.length>0&&v.a.isUndefined(e[0])||v.a.isUndefined(e[1])})},n}return Object(p.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e,t=this.props,n=t.cursor,r=t.code,o=t.isOwnCode;e=0===n.token||-1===n.token?i.createElement(Y,{onKeyPress:this.typeOpcode,onNext:this.next,onBackspace:this.didTypeBackspace}):i.createElement(G,{onKeyPress:this.typeDigitOrMode,onBackspace:this.didTypeBackspace,onNext:this.next,canAddAddressingMode:!n.isMidOperand,canNext:H(this.props),isEndOfLine:2===n.token});var a=o?"enemy code":"my code",s=this.codeIsValid();return i.createElement("div",{className:"editor"},i.createElement(ne,{code:r,currentLine:n.line,currentToken:n.token,onLineClick:this.clickLine,onTokenClick:this.clickToken}),i.createElement("button",{onClick:this.switchToDebug,className:s?"":"disabled",id:"show-debug"},"debug"),i.createElement("button",{onClick:this.showOtherCode,id:"show-other"},a),i.createElement("div",{id:"logo"},"omega"),o?e:void 0)}}]),t}(i.Component),ie="const EQU 2365\nloc MOV ptr, ptr\nADD #const, ptr\nSUB #const, loc\nJMP loc\nptr JMP @0, trap\ntrap SPL 1, -100\nMOV bomb, <-1\nJMP trap\nbomb DAT #0",oe="ADD #4, 3\nMOV 2, @2\nJMP -2\nDAT #0, #0",ae=function(e){function t(e){var n;Object(c.a)(this,t),(n=Object(u.a)(this,Object(l.a)(t).call(this,e))).state=void 0,n.reducer=void 0,n.timer=void 0,n.dispatch=function(e){console.log("Dispatching",e),n.setState(n.reducer(n.state,e))};var i=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:80,i=[],o=function(e){console.log(e),console.log("---"),console.log(t),i=[e,t].map(_.parse)};o(e);var a=new _.VM(v.a.cloneDeep(i),n),s=f(e),c=f(t),d=b({code:s,editingCode:s,viewingOwnCode:!0,memory:a.memory,warriors:a.warriors,debugStartPositions:a.warriors.map(function(e){return e.pc[0]}),nextPC:a.warriors[0].pc[0]});return console.log(a.equs),{state:d,reducer:function e(t,s){var d=v.a.cloneDeep(t),u=d.cursor,l=d.code,p=l[u.line]||[];if(s.type===O.TypeOpcode)return u.token>0?t:(-1===u.token?d.code[u.line]=[s.value]:p[0]=s.value,u.token=1,u.isMidOperand=!1,d);if(s.type===O.TypeOperandDigit)return 1!==u.token&&2!==u.token?t:p?(u.isMidOperand?p[u.token]=(p[u.token]||"")+s.value:(p[u.token]=s.value,u.isMidOperand=!0),d):t;if(s.type===O.TypeOperandLabel)return 1!==u.token&&2!==u.token?t:p?("-"!==s.value||u.isMidOperand?u.isMidOperand&&(p[u.token]=(p[u.token]||"")+s.value,u.isMidOperand=!0):(p[u.token]=s.value,u.isMidOperand=!0),d):t;if(s.type===O.TypeOperandMode)return 1!==u.token&&2!==u.token?t:p?u.isMidOperand?t:(p[u.token]=s.value,u.isMidOperand=!0,d):t;if(s.type===O.NextWord){if(u.isMidOperand=!1,p[u.token]){if(1===u.token)return p[u.token]+=",",u.token=2,d;if(2===u.token)return u.token=0,u.line=u.line+1,l[u.line]||l.push([]),d}return t}if(s.type===O.SetCursor)return d.cursor=s.value,d;if(s.type===O.Backspace){var m=p[u.token];return 0===u.token?(v.a.isUndefined(m)?u.line>=0&&(u.line-=1,u.token=2):p[u.token]=void 0,d):(v.a.isUndefined(m)?u.token-=1:u.isMidOperand&&m.length>1?p[u.token]=m.slice(0,m.length-1):p[u.token]=void 0,d)}if(s.type===O.DebugRestart)return a=new _.VM(v.a.cloneDeep(i),n),d.memory=a.memory,d.warriors=a.warriors,d.debugTicks=0,d.debugStartPositions=a.warriors.map(function(e){return e.pc[0]}),d;if(s.type===O.DebugUndo){a=new _.VM(v.a.cloneDeep(i),n,void 0,d.debugStartPositions);for(var b=0,f=0;f<t.debugTicks-1;f++)b=a.tick()||b;return d.memory=a.memory,d.warriors=a.warriors,d.winner=void 0,d.debugTicks=t.debugTicks-1,d.nextPC=b,d}if(s.type===O.DebugPause)return d.isPlaying=!1,d;if(s.type===O.DebugNext){if(!v.a.isUndefined(t.winner))return console.log("Can't continue, game is over"),t;var h=a.tick();if(v.a.isUndefined(h)){d.winner=v.a.indexOf(a.warriors,a.winner()),d.isPlaying=!1;var g=0===d.winner;return alert(g?"You won!":"You lost."),d}return d.nextPC=h,console.log(a.print()),d.debugTicks+=1,d.memory=a.memory,d.warriors=a.warriors,d}return s.type===O.DebugPlay?(d.isPlaying=!0,d.playRate=100,d):s.type===O.DebugFast?(d.isPlaying=!0,d.playRate=5,d):s.type===O.SwitchToDebug?(o(function(e){return e.map(function(e){return e.join(" ")}).join("\n")}(t.code)),d.uiMode=r.Debug,e(d,j())):s.type===O.SwitchToEditor?(d.uiMode=r.Editor,d):s.type===O.ToggleWhoseCode?(d.viewingOwnCode?d.editingCode=c:d.editingCode=d.code,d.cursor={line:0,token:0,isMidOperand:!1},d.viewingOwnCode=!d.viewingOwnCode,d):t}}}(oe,ie),o=i.state,a=i.reducer;return n.state=o,n.reducer=a,n}return Object(p.a)(t,e),Object(d.a)(t,[{key:"componentDidUpdate",value:function(){var e=this;if(this.state.isPlaying&&!this.timer){!function t(){e.dispatch(I()),e.state.isPlaying&&e.state.playRate?e.timer=setTimeout(t,e.state.playRate):e.timer=void 0}()}}},{key:"render",value:function(){return this.state.uiMode===r.Editor?o.a.createElement(re,{dispatch:this.dispatch,code:this.state.editingCode,cursor:this.state.cursor,isOwnCode:this.state.viewingOwnCode}):this.state.uiMode===r.Debug?o.a.createElement($,{code:this.state.code,dispatch:this.dispatch,memory:this.state.memory,warriors:this.state.warriors,nextPC:this.state.nextPC}):(console.log("Unknown UI mode: ".concat(this.state.uiMode)),o.a.createElement("div",null))}}]),t}(o.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(o.a.createElement(ae,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},11:function(e,t,n){"use strict";var r=this&&this.__assign||Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e};Object.defineProperty(t,"__esModule",{value:!0});var i=n(19),o=n(97),a=function(){function e(e,t,n,r){void 0===t&&(t=8e3),this.cycles=0,this.nextProgramIndex=0,this.labels={},this.equs={},this.memory=[],this.warriors=[],this.programs=e,this.size=t,this.cycleLimit=n;for(var o,a={opcode:i.Opcode.DAT,aMode:i.AddressingMode.Immediate,aField:0,bMode:i.AddressingMode.Immediate,bField:0},c=0;c<t;c++)this.memory[c]=Object.assign({},a);if(r&&r.length===e.length)o=r;else{var d=this.findStartPositions(e,t);if(null===d)return void console.log("Could not assign positions");o=d}for(c=0;c<e.length;c++)for(var u=e[c],l=o[c],p=0,m=0;m<u.length;m++){var b=s(l+m+p,t),f=u[m];if(f.owner=c,f.opcode===i.Opcode.END){f.aField&&this.labels[f.aField]&&(o[c]=this.labels[f.aField]);break}f.opcode!==i.Opcode.EQU?(this.memory[b]=f,f.label&&(this.labels[f.label]=b)):(f.label&&(this.equs[f.label]=f.aField),p-=1)}this.warriors=o.map(function(e,t){return{number:t,pc:[e]}})}return e.prototype.tick=function(){var e=this.warriors[this.nextProgramIndex];if(e)if(this.execute(e),0!==e.pc.length){if(this.cycles++,!(this.cycleLimit&&this.cycles>this.cycleLimit))return this.nextProgramIndex+=1,this.nextProgramIndex>=this.warriors.length&&(this.nextProgramIndex=0),this.warriors[this.nextProgramIndex].pc[0];console.log("Game over: draw!")}else console.log("Game over: player "+e.number+" bombed!");else console.log("Warning: couldn't execute program")},e.prototype.winner=function(){var e=this.warriors.filter(function(e){return e.pc.length>0});if(1===e.length)return e[0]},e.prototype.print=function(){var e=[];e.push("CYCLE "+this.cycles);for(var t=0,n=this.warriors;t<n.length;t++){var r=n[t];e.push("Process Queue: ["+r.pc+"]");for(var i=-5;i<15;i++){var o=s(r.pc[0]+i,this.size),a=o+": "+c(this.memory[o]);0===i&&(a+=" <-- "+r.number),e.push(a)}}return e.push(""),e.join("\n")},e.prototype.findStartPositions=function(e,t){var n=o.flatten(e).length,r=Math.floor((t-n)/2),i=o.random(0,t);return e.map(function(e,n){return(i+n*r)%t})},e.prototype.execute=function(e){var t=e.pc.shift(),n=this.memory[t],o=n.opcode,a=n.aMode,c=n.aField,d=n.bMode,u=n.bField,l=this.evaluateOperand(t,a,c,this.size),p=this.evaluateOperand(t,d,u,this.size),m=this.memory[l],b=this.memory[p];n.owner=e.number;var f=!0;switch(o){case i.Opcode.ADD:if(d===i.AddressingMode.Immediate)return;a===i.AddressingMode.Immediate?(b.bField=s(this.evaluateField(p,b.bField)+l,this.size),b.owner=e.number):(b.aField=s(this.evaluateField(p,b.aField)+l,this.size),b.bField=s(this.evaluateField(p,b.bField)+p,this.size),b.owner=e.number);break;case i.Opcode.CMP:a===i.AddressingMode.Immediate?c===b.bField&&(e.pc.push(t+2),f=!1):m===b&&(e.pc.push(t+2),f=!1);break;case i.Opcode.DAT:f=!1;break;case i.Opcode.DJN:if(d===i.AddressingMode.Immediate)break;b.bField=this.evaluateField(p,b.bField)-1,b.owner=e.number,0===b.bField&&a!=i.AddressingMode.Immediate&&(e.pc.push(m.aField),f=!1);break;case i.Opcode.MOV:a===i.AddressingMode.Immediate||d===i.AddressingMode.Immediate?(b.bField=l,b.owner=e.number):(this.memory[p]=r({},m),m.label&&(this.labels[m.label]=p));break;case i.Opcode.JMP:if(a===i.AddressingMode.Immediate)break;e.pc.push(l),f=!1;break;case i.Opcode.JMZ:if(a===i.AddressingMode.Immediate)break;0===b.bField&&(e.pc.push(l),f=!1);break;case i.Opcode.JMZ:if(a===i.AddressingMode.Immediate)break;0!==b.bField&&(e.pc.push(l),f=!1);break;case i.Opcode.SPL:if(a===i.AddressingMode.Immediate)break;e.pc.push(t+1),e.pc.push(l),f=!1;break;case i.Opcode.SLT:if(d===i.AddressingMode.Immediate)break;(a===i.AddressingMode.Immediate?c:m.aField)<b.bField&&(e.pc.push(t+2),f=!1);break;case i.Opcode.SUB:if(d===i.AddressingMode.Immediate)return;a===i.AddressingMode.Immediate?(b.bField=s(this.evaluateField(p,b.bField)-l,this.size),b.owner=e.number):(b.aField=s(this.evaluateField(p,b.aField)-l,this.size),b.bField=s(this.evaluateField(p,b.bField)-p,this.size),b.owner=e.number)}f&&e.pc.push(s(t+1,this.size))},e.prototype.evaluateOperand=function(e,t,n,r){if("number"===typeof n){if(t===i.AddressingMode.Immediate)return n;var o=s(n+e,r);if(t===i.AddressingMode.Direct)return o;var a=this.evaluateField(o,this.memory[o].bField);return t===i.AddressingMode.Autodecrement&&(a-=1,this.memory[o].bField=a),s(o+=a,this.size)}var c=this.evaluateField(e,n);return this.evaluateOperand(e,t,c,r)},e.prototype.evaluateField=function(e,t){if("number"===typeof t)return t;if(void 0!==t.operator){var n=this.evaluateField(e,t.left),r=this.evaluateField(e,t.right);if(o.isUndefined(n)||o.isUndefined(r))return-1;switch(t.operator){case i.MathOperator.Add:return n+r;case i.MathOperator.Subtract:return n-r;case i.MathOperator.Multiply:return n*r;case i.MathOperator.Divide:return n/r}return-1}return"string"===typeof t?void 0!=this.labels[t]?this.labels[t]-e:void 0!=this.equs[t]?this.equs[t]:(console.log("FATAL ERROR: could not find label '"+t+"'"),-1):-1},e}();function s(e,t){for(var n=e;n<0;)n=t+n;return n%t}function c(e){var n=t.printOpcode(e)+" "+t.printOperandA(e)+", "+t.printOperandB(e);return e.label?e.label+" "+n:n}t.VM=a,t.printInstruction=c,t.printOpcode=function(e){return i.Opcode[e.opcode]},t.printOperand=function(e,t){return""+function(e){switch(e){case i.AddressingMode.Direct:return"";case i.AddressingMode.Immediate:return"#";case i.AddressingMode.Indirect:return"@";case i.AddressingMode.Autodecrement:return">"}}(e)+d(t)},t.printOperandA=function(e){return t.printOperand(e.aMode,e.aField)},t.printOperandB=function(e){return t.printOperand(e.bMode,e.bField)};var d=function e(t){return"string"==typeof t?t:"number"==typeof t?""+t:""+e(t.left)+function(e){switch(e){case i.MathOperator.Add:return"+";case i.MathOperator.Subtract:return"-";case i.MathOperator.Multiply:return"*";case i.MathOperator.Divide:return"/"}}(t.operator)+e(t.right)}},13:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}(n(19));var r=n(42);t.parse=r.parse;var i=n(11);t.VM=i.VM},19:function(e,t,n){"use strict";var r,i;Object.defineProperty(t,"__esModule",{value:!0}),function(e){e[e.Immediate=0]="Immediate",e[e.Direct=1]="Direct",e[e.Indirect=2]="Indirect",e[e.Autodecrement=3]="Autodecrement"}(r=t.AddressingMode||(t.AddressingMode={})),function(e){e[e.DAT=0]="DAT",e[e.MOV=1]="MOV",e[e.ADD=2]="ADD",e[e.SUB=3]="SUB",e[e.JMZ=4]="JMZ",e[e.JMN=5]="JMN",e[e.JMP=6]="JMP",e[e.DJN=7]="DJN",e[e.CMP=8]="CMP",e[e.SPL=9]="SPL",e[e.SLT=10]="SLT",e[e.EQU=11]="EQU",e[e.END=12]="END"}(i=t.Opcode||(t.Opcode={})),function(e){e[e.Add=0]="Add",e[e.Divide=1]="Divide",e[e.Subtract=2]="Subtract",e[e.Multiply=3]="Multiply"}(t.MathOperator||(t.MathOperator={})),t.instructionToString=function(e){var t,n=e.label,o=e.opcode,a=e.aMode,s=e.aField,c=e.bMode,d=e.bField,u=((t={})[r.Immediate]="#",t[r.Direct]="",t[r.Indirect]="@",t[r.Autodecrement]="<",t),l=i[o]+" "+u[a]+s+", "+u[c]+" "+d;return n&&(l=n+" "+l),l}},35:function(e,t,n){e.exports=n(102)},40:function(e,t,n){},41:function(e,t,n){},42:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(19),i=n(14);t.grammar=i.grammar('\nProgram {\n\n  Program = Instruction+\n  \n  Instruction \n   = label opcode Operand ("," Operand)? comment? -- label\n   | opcode Operand ("," Operand)? comment? -- nolabel\n   | comment -- commentonly\n  \n  label\n      = word\n  \n  opcode\n      = "DAT"\n      | "MOV"\n      | "ADD"\n      | "SUB"\n      | "JMZ"\n      | "JMN"\n      | "JMP"\n      | "DJN"\n      | "CMP"\n      | "SPL"\n      | "SLT"\n      | "EQU"\n      | "END"\n      | "dat"\n      | "mov"\n      | "add"\n      | "sub"\n      | "jmz"\n      | "jmn"\n      | "jmp"\n      | "djn"\n      | "cmp"\n      | "spl"\n      | "slt"\n      | "equ"\n      | "end"    \n  \n  \n  Operand\n      = addressingMode? OperandValue\n  \n  OperandValue = AddExp | OperandValue\n  \n  AddExp\n      = AddExp "+" MulExp  -- plus\n      | AddExp "-" MulExp  -- minus\n      | MulExp\n  \n  MulExp\n      = MulExp "*" operandLiteral  -- times\n      | MulExp "/" operandLiteral  -- divide\n      | operandLiteral\n  \n  operandLiteral = number | label\n  \n  addressingMode = "$" | "#" | "@" | "<"\n  \n  comment = ";" (~lineTerminator any)*\n  \n  word = alnum+\n  \n  number = "-"? digit+\n  \n  lineTerminator = "\\n" | "\\r" | "\\u2028" | "\\u2029"\n  \n  }'),t.semantics=t.grammar.createSemantics(),t.parse=function(e){var n=t.grammar.match(e);return t.semantics(n).asMarsJSObject()},t.semantics.addOperation("asMarsJSObject",{Program:function(e){return e.children.map(function(e){return e.asMarsJSObject()}).filter(function(e){return void 0!=e})},Instruction_label:function(e,t,n,i,o,a){var s=n.asMarsJSObject(),c=o.asMarsJSObject()[0]||{addressingMode:r.AddressingMode.Direct,field:0},d={label:e.asMarsJSObject(),opcode:t.asMarsJSObject(),aMode:s.addressingMode,aField:s.field,bMode:c.addressingMode,bField:c.field},u=a.asMarsJSObject()[0];return u&&(d.comment=u),d},Instruction_nolabel:function(e,t,n,i,o){var a=t.asMarsJSObject(),s=i.asMarsJSObject()[0]||{addressingMode:r.AddressingMode.Direct,field:0},c={opcode:e.asMarsJSObject(),aMode:a.addressingMode,aField:a.field,bMode:s.addressingMode,bField:s.field},d=o.asMarsJSObject()[0];return d&&(c.comment=d),c},Instruction_commentonly:function(e){},Operand:function(e,t){return{addressingMode:{$:r.AddressingMode.Direct,"#":r.AddressingMode.Immediate,"@":r.AddressingMode.Indirect,"<":r.AddressingMode.Autodecrement,"":r.AddressingMode.Direct}[e.sourceString],field:t.asMarsJSObject()}},OperandValue:function(e){return e.asMarsJSObject()},AddExp:function(e){return e.asMarsJSObject()},AddExp_plus:function(e,t,n){return{operator:r.MathOperator.Add,left:e.asMarsJSObject(),right:n.asMarsJSObject()}},AddExp_minus:function(e,t,n){return{operator:r.MathOperator.Subtract,left:e.asMarsJSObject(),right:n.asMarsJSObject()}},MulExp_times:function(e,t,n){return{operator:r.MathOperator.Multiply,left:e.asMarsJSObject(),right:n.asMarsJSObject()}},MulExp_divide:function(e,t,n){return{operator:r.MathOperator.Divide,left:e.asMarsJSObject(),right:n.asMarsJSObject()}},operandLiteral:function(e){return e.asMarsJSObject()},opcode:function(e){return r.Opcode[e.sourceString.toUpperCase()]},number:function(e,t){return parseInt(""+e.sourceString+t.sourceString)},label:function(e){return e.sourceString},comment:function(e,t){return t.sourceString}})},98:function(e,t,n){},99:function(e,t,n){}},[[35,1,2]]]);
//# sourceMappingURL=main.17c07d54.chunk.js.map