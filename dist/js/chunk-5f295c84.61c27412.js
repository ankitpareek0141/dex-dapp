(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5f295c84"],{9513:function(e,t,n){"use strict";n("b5de")},b5de:function(e,t,n){},c792:function(e,t,n){"use strict";n.r(t);n("b0c0");var c=n("7a23"),a=function(e){return Object(c["y"])("data-v-f1d9e8a8"),e=e(),Object(c["w"])(),e},l={open:""},o=a((function(){return Object(c["h"])("p",null,"Select Tokens",-1)})),s=a((function(){return Object(c["h"])("hr",null,null,-1)})),r=a((function(){return Object(c["h"])("label",{for:"address"},"New token:",-1)})),i=["onClick"],u=a((function(){return Object(c["h"])("br",null,null,-1)})),d={style:{float:"right"}};function b(e,t,n,a,b,j){return Object(c["v"])(),Object(c["g"])("dialog",l,[Object(c["h"])("div",null,[o,s,r,Object(c["J"])(Object(c["h"])("input",{placeholder:"custom token",name:"address",id:"address","onUpdate:modelValue":t[0]||(t[0]=function(e){return b.newAddress=e}),onKeyup:t[1]||(t[1]=Object(c["K"])((function(e){return j.submitAddress(b.newAddress)}),["enter"]))},null,544),[[c["G"],b.newAddress,void 0,{trim:!0}]]),(Object(c["v"])(!0),Object(c["g"])(c["a"],null,Object(c["B"])(b.coins,(function(e){return Object(c["v"])(),Object(c["g"])("ul",{key:e.address,onClick:function(t){return j.submitAddress(e.address)}},[Object(c["i"])(Object(c["E"])(e.abbr)+" ",1),u,Object(c["h"])("small",null,Object(c["E"])(e.name),1),Object(c["h"])("span",d,[Object(c["h"])("small",null,Object(c["E"])(e.balance),1)])],8,i)})),128)),Object(c["h"])("button",{style:{float:"right"},onClick:t[2]||(t[2]=function(t){return e.closeDialog()})},"Close")])])}var j=n("c7eb"),O=n("1da1"),p=n("5530"),f=n("5502"),h=n("2b1c"),m=n("6db5"),w={props:["swapDialNum"],data:function(){return{coins:h["a"],newAddress:null}},methods:Object(p["a"])(Object(p["a"])({},Object(f["b"])({closeDialog:"closeLiqDialog"})),{},{submitAddress:function(e){var t=this;return Object(O["a"])(Object(j["a"])().mark((function n(){return Object(j["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,console.log("liq->",t.coins),n.next=4,m["d"](t.$store.state.account0,e).then((function(n){t.liqTokenSymbolVal[t.swapDialNum]=n.symbol,t.liqDialogVal.DialnumAdd[t.swapDialNum]=e,t.$store.dispatch("displayMaxTokenBalanceLiq",{add:e,ind:t.swapDialNum}),t.$store.dispatch("displayReservesPool")}));case 4:t.$store.dispatch("closeLiqDialog"),n.next=10;break;case 7:n.prev=7,n.t0=n["catch"](0),console.log("Invalid token address!");case 10:case"end":return n.stop()}}),n,null,[[0,7]])})))()}}),computed:Object(p["a"])({},Object(f["c"])({liqTokenSymbolVal:"getLiqTokenSymbol",liqDialogVal:"getLiqDialog"}))},g=(n("9513"),n("d959")),k=n.n(g);const v=k()(w,[["render",b],["__scopeId","data-v-f1d9e8a8"]]);t["default"]=v}}]);
//# sourceMappingURL=chunk-5f295c84.61c27412.js.map