(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8c73201e"],{"2b1c":function(e,a,n){"use strict";n.d(a,"a",(function(){return c}));n("4ec9"),n("d3b7"),n("3ca3"),n("ddb0");var t=n("e0d4"),c=[{name:"Wrapped Ether",abbr:"WETH",address:"0xc778417E063141139Fce010982780140Aa0cD5Ab"},{name:"Dai",abbr:"DAI",address:"0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735"},{name:"Tether USD",abbr:"USDT",address:"0x3B00Ef435fA4FcFF5C209a37d1f3dcff37c705aD"},{name:"Uniswap",abbr:"UNI",address:"0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"},{name:"Maker",abbr:"MKR",address:"0xF9bA5210F91D0474bd1e1DcDAeC4C58E359AaD85"},{name:"Kaju Token",abbr:"KAJU",address:"0x4c1740DE7EC715652634E85C54D84f082B297910"},{name:"Test Token",abbr:"TEST",address:"0xf9CcAeE0ef99Ab2eAF68A60e7dC3a25582A8Bd6B"}],s=new Map;s.set(t["a"].RINKEBY,c)},"2daf":function(e,a,n){"use strict";n.r(a);n("b0c0");var t=n("7a23"),c=function(e){return Object(t["y"])("data-v-097e7610"),e=e(),Object(t["w"])(),e},s={open:""},r=c((function(){return Object(t["h"])("p",null,"Select Tokens",-1)})),d=c((function(){return Object(t["h"])("hr",null,null,-1)})),o=c((function(){return Object(t["h"])("label",{for:"address"},"New token:",-1)})),b=["onClick"],u=c((function(){return Object(t["h"])("br",null,null,-1)}));function l(e,a,n,c,l,i){return Object(t["v"])(),Object(t["g"])("dialog",s,[r,d,o,Object(t["J"])(Object(t["h"])("input",{placeholder:"custom token",name:"address",id:"address","onUpdate:modelValue":a[0]||(a[0]=function(e){return l.newAddress=e}),onKeyup:a[1]||(a[1]=Object(t["K"])((function(e){return i.submitAddress(l.newAddress)}),["enter"]))},null,544),[[t["G"],l.newAddress,void 0,{trim:!0}]]),(Object(t["v"])(!0),Object(t["g"])(t["a"],null,Object(t["B"])(l.coins,(function(e){return Object(t["v"])(),Object(t["g"])("ul",{key:e.address,onClick:function(a){return i.submitAddress(e.address)}},[Object(t["i"])(Object(t["E"])(e.abbr)+" ",1),u,Object(t["h"])("small",null,Object(t["E"])(e.name),1)],8,b)})),128)),Object(t["h"])("button",{style:{float:"right"},onClick:a[2]||(a[2]=function(a){return e.closeDialog()})},"Close")])}var i=n("c7eb"),p=n("1da1"),f=n("5530"),j=n("5502"),w=n("2b1c"),O=n("6db5"),m=n("a190"),D={props:["swapDialNum"],data:function(){return{coins:w["a"],newAddress:null}},methods:Object(f["a"])(Object(f["a"])({},Object(j["b"])({closeDialog:"closeSwapDialog"})),{},{submitAddress:function(e){var a=this;return Object(p["a"])(Object(i["a"])().mark((function n(){var t;return Object(i["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,m["a"].eth.getAccounts();case 3:t=n.sent,O["d"](t[0],e).then((function(n){a.swapTokenSymbolVal[a.swapDialNum]=n.symbol,a.swapDialogVars.DialnumAdd[a.swapDialNum]=e,a.$store.dispatch("displayMaxTokenBalance",{add:e,ind:a.swapDialNum}),a.$store.dispatch("displayReservesSwap")})),a.$store.dispatch("closeSwapDialog"),n.next=11;break;case 8:n.prev=8,n.t0=n["catch"](0),console.log("Invalid token address!");case 11:case"end":return n.stop()}}),n,null,[[0,8]])})))()}}),computed:Object(f["a"])({},Object(j["c"])({swapDialogVars:"getSwapDialog",swapTokenSymbolVal:"getSwapTokenSymbol"}))},A=(n("33f3"),n("d959")),h=n.n(A);const k=h()(D,[["render",l],["__scopeId","data-v-097e7610"]]);a["default"]=k},"33f3":function(e,a,n){"use strict";n("3d5a")},"3d5a":function(e,a,n){}}]);
//# sourceMappingURL=chunk-8c73201e.07029a4f.js.map