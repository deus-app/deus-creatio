(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{9208:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(9178)}])},9178:function(e,t,n){"use strict";n.r(t);var o=n(5893),a=n(7294),s=n(3376),c=n(3377),l=n(2729),_=n.n(l);t.default=()=>{let[e,t]=(0,a.useState)([[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,3,0,0,0],[0,0,0,1,2,3,0,0],[0,0,3,2,1,0,0,0],[0,0,0,3,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]]),[n,l]=(0,a.useState)(1),d=async()=>{let e=await s.x.board.$get().catch(c.F);null!==e&&t(e)},i=async(n,o,a)=>{if(3===e[o][n]){let c=await s.x.board.post({body:{board:e,x:n,y:o,turn:a}});console.log(c.body.board),t(c.body.board),l(3-c.body.turn)}},r=async()=>{let n=await s.x.newboard.post({body:{board:e}});console.log(n),t(n.body),l(1)};(0,a.useEffect)(()=>{d()},[]);let u=(()=>{let t=0;for(let n=0;n<8;n++)for(let o=0;o<8;o++)3===e[n][o]&&t++;return t})();return 0===u&&alert("ゲーム終了"),(0,o.jsxs)("div",{className:_().container,children:[(0,o.jsx)("div",{className:_().board,children:e.map((e,t)=>e.map((e,a)=>(0,o.jsx)("div",{className:_().cell,onClick:()=>i(a,t,n),children:0!==e&&(0,o.jsx)("div",{className:_().stone,style:{background:3===e?"#adff2f":1===e?"#000":"#fff"}})},"".concat(a,"-").concat(t))))}),(0,o.jsx)("button",{className:_().button,onClick:r,children:"ゲーム終了"})]})}},2729:function(e){e.exports={title:"index_title__k0g7D",tasks:"index_tasks__ExTXY",deleteBtn:"index_deleteBtn__wZo2L",container:"index_container___q52_",board:"index_board__dNO5V",cell:"index_cell__E8qMc",stone:"index_stone__5i_qa",button:"index_button__STkB1"}}},function(e){e.O(0,[774,888,179],function(){return e(e.s=9208)}),_N_E=e.O()}]);