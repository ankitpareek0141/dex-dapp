(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0965925a"],{1936:function(e,t,n){"use strict";n("54d6")},"54d6":function(e,t,n){},c792:function(e,t,n){"use strict";n.r(t);n("b0c0");var c=n("7a23"),o=function(e){return Object(c["pushScopeId"])("data-v-65fc979c"),e=e(),Object(c["popScopeId"])(),e},l={open:""},a=o((function(){return Object(c["createElementVNode"])("p",null,"Select Tokens",-1)})),r=o((function(){return Object(c["createElementVNode"])("hr",null,null,-1)})),s=o((function(){return Object(c["createElementVNode"])("label",{for:"address"},"New token:",-1)})),i=["onClick"],d=o((function(){return Object(c["createElementVNode"])("br",null,null,-1)})),u={style:{float:"right"}};function b(e,t,n,o,b,p){return Object(c["openBlock"])(),Object(c["createElementBlock"])("dialog",l,[Object(c["createElementVNode"])("div",null,[a,r,s,Object(c["withDirectives"])(Object(c["createElementVNode"])("input",{placeholder:"custom token",name:"address",id:"address","onUpdate:modelValue":t[0]||(t[0]=function(e){return b.newAddress=e}),onKeyup:t[1]||(t[1]=Object(c["withKeys"])((function(e){return p.submitAddress(b.newAddress)}),["enter"]))},null,544),[[c["vModelText"],b.newAddress,void 0,{trim:!0}]]),(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(e.$store.state.coins,(function(e){return Object(c["openBlock"])(),Object(c["createElementBlock"])("ul",{key:e.address,onClick:function(t){return p.submitAddress(e.address)}},[Object(c["createTextVNode"])(Object(c["toDisplayString"])(e.abbr)+" ",1),d,Object(c["createElementVNode"])("small",null,Object(c["toDisplayString"])(e.name),1),Object(c["createElementVNode"])("span",u,[Object(c["createElementVNode"])("small",null,Object(c["toDisplayString"])(e.balance),1)])],8,i)})),128)),Object(c["createElementVNode"])("button",{style:{float:"right"},onClick:t[2]||(t[2]=function(t){return e.closeDialog()})},"Close")])])}var p=n("c7eb"),m=n("1da1"),j=n("5530"),O=n("5502"),f=n("6db5"),k={props:["swapDialNum"],data:function(){return{newAddress:null}},methods:Object(j["a"])(Object(j["a"])({},Object(O["b"])({closeDialog:"closeLiqDialog"})),{},{submitAddress:function(e){var t=this;return Object(m["a"])(Object(p["a"])().mark((function n(){return Object(p["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,f["e"](t.$store.state.account0,e,!0).then((function(n){t.liqTokenSymbolVal[t.swapDialNum]=n.symbol,t.liqDialogVal.DialnumAdd[t.swapDialNum]=e,t.$store.dispatch("displayMaxTokenBalanceLiq",{add:e,ind:t.swapDialNum}),t.$store.dispatch("displayReservesPool")}));case 3:t.$store.dispatch("closeLiqDialog"),n.next=9;break;case 6:n.prev=6,n.t0=n["catch"](0),console.log("Invalid token address!");case 9:case"end":return n.stop()}}),n,null,[[0,6]])})))()}}),computed:Object(j["a"])({},Object(O["c"])({liqTokenSymbolVal:"getLiqTokenSymbol",liqDialogVal:"getLiqDialog"}))},w=(n("1936"),n("d959")),h=n.n(w);const g=h()(k,[["render",b],["__scopeId","data-v-65fc979c"]]);t["default"]=g}}]);
//# sourceMappingURL=chunk-0965925a.5c04d9a6.js.map