(this.webpackJsonptrendy=this.webpackJsonptrendy||[]).push([[3],{1286:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];function a(){for(var e=arguments.length,n=Array(e),a=0;a<e;a++)n[a]=arguments[a];var r=null;return t.forEach((function(e){if(null==r){var t=e.apply(void 0,n);null!=t&&(r=t)}})),r}return(0,s.default)(a)};var a,r=n(1287),s=(a=r)&&a.__esModule?a:{default:a};e.exports=t.default},1287:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){function t(t,n,a,r,s,c){var i=r||"<<anonymous>>",l=c||a;if(null==n[a])return t?new Error("Required "+s+" `"+l+"` was not specified in `"+i+"`."):null;for(var o=arguments.length,d=Array(o>6?o-6:0),u=6;u<o;u++)d[u-6]=arguments[u];return e.apply(void 0,[n,a,i,s,l].concat(d))}var n=t.bind(null,!1);return n.isRequired=t.bind(null,!0),n},e.exports=t.default},1291:function(e,t,n){"use strict";n.r(t);var a=n(23),r=n(3),s=n(1),c=n.n(s),i=n(163),l=n(29),o=n(92),d=n(53),u=n(161),b=c.a.createContext(null),m=n(101),j=function(e){var t=Object(u.a)(e,{activeKey:"onSelect"}),n=t.id,a=t.generateChildId,r=t.onSelect,i=t.activeKey,l=t.transition,o=t.mountOnEnter,d=t.unmountOnExit,j=t.children,v=Object(s.useMemo)((function(){return a||function(e,t){return n?n+"-"+t+"-"+e:null}}),[n,a]),f=Object(s.useMemo)((function(){return{onSelect:r,activeKey:i,transition:l,mountOnEnter:o||!1,unmountOnExit:d||!1,getControlledId:function(e){return v(e,"tabpane")},getControllerId:function(e){return v(e,"tab")}}}),[r,i,l,o,d,v]);return c.a.createElement(b.Provider,{value:f},c.a.createElement(m.a.Provider,{value:r||null},j))},v=n(2),f=n(7),O=n(38),x=n.n(O),h=n(42),g=c.a.forwardRef((function(e,t){var n=e.bsPrefix,a=e.as,r=void 0===a?"div":a,s=e.className,i=Object(f.a)(e,["bsPrefix","as","className"]),l=Object(h.a)(n,"tab-content");return c.a.createElement(r,Object(v.a)({ref:t},i,{className:x()(s,l)}))})),p=n(218);var y=c.a.forwardRef((function(e,t){var n=function(e){var t=Object(s.useContext)(b);if(!t)return e;var n=t.activeKey,a=t.getControlledId,r=t.getControllerId,c=Object(f.a)(t,["activeKey","getControlledId","getControllerId"]),i=!1!==e.transition&&!1!==c.transition,l=Object(m.b)(e.eventKey);return Object(v.a)({},e,{active:null==e.active&&null!=l?Object(m.b)(n)===l:e.active,id:a(e.eventKey),"aria-labelledby":r(e.eventKey),transition:i&&(e.transition||c.transition||p.a),mountOnEnter:null!=e.mountOnEnter?e.mountOnEnter:c.mountOnEnter,unmountOnExit:null!=e.unmountOnExit?e.unmountOnExit:c.unmountOnExit})}(e),a=n.bsPrefix,r=n.className,i=n.active,l=n.onEnter,o=n.onEntering,d=n.onEntered,u=n.onExit,j=n.onExiting,O=n.onExited,g=n.mountOnEnter,y=n.unmountOnExit,N=n.transition,E=n.as,w=void 0===E?"div":E,C=(n.eventKey,Object(f.a)(n,["bsPrefix","className","active","onEnter","onEntering","onEntered","onExit","onExiting","onExited","mountOnEnter","unmountOnExit","transition","as","eventKey"])),K=Object(h.a)(a,"tab-pane");if(!i&&!N&&y)return null;var P=c.a.createElement(w,Object(v.a)({},C,{ref:t,role:"tabpanel","aria-hidden":!i,className:x()(r,K,{active:i})}));return N&&(P=c.a.createElement(N,{in:i,onEnter:l,onEntering:o,onEntered:d,onExit:u,onExiting:j,onExited:O,mountOnEnter:g,unmountOnExit:y},P)),c.a.createElement(b.Provider,{value:null},c.a.createElement(m.a.Provider,{value:null},P))}));y.displayName="TabPane";var N=y,E=function(e){function t(){return e.apply(this,arguments)||this}return Object(d.a)(t,e),t.prototype.render=function(){throw new Error("ReactBootstrap: The `Tab` component is not meant to be rendered! It's an abstract component that is only valid as a direct Child of the `Tabs` Component. For custom tabs components use TabPane and TabsContainer directly")},t}(c.a.Component);E.Container=j,E.Content=g,E.Pane=N;var w=E,C=(n(1286),n(441)),K=n(552),P=n(139),k=n(440),S=n(187),I=n(418),R=function(){},M=c.a.forwardRef((function(e,t){var n,a,r=e.as,i=void 0===r?"ul":r,l=e.onSelect,o=e.activeKey,d=e.role,u=e.onKeyDown,j=Object(f.a)(e,["as","onSelect","activeKey","role","onKeyDown"]),O=Object(k.a)(),x=Object(s.useRef)(!1),h=Object(s.useContext)(m.a),g=Object(s.useContext)(b);g&&(d=d||"tablist",o=g.activeKey,n=g.getControlledId,a=g.getControllerId);var p=Object(s.useRef)(null),y=function(e){var t=p.current;if(!t)return null;var n=Object(P.a)(t,"[data-rb-event-key]:not(.disabled)"),a=t.querySelector(".active");if(!a)return null;var r=n.indexOf(a);if(-1===r)return null;var s=r+e;return s>=n.length&&(s=0),s<0&&(s=n.length-1),n[s]},N=function(e,t){null!=e&&(l&&l(e,t),h&&h(e,t))};Object(s.useEffect)((function(){if(p.current&&x.current){var e=p.current.querySelector("[data-rb-event-key].active");e&&e.focus()}x.current=!1}));var E=Object(S.a)(t,p);return c.a.createElement(m.a.Provider,{value:N},c.a.createElement(I.a.Provider,{value:{role:d,activeKey:Object(m.b)(o),getControlledId:n||R,getControllerId:a||R}},c.a.createElement(i,Object(v.a)({},j,{onKeyDown:function(e){var t;switch(u&&u(e),e.key){case"ArrowLeft":case"ArrowUp":t=y(-1);break;case"ArrowRight":case"ArrowDown":t=y(1);break;default:return}t&&(e.preventDefault(),N(t.dataset.rbEventKey,e),x.current=!0,O())},ref:E,role:d}))))})),L=c.a.forwardRef((function(e,t){var n=e.bsPrefix,a=e.className,r=e.children,s=e.as,i=void 0===s?"div":s,l=Object(f.a)(e,["bsPrefix","className","children","as"]);return n=Object(h.a)(n,"nav-item"),c.a.createElement(i,Object(v.a)({},l,{ref:t,className:x()(a,n)}),r)}));L.displayName="NavItem";var A=L,T=n(206),D=n(54),q=(n(267),c.a.forwardRef((function(e,t){var n=e.active,a=e.className,r=e.eventKey,i=e.onSelect,l=e.onClick,o=e.as,d=Object(f.a)(e,["active","className","eventKey","onSelect","onClick","as"]),u=Object(m.b)(r,d.href),b=Object(s.useContext)(m.a),j=Object(s.useContext)(I.a),O=n;if(j){d.role||"tablist"!==j.role||(d.role="tab");var h=j.getControllerId(u),g=j.getControlledId(u);d["data-rb-event-key"]=u,d.id=h||d.id,d["aria-controls"]=g||d["aria-controls"],O=null==n&&null!=u?j.activeKey===u:n}"tab"===d.role&&(d.disabled&&(d.tabIndex=-1,d["aria-disabled"]=!0),d["aria-selected"]=O);var p=Object(D.a)((function(e){l&&l(e),null!=u&&(i&&i(u,e),b&&b(u,e))}));return c.a.createElement(o,Object(v.a)({},d,{ref:t,onClick:p,className:x()(a,O&&"active")}))})));q.defaultProps={disabled:!1};var _=q,B={disabled:!1,as:T.a},J=c.a.forwardRef((function(e,t){var n=e.bsPrefix,a=e.disabled,r=e.className,s=e.href,i=e.eventKey,l=e.onSelect,o=e.as,d=Object(f.a)(e,["bsPrefix","disabled","className","href","eventKey","onSelect","as"]);return n=Object(h.a)(n,"nav-link"),c.a.createElement(_,Object(v.a)({},d,{href:s,ref:t,eventKey:i,as:o,disabled:a,onSelect:l,className:x()(r,n,a&&"disabled")}))}));J.displayName="NavLink",J.defaultProps=B;var W=J,F=c.a.forwardRef((function(e,t){var n,a,r,i=Object(u.a)(e,{activeKey:"onSelect"}),l=i.as,o=void 0===l?"div":l,d=i.bsPrefix,b=i.variant,m=i.fill,j=i.justify,O=i.navbar,g=i.className,p=i.children,y=i.activeKey,N=Object(f.a)(i,["as","bsPrefix","variant","fill","justify","navbar","className","children","activeKey"]),E=Object(h.a)(d,"nav"),w=!1,P=Object(s.useContext)(C.a),k=Object(s.useContext)(K.a);return P?(a=P.bsPrefix,w=null==O||O):k&&(r=k.cardHeaderBsPrefix),c.a.createElement(M,Object(v.a)({as:o,ref:t,activeKey:y,className:x()(g,(n={},n[E]=!w,n[a+"-nav"]=w,n[r+"-"+b]=!!r,n[E+"-"+b]=!!b,n[E+"-fill"]=m,n[E+"-justified"]=j,n))},N),p)}));F.displayName="Nav",F.defaultProps={justify:!1,fill:!1},F.Item=A,F.Link=W;var H=F,U=n(439),z=n.p+"static/media/eye-off.2941ec08.svg",G=n(0);t.default=Object(i.b)((function(e){return{errorMessage:e.auth.errorMessage,successMessage:e.auth.successMessage,showLoading:e.auth.showLoading}}))((function(e){var t=Object(s.useState)(""),n=Object(r.a)(t,2),c=n[0],d=n[1],u={email:"",password:""},b=Object(s.useState)(u),m=Object(r.a)(b,2),j=m[0],v=m[1],f=Object(s.useState)(""),O=Object(r.a)(f,2),x=O[0],h=O[1],g=Object(i.c)();function p(t){t.preventDefault();var n=!1,r=Object(a.a)({},u);""===c&&(r.email="Email is Required",n=!0),""===x&&(r.password="Password is Required",n=!0),v(r),n||(g(Object(o.g)(!0)),g(Object(o.h)(c,x,e.history)))}var y=[{name:"Sign in",content:Object(G.jsxs)("div",{children:[Object(G.jsxs)("div",{className:"mb-4",children:[Object(G.jsx)("h3",{className:"mb-1 font-w600",children:"Welcome Back"}),Object(G.jsx)("p",{className:"welcome-content-paragraph",children:"Log in with your data that you entered during your registration"})]}),e.errorMessage&&Object(G.jsx)("div",{className:"bg-red-300 text-red-900 border border-red-900 p-1 my-2",children:e.errorMessage}),e.successMessage&&Object(G.jsx)("div",{className:"bg-green-300 text-green-900 border border-green-900 p-1 my-2",children:e.successMessage}),Object(G.jsxs)("form",{onSubmit:p,children:[Object(G.jsxs)("div",{className:"form-group",children:[Object(G.jsx)("input",{type:"email",className:"form-control",value:c,onChange:function(e){return d(e.target.value)}}),j.email&&Object(G.jsx)("div",{className:"text-danger fs-12",children:j.email})]}),Object(G.jsxs)("div",{className:"form-group password-textfield",children:[Object(G.jsx)("input",{type:"password",className:"form-control",value:x,onChange:function(e){return h(e.target.value)}}),Object(G.jsxs)("span",{className:"eye-off",children:[Object(G.jsx)("img",{src:z,alt:"",className:"eye-off"})," "]}),j.password&&Object(G.jsx)("div",{className:"text-danger fs-12",children:j.password})]}),Object(G.jsx)("div",{className:"recover-password d-flex justify-content-end",children:Object(G.jsx)(l.b,{className:"revover-password",to:"./page-register",children:"Recover Password ?"})}),Object(G.jsx)("div",{className:"text-center",children:Object(G.jsx)("button",{type:"submit",className:"btn btn-primary btn-block btn-pink",children:"Sign In"})})]}),Object(G.jsx)("div",{className:"new-account add-new-account  text-center mt-2",children:Object(G.jsxs)("p",{className:"mb-0",children:["Don't have an account?"," ",Object(G.jsx)(l.b,{className:"signup-link",to:"./page-register",children:"Sign up"})]})})]})},{name:"Register",content:Object(G.jsxs)("div",{children:[Object(G.jsxs)("div",{className:"mb-4",children:[Object(G.jsx)("h3",{className:"mb-1 font-w600",children:"Let\u2019s get Started"}),Object(G.jsx)("p",{className:"welcome-content-paragraph",children:"Enter your basic information to create new account on Trendyy"})]}),e.errorMessage&&Object(G.jsx)("div",{className:"bg-red-300 text-red-900 border border-red-900 p-1 my-2",children:e.errorMessage}),e.successMessage&&Object(G.jsx)("div",{className:"bg-green-300 text-green-900 border border-green-900 p-1 my-2",children:e.successMessage}),Object(G.jsxs)("form",{onSubmit:p,children:[Object(G.jsx)("div",{className:"form-group",children:Object(G.jsx)("input",{type:"text",className:"form-control",placeholder:"Enter Name",value:"Enter Name"})}),Object(G.jsxs)("div",{className:"form-group",children:[Object(G.jsx)("input",{type:"email",className:"form-control",value:c,onChange:function(e){return d(e.target.value)}}),j.email&&Object(G.jsx)("div",{className:"text-danger fs-12",children:j.email})]}),Object(G.jsx)("div",{className:"form-group",children:Object(G.jsx)("input",{type:"phone",className:"form-control",placeholder:"Phone Number",value:"Phone Number"})}),Object(G.jsxs)("div",{className:"form-group password-textfield",children:[Object(G.jsx)("input",{type:"password",className:"form-control",value:x,onChange:function(e){return h(e.target.value)}}),Object(G.jsxs)("span",{className:"eye-off",children:[Object(G.jsx)("img",{src:z,alt:"",className:"eye-off"})," "]}),j.password&&Object(G.jsx)("div",{className:"text-danger fs-12",children:j.password})]}),Object(G.jsx)("div",{className:"text-center",children:Object(G.jsx)("button",{type:"submit",className:"btn btn-primary btn-block btn-pink",children:"Register"})})]}),Object(G.jsx)("div",{className:"new-account add-new-account  text-center mt-2",children:Object(G.jsxs)("p",{className:"mb-0",children:["Already have an account?"," ",Object(G.jsx)(l.b,{className:"signup-link",to:"./page-register",children:"Sign in"})]})})]})}];return Object(G.jsx)("div",{className:"login-form-bx auth-page",children:Object(G.jsx)("div",{className:"container",children:Object(G.jsxs)("div",{className:"row",children:[Object(G.jsxs)("div",{className:"col-lg-8 col-md-7 d-flex box-skew1 relative login-leftpanel",children:[Object(G.jsxs)("div",{className:"inner-content align-self-center",children:[Object(G.jsx)(l.b,{to:"/dashboard",className:"login-logo",children:Object(G.jsx)("img",{src:U.a,alt:"",className:"logo-icon mr-2"})}),Object(G.jsxs)("h2",{className:"m-b10 text-white",children:["Sign In to ",Object(G.jsx)("br",{})," Trendy Website"]}),Object(G.jsx)("p",{className:"m-b40 text-white",children:"Boost your engagement & productivity, streamline processes, and make faster communications."})]}),Object(G.jsx)("div",{className:"login-center-img"})]}),Object(G.jsx)("div",{className:"col-lg-4 col-md-5 box-skew d-flex pl-0 pr-0 login-rightpanel",children:Object(G.jsx)("div",{className:"authincation-content",children:Object(G.jsxs)(w.Container,{defaultActiveKey:y[0].name.toLowerCase(),children:[Object(G.jsx)(H,{as:"ul",className:"nav-pills light",children:y.map((function(e,t){return Object(G.jsx)(H.Item,{as:"li",children:Object(G.jsxs)(H.Link,{eventKey:e.name.toLowerCase(),children:[Object(G.jsx)("i",{className:"la la-".concat(e.icon," mr-2")}),e.name]})},t)}))}),Object(G.jsx)(w.Content,{className:"auth-tab-content",children:y.map((function(e,t){return Object(G.jsx)(w.Pane,{eventKey:e.name.toLowerCase(),children:Object(G.jsx)("div",{children:e.content})},t)}))})]})})})]})})})}))}}]);
//# sourceMappingURL=3.42db6f51.chunk.js.map