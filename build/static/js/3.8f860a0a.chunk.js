(this.webpackJsonptrendy=this.webpackJsonptrendy||[]).push([[3],{960:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];function a(){for(var e=arguments.length,n=Array(e),a=0;a<e;a++)n[a]=arguments[a];var r=null;return t.forEach((function(e){if(null==r){var t=e.apply(void 0,n);null!=t&&(r=t)}})),r}return(0,c.default)(a)};var a,r=n(961),c=(a=r)&&a.__esModule?a:{default:a};e.exports=t.default},961:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){function t(t,n,a,r,c,s){var i=r||"<<anonymous>>",l=s||a;if(null==n[a])return t?new Error("Required "+c+" `"+l+"` was not specified in `"+i+"`."):null;for(var o=arguments.length,d=Array(o>6?o-6:0),u=6;u<o;u++)d[u-6]=arguments[u];return e.apply(void 0,[n,a,i,c,l].concat(d))}var n=t.bind(null,!1);return n.isRequired=t.bind(null,!0),n},e.exports=t.default},965:function(e,t,n){"use strict";n.r(t);var a=n(15),r=n(3),c=n(1),s=n.n(c),i=n(99),l=n(18),o=n(61),d=n(372),u=n(40),b=n(98),m=s.a.createContext(null),j=n(68),v=function(e){var t=Object(b.a)(e,{activeKey:"onSelect"}),n=t.id,a=t.generateChildId,r=t.onSelect,i=t.activeKey,l=t.transition,o=t.mountOnEnter,d=t.unmountOnExit,u=t.children,v=Object(c.useMemo)((function(){return a||function(e,t){return n?n+"-"+t+"-"+e:null}}),[n,a]),f=Object(c.useMemo)((function(){return{onSelect:r,activeKey:i,transition:l,mountOnEnter:o||!1,unmountOnExit:d||!1,getControlledId:function(e){return v(e,"tabpane")},getControllerId:function(e){return v(e,"tab")}}}),[r,i,l,o,d,v]);return s.a.createElement(m.Provider,{value:f},s.a.createElement(j.a.Provider,{value:r||null},u))},f=n(6),O=n(21),x=n(24),h=n.n(x),g=n(28),p=s.a.forwardRef((function(e,t){var n=e.bsPrefix,a=e.as,r=void 0===a?"div":a,c=e.className,i=Object(O.a)(e,["bsPrefix","as","className"]),l=Object(g.a)(n,"tab-content");return s.a.createElement(r,Object(f.a)({ref:t},i,{className:h()(c,l)}))})),N=n(137);var y=s.a.forwardRef((function(e,t){var n=function(e){var t=Object(c.useContext)(m);if(!t)return e;var n=t.activeKey,a=t.getControlledId,r=t.getControllerId,s=Object(O.a)(t,["activeKey","getControlledId","getControllerId"]),i=!1!==e.transition&&!1!==s.transition,l=Object(j.b)(e.eventKey);return Object(f.a)({},e,{active:null==e.active&&null!=l?Object(j.b)(n)===l:e.active,id:a(e.eventKey),"aria-labelledby":r(e.eventKey),transition:i&&(e.transition||s.transition||N.a),mountOnEnter:null!=e.mountOnEnter?e.mountOnEnter:s.mountOnEnter,unmountOnExit:null!=e.unmountOnExit?e.unmountOnExit:s.unmountOnExit})}(e),a=n.bsPrefix,r=n.className,i=n.active,l=n.onEnter,o=n.onEntering,d=n.onEntered,u=n.onExit,b=n.onExiting,v=n.onExited,x=n.mountOnEnter,p=n.unmountOnExit,y=n.transition,E=n.as,w=void 0===E?"div":E,A=(n.eventKey,Object(O.a)(n,["bsPrefix","className","active","onEnter","onEntering","onEntered","onExit","onExiting","onExited","mountOnEnter","unmountOnExit","transition","as","eventKey"])),C=Object(g.a)(a,"tab-pane");if(!i&&!y&&p)return null;var P=s.a.createElement(w,Object(f.a)({},A,{ref:t,role:"tabpanel","aria-hidden":!i,className:h()(r,C,{active:i})}));return y&&(P=s.a.createElement(y,{in:i,onEnter:l,onEntering:o,onEntered:d,onExit:u,onExiting:b,onExited:v,mountOnEnter:x,unmountOnExit:p},P)),s.a.createElement(m.Provider,{value:null},s.a.createElement(j.a.Provider,{value:null},P))}));y.displayName="TabPane";var E=y,w=function(e){function t(){return e.apply(this,arguments)||this}return Object(u.a)(t,e),t.prototype.render=function(){throw new Error("ReactBootstrap: The `Tab` component is not meant to be rendered! It's an abstract component that is only valid as a direct Child of the `Tabs` Component. For custom tabs components use TabPane and TabsContainer directly")},t}(s.a.Component);w.Container=v,w.Content=p,w.Pane=E;var A=w,C=(n(960),n(277)),P=n(356),k=n(89),K=n(276),S=n(116),I=n(263),R=function(){},M=s.a.forwardRef((function(e,t){var n,a,r=e.as,i=void 0===r?"ul":r,l=e.onSelect,o=e.activeKey,d=e.role,u=e.onKeyDown,b=Object(O.a)(e,["as","onSelect","activeKey","role","onKeyDown"]),v=Object(K.a)(),x=Object(c.useRef)(!1),h=Object(c.useContext)(j.a),g=Object(c.useContext)(m);g&&(d=d||"tablist",o=g.activeKey,n=g.getControlledId,a=g.getControllerId);var p=Object(c.useRef)(null),N=function(e){var t=p.current;if(!t)return null;var n=Object(k.a)(t,"[data-rb-event-key]:not(.disabled)"),a=t.querySelector(".active");if(!a)return null;var r=n.indexOf(a);if(-1===r)return null;var c=r+e;return c>=n.length&&(c=0),c<0&&(c=n.length-1),n[c]},y=function(e,t){null!=e&&(l&&l(e,t),h&&h(e,t))};Object(c.useEffect)((function(){if(p.current&&x.current){var e=p.current.querySelector("[data-rb-event-key].active");e&&e.focus()}x.current=!1}));var E=Object(S.a)(t,p);return s.a.createElement(j.a.Provider,{value:y},s.a.createElement(I.a.Provider,{value:{role:d,activeKey:Object(j.b)(o),getControlledId:n||R,getControllerId:a||R}},s.a.createElement(i,Object(f.a)({},b,{onKeyDown:function(e){var t;switch(u&&u(e),e.key){case"ArrowLeft":case"ArrowUp":t=N(-1);break;case"ArrowRight":case"ArrowDown":t=N(1);break;default:return}t&&(e.preventDefault(),y(t.dataset.rbEventKey,e),x.current=!0,v())},ref:E,role:d}))))})),B=s.a.forwardRef((function(e,t){var n=e.bsPrefix,a=e.className,r=e.children,c=e.as,i=void 0===c?"div":c,l=Object(O.a)(e,["bsPrefix","className","children","as"]);return n=Object(g.a)(n,"nav-item"),s.a.createElement(i,Object(f.a)({},l,{ref:t,className:h()(a,n)}),r)}));B.displayName="NavItem";var L=B,Q=n(131),F=n(38),T=(n(168),s.a.forwardRef((function(e,t){var n=e.active,a=e.className,r=e.eventKey,i=e.onSelect,l=e.onClick,o=e.as,d=Object(O.a)(e,["active","className","eventKey","onSelect","onClick","as"]),u=Object(j.b)(r,d.href),b=Object(c.useContext)(j.a),m=Object(c.useContext)(I.a),v=n;if(m){d.role||"tablist"!==m.role||(d.role="tab");var x=m.getControllerId(u),g=m.getControlledId(u);d["data-rb-event-key"]=u,d.id=x||d.id,d["aria-controls"]=g||d["aria-controls"],v=null==n&&null!=u?m.activeKey===u:n}"tab"===d.role&&(d.disabled&&(d.tabIndex=-1,d["aria-disabled"]=!0),d["aria-selected"]=v);var p=Object(F.a)((function(e){l&&l(e),null!=u&&(i&&i(u,e),b&&b(u,e))}));return s.a.createElement(o,Object(f.a)({},d,{ref:t,onClick:p,className:h()(a,v&&"active")}))})));T.defaultProps={disabled:!1};var G=T,V={disabled:!1,as:Q.a},q=s.a.forwardRef((function(e,t){var n=e.bsPrefix,a=e.disabled,r=e.className,c=e.href,i=e.eventKey,l=e.onSelect,o=e.as,d=Object(O.a)(e,["bsPrefix","disabled","className","href","eventKey","onSelect","as"]);return n=Object(g.a)(n,"nav-link"),s.a.createElement(G,Object(f.a)({},d,{href:c,ref:t,eventKey:i,as:o,disabled:a,onSelect:l,className:h()(r,n,a&&"disabled")}))}));q.displayName="NavLink",q.defaultProps=V;var D=q,X=s.a.forwardRef((function(e,t){var n,a,r,i=Object(b.a)(e,{activeKey:"onSelect"}),l=i.as,o=void 0===l?"div":l,d=i.bsPrefix,u=i.variant,m=i.fill,j=i.justify,v=i.navbar,x=i.className,p=i.children,N=i.activeKey,y=Object(O.a)(i,["as","bsPrefix","variant","fill","justify","navbar","className","children","activeKey"]),E=Object(g.a)(d,"nav"),w=!1,A=Object(c.useContext)(C.a),k=Object(c.useContext)(P.a);return A?(a=A.bsPrefix,w=null==v||v):k&&(r=k.cardHeaderBsPrefix),s.a.createElement(M,Object(f.a)({as:o,ref:t,activeKey:N,className:h()(x,(n={},n[E]=!w,n[a+"-nav"]=w,n[r+"-"+u]=!!r,n[E+"-"+u]=!!u,n[E+"-fill"]=m,n[E+"-justified"]=j,n))},y),p)}));X.displayName="Nav",X.defaultProps={justify:!1,fill:!1},X.Item=L,X.Link=D;var U=X,W=n(275),z=n.p+"static/media/eye-off.52abb1b0.svg",J=n(0);t.default=Object(i.b)((function(e){return{errorMessage:e.auth.errorMessage,successMessage:e.auth.successMessage,showLoading:e.auth.showLoading}}))((function(e){var t=Object(c.useState)("demo@example.com"),n=Object(r.a)(t,2),s=n[0],u=n[1],b={email:"",password:""},m=Object(c.useState)(b),j=Object(r.a)(m,2),v=j[0],f=j[1],O=Object(c.useState)("123456"),x=Object(r.a)(O,2),h=x[0],g=x[1],p=Object(i.c)();function N(t){t.preventDefault();var n=!1,r=Object(a.a)({},b);""===s&&(r.email="Email is Required",n=!0),""===h&&(r.password="Password is Required",n=!0),f(r),n||(p(Object(o.g)(!0)),p(Object(o.h)(s,h,e.history)))}var y=[{name:"Sign in",content:Object(J.jsxs)("div",{children:[Object(J.jsxs)("div",{className:"mb-4",children:[Object(J.jsx)("h3",{className:"mb-1 font-w600",children:"Welcome Back"}),Object(J.jsx)("p",{className:"welcome-content-paragraph",children:"Log in with your data that you entered during your registration"})]}),e.errorMessage&&Object(J.jsx)("div",{className:"bg-red-300 text-red-900 border border-red-900 p-1 my-2",children:e.errorMessage}),e.successMessage&&Object(J.jsx)("div",{className:"bg-green-300 text-green-900 border border-green-900 p-1 my-2",children:e.successMessage}),Object(J.jsxs)("form",{onSubmit:N,children:[Object(J.jsxs)("div",{className:"form-group",children:[Object(J.jsx)("input",{type:"email",className:"form-control",value:s,onChange:function(e){return u(e.target.value)}}),v.email&&Object(J.jsx)("div",{className:"text-danger fs-12",children:v.email})]}),Object(J.jsxs)("div",{className:"form-group password-textfield",children:[Object(J.jsx)("input",{type:"password",className:"form-control",value:h,onChange:function(e){return g(e.target.value)}}),Object(J.jsxs)("span",{className:"eye-off",children:[Object(J.jsx)("img",{src:z,alt:"",className:"eye-off"})," "]}),v.password&&Object(J.jsx)("div",{className:"text-danger fs-12",children:v.password})]}),Object(J.jsx)("div",{className:"recover-password d-flex justify-content-end",children:Object(J.jsx)(l.b,{className:"revover-password",to:"./page-register",children:"Recover Password ?"})}),Object(J.jsx)("div",{className:"text-center",children:Object(J.jsx)("button",{type:"submit",className:"btn btn-primary btn-block btn-pink",children:"Sign In"})})]}),Object(J.jsx)("div",{className:"new-account add-new-account  text-center mt-2",children:Object(J.jsxs)("p",{className:"mb-0",children:["Don't have an account?"," ",Object(J.jsx)(l.b,{className:"signup-link",to:"./page-register",children:"Sign up"})]})}),Object(J.jsxs)(d.a,{className:"btn-google-signin",variant:"outline-primary",children:[Object(J.jsx)("img",{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAlCAYAAADFniADAAAACXBIWXMAABCcAAAQnAEmzTo0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAQeSURBVHgB7ZhNbxtVFIbfc8d2QijVkFBEzCKTCEERi7pS2bCxu0hThATpL4i7QmVDFiwA0WZSsmFVwQp29i9oaCAskOhQASukmu+vhQdKkyoJqkMFjsnMHO614/hrZjy2Ieqi78b23DPnPj733nPODHAXijCAeObxY9JDCgLG346H33cc5bBEjILmkj31RfFX9KGeofjZx9IQlJW3zsqfev162fVwo+y22oILgpGLObTcC2BkqD0YU96S8Rv3g2rzkIvvkhkFrisUZwwd98cXpOl8mF13qGrkbLm05hPX7Dz6heLTRw0I76q0MtBFUaAajlmBLQYNC/wHQD2LMBs27AtVXbIegQSRrU5eNztlE3fVQQlWzPfqSOJSBCBbbpIcEiJPyz/a9YvX5R8aBlLy1M1JhGw7UMxFZuqz4lcIB28Vv/bIHL4+nAu5owSPTVr95W100Q8Zw5Bw6pBkowLVpmiH+g5FrA0ZyCeB2/H2YVvtB/rg566Om/VTxpiNO1SMAtQBxd/KkJNckrq+PAx8PFaDq0ZoN0Wr/WXpXtS+p7Itv078CUyV9+BGzYMAUtqPFF+XJSOB2wF2Nj2FSRyQGilhGMdCrEwcoBrLx7LaB2kIFiJo7MLNFzRQDk2FOqqYYW2+mTypvjci5QXkJZatyBQi7SUNItUPkBIRMuNLaxOtUBTgTKCAA5LjeA/Wpuwm7u+f9yPN0apziabJ/esW/w8FOUA0zEX12YASMlv7WkLn7zGBKE5BXQtymNbfSFb3bqzJY0FGxV9cTaqL6KKKKOeHvPtUMxey5GwGDBQaKHXTWvJU4dN9oErYxSQdx0CROHJhfY5kW+w7SJzbWHz0rPq6v3x7Ey63235TeQDP33paH7txagEDSH913aDgKEG4Yr9Fbj19olGMt70YXv/jKDI3n8Hn5VGVSOb190/NoU8l4nxJfhgBw/atpXGrgdEkehKfyqWy3t2ewPHf0nhvu3V/C0E5fWX6ZfQgfb6oP3x+7XJYC8xQT0lNHO0GD12ZTnskLIRJdpyetmuWnvskNNPr75xLJ7bO54DQtGJvXExOhkIpjV6ZUe1w6CNVjY2X2ZP7kNjGHdfeKe8gzlqKPE4RhIpMKrb1CrTKiUAfWgJGPRWEQimNrcxclRkig4jifzx4W5WO6+QcQXzjLck90nkPML95MdnRVgeWGdepnGEMXvc4tgn30GrngEemH1AoVOmMVWKncrKlPe5T7qGPwNrmvmu5sbMbS+OByTjSu4TRlRl14kyEtCVBy1eX+CuNxPZLlohztn0P9QWlpF8+bUiHC3slpzcohu0RzDsvXgt9h9AzVDOcFvfSYMo2H4ROKLJVNymY8qVzloUeNNBLsyrkh9OpmKfpjnxhhi1HdbAljMAunbUGqpP3FEX/AnZEkGtgYudiAAAAAElFTkSuQmCC",alt:"",className:"logo-icon mr-2"})," ",Object(J.jsx)("span",{children:"Sign in with Google"})]})]})},{name:"Register",content:Object(J.jsxs)("div",{children:[Object(J.jsxs)("div",{className:"mb-4",children:[Object(J.jsx)("h3",{className:"mb-1 font-w600",children:"Let\u2019s get Started"}),Object(J.jsx)("p",{className:"welcome-content-paragraph",children:"Enter your basic information to create new account on Trendyy"})]}),e.errorMessage&&Object(J.jsx)("div",{className:"bg-red-300 text-red-900 border border-red-900 p-1 my-2",children:e.errorMessage}),e.successMessage&&Object(J.jsx)("div",{className:"bg-green-300 text-green-900 border border-green-900 p-1 my-2",children:e.successMessage}),Object(J.jsxs)("form",{onSubmit:N,children:[Object(J.jsx)("div",{className:"form-group",children:Object(J.jsx)("input",{type:"text",className:"form-control",placeholder:"Enter Name",value:"Enter Name"})}),Object(J.jsxs)("div",{className:"form-group",children:[Object(J.jsx)("input",{type:"email",className:"form-control",value:s,onChange:function(e){return u(e.target.value)}}),v.email&&Object(J.jsx)("div",{className:"text-danger fs-12",children:v.email})]}),Object(J.jsx)("div",{className:"form-group",children:Object(J.jsx)("input",{type:"phone",className:"form-control",placeholder:"Phone Number",value:"Phone Number"})}),Object(J.jsxs)("div",{className:"form-group password-textfield",children:[Object(J.jsx)("input",{type:"password",className:"form-control",value:h,onChange:function(e){return g(e.target.value)}}),Object(J.jsxs)("span",{className:"eye-off",children:[Object(J.jsx)("img",{src:z,alt:"",className:"eye-off"})," "]}),v.password&&Object(J.jsx)("div",{className:"text-danger fs-12",children:v.password})]}),Object(J.jsx)("div",{className:"text-center",children:Object(J.jsx)("button",{type:"submit",className:"btn btn-primary btn-block btn-pink",children:"Register"})})]}),Object(J.jsx)("div",{className:"new-account add-new-account  text-center mt-2",children:Object(J.jsxs)("p",{className:"mb-0",children:["Already have an account?"," ",Object(J.jsx)(l.b,{className:"signup-link",to:"./page-register",children:"Sign in"})]})})]})}];return Object(J.jsx)("div",{className:"login-form-bx auth-page",children:Object(J.jsx)("div",{className:"container",children:Object(J.jsxs)("div",{className:"row",children:[Object(J.jsxs)("div",{className:"col-lg-8 col-md-7 d-flex box-skew1 relative login-leftpanel",children:[Object(J.jsxs)("div",{className:"inner-content align-self-center",children:[Object(J.jsx)(l.b,{to:"/dashboard",className:"login-logo",children:Object(J.jsx)("img",{src:W.a,alt:"",className:"logo-icon mr-2"})}),Object(J.jsxs)("h2",{className:"m-b10 text-white",children:["Sign In to ",Object(J.jsx)("br",{})," Trendy Website"]}),Object(J.jsx)("p",{className:"m-b40 text-white",children:"Boost your engagement & productivity, streamline processes, and make faster communications."})]}),Object(J.jsx)("div",{className:"login-center-img"})]}),Object(J.jsx)("div",{className:"col-lg-4 col-md-5 box-skew d-flex pl-0 pr-0 login-rightpanel",children:Object(J.jsx)("div",{className:"authincation-content",children:Object(J.jsxs)(A.Container,{defaultActiveKey:y[0].name.toLowerCase(),children:[Object(J.jsx)(U,{as:"ul",className:"nav-pills light",children:y.map((function(e,t){return Object(J.jsx)(U.Item,{as:"li",children:Object(J.jsxs)(U.Link,{eventKey:e.name.toLowerCase(),children:[Object(J.jsx)("i",{className:"la la-".concat(e.icon," mr-2")}),e.name]})},t)}))}),Object(J.jsx)(A.Content,{className:"auth-tab-content",children:y.map((function(e,t){return Object(J.jsx)(A.Pane,{eventKey:e.name.toLowerCase(),children:Object(J.jsx)("div",{children:e.content})},t)}))})]})})})]})})})}))}}]);
//# sourceMappingURL=3.8f860a0a.chunk.js.map