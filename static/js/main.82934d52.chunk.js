(this.webpackJsonppic2pdf=this.webpackJsonppic2pdf||[]).push([[0],{134:function(e,t,n){e.exports=n(210)},139:function(e,t,n){},193:function(e,t,n){},210:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(13),l=n.n(i),o=(n(139),n(87)),c=n(51),s=n.n(c),u=n(75),p=n(97),m=n(98),d=n(129),f=n(124),h=n(220),g=n(215),v=n(218),w=n(219),b=n(31),E=n(221),k=n(99);function y(e){try{var t=new File([e],e.name,{type:e.type});return t.uid=e.uid,e instanceof Blob||e instanceof File?t:(h.b.error("some error happen"),void console.error("fileObjToFile wrong: \n fileObj \n ".concat(e)))}catch(n){console.log(n)}}function x(e){return new Promise((function(t,n){var a=new FileReader;if(!e)return console.log(e),void h.b.error("unknown type file");a.readAsDataURL(e),a.onload=function(){var e=new Image;e.src=String(a.result),e.onload=function(){return t({imgUrlBase64:String(a.result),imgWidth:this.width,imgHeight:this.height})}},a.onerror=function(e){return n(e)}}))}var j=function(e){Object(d.a)(n,e);var t=Object(f.a)(n);function n(){var e;Object(p.a)(this,n);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).state={previewVisible:!1,previewImage:"",previewTitle:"",fileList:[],pdfFileName:"new"},e.handleCancel=function(){return e.setState({previewVisible:!1})},e.handlePreview=function(){var t=Object(u.a)(s.a.mark((function t(n){var a;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n.url||n.preview){t.next=5;break}return t.next=3,x(n.originFileObj);case 3:a=t.sent,n.preview=(null===a||void 0===a?void 0:a.imgUrlBase64)||"";case 5:e.setState({previewImage:n.url||n.preview,previewVisible:!0,previewTitle:n.name});case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e.handleRemove=function(t){var n=Object(o.a)(e.state.fileList),a=-1;n.some((function(e,n){return e.uid===t.uid&&(a=n,!0)})),-1!==a?(n.splice(a,1),e.setState({fileList:n})):h.b.error("could not find index")},e.handleUpload=function(t){var n=t.file,a=e.state.fileList;a.map((function(e){return e.uid})).includes(n.uid)||y(n)&&(n.originFileObj=y(n),console.log(n),e.setState({fileList:[].concat(Object(o.a)(a),[n])}))},e._getPdfData=Object(u.a)(s.a.mark((function t(){var n,a,r,i;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!((n=e.state.fileList).length<1)){t.next=3;break}return t.abrupt("return",[]);case 3:a=[],r=0;case 5:if(!(r<n.length)){t.next=13;break}return t.next=8,x(n[r]);case 8:(i=t.sent)&&a.push(i);case 10:r++,t.next=5;break;case 13:return t.abrupt("return",a);case 14:case"end":return t.stop()}}),t)}))),e.handleOutputWithImg=Object(u.a)(s.a.mark((function t(){var n,a;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e._getPdfData();case 2:if(!((n=t.sent).length<1)){t.next=5;break}return t.abrupt("return");case 5:try{a=new k.a("p","px",[n[0].imgWidth,n[0].imgHeight]),n.forEach((function(e,t){0!==t&&a.addPage([e.imgWidth,e.imgHeight]),a.addImage(e.imgUrlBase64,0,0,e.imgWidth,e.imgHeight)})),a.save(e.state.pdfFileName)}catch(r){console.log(r),h.b.error("some unknown errors happen")}case 6:case"end":return t.stop()}}),t)}))),e.handleFileName=function(t){t.persist(),e.setState({pdfFileName:t.target.value||"new"})},e}return Object(m.a)(n,[{key:"render",value:function(){var e=this.state,t=e.previewVisible,n=e.previewImage,a=e.fileList,i=e.previewTitle,l=r.a.createElement("div",null,r.a.createElement(E.a,null),r.a.createElement("div",{style:{marginTop:8}},r.a.createElement("p",null,"Add pic"),r.a.createElement("p",null,"click or drag")));return r.a.createElement(r.a.Fragment,null,r.a.createElement(g.a,{multiple:!0,listType:"picture-card",fileList:a,onPreview:this.handlePreview,customRequest:this.handleUpload,onRemove:this.handleRemove},a.length>=108?null:l),r.a.createElement(v.a,{visible:t,title:i,footer:null,onCancel:this.handleCancel},r.a.createElement("img",{alt:"example",style:{width:"100%"},src:n})),r.a.createElement("div",null,r.a.createElement(w.a,{placeholder:"pdf filename",maxLength:25,style:{width:"150px",marginRight:"10px"},onChange:this.handleFileName}),r.a.createElement(b.a,{type:"primary",onClick:this.handleOutputWithImg},"Get PDF")))}}]),n}(r.a.Component),O=n(217),F=n(216);n(192),n(193);var I=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(O.a,{className:"site-page-header",title:"pics2pdf",subTitle:"convert multiple pictures to pdf file",backIcon:!1}),r.a.createElement(j,null),r.a.createElement("div",{className:"tipInfo"},r.a.createElement(F.a,{title:"* support picture format (theoretically)",className:"tipInfoContent",extra:r.a.createElement("a",{href:"https://artskydj.github.io/jsPDF/docs/modules_addimage.js.html",target:"_blank",rel:"noopener noreferrer"},"More"),style:{width:400}},r.a.createElement("p",null,"jpeg"),r.a.createElement("p",null,"png"),r.a.createElement("p",null,"bmp"),r.a.createElement("p",null,"webp (working on it)"))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(I,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[134,1,2]]]);
//# sourceMappingURL=main.82934d52.chunk.js.map