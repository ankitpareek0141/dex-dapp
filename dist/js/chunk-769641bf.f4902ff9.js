(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-769641bf"],{"2daf":function(e,t,n){"use strict";n.r(t);n("b0c0");var a=n("7a23"),c=function(e){return Object(a["y"])("data-v-103dd7c0"),e=e(),Object(a["w"])(),e},s={open:""},o=c((function(){return Object(a["h"])("p",null,"Select Tokens",-1)})),r=c((function(){return Object(a["h"])("hr",null,null,-1)})),l=c((function(){return Object(a["h"])("label",{for:"address"},"New token:",-1)})),u=["onClick"],d=c((function(){return Object(a["h"])("br",null,null,-1)})),i={style:{float:"right"}};function b(e,t,n,c,b,p){return Object(a["v"])(),Object(a["g"])("dialog",s,[o,r,l,Object(a["J"])(Object(a["h"])("input",{placeholder:"custom token",name:"address",id:"address","onUpdate:modelValue":t[0]||(t[0]=function(e){return b.newAddress=e}),onKeyup:t[1]||(t[1]=Object(a["K"])((function(e){return p.submitAddress(b.newAddress)}),["enter"]))},null,544),[[a["G"],b.newAddress,void 0,{trim:!0}]]),(Object(a["v"])(!0),Object(a["g"])(a["a"],null,Object(a["B"])(b.coins,(function(e){return Object(a["v"])(),Object(a["g"])("ul",{key:e.address,onClick:function(t){return p.submitAddress(e.address)}},[Object(a["i"])(Object(a["E"])(e.abbr)+" ",1),d,Object(a["h"])("small",null,Object(a["E"])(e.name),1),Object(a["h"])("span",i,[Object(a["h"])("small",null,Object(a["E"])(e.balance),1)])],8,u)})),128)),Object(a["h"])("button",{style:{float:"right"},onClick:t[2]||(t[2]=function(t){return e.closeDialog()})},"Close")])}var p=n("c7eb"),j=n("1da1"),O=n("5530"),w=n("5502"),f=n("2b1c"),h=n("6db5"),m=n("a190"),g={props:["swapDialNum"],data:function(){return{coins:f["a"],newAddress:null}},methods:Object(O["a"])(Object(O["a"])({},Object(w["b"])({closeDialog:"closeSwapDialog"})),{},{submitAddress:function(e){var t=this;return Object(j["a"])(Object(p["a"])().mark((function n(){var a;return Object(p["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,m["a"].eth.getAccounts();case 3:a=n.sent,h["d"](a[0],e).then((function(n){t.swapTokenSymbolVal[t.swapDialNum]=n.symbol,t.swapDialogVars.DialnumAdd[t.swapDialNum]=e,t.$store.dispatch("displayMaxTokenBalance",{add:e,ind:t.swapDialNum}),t.$store.dispatch("displayReservesSwap")})),t.$store.dispatch("closeSwapDialog"),n.next=11;break;case 8:n.prev=8,n.t0=n["catch"](0),console.log("Invalid token address!");case 11:case"end":return n.stop()}}),n,null,[[0,8]])})))()}}),computed:Object(O["a"])({},Object(w["c"])({swapDialogVars:"getSwapDialog",swapTokenSymbolVal:"getSwapTokenSymbol"}))},k=(n("304f"),n("d959")),v=n.n(k);const D=v()(g,[["render",b],["__scopeId","data-v-103dd7c0"]]);t["default"]=D},"304f":function(e,t,n){"use strict";n("c566")},c566:function(e,t,n){}}]);
//# sourceMappingURL=chunk-769641bf.f4902ff9.js.map