(this.webpackJsonptrendy=this.webpackJsonptrendy||[]).push([[4],{1771:function(e,t,n){"use strict";var o=n(1),r=n.n(o).a.createContext(null);t.a=r},1772:function(e,t,n){!function(e,t){var n="default"in t?t.default:t;function o(){return(o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}var a=window,i=t.memo((function(e){var r=e.state,i=void 0===r?"":r,c=e.client_id,s=e.className,l=e.redirect_uri,d=e.scope,u=void 0===d?"profile":d,f=e.isOnlyGetToken,v=void 0!==f&&f,m=e.scope_data,p=void 0===m?{profile:{essential:!0}}:m,h=e.response_type,b=void 0===h?"token":h,g=e.children,w=e.onReject,y=e.onResolve,k=e.onLoginStart,_=t.useRef(null),E=t.useState(!1),C=E[0],j=E[1];t.useEffect((function(){!C&&I()}),[C]),t.useEffect((function(){return function(){_.current&&_.current.remove()}}),[]);var S=t.useCallback((function(){return!!document.getElementById("amazon-login")}),[]),O=t.useCallback((function(e,t,n,o,r){void 0===t&&(t="script");var a=e.createElement(t);a.id=n,a.src=o,a.async=!0,a.defer=!0;var i=document.getElementsByTagName("script")[0];_.current=a,i&&i.parentNode&&i.parentNode.insertBefore(a,i),a.onload=r}),[]),P=t.useCallback((function(e){try{return fetch("https://api.amazon.com/user/profile",{headers:{Authorization:"Bearer "+e.access_token}}).then((function(e){return e.json()})).then((function(t){y({provider:"amazon",data:o({},t,e)})})).catch((function(e){w(e)})).finally((function(){})),Promise.resolve()}catch(e){return Promise.reject(e)}}),[w,y]),x=t.useCallback((function(e){v?y({provider:"amazon",data:o({},e)}):P(e)}),[P,y,v]),N=t.useCallback((function(e){w(e)}),[w]),I=t.useCallback((function(){S()?j(!0):O(document,"script","amazon-login","https://assets.loginwithamazon.com/sdk/na/login1.js",(function(){a.amazon.Login.setClientId(c),j(!0)}))}),[S,c,O]),R=t.useCallback((function(){C&&(a.amazon?(k&&k(),a.amazon.Login.authorize({scope:u,scope_data:p,response_type:b,redirect_uri:l,state:i},(function(e){e.error?N(e.error):x(e)}))):(I(),w("Google SDK isn't loaded!")))}),[I,u,i,w,p,C,N,k,l,b,x]);return n.createElement("div",{className:s,onClick:R},g)})),c=window,s=t.memo((function(e){var r=e.appId,a=e.scope,i=void 0===a?"email,public_profile":a,s=e.state,l=void 0===s||s,d=e.xfbml,u=void 0===d||d,f=e.cookie,v=void 0===f||f,m=e.version,p=void 0===m?"v2.7":m,h=e.language,b=void 0===h?"en_EN":h,g=e.auth_type,w=void 0===g?"":g,y=e.className,k=e.onLoginStart,_=e.onReject,E=e.onResolve,C=e.redirect_uri,j=e.fieldsProfile,S=void 0===j?"id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender":j,O=e.response_type,P=void 0===O?"code":O,x=e.return_scopes,N=void 0===x||x,I=e.isOnlyGetToken,R=void 0!==I&&I,L=e.children,T=t.useRef(null),z=t.useState(!1),K=z[0],A=z[1],G=t.useState(!1),B=G[0],U=G[1];t.useEffect((function(){!K&&J()}),[K]),t.useEffect((function(){return function(){T.current&&T.current.remove()}}),[]);var D=t.useCallback((function(e,t){var n=e.createElement("script");n.id="facebook-jssdk",n.src="https://connect.facebook.net/en_EN/sdk.js";var o=e.getElementsByTagName("script")[0];o&&o.parentNode&&o.parentNode.insertBefore(n,o),t()}),[]),F=t.useCallback((function(){return!!document.getElementById("facebook-jssdk")}),[]),M=t.useCallback((function(e,t){var n=window;n.fbAsyncInit=function(){n.FB&&n.FB.init(o({},e)),A(!0);var r=t.getElementById("fb-root");r||((r=t.createElement("div")).id="fb-root",t.body.appendChild(r)),T.current=r}}),[]),q=t.useCallback((function(e){c.FB.api("/me",{locale:b,fields:S},(function(t){E({provider:"facebook",data:o({},e,t)})}))}),[S,b,E]),H=t.useCallback((function(e){e.authResponse?R?E({provider:"facebook",data:o({},e.authResponse)}):q(e.authResponse):_(e),U(!1)}),[q,R,_,E]),J=t.useCallback((function(){F()?A(!0):D(document,(function(){M({appId:r,xfbml:u,version:p,state:l,cookie:v,redirect_uri:C,response_type:P},document)}))}),[l,r,u,v,p,M,C,P,D,F]),$=t.useCallback((function(){K&&!B&&(c.FB?(U(!0),k&&k(),c.FB.login(H,{scope:i,return_scopes:N,auth_type:w})):(J(),_("Fb isn't loaded!"),U(!1)))}),[J,i,_,w,K,k,B,N,H]);return n.createElement("div",{className:y,onClick:$},L)})),l="875c0462-6309-4ddf-9889-5227b1acc82c",d=window,u=t.memo((function(e){var r=e.client_id,a=e.scope,i=void 0===a?"https://www.googleapis.com/auth/userinfo.profile":a,c=e.prompt,s=void 0===c?"select_account":c,u=e.typeResponse,f=void 0===u?"accessToken":u,v=e.ux_mode,m=e.className,p=void 0===m?"":m,h=e.login_hint,b=void 0===h?"":h,g=e.access_type,w=void 0===g?"online":g,y=e.onLoginStart,k=e.onReject,_=e.onResolve,E=e.redirect_uri,C=void 0===E?"/":E,j=e.auto_select,S=void 0!==j&&j,O=e.isOnlyGetToken,P=void 0!==O&&O,x=e.cookie_policy,N=void 0===x?"single_host_origin":x,I=e.hosted_domain,R=void 0===I?"":I,L=e.discoveryDocs,T=void 0===L?"":L,z=e.children,K=e.fetch_basic_profile,A=void 0===K||K,G=t.useRef(null),B=t.useState(!1),U=B[0],D=B[1],F=t.useState(null),M=F[0],q=F[1];t.useEffect((function(){!U&&V()}),[U]),t.useEffect((function(){return function(){G.current&&G.current.remove()}}),[]);var H=t.useCallback((function(){return!!document.getElementById("google-login")}),[]),J=t.useCallback((function(e,t,n,o,r){void 0===t&&(t="script");var a=e.createElement(t);a.id=n,a.src=o,a.async=!0,a.defer=!0;var i=document.getElementsByTagName("script")[0];G.current=a,i&&i.parentNode&&i.parentNode.insertBefore(a,i),a.onload=r}),[]),$=t.useCallback((function(e){if("accessToken"===f){var t=new Headers({"Content-Type":"application/x-www-form-urlencoded","x-cors-grida-api-key":l,Authorization:"Bearer "+e.access_token});fetch("https://cors.bridged.cc/https://www.googleapis.com/oauth2/v3/userinfo?alt=json",{method:"GET",headers:t}).then((function(e){return e.json()})).then((function(t){var n=o({},e,t);_({provider:"google",data:n})})).catch((function(e){k(e)}))}else fetch("https://www.googleapis.com/oauth2/v3/tokeninfo?id_token="+e.credential,{method:"GET"}).then((function(e){return e.json()})).then((function(t){console.log("\ud83d\ude80 ~ file: index.tsx ~ line 153 ~ response",t);var n=o({},e,t);_({provider:"google",data:n})})).catch((function(e){k(e)}))}),[f,k,_]),Q=t.useCallback((function(e){P?_({provider:"google",data:e}):$(e)}),[P,$,_]),V=t.useCallback((function(){H()?D(!0):J(document,"script","google-login","https://accounts.google.com/gsi/client",(function(){var e={client_id:r,ux_mode:v},t=null;"idToken"===f?d.google.accounts.id.initialize(o({},e,{auto_select:S,callback:Q})):t=d.google.accounts.oauth2.initTokenClient(o({},e,{scope:i,prompt:s,login_hint:b,access_type:w,hosted_domain:R,redirect_uri:C,cookie_policy:N,discoveryDocs:T,immediate:!0,fetch_basic_profile:A,callback:Q})),t&&q(t),D(!0)}))}),[i,s,v,r,b,S,w,C,f,T,N,R,Q,A,J,H]),W=t.useCallback((function(){U&&(d.google?(y&&y(),M?M.requestAccessToken():d.google.accounts.id.prompt()):(V(),k("Google SDK isn't loaded!")))}),[M,U,V,y,k]);return n.createElement("div",{className:p,onClick:W},z)})),f=t.memo((function(e){var a=e.state,i=void 0===a?"":a,c=e.scope,s=void 0===c?"repo,gist":c,d=e.client_id,u=e.client_secret,f=e.className,v=void 0===f?"":f,m=e.redirect_uri,p=e.allow_signup,h=void 0!==p&&p,b=e.isOnlyGetToken,g=void 0!==b&&b,w=e.isOnlyGetCode,y=void 0!==w&&w,k=e.children,_=e.onReject,E=e.onResolve,C=e.onLoginStart;t.useEffect((function(){var e=new URL(window.location.href),t=e.searchParams.get("code"),n=e.searchParams.get("state");null!=n&&n.includes("_github")&&t&&(localStorage.setItem("github",t),window.close())}),[]);var j=t.useCallback((function(e){fetch("https://cors.bridged.cc/https://api.github.com//user",{method:"GET",headers:{Authorization:"token "+e.access_token,"x-cors-grida-api-key":l}}).then((function(e){return e.json()})).then((function(t){E({provider:"github",data:o({},t,e)})})).catch((function(e){_(e)}))}),[_,E]),S=t.useCallback((function(e){if(y)E({provider:"github",data:{code:e}});else{var t={code:e,state:i,redirect_uri:m,client_id:d,client_secret:u},n=new Headers({"Content-Type":"application/x-www-form-urlencoded","x-cors-grida-api-key":l});fetch("https://cors.bridged.cc/https://github.com/login/oauth/access_token",{method:"POST",headers:n,body:new URLSearchParams(t)}).then((function(e){return e.text()})).then((function(e){for(var t,n={},o=function(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return r(e,void 0);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,void 0):void 0}}(e))){n&&(e=n);var o=0;return function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(n=e[Symbol.iterator]()).next.bind(n)}(new URLSearchParams(e));!(t=o()).done;){var a=t.value;n[a[0]]=a[1]}n.access_token?g?E({provider:"github",data:n}):j(n):_("no data")})).catch((function(e){_(e)}))}}),[i,_,j,E,d,m,u,y,g]),O=t.useCallback((function(e){var t=e.type,n=e.code,o=e.provider;try{return Promise.resolve("code"===t&&"github"===o&&n&&S(n))}catch(e){return Promise.reject(e)}}),[S]),P=t.useCallback((function(){window.removeEventListener("storage",P,!1);var e=localStorage.getItem("github");e&&(O({provider:"github",type:"code",code:e}),localStorage.removeItem("instagram"))}),[O]),x=t.useCallback((function(){C&&C(),window.addEventListener("storage",P,!1);var e=window.screen.width/2-225,t=window.screen.height/2-365;window.open("https://github.com/login/oauth/authorize?client_id="+d+"&scope="+s+"&state="+i+"_github&redirect_uri="+m+"&allow_signup="+h,"Github","menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=450, height=730, top="+t+", left="+e)}),[s,i,d,m,h,C,P]);return n.createElement("div",{className:v,onClick:x},k)})),v=t.memo((function(e){var r=e.state,a=void 0===r?"":r,i=e.client_id,c=e.client_secret,s=e.className,d=e.redirect_uri,u=e.fields,f=void 0===u?"id,username,account_type,media_count":u,v=e.scope,m=void 0===v?"user_profile,user_media":v,p=e.response_type,h=void 0===p?"code":p,b=e.isOnlyGetCode,g=void 0!==b&&b,w=e.isOnlyGetToken,y=void 0!==w&&w,k=e.children,_=e.onReject,E=e.onResolve,C=e.onLoginStart;t.useEffect((function(){var e=new URL(window.location.href),t=e.searchParams.get("code"),n=e.searchParams.get("state");null!=n&&n.includes("_instagram")&&t&&(localStorage.setItem("instagram",t),window.close())}),[]);var j=t.useCallback((function(e){fetch("https://cors.bridged.cc/https://graph.instagram.com//me?fields="+f+"&access_token="+e.access_token,{method:"GET",headers:{"x-cors-grida-api-key":l}}).then((function(e){return e.json()})).then((function(t){E({provider:"instagram",data:o({},t,e)})})).catch((function(e){_(e)}))}),[f,_,E]),S=t.useCallback((function(e){if(g)E({provider:"instagram",data:{code:e}});else{var t={grant_type:"authorization_code",code:e,redirect_uri:d,client_id:i,client_secret:c},n=new Headers({"Content-Type":"application/x-www-form-urlencoded","x-cors-grida-api-key":l});fetch("https://cors.bridged.cc/https://api.instagram.com/oauth/access_token",{method:"POST",headers:n,body:new URLSearchParams(t)}).then((function(e){return e.json()})).then((function(e){e.access_token?y?E({provider:"instagram",data:e}):j(e):_("no data")})).catch((function(e){_(e)})).finally((function(){}))}}),[_,E,j,i,d,c,g,y]),O=t.useCallback((function(e){var t=e.type,n=e.code,o=e.provider;try{return Promise.resolve("code"===t&&"instagram"===o&&n&&S(n))}catch(e){return Promise.reject(e)}}),[S]),P=t.useCallback((function(){window.removeEventListener("storage",P,!1);var e=localStorage.getItem("instagram");e&&(O({provider:"instagram",type:"code",code:e}),localStorage.removeItem("instagram"))}),[O]),x=t.useCallback((function(){C&&C(),window.addEventListener("storage",P,!1);var e=window.screen.width/2-225,t=window.screen.height/2-365;window.open("https://api.instagram.com/oauth/authorize?response_type="+h+"&client_id="+i+"&scope="+m+"&state="+a+"_instagram&redirect_uri="+d,"Instagram","menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=450, height=730, top="+t+", left="+e)}),[m,a,i,d,C,h,P]);return n.createElement("div",{className:s,onClick:x},k)})),m=t.memo((function(e){var r=e.tenant,a=void 0===r?"common":r,i=e.state,c=void 0===i?"":i,s=e.client_id,l=e.className,d=e.redirect_uri,u=e.scope,f=void 0===u?"profile openid email":u,v=e.response_type,m=void 0===v?"code":v,p=e.response_mode,h=void 0===p?"query":p,b=e.children,g=e.code_challenge,w=void 0===g?"19cfc47c216dacba8ca23eeee817603e2ba34fe0976378662ba31688ed302fa9":g,y=e.code_challenge_method,k=void 0===y?"plain":y,_=e.prompt,E=void 0===_?"select_account":_,C=e.isOnlyGetCode,j=void 0!==C&&C,S=e.isOnlyGetToken,O=void 0!==S&&S,P=e.onLoginStart,x=e.onReject,N=e.onResolve;t.useEffect((function(){var e=new URL(window.location.href),t=e.searchParams.get("code"),n=e.searchParams.get("state");null!=n&&n.includes("_microsoft")&&t&&(localStorage.setItem("microsoft",t),window.close())}),[]);var I=t.useCallback((function(e){fetch("https://graph.microsoft.com/v1.0/me",{method:"GET",headers:{Authorization:"Bearer "+e.access_token}}).then((function(e){return e.json()})).then((function(t){N({provider:"microsoft",data:o({},t,e)})})).catch((function(e){x(e)}))}),[x,N]),R=t.useCallback((function(e){if(j)N({provider:"microsoft",data:{code:e}});else{var t={code:e,scope:f,client_id:s,redirect_uri:d,code_verifier:w,grant_type:"authorization_code"},n=new Headers({"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"});fetch("https://login.microsoftonline.com/"+a+"/oauth2/v2.0/token",{method:"POST",headers:n,body:new URLSearchParams(t)}).then((function(e){return e.json()})).then((function(e){e.access_token?O?N({provider:"microsoft",data:e}):I(e):x("no data")})).catch((function(e){x(e)}))}}),[f,a,x,I,s,N,d,w,j,O]),L=t.useCallback((function(e){var t=e.type,n=e.code,o=e.provider;try{return Promise.resolve("code"===t&&"microsoft"===o&&n&&R(n))}catch(e){return Promise.reject(e)}}),[R]),T=t.useCallback((function(){window.removeEventListener("storage",T,!1);var e=localStorage.getItem("microsoft");e&&(L({provider:"microsoft",type:"code",code:e}),localStorage.removeItem("microsoft"))}),[L]),z=t.useCallback((function(){P&&P(),window.addEventListener("storage",T,!1);var e=window.screen.width/2-225,t=window.screen.height/2-365;window.open("https://login.microsoftonline.com/"+a+"/oauth2/v2.0/authorize?client_id="+s+"\n        &response_type="+m+"\n        &redirect_uri="+d+"\n        &response_mode="+h+"\n        &scope="+f+"\n        &state="+c+"_microsoft\n        &prompt="+E+"\n        &code_challenge="+w+"\n        &code_challenge_method="+k,"Microsoft","menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=450, height=730, top="+t+", left="+e)}),[f,c,E,a,s,P,d,h,m,w,T,k]);return n.createElement("div",{className:l,onClick:z},b)})),p=t.memo((function(e){var r=e.state,a=void 0===r?"":r,i=e.scope,c=void 0===i?"r_liteprofile":i,s=e.client_id,d=e.client_secret,u=e.className,f=void 0===u?"":u,v=e.redirect_uri,m=e.response_type,p=void 0===m?"code":m,h=e.isOnlyGetCode,b=void 0!==h&&h,g=e.isOnlyGetToken,w=void 0!==g&&g,y=e.children,k=e.onLoginStart,_=e.onReject,E=e.onResolve;t.useEffect((function(){var e=new URL(window.location.href),t=e.searchParams.get("code"),n=e.searchParams.get("state");null!=n&&n.includes("_linkedin")&&t&&(localStorage.setItem("linkedin",t),window.close())}),[]);var C=t.useCallback((function(e){fetch("https://api.allorigins.win/get?url="+encodeURIComponent("https://api.linkedin.com/v2/me?oauth2_access_token="+e.access_token+"&projection=(id,profilePicture(displayImage~digitalmediaAsset:playableStreams),localizedLastName, firstName,lastName,localizedFirstName)"),{method:"GET"}).then((function(e){return e.json()})).then((function(t){var n=o({},e);if(t.contents){var r=JSON.parse(t.contents);"object"==typeof e&&Object.entries(r).map((function(e){n[e[0]]=e[1]}))}E({provider:"linkedin",data:n})})).catch((function(e){_(e)}))}),[_,E]),j=t.useCallback((function(e){if(b)E({provider:"linkedin",data:{code:e}});else{var t={code:e,grant_type:"authorization_code",redirect_uri:v,client_id:s,client_secret:d},n=new Headers({"Content-Type":"application/x-www-form-urlencoded","x-cors-grida-api-key":l});fetch("https://cors.bridged.cc/https://www.linkedin.com/oauth/v2/accessToken",{method:"POST",headers:n,body:new URLSearchParams(t)}).then((function(e){return e.json()})).then((function(e){w?E({provider:"linkedin",data:e}):C(e)})).catch((function(e){_(e)}))}}),[_,E,s,C,v,d,b,w]),S=t.useCallback((function(e){var t=e.type,n=e.code,o=e.provider;try{return Promise.resolve("code"===t&&"linkedin"===o&&n&&j(n))}catch(e){return Promise.reject(e)}}),[j]),O=t.useCallback((function(){window.removeEventListener("storage",O,!1);var e=localStorage.getItem("linkedin");e&&(S({provider:"linkedin",type:"code",code:e}),localStorage.removeItem("linkedin"))}),[S]),P=t.useCallback((function(){k&&k(),window.addEventListener("storage",O,!1);var e=window.screen.width/2-225,t=window.screen.height/2-365;window.open("https://www.linkedin.com/oauth/v2/authorization?response_type="+p+"&client_id="+s+"&scope="+c+"&state="+a+"_linkedin&redirect_uri="+v,"Linkedin","menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=450, height=730, top="+t+", left="+e)}),[k,O,p,s,c,a,v]);return n.createElement("div",{className:f,onClick:P},y)})),h=t.memo((function(e){var r=e.state,a=void 0===r?"":r,i=e.scope,c=void 0===i?"":i,s=e.client_id,d=e.client_secret,u=e.className,f=void 0===u?"":u,v=e.redirect_uri,m=e.isOnlyGetCode,p=void 0!==m&&m,h=e.isOnlyGetToken,b=void 0!==h&&h,g=e.children,w=e.onLoginStart,y=e.onReject,k=e.onResolve;t.useEffect((function(){var e=new URL(window.location.href),t=e.searchParams.get("code"),n=e.searchParams.get("state");null!=n&&n.includes("_pinterest")&&t&&(localStorage.setItem("pinterest",t),window.close())}),[]);var _=t.useCallback((function(e){fetch("https://cors.bridged.cc/https://api.pinterest.com/v5/user_account",{method:"GET",headers:{Authorization:"Bearer "+e.access_token,"x-cors-grida-api-key":l}}).then((function(e){return e.json()})).then((function(t){k({provider:"pinterest",data:o({},e,t)})})).catch((function(e){return y(e)}))}),[y,k]),E=t.useCallback((function(e){try{var t=function(){if(!p){var t={code:e,redirect_uri:v,grant_type:"authorization_code"},n=[];for(var o in t){var r=encodeURIComponent(o),a=encodeURIComponent(t[o]);n.push(r+"="+a)}return n=n.join("&"),Promise.resolve(fetch("https://cors.bridged.cc/https://api.pinterest.com/v5/oauth/token",{method:"POST",headers:{Authorization:"Basic "+btoa(s+":"+d),"Content-Type":"application/x-www-form-urlencoded","x-cors-grida-api-key":l},body:n}).then((function(e){return e.json()})).catch((function(e){return y(e)}))).then((function(e){e.access_token&&(b?k({provider:"pinterest",data:e}):_(e))}))}k({provider:"pinterest",data:{code:e}})}();return Promise.resolve(t&&t.then?t.then((function(){})):void 0)}catch(e){return Promise.reject(e)}}),[y,s,_,k,v,d,p,b]),C=t.useCallback((function(e){var t=e.type,n=e.code,o=e.provider;try{return Promise.resolve("code"===t&&"pinterest"===o&&n&&E(n))}catch(e){return Promise.reject(e)}}),[E]),j=t.useCallback((function(){window.removeEventListener("storage",j,!1);var e=localStorage.getItem("pinterest");e&&(C({provider:"pinterest",type:"code",code:e}),localStorage.removeItem("pinterest"))}),[C]),S=t.useCallback((function(){w&&w(),window.addEventListener("storage",j,!1);var e=window.screen.width/2-225,t=window.screen.height/2-365;window.open("https://www.pinterest.com/oauth/?client_id="+s+"&scope="+c+"&state="+a+"_pinterest&redirect_uri="+v+"&response_type=code&scope=boards:read,pins:read,user_accounts:read","Pinterest","menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=450, height=730, top="+t+", left="+e)}),[c,a,s,v,w,j]);return n.createElement("div",{className:f,onClick:S},g)})),b=t.memo((function(e){var r=e.client_id,a=e.className,i=void 0===a?"":a,c=e.redirect_uri,s=e.children,d=e.fields,u=void 0===d?"created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld":d,f=e.state,v=void 0===f?"state":f,m=e.scope,p=void 0===m?"users.read%20tweet.read":m,h=e.isOnlyGetCode,b=void 0!==h&&h,g=e.isOnlyGetToken,w=void 0!==g&&g,y=e.onLoginStart,k=e.onReject,_=e.onResolve;t.useEffect((function(){var e=new URL(window.location.href),t=e.searchParams.get("code");e.searchParams.get("state")&&t&&(localStorage.setItem("twitter",""+t),window.close())}),[]);var E=t.useCallback((function(e){fetch("https://cors.bridged.cc/https://api.twitter.com/2/users/me?user.fields="+u,{method:"GET",headers:{Authorization:"Bearer "+e.access_token,"x-cors-grida-api-key":l}}).then((function(e){return e.json()})).then((function(t){_({provider:"twitter",data:o({},e,t.data)})})).catch((function(e){return k(e)}))}),[u,k,_]),C=t.useCallback((function(e){try{var t=function(){if(!b){var t=new URLSearchParams({code:e,redirect_uri:c,client_id:r,grant_type:"authorization_code",code_verifier:"challenge"});return Promise.resolve(fetch("https://cors.bridged.cc/https://api.twitter.com/2/oauth2/token",{method:"POST",body:t,headers:{"Content-Type":"application/x-www-form-urlencoded","x-cors-grida-api-key":l}}).then((function(e){return e.json()})).catch((function(e){return k(e)}))).then((function(e){e.access_token&&(w?_({provider:"twitter",data:e}):E(e))}))}_({provider:"twitter",data:{code:e}})}();return Promise.resolve(t&&t.then?t.then((function(){})):void 0)}catch(e){return Promise.reject(e)}}),[k,E,_,r,c,b,w]),j=t.useCallback((function(e){var t=e.type,n=e.code,o=e.provider;try{return Promise.resolve("code"===t&&"twitter"===o&&n&&C(n))}catch(e){return Promise.reject(e)}}),[C]),S=t.useCallback((function(){window.removeEventListener("storage",S,!1);var e=localStorage.getItem("twitter");e&&(j({provider:"twitter",type:"code",code:e}),localStorage.removeItem("twitter"))}),[j]),O=t.useCallback((function(){try{y&&y(),window.addEventListener("storage",S,!1);var e=window.screen.width/2-225,t=window.screen.height/2-365;return window.open("https://twitter.com/i/oauth2/authorize?response_type=code&client_id="+r+"&redirect_uri="+c+"&scope="+p+"&state="+v+"&code_challenge=challenge&code_challenge_method=plain","twitter","menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=450, height=730, top="+t+", left="+e),Promise.resolve()}catch(e){return Promise.reject(e)}}),[p,v,r,y,c,S]);return n.createElement("div",{className:i,onClick:O},s)}));"undefined"!=typeof Symbol&&(Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator"))),"undefined"!=typeof Symbol&&(Symbol.asyncIterator||(Symbol.asyncIterator=Symbol("Symbol.asyncIterator")));var g=window,w=t.memo((function(e){var o=e.client_id,r=e.scope,a=void 0===r?"name email":r,i=e.className,c=void 0===i?"":i,s=e.onLoginStart,l=e.onReject,d=e.onResolve,u=e.redirect_uri,f=void 0===u?"/":u,v=e.children,m=t.useRef(null),p=t.useState(!1),h=p[0],b=p[1];t.useEffect((function(){!h&&_()}),[h]),t.useEffect((function(){return function(){m.current&&m.current.remove()}}),[]);var w=t.useCallback((function(){return!!document.getElementById("apple-login")}),[]),y=t.useCallback((function(e,t,n,o,r){void 0===t&&(t="script");var a=e.createElement(t);a.id=n,a.src=o,a.async=!0,a.defer=!0;var i=document.getElementsByTagName("script")[0];m.current=a,i&&i.parentNode&&i.parentNode.insertBefore(a,i),a.onload=r}),[]),k=t.useCallback((function(e){d({provider:"apple",data:e})}),[d]),_=t.useCallback((function(){w()?b(!0):y(document,"script","apple-login","https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js",(function(){g.AppleID.auth.init({clientId:o,scope:a,redirectURI:f,state:"origin:web",usePopup:!0}),b(!0)}))}),[a,o,f,y,w]),E=t.useCallback((function(){try{if(!h)return Promise.resolve();var e=function(){if(g.AppleID){s&&s();var e=function(e,t){try{var n=Promise.resolve(g.AppleID.auth.signIn()).then((function(e){k(e)}))}catch(e){return t(e)}return n&&n.then?n.then(void 0,t):n}(0,(function(e){l({err:e})}));if(e&&e.then)return e.then((function(){}))}else _(),l("Apple SDK isn't loaded!")}();return Promise.resolve(e&&e.then?e.then((function(){})):void 0)}catch(e){return Promise.reject(e)}}),[k,h,_,s,l]);return n.createElement("div",{className:c,onClick:E},v)})),y=t.memo((function(e){var o=e.state,r=void 0===o?"":o,a=e.scope,i=void 0===a?"user.info.basic":a,c=e.client_key,s=e.className,l=void 0===s?"":s,d=e.redirect_uri,u=e.children,f=e.onResolve,v=e.onLoginStart;t.useEffect((function(){var e=new URL(window.location.href),t=e.searchParams.get("code"),n=e.searchParams.get("state");null!=n&&n.includes("_tiktok")&&t&&(localStorage.setItem("tiktok",t),window.close())}),[]);var m=t.useCallback((function(e){var t=e.type,n=e.code,o=e.provider;try{return Promise.resolve("code"===t&&"tiktok"===o&&n&&f({provider:"tiktok",data:{code:n}}))}catch(e){return Promise.reject(e)}}),[f]),p=t.useCallback((function(){window.removeEventListener("storage",p,!1);var e=localStorage.getItem("tiktok");e&&(m({provider:"tiktok",type:"code",code:e}),localStorage.removeItem("instagram"))}),[m]),h=t.useCallback((function(){v&&v(),window.addEventListener("storage",p,!1);var e=window.screen.width/2-225,t=window.screen.height/2-365;window.open("https://www.tiktok.com/auth/authorize?client_key="+c+"&scope="+i+"&state="+r+"_tiktok&redirect_uri="+d+"&response_type=code","Github","menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=450, height=730, top="+t+", left="+e)}),[i,r,c,d,v,p]);return n.createElement("div",{className:l,onClick:h},u)}));e.LoginSocialAmazon=i,e.LoginSocialApple=w,e.LoginSocialFacebook=s,e.LoginSocialGithub=f,e.LoginSocialGoogle=u,e.LoginSocialInstagram=v,e.LoginSocialLinkedin=p,e.LoginSocialMicrosoft=m,e.LoginSocialPinterest=h,e.LoginSocialTiktok=y,e.LoginSocialTwitter=b}(t,n(1))},1773:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];function o(){for(var e=arguments.length,n=Array(e),o=0;o<e;o++)n[o]=arguments[o];var r=null;return t.forEach((function(e){if(null==r){var t=e.apply(void 0,n);null!=t&&(r=t)}})),r}return(0,a.default)(o)};var o,r=n(1774),a=(o=r)&&o.__esModule?o:{default:o};e.exports=t.default},1774:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){function t(t,n,o,r,a,i){var c=r||"<<anonymous>>",s=i||o;if(null==n[o])return t?new Error("Required "+a+" `"+s+"` was not specified in `"+c+"`."):null;for(var l=arguments.length,d=Array(l>6?l-6:0),u=6;u<l;u++)d[u-6]=arguments[u];return e.apply(void 0,[n,o,c,a,s].concat(d))}var n=t.bind(null,!1);return n.isRequired=t.bind(null,!0),n},e.exports=t.default},1778:function(e,t,n){"use strict";var o=n(3),r=n(9),a=n(56),i=n.n(a),c=(n(1773),n(1)),s=n.n(c),l=n(245),d=n(70),u=n(767),f=n(885),v=n(216),m=n(766),p=n(284),h=n(675),b=n(164),g=n(1771),w=function(){},y=s.a.forwardRef((function(e,t){var n,a,i=e.as,l=void 0===i?"ul":i,d=e.onSelect,u=e.activeKey,f=e.role,y=e.onKeyDown,k=Object(r.a)(e,["as","onSelect","activeKey","role","onKeyDown"]),_=Object(m.a)(),E=Object(c.useRef)(!1),C=Object(c.useContext)(b.a),j=Object(c.useContext)(g.a);j&&(f=f||"tablist",u=j.activeKey,n=j.getControlledId,a=j.getControllerId);var S=Object(c.useRef)(null),O=function(e){var t=S.current;if(!t)return null;var n=Object(v.a)(t,"[data-rb-event-key]:not(.disabled)"),o=t.querySelector(".active");if(!o)return null;var r=n.indexOf(o);if(-1===r)return null;var a=r+e;return a>=n.length&&(a=0),a<0&&(a=n.length-1),n[a]},P=function(e,t){null!=e&&(d&&d(e,t),C&&C(e,t))};Object(c.useEffect)((function(){if(S.current&&E.current){var e=S.current.querySelector("[data-rb-event-key].active");e&&e.focus()}E.current=!1}));var x=Object(p.a)(t,S);return s.a.createElement(b.a.Provider,{value:P},s.a.createElement(h.a.Provider,{value:{role:f,activeKey:Object(b.b)(u),getControlledId:n||w,getControllerId:a||w}},s.a.createElement(l,Object(o.a)({},k,{onKeyDown:function(e){var t;switch(y&&y(e),e.key){case"ArrowLeft":case"ArrowUp":t=O(-1);break;case"ArrowRight":case"ArrowDown":t=O(1);break;default:return}t&&(e.preventDefault(),P(t.dataset.rbEventKey,e),E.current=!0,_())},ref:x,role:f}))))})),k=s.a.forwardRef((function(e,t){var n=e.bsPrefix,a=e.className,c=e.children,l=e.as,u=void 0===l?"div":l,f=Object(r.a)(e,["bsPrefix","className","children","as"]);return n=Object(d.a)(n,"nav-item"),s.a.createElement(u,Object(o.a)({},f,{ref:t,className:i()(a,n)}),c)}));k.displayName="NavItem";var _=k,E=n(337),C=n(90),j=(n(440),s.a.forwardRef((function(e,t){var n=e.active,a=e.className,l=e.eventKey,d=e.onSelect,u=e.onClick,f=e.as,v=Object(r.a)(e,["active","className","eventKey","onSelect","onClick","as"]),m=Object(b.b)(l,v.href),p=Object(c.useContext)(b.a),g=Object(c.useContext)(h.a),w=n;if(g){v.role||"tablist"!==g.role||(v.role="tab");var y=g.getControllerId(m),k=g.getControlledId(m);v["data-rb-event-key"]=m,v.id=y||v.id,v["aria-controls"]=k||v["aria-controls"],w=null==n&&null!=m?g.activeKey===m:n}"tab"===v.role&&(v.disabled&&(v.tabIndex=-1,v["aria-disabled"]=!0),v["aria-selected"]=w);var _=Object(C.a)((function(e){u&&u(e),null!=m&&(d&&d(m,e),p&&p(m,e))}));return s.a.createElement(f,Object(o.a)({},v,{ref:t,onClick:_,className:i()(a,w&&"active")}))})));j.defaultProps={disabled:!1};var S=j,O={disabled:!1,as:E.a},P=s.a.forwardRef((function(e,t){var n=e.bsPrefix,a=e.disabled,c=e.className,l=e.href,u=e.eventKey,f=e.onSelect,v=e.as,m=Object(r.a)(e,["bsPrefix","disabled","className","href","eventKey","onSelect","as"]);return n=Object(d.a)(n,"nav-link"),s.a.createElement(S,Object(o.a)({},m,{href:l,ref:t,eventKey:u,as:v,disabled:a,onSelect:f,className:i()(c,n,a&&"disabled")}))}));P.displayName="NavLink",P.defaultProps=O;var x=P,N=s.a.forwardRef((function(e,t){var n,a,v,m=Object(l.a)(e,{activeKey:"onSelect"}),p=m.as,h=void 0===p?"div":p,b=m.bsPrefix,g=m.variant,w=m.fill,k=m.justify,_=m.navbar,E=m.className,C=m.children,j=m.activeKey,S=Object(r.a)(m,["as","bsPrefix","variant","fill","justify","navbar","className","children","activeKey"]),O=Object(d.a)(b,"nav"),P=!1,x=Object(c.useContext)(u.a),N=Object(c.useContext)(f.a);return x?(a=x.bsPrefix,P=null==_||_):N&&(v=N.cardHeaderBsPrefix),s.a.createElement(y,Object(o.a)({as:h,ref:t,activeKey:j,className:i()(E,(n={},n[O]=!P,n[a+"-nav"]=P,n[v+"-"+g]=!!v,n[O+"-"+g]=!!g,n[O+"-fill"]=w,n[O+"-justified"]=k,n))},S),C)}));N.displayName="Nav",N.defaultProps={justify:!1,fill:!1},N.Item=_,N.Link=x;t.a=N},1779:function(e,t,n){"use strict";var o=n(89),r=n(1),a=n.n(r),i=n(245),c=n(1771),s=n(164),l=function(e){var t=Object(i.a)(e,{activeKey:"onSelect"}),n=t.id,o=t.generateChildId,l=t.onSelect,d=t.activeKey,u=t.transition,f=t.mountOnEnter,v=t.unmountOnExit,m=t.children,p=Object(r.useMemo)((function(){return o||function(e,t){return n?n+"-"+t+"-"+e:null}}),[n,o]),h=Object(r.useMemo)((function(){return{onSelect:l,activeKey:d,transition:u,mountOnEnter:f||!1,unmountOnExit:v||!1,getControlledId:function(e){return p(e,"tabpane")},getControllerId:function(e){return p(e,"tab")}}}),[l,d,u,f,v,p]);return a.a.createElement(c.a.Provider,{value:h},a.a.createElement(s.a.Provider,{value:l||null},m))},d=n(3),u=n(9),f=n(56),v=n.n(f),m=n(70),p=a.a.forwardRef((function(e,t){var n=e.bsPrefix,o=e.as,r=void 0===o?"div":o,i=e.className,c=Object(u.a)(e,["bsPrefix","as","className"]),s=Object(m.a)(n,"tab-content");return a.a.createElement(r,Object(d.a)({ref:t},c,{className:v()(i,s)}))})),h=n(349);var b=a.a.forwardRef((function(e,t){var n=function(e){var t=Object(r.useContext)(c.a);if(!t)return e;var n=t.activeKey,o=t.getControlledId,a=t.getControllerId,i=Object(u.a)(t,["activeKey","getControlledId","getControllerId"]),l=!1!==e.transition&&!1!==i.transition,f=Object(s.b)(e.eventKey);return Object(d.a)({},e,{active:null==e.active&&null!=f?Object(s.b)(n)===f:e.active,id:o(e.eventKey),"aria-labelledby":a(e.eventKey),transition:l&&(e.transition||i.transition||h.a),mountOnEnter:null!=e.mountOnEnter?e.mountOnEnter:i.mountOnEnter,unmountOnExit:null!=e.unmountOnExit?e.unmountOnExit:i.unmountOnExit})}(e),o=n.bsPrefix,i=n.className,l=n.active,f=n.onEnter,p=n.onEntering,b=n.onEntered,g=n.onExit,w=n.onExiting,y=n.onExited,k=n.mountOnEnter,_=n.unmountOnExit,E=n.transition,C=n.as,j=void 0===C?"div":C,S=(n.eventKey,Object(u.a)(n,["bsPrefix","className","active","onEnter","onEntering","onEntered","onExit","onExiting","onExited","mountOnEnter","unmountOnExit","transition","as","eventKey"])),O=Object(m.a)(o,"tab-pane");if(!l&&!E&&_)return null;var P=a.a.createElement(j,Object(d.a)({},S,{ref:t,role:"tabpanel","aria-hidden":!l,className:v()(i,O,{active:l})}));return E&&(P=a.a.createElement(E,{in:l,onEnter:f,onEntering:p,onEntered:b,onExit:g,onExiting:w,onExited:y,mountOnEnter:k,unmountOnExit:_},P)),a.a.createElement(c.a.Provider,{value:null},a.a.createElement(s.a.Provider,{value:null},P))}));b.displayName="TabPane";var g=b,w=function(e){function t(){return e.apply(this,arguments)||this}return Object(o.a)(t,e),t.prototype.render=function(){throw new Error("ReactBootstrap: The `Tab` component is not meant to be rendered! It's an abstract component that is only valid as a direct Child of the `Tabs` Component. For custom tabs components use TabPane and TabsContainer directly")},t}(a.a.Component);w.Container=l,w.Content=p,w.Pane=g;t.a=w}}]);
//# sourceMappingURL=4.ca415f36.chunk.js.map