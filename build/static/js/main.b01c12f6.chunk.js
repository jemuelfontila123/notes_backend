(this.webpackJsonpnotes=this.webpackJsonpnotes||[]).push([[0],{19:function(e,t,n){e.exports=n(43)},25:function(e,t,n){},43:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(17),u=n.n(c),o=n(2),l=n.n(o),i=n(3),s=n(18),p=n(6),m=function(e){var t=e.note,n=e.handleButton;return r.a.createElement("div",{className:"inline-flex"},r.a.createElement("li",null,t.content),r.a.createElement("button",{onClick:n,className:"btn-prime"},t.important?"make not important":"make important"))},f=(n(25),function(e){var t=e.handleForm,n=e.title,a=e.label,c=e.value,u=e.handleInput,o=e.buttonDescription;return r.a.createElement("div",null,r.a.createElement("form",{onSubmit:t},r.a.createElement("legend",null,r.a.createElement("strong",null,n)),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,a),r.a.createElement("input",{type:"text",name:a,onChange:u,value:c})),r.a.createElement("button",{type:"submit",className:"btn-primary"},o)))}),d=n(7),b=n.n(d),v={getAll:function(){var e=Object(i.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.a.get("/api/notes");case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),addNote:function(){var e=Object(i.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.a.post("/api/notes",t);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},h=function(){var e=Object(a.useState)([]),t=Object(p.a)(e,2),n=t[0],c=t[1],u=Object(a.useState)(""),o=Object(p.a)(u,2),d=o[0],b=o[1],h=Object(a.useState)(!0),E=Object(p.a)(h,2),w=E[0],g=E[1],j=function(){var e=Object(i.a)(l.a.mark((function e(t){var a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),a={id:n.length,content:d,date:new Date,important:!0},e.next=4,v.addNote(a);case 4:c(n.concat(a)),b("");case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),k=function(){var e=Object(i.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.getAll();case 2:t=e.sent,c(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(a.useEffect)((function(){k()}),[]),r.a.createElement("div",null,r.a.createElement("h1",null,"Notes"),r.a.createElement("button",{onClick:function(){console.log(!w),g(!w)},className:"btn-green"},w?"Show important":"Show All"),r.a.createElement("ul",null,w&&n.length?n.map((function(e,t){return r.a.createElement(m,{key:e.id,note:e,handleButton:function(){return function(e,t){n[t].important=!e.important,c(Object(s.a)(n))}(e,t)}})})):n.filter((function(e){return!0===e.important})).map((function(e){return r.a.createElement(m,{key:e.id,note:e})}))),r.a.createElement(f,{handleForm:j,title:"Adding New Note",label:"Description",value:d,handleInput:function(e){return b(e.target.value)},buttonDescription:"Add New Note"}))};u.a.render(r.a.createElement(h,null),document.querySelector("#root"))}},[[19,1,2]]]);
//# sourceMappingURL=main.b01c12f6.chunk.js.map