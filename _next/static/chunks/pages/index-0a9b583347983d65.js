(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{9208:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return t(9178)}])},9178:function(e,n,t){"use strict";t.r(n);var s=t(5893),a=t(987),o=t(8583),r=t(7294),i=t(5371),l=t(3376),d=t(2729),c=t.n(d);n.default=()=>{let[e]=(0,o.KO)(i.L),[n,t]=(0,r.useState)(!1),[d,u]=(0,r.useState)(""),[_,x]=(0,r.useState)(0),m=d.substring(0,_),g=(0,r.useRef)(null),[h,v]=(0,r.useState)({}),[p,N]=(0,r.useState)([]),[b,f]=(0,r.useState)(-1),[k,j]=(0,r.useState)(""),C=(0,r.useCallback)(async()=>{if(!e){console.error("User is null or undefined!");return}let n=await l.x.dolan.$post({body:{id:e.id}});N(n)},[e]);(0,r.useEffect)(()=>{C();let e=setInterval(C,100);return()=>{clearInterval(e)}},[C]);let y=e=>{v(n=>({...n,[e]:!n[e]}))},w=async()=>{if(!e){console.error("User is null or undefined!");return}x(0),t(!1),u("読み込み中..."),console.log("押した");let n=await l.x.langchain.$post({body:{id:e.id,values:h,message:k}});u(n.toString()),console.log(n),j("")};return(0,r.useEffect)(()=>{let e=setInterval(()=>{_<d.length?(x(e=>e+1),g.current&&(g.current.scrollTop=g.current.scrollHeight)):clearInterval(e)},100);return()=>clearInterval(e)},[_,d]),(0,s.jsxs)("div",{className:c().container,children:[(0,s.jsx)("div",{className:c().conversationList,children:p.map((e,n)=>(0,s.jsxs)("div",{className:c().messageBox,children:[(0,s.jsx)("div",{style:{maxHeight:b===n?"none":"100px",overflow:"hidden"},children:e.message}),e.message.length>40&&b!==n&&(0,s.jsx)("button",{onClick:()=>f(n),children:"read more"}),b===n&&(0,s.jsx)("button",{onClick:()=>f(-1),children:"close"})]},n))}),(0,s.jsx)("div",{className:c().gridContainer,children:[...Array(8)].map((e,n)=>(0,s.jsx)("div",{className:c().gridItem,onClick:()=>y(n),children:(0,s.jsx)(a.Z,{style:{backgroundColor:"#a8a8a8 "},checkedChildren:(0,s.jsx)("span",{style:{backgroundColor:"#a8a8a8"},children:"ON"})})},n))}),(0,s.jsx)("button",{className:c().buttonAskDoraemon,onClick:()=>t(!0),children:"教えてDOLAN"}),(0,s.jsx)("div",{className:c().doraemonImage}),(0,s.jsx)("div",{ref:g,className:c().quote,children:m}),n&&(0,s.jsx)("div",{className:c().overlay,children:(0,s.jsxs)("div",{className:c().inputModal,children:[(0,s.jsx)("input",{type:"text",className:c().inputarea,placeholder:"ここに質問を入力",value:k,onChange:e=>{j(e.target.value)}}),(0,s.jsx)("button",{className:c().sendButton,onClick:w,children:"送信"}),(0,s.jsx)("button",{className:c().closebutton,onClick:()=>t(!1),children:"閉じる"})]})})]})}},2729:function(e){e.exports={container:"index_container___q52_",conversationList:"index_conversationList__wZg0q",messageBox:"index_messageBox__pyWI4",gridContainer:"index_gridContainer__GN9wk",gridItem:"index_gridItem__v7Pnw",buttonAskDoraemon:"index_buttonAskDoraemon__kgcQS",dolanLabel:"index_dolanLabel__Pjevi",doraemonImage:"index_doraemonImage__80TQJ",quote:"index_quote__3NMTm",overlay:"index_overlay__KG8_4",inputModal:"index_inputModal___TLdL",inputarea:"index_inputarea__FZHLB",sendButton:"index_sendButton__Yndkl",closebutton:"index_closebutton__EhAu3"}}},function(e){e.O(0,[987,774,888,179],function(){return e(e.s=9208)}),_N_E=e.O()}]);