import{a as g}from"./common/_commonjsHelpers-8c19dec8.js";var N="Expected a function",S=0/0,W="[object Symbol]",_=/^\s+|\s+$/g,$=/^[-+]0x[0-9a-f]+$/i,A=/^0b[01]+$/i,B=/^0o[0-7]+$/i,F=parseInt,R=typeof g=="object"&&g&&g.Object===Object&&g,G=typeof self=="object"&&self&&self.Object===Object&&self,H=R||G||Function("return this")(),P=Object.prototype,D=P.toString,U=Math.max,X=Math.min,T=function(){return H.Date.now()};function q(e,t,i){var a,s,l,c,r,f,u=0,x=!1,d=!1,y=!0;if(typeof e!="function")throw new TypeError(N);t=k(t)||0,v(i)&&(x=!!i.leading,d="maxWait"in i,l=d?U(k(i.maxWait)||0,t):l,y="trailing"in i?!!i.trailing:y);function j(n){var o=a,m=s;return a=s=void 0,u=n,c=e.apply(m,o),c}function E(n){return u=n,r=setTimeout(b,t),x?j(n):c}function L(n){var o=n-f,m=n-u,h=t-o;return d?X(h,l-m):h}function I(n){var o=n-f,m=n-u;return f===void 0||o>=t||o<0||d&&m>=l}function b(){var n=T();if(I(n))return O(n);r=setTimeout(b,L(n))}function O(n){return r=void 0,y&&a?j(n):(a=s=void 0,c)}function C(){r!==void 0&&clearTimeout(r),u=0,a=f=s=r=void 0}function M(){return r===void 0?c:O(T())}function p(){var n=T(),o=I(n);if(a=arguments,s=this,f=n,o){if(r===void 0)return E(f);if(d)return r=setTimeout(b,t),j(f)}return r===void 0&&(r=setTimeout(b,t)),c}return p.cancel=C,p.flush=M,p}function v(e){var t=typeof e;return!!e&&(t=="object"||t=="function")}function z(e){return!!e&&typeof e=="object"}function J(e){return typeof e=="symbol"||z(e)&&D.call(e)==W}function k(e){if(typeof e=="number")return e;if(J(e))return S;if(v(e)){var t=typeof e.valueOf=="function"?e.valueOf():e;e=v(t)?t+"":t}if(typeof e!="string")return e===0?e:+e;e=e.replace(_,"");var i=A.test(e);return i||B.test(e)?F(e.slice(2),i?2:8):$.test(e)?S:+e}var K=q;export default K;
