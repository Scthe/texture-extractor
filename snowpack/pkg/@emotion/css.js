function xe(e){if(e.sheet)return e.sheet;for(var r=0;r<document.styleSheets.length;r++)if(document.styleSheets[r].ownerNode===e)return document.styleSheets[r]}function Se(e){var r=document.createElement("style");return r.setAttribute("data-emotion",e.key),e.nonce!==void 0&&r.setAttribute("nonce",e.nonce),r.appendChild(document.createTextNode("")),r.setAttribute("data-s",""),r}var Ce=function(){function e(t){var n=this;this._insertTag=function(a){var s;n.tags.length===0?s=n.prepend?n.container.firstChild:n.before:s=n.tags[n.tags.length-1].nextSibling,n.container.insertBefore(a,s),n.tags.push(a)},this.isSpeedy=t.speedy===void 0?!0:t.speedy,this.tags=[],this.ctr=0,this.nonce=t.nonce,this.key=t.key,this.container=t.container,this.prepend=t.prepend,this.before=null}var r=e.prototype;return r.hydrate=function(n){n.forEach(this._insertTag)},r.insert=function(n){this.ctr%(this.isSpeedy?65e3:1)==0&&this._insertTag(Se(this));var a=this.tags[this.tags.length-1];if(this.isSpeedy){var s=xe(a);try{s.insertRule(n,s.cssRules.length)}catch(i){}}else a.appendChild(document.createTextNode(n));this.ctr++},r.flush=function(){this.tags.forEach(function(n){return n.parentNode.removeChild(n)}),this.tags=[],this.ctr=0},e}(),y="-ms-",F="-moz-",o="-webkit-",ne="comm",Q="rule",U="decl",$e="@import",ke="@keyframes",Ae=Math.abs,V=String.fromCharCode;function Ee(e,r){return(((r<<2^x(e,0))<<2^x(e,1))<<2^x(e,2))<<2^x(e,3)}function ae(e){return e.trim()}function Re(e,r){return(e=r.exec(e))?e[0]:e}function l(e,r,t){return e.replace(r,t)}function se(e,r){return e.indexOf(r)}function x(e,r){return e.charCodeAt(r)|0}function M(e,r,t){return e.slice(r,t)}function R(e){return e.length}function X(e){return e.length}function q(e,r){return r.push(e),e}function Oe(e,r){return e.map(r).join("")}var B=1,T=1,ie=0,S=0,p=0,I="";function D(e,r,t,n,a,s,i){return{value:e,root:r,parent:t,type:n,props:a,children:s,line:B,column:T,length:i,return:""}}function z(e,r,t){return D(e,r.root,r.parent,t,r.props,r.children,0)}function Ge(){return p}function je(){return p=S>0?x(I,--S):0,T--,p===10&&(T=1,B--),p}function $(){return p=S<ie?x(I,S++):0,T++,p===10&&(T=1,B++),p}function G(){return x(I,S)}function H(){return S}function K(e,r){return M(I,e,r)}function Z(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function ue(e){return B=T=1,ie=R(I=e),S=0,[]}function ce(e){return I="",e}function Y(e){return ae(K(S-1,_(e===91?e+2:e===40?e+1:e)))}function Ne(e){for(;(p=G())&&p<33;)$();return Z(e)>2||Z(p)>3?"":" "}function Te(e,r){for(;--r&&$()&&!(p<48||p>102||p>57&&p<65||p>70&&p<97););return K(e,H()+(r<6&&G()==32&&$()==32))}function _(e){for(;$();)switch(p){case e:return S;case 34:case 39:return _(e===34||e===39?e:p);case 40:e===41&&_(e);break;case 92:$();break}return S}function Ie(e,r){for(;$()&&e+p!==47+10;)if(e+p===42+42&&G()===47)break;return"/*"+K(r,S-1)+"*"+V(e===47?e:$())}function fe(e){for(;!Z(G());)$();return K(e,S)}function Me(e){return ce(J("",null,null,null,[""],e=ue(e),0,[0],e))}function J(e,r,t,n,a,s,i,u,f){for(var h=0,c=0,d=i,k=0,j=0,C=0,v=1,w=1,b=1,g=0,A="",W=a,N=s,E=n,m=A;w;)switch(C=g,g=$()){case 34:case 39:case 91:case 40:m+=Y(g);break;case 9:case 10:case 13:case 32:m+=Ne(C);break;case 92:m+=Te(H()-1,7);continue;case 47:switch(G()){case 42:case 47:q(ze(Ie($(),H()),r,t),f);break;default:m+="/"}break;case 123*v:u[h++]=R(m)*b;case 125*v:case 59:case 0:switch(g){case 0:case 125:w=0;case 59+c:j>0&&R(m)-d&&q(j>32?le(m+";",n,t,d-1):le(l(m," ","")+";",n,t,d-2),f);break;case 59:m+=";";default:if(q(E=oe(m,r,t,h,c,a,u,A,W=[],N=[],d),s),g===123)if(c===0)J(m,r,E,E,W,s,d,u,N);else switch(k){case 100:case 109:case 115:J(e,E,E,n&&q(oe(e,E,E,0,0,a,u,A,a,W=[],d),N),a,N,d,u,n?W:N);break;default:J(m,E,E,E,[""],N,d,u,N)}}h=c=j=0,v=b=1,A=m="",d=i;break;case 58:d=1+R(m),j=C;default:if(v<1){if(g==123)--v;else if(g==125&&v++==0&&je()==125)continue}switch(m+=V(g),g*v){case 38:b=c>0?1:(m+="\f",-1);break;case 44:u[h++]=(R(m)-1)*b,b=1;break;case 64:G()===45&&(m+=Y($())),k=G(),c=R(A=m+=fe(H())),g++;break;case 45:C===45&&R(m)==2&&(v=0)}}return s}function oe(e,r,t,n,a,s,i,u,f,h,c){for(var d=a-1,k=a===0?s:[""],j=X(k),C=0,v=0,w=0;C<n;++C)for(var b=0,g=M(e,d+1,d=Ae(v=i[C])),A=e;b<j;++b)(A=ae(v>0?k[b]+" "+g:l(g,/&\f/g,k[b])))&&(f[w++]=A);return D(e,r,t,a===0?Q:u,f,h,c)}function ze(e,r,t){return D(e,r,t,ne,V(Ge()),M(e,2,-2),0)}function le(e,r,t,n){return D(e,r,t,U,M(e,0,n),M(e,n+1,-1),n)}function he(e,r){switch(Ee(e,r)){case 5103:return o+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return o+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return o+e+F+e+y+e+e;case 6828:case 4268:return o+e+y+e+e;case 6165:return o+e+y+"flex-"+e+e;case 5187:return o+e+l(e,/(\w+).+(:[^]+)/,o+"box-$1$2"+y+"flex-$1$2")+e;case 5443:return o+e+y+"flex-item-"+l(e,/flex-|-self/,"")+e;case 4675:return o+e+y+"flex-line-pack"+l(e,/align-content|flex-|-self/,"")+e;case 5548:return o+e+y+l(e,"shrink","negative")+e;case 5292:return o+e+y+l(e,"basis","preferred-size")+e;case 6060:return o+"box-"+l(e,"-grow","")+o+e+y+l(e,"grow","positive")+e;case 4554:return o+l(e,/([^-])(transform)/g,"$1"+o+"$2")+e;case 6187:return l(l(l(e,/(zoom-|grab)/,o+"$1"),/(image-set)/,o+"$1"),e,"")+e;case 5495:case 3959:return l(e,/(image-set\([^]*)/,o+"$1$`$1");case 4968:return l(l(e,/(.+:)(flex-)?(.*)/,o+"box-pack:$3"+y+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+o+e+e;case 4095:case 3583:case 4068:case 2532:return l(e,/(.+)-inline(.+)/,o+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(R(e)-1-r>6)switch(x(e,r+1)){case 109:if(x(e,r+4)!==45)break;case 102:return l(e,/(.+:)(.+)-([^]+)/,"$1"+o+"$2-$3$1"+F+(x(e,r+3)==108?"$3":"$2-$3"))+e;case 115:return~se(e,"stretch")?he(l(e,"stretch","fill-available"),r)+e:e}break;case 4949:if(x(e,r+1)!==115)break;case 6444:switch(x(e,R(e)-3-(~se(e,"!important")&&10))){case 107:return l(e,":",":"+o)+e;case 101:return l(e,/(.+:)([^;!]+)(;|!.+)?/,"$1"+o+(x(e,14)===45?"inline-":"")+"box$3$1"+o+"$2$3$1"+y+"$2box$3")+e}break;case 5936:switch(x(e,r+11)){case 114:return o+e+y+l(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return o+e+y+l(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return o+e+y+l(e,/[svh]\w+-[tblr]{2}/,"lr")+e}return o+e+y+e+e}return e}function P(e,r){for(var t="",n=X(e),a=0;a<n;a++)t+=r(e[a],a,e,r)||"";return t}function Pe(e,r,t,n){switch(e.type){case $e:case U:return e.return=e.return||e.value;case ne:return"";case Q:e.value=e.props.join(",")}return R(t=P(e.children,n))?e.return=e.value+"{"+t+"}":""}function Le(e){var r=X(e);return function(t,n,a,s){for(var i="",u=0;u<r;u++)i+=e[u](t,n,a,s)||"";return i}}function We(e){return function(r){r.root||(r=r.return)&&e(r)}}function Fe(e,r,t,n){if(!e.return)switch(e.type){case U:e.return=he(e.value,e.length);break;case ke:return P([z(l(e.value,"@","@"+o),e,"")],n);case Q:if(e.length)return Oe(e.props,function(a){switch(Re(a,/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":return P([z(l(a,/:(read-\w+)/,":"+F+"$1"),e,"")],n);case"::placeholder":return P([z(l(a,/:(plac\w+)/,":"+o+"input-$1"),e,""),z(l(a,/:(plac\w+)/,":"+F+"$1"),e,""),z(l(a,/:(plac\w+)/,y+"input-$1"),e,"")],n)}return""})}}function Ve(e){var r=Object.create(null);return function(t){return r[t]===void 0&&(r[t]=e(t)),r[t]}}var qe=function(r,t){var n=-1,a=44;do switch(Z(a)){case 0:a===38&&G()===12&&(t[n]=1),r[n]+=fe(S-1);break;case 2:r[n]+=Y(a);break;case 4:if(a===44){r[++n]=G()===58?"&\f":"",t[n]=r[n].length;break}default:r[n]+=V(a)}while(a=$());return r},Be=function(r,t){return ce(qe(ue(r),t))},de=new WeakMap,De=function(r){if(!(r.type!=="rule"||!r.parent||!r.length)){for(var t=r.value,n=r.parent,a=r.column===n.column&&r.line===n.line;n.type!=="rule";)if(n=n.parent,!n)return;if(!(r.props.length===1&&t.charCodeAt(0)!==58&&!de.get(n))&&!a){de.set(r,!0);for(var s=[],i=Be(t,s),u=n.props,f=0,h=0;f<i.length;f++)for(var c=0;c<u.length;c++,h++)r.props[h]=s[f]?i[f].replace(/&\f/g,u[c]):u[c]+" "+i[f]}}},He=function(r){if(r.type==="decl"){var t=r.value;t.charCodeAt(0)===108&&t.charCodeAt(2)===98&&(r.return="",r.value="")}},Ke=[Fe],Ze=function(r){var t=r.key;if(t==="css"){var n=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(n,function(v){var w=v.getAttribute("data-emotion");w.indexOf(" ")!==-1&&(document.head.appendChild(v),v.setAttribute("data-s",""))})}var a=r.stylisPlugins||Ke,s={},i,u=[];i=r.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+t+' "]'),function(v){for(var w=v.getAttribute("data-emotion").split(" "),b=1;b<w.length;b++)s[w[b]]=!0;u.push(v)});var f,h=[De,He];{var c,d=[Pe,We(function(v){c.insert(v)})],k=Le(h.concat(a,d)),j=function(w){return P(Me(w),k)};f=function(w,b,g,A){c=g,j(w?w+"{"+b.styles+"}":b.styles),A&&(C.inserted[b.name]=!0)}}var C={key:t,sheet:new Ce({key:t,container:i,nonce:r.nonce,speedy:r.speedy,prepend:r.prepend}),nonce:r.nonce,inserted:s,registered:{},insert:f};return C.sheet.hydrate(u),C};function Je(e){for(var r=0,t,n=0,a=e.length;a>=4;++n,a-=4)t=e.charCodeAt(n)&255|(e.charCodeAt(++n)&255)<<8|(e.charCodeAt(++n)&255)<<16|(e.charCodeAt(++n)&255)<<24,t=(t&65535)*1540483477+((t>>>16)*59797<<16),t^=t>>>24,r=(t&65535)*1540483477+((t>>>16)*59797<<16)^(r&65535)*1540483477+((r>>>16)*59797<<16);switch(a){case 3:r^=(e.charCodeAt(n+2)&255)<<16;case 2:r^=(e.charCodeAt(n+1)&255)<<8;case 1:r^=e.charCodeAt(n)&255,r=(r&65535)*1540483477+((r>>>16)*59797<<16)}return r^=r>>>13,r=(r&65535)*1540483477+((r>>>16)*59797<<16),((r^r>>>15)>>>0).toString(36)}var Qe={animationIterationCount:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},Ue=/[A-Z]|^ms/g,Xe=/_EMO_([^_]+?)_([^]*?)_EMO_/g,ve=function(r){return r.charCodeAt(1)===45},me=function(r){return r!=null&&typeof r!="boolean"},ee=Ve(function(e){return ve(e)?e:e.replace(Ue,"-$&").toLowerCase()}),pe=function(r,t){switch(r){case"animation":case"animationName":if(typeof t=="string")return t.replace(Xe,function(n,a,s){return O={name:a,styles:s,next:O},a})}return Qe[r]!==1&&!ve(r)&&typeof t=="number"&&t!==0?t+"px":t};function L(e,r,t){if(t==null)return"";if(t.__emotion_styles!==void 0)return t;switch(typeof t){case"boolean":return"";case"object":{if(t.anim===1)return O={name:t.name,styles:t.styles,next:O},t.name;if(t.styles!==void 0){var n=t.next;if(n!==void 0)for(;n!==void 0;)O={name:n.name,styles:n.styles,next:O},n=n.next;var a=t.styles+";";return a}return Ye(e,r,t)}case"function":{if(e!==void 0){var s=O,i=t(e);return O=s,L(e,r,i)}break}}if(r==null)return t;var u=r[t];return u!==void 0?u:t}function Ye(e,r,t){var n="";if(Array.isArray(t))for(var a=0;a<t.length;a++)n+=L(e,r,t[a])+";";else for(var s in t){var i=t[s];if(typeof i!="object")r!=null&&r[i]!==void 0?n+=s+"{"+r[i]+"}":me(i)&&(n+=ee(s)+":"+pe(s,i)+";");else if(Array.isArray(i)&&typeof i[0]=="string"&&(r==null||r[i[0]]===void 0))for(var u=0;u<i.length;u++)me(i[u])&&(n+=ee(s)+":"+pe(s,i[u])+";");else{var f=L(e,r,i);switch(s){case"animation":case"animationName":{n+=ee(s)+":"+f+";";break}default:n+=s+"{"+f+"}"}}}return n}var be=/label:\s*([^\s;\n{]+)\s*(;|$)/g,O,re=function(r,t,n){if(r.length===1&&typeof r[0]=="object"&&r[0]!==null&&r[0].styles!==void 0)return r[0];var a=!0,s="";O=void 0;var i=r[0];i==null||i.raw===void 0?(a=!1,s+=L(n,t,i)):s+=i[0];for(var u=1;u<r.length;u++)s+=L(n,t,r[u]),a&&(s+=i[u]);be.lastIndex=0;for(var f="",h;(h=be.exec(s))!==null;)f+="-"+h[1];var c=Je(s)+f;return{name:c,styles:s,next:O}},_e=!0;function ye(e,r,t){var n="";return t.split(" ").forEach(function(a){e[a]!==void 0?r.push(e[a]+";"):n+=a+" "}),n}var er=function(r,t,n){var a=r.key+"-"+t.name;if((n===!1||_e===!1)&&r.registered[a]===void 0&&(r.registered[a]=t.styles),r.inserted[t.name]===void 0){var s=t;do{var i=r.insert(t===s?"."+a:"",s,r.sheet,!0);s=s.next}while(s!==void 0)}};function ge(e,r){if(e.inserted[r.name]===void 0)return e.insert("",r,e.sheet,!0)}function we(e,r,t){var n=[],a=ye(e,n,t);return n.length<2?t:a+r(n)}var rr=function(r){var t=Ze(r);t.sheet.speedy=function(u){this.isSpeedy=u},t.compat=!0;var n=function(){for(var f=arguments.length,h=new Array(f),c=0;c<f;c++)h[c]=arguments[c];var d=re(h,t.registered,void 0);return er(t,d,!1),t.key+"-"+d.name},a=function(){for(var f=arguments.length,h=new Array(f),c=0;c<f;c++)h[c]=arguments[c];var d=re(h,t.registered),k="animation-"+d.name;return ge(t,{name:d.name,styles:"@keyframes "+k+"{"+d.styles+"}"}),k},s=function(){for(var f=arguments.length,h=new Array(f),c=0;c<f;c++)h[c]=arguments[c];var d=re(h,t.registered);ge(t,d)},i=function(){for(var f=arguments.length,h=new Array(f),c=0;c<f;c++)h[c]=arguments[c];return we(t.registered,n,tr(h))};return{css:n,cx:i,injectGlobal:s,keyframes:a,hydrate:function(f){f.forEach(function(h){t.inserted[h]=!0})},flush:function(){t.registered={},t.inserted={},t.sheet.flush()},sheet:t.sheet,cache:t,getRegisteredStyles:ye.bind(null,t.registered),merge:we.bind(null,t.registered,n)}},tr=function e(r){for(var t="",n=0;n<r.length;n++){var a=r[n];if(a!=null){var s=void 0;switch(typeof a){case"boolean":break;case"object":{if(Array.isArray(a))s=e(a);else{s="";for(var i in a)a[i]&&i&&(s&&(s+=" "),s+=i)}break}default:s=a}s&&(t&&(t+=" "),t+=s)}}return t},te=rr({key:"css"}),nr=te.cx,ar=te.injectGlobal,sr=te.css;export{sr as css,nr as cx,ar as injectGlobal};
