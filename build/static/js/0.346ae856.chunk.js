(this.webpackJsonptrendy=this.webpackJsonptrendy||[]).push([[0],{925:function(e,i,t){"use strict";t.r(i),t.d(i,"Deserializers",(function(){return f})),t.d(i,"Serializer",(function(){return h}));var r=t(12),a=t(20),o=t(4),n=t(7),s=t(8),l=t(2),p=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"image/png";return"data:".concat(e,";base64,")},u=function(){function e(i){var t=this;Object(n.a)(this,e),this.version="3.12.0",this.spriteOrder=0,this.mapRelativeCropPointToImageSpace=function(e){var i=l.eb.relativeToAbsolutePoint(e,t.cropSpace,!1);return l.eb.pointFromSpaceToSpace(i,t.cropSpace,t.imageSpace,!1)},this.mapRelativeCropSizeToScaledImageSize=function(e){return e*Math.min(t.outputSize.height*t.outputScale.x,t.outputSize.width*t.outputScale.y)},this.mapRelativeCropSizeToUnscaledImageSize=function(e){return e*Math.min(t.outputSize.height,t.outputSize.width)},this.editor=i}return Object(s.a)(e,[{key:"validateVersion",value:function(e){return this.version===e}},{key:"checkIsSerialisationValid",value:function(e){if("string"!==typeof e&&this.validateVersion(e.version))return!0;if("string"===typeof e)throw new Error("Invalid input of type string, please provide an object");return!1}},{key:"deserializeImage",value:function(e){var i={};return e.image&&(i.image={width:e.image.width,height:e.image.height,data:e.image.data?e.image.data.replace(p(),""):""},i.image.data=i.image.data?p()+i.image.data:""),i}},{key:"deserializeTransformation",value:function(i){var t={},r=i.operations.find((function(e){return"orientation"===e.type})),a=i.operations.find((function(e){return"transform"===e.type})),n=this.editor.engine.getRootContainers(),s=Object(o.a)(n,1)[0];return this.previewPosition=this.editor.transformToolStore.defaultCropMaskPosition,this.previewSize=this.editor.transformToolStore.maxCropMaskSize,this.imageSpace=s,t.transform=e.initializeEmptyTransform(),null!=r&&(t.transform.outputRotation=r.options.rotation,t.transform.flipHorizontally=r.options.flipHorizontally||!1,t.transform.flipVertically=r.options.flipVertically||!1),a&&(t.transform.start=a.options.start,t.transform.end=a.options.end,t.transform.rotation=a.options.rotation||0,t.transform.identifier=a.options.meta?a.options.meta.identifier:""),t}},{key:"deserialize",value:function(i){var t,r,o=this,n={};i.meta&&!e.checkIfPlatformHTML(i.meta.platform)&&console.warn("Read serialisation from another Platform");var s=this.editor.engineMediator.output.container.getResolution(),p=this.editor.engineMediator.image.container.getBounds().size;return this.outputSize=s,this.imageSize=p,this.cropSpace=this.editor.engine.getOutputContainer(),this.outputScale=this.cropSpace.getScale(),i.operations.forEach((function(i){switch(i.type){case"filter":n.filter=e.deserializeFilter(i.options);break;case"adjustments":n.adjustment=e.deserializeAdjustments(i.options);break;case"focus":n.focus=o.deserializeFocus(i.options);break;case"sprite":i.options.sprites.forEach((function(i){switch(i.type){case"frame":n.frame=o.deserializeFrame(i.options);break;case"overlay":n.overlay=e.deserializeOverlay(i.options);break;case"brush":var t;if(n.brush)(t=n.brush.strokes).push.apply(t,Object(a.a)(o.deserializeBrush(i.options).strokes));else n.brush=o.deserializeBrush(i.options);break;case"sticker":case"text":case"textdesign":n.sprite||(n.sprite={spriteIdList:[],sticker:{},text:{},textdesign:{},common:{}});var r=Object(l.m)();n.sprite.spriteIdList.push(r),n.sprite.common[r]={order:o.spriteOrder,position:o.mapRelativeCropPointToImageSpace(i.options.position),tool:"sticker",rotation:i.options.rotation||0,flipHorizontally:i.options.flipHorizontally,flipVertically:i.options.flipVertically},o.spriteOrder+=1,"sticker"===i.type?(n.sprite.common[r].tool="sticker",n.sprite.common[r].size={width:o.mapRelativeCropSizeToScaledImageSize(i.options.dimensions.x),height:o.mapRelativeCropSizeToScaledImageSize(i.options.dimensions.y)},n.sprite.sticker[r]=e.deserializeStickers(i.options)):"text"===i.type?(n.sprite.common[r].tool="text",n.sprite.text[r]=o.deserializeTexts(i.options)):"textdesign"===i.type&&(n.sprite.common[r].tool="textdesign",n.sprite.textdesign[r]=o.deserializeTextDesign(i.options))}}))}})),i.assetLibrary&&(n.customStickers=(null==(r=null==(t=i.assetLibrary)?void 0:t.assets)?void 0:r.stickers)||[]),n}},{key:"deserializeFrame",value:function(i){return{identifier:i.identifier,opacity:i.alpha,width:this.mapRelativeCropSizeToUnscaledImageSize(i.size),color:e.deserialzeColor(i.tintColor)}}},{key:"deserializeFocus",value:function(e){switch(e.type){case"linear":return{identifier:"linear",linear:this.deserializeLinearFocus(e.options)};case"gaussian":return{identifier:"gaussian",gaussian:this.deserializeGaussianFocus(e.options)};case"radial":return{identifier:"radial",radial:this.deserializeRadialFocus(e.options)};case"mirrored":return{identifier:"mirrored",mirrored:this.deserializeMirroredFocus(e.options)}}}},{key:"deserializeRadialFocus",value:function(e){return{center:this.mapRelativeCropPointToImageSpace(e.start),radius:new l.p(this.mapRelativeCropPointToImageSpace(e.start)).subtract(new l.p(this.mapRelativeCropPointToImageSpace(e.end))).magnitude,blurRadius:this.mapRelativeCropSizeToScaledImageSize(e.blurRadius)}}},{key:"deserializeLinearFocus",value:function(e){return{start:this.mapRelativeCropPointToImageSpace(e.start),end:this.mapRelativeCropPointToImageSpace(e.end),blurRadius:this.mapRelativeCropSizeToScaledImageSize(e.blurRadius)}}},{key:"deserializeGaussianFocus",value:function(e){return{blurRadius:this.mapRelativeCropSizeToScaledImageSize(e.blurRadius)}}},{key:"deserializeMirroredFocus",value:function(e){var i=new l.p(this.mapRelativeCropPointToImageSpace(e.start)).subtract(new l.p(this.mapRelativeCropPointToImageSpace(e.end)));return{origin:new l.p(this.mapRelativeCropPointToImageSpace(e.start)).add(new l.p(this.mapRelativeCropPointToImageSpace(e.end))).divide(2),rotation:Math.atan2(i.y,i.x),size:this.mapRelativeCropSizeToScaledImageSize(e.size),blurRadius:this.mapRelativeCropSizeToScaledImageSize(e.blurRadius)}}},{key:"deserializeTexts",value:function(i){return{identifier:Object(l.j)(i.fontIdentifier),fontSize:this.mapRelativeCropSizeToScaledImageSize(i.fontSize),width:this.mapRelativeCropSizeToScaledImageSize(i.maxWidth),alignment:i.alignment,textColor:e.deserialzeColor(i.color),backgroundColor:e.deserialzeColor(i.backgroundColor),lineHeight:i.lineHeight,text:i.text}}},{key:"deserializeTextDesign",value:function(i){return{identifier:i.identifier,width:this.mapRelativeCropSizeToScaledImageSize(i.width),padding:this.mapRelativeCropSizeToScaledImageSize(i.padding),color:e.deserialzeColor(i.color),seed:i.seed,text:i.text,isInverted:i.inverted}}},{key:"deserializeBrush",value:function(i){var t=this;return{strokes:i.paths.map((function(i){return{path:{controlPoints:i.points.map(t.mapRelativeCropPointToImageSpace)},brush:{id:"imgly_brush_radial",color:e.deserialzeColor(i.brush.color),size:i.brush.size,hardness:i.brush.hardness}}}))}}}],[{key:"deserializeFilter",value:function(e){return{intensity:e.intensity,identifier:e.identifier}}},{key:"deserializeAdjustments",value:function(e){return Object(r.a)({},e)}},{key:"deserializeOverlay",value:function(e){return{identifier:e.identifier,opacity:e.intensity,blendMode:e.blendMode.replace(/([ _][a-z])/g,(function(e){return e.toUpperCase().replace(" ","").replace("_","")}))}}},{key:"initializeEmptyTransform",value:function(){return{outputRotation:0,flipHorizontally:!1,flipVertically:!1,start:{x:0,y:0},end:{x:1,y:1},rotation:0}}},{key:"deserialzeColor",value:function(e){return e&&e.rgba?e.rgba:[0,0,0,0]}},{key:"checkIfPlatformHTML",value:function(e){return"html5"===e}},{key:"deserializeStickers",value:function(i){return{identifier:i.identifier,opacity:i.alpha||0,tintMode:i.tintMode||"none",tintColor:e.deserialzeColor(i.tintColor)}}}]),e}(),d=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"image/png";return"data:".concat(e,";base64,")},c=function(){function e(i){var t=this;Object(n.a)(this,e),this.version="3.9.0",this.spriteOrder=0,this.mapRelativeCropPointToImageSpace=function(e){var i=l.eb.relativeToAbsolutePoint(e,t.cropSpace,!1);return l.eb.pointFromSpaceToSpace(i,t.cropSpace,t.imageSpace,!1)},this.mapRelativeCropSizeToScaledImageSize=function(e){return e*Math.min(t.outputSize.height*t.outputScale.x,t.outputSize.width*t.outputScale.y)},this.mapRelativeCropSizeToUnscaledImageSize=function(e){return e*Math.min(t.outputSize.height,t.outputSize.width)},this.editor=i}return Object(s.a)(e,[{key:"validateVersion",value:function(e){return this.version===e}},{key:"checkIsSerialisationValid",value:function(e){if("string"!==typeof e&&this.validateVersion(e.version))return!0;if("string"===typeof e)throw new Error("Invalid input of type string, please provide an object");return!1}},{key:"deserializeImage",value:function(e){var i={};return e.image&&(i.image={width:e.image.width,height:e.image.height,data:e.image.data?e.image.data.replace(d(),""):""},i.image.data=i.image.data?d()+i.image.data:""),i}},{key:"deserializeTransformation",value:function(i){var t={},r=i.operations.find((function(e){return"orientation"===e.type})),a=i.operations.find((function(e){return"transform"===e.type})),n=this.editor.engine.getRootContainers(),s=Object(o.a)(n,1)[0];return this.previewPosition=this.editor.transformToolStore.defaultCropMaskPosition,this.previewSize=this.editor.transformToolStore.maxCropMaskSize,this.imageSpace=s,t.transform=e.initializeEmptyTransform(),null!=r&&(t.transform.outputRotation=r.options.rotation,t.transform.flipHorizontally=r.options.flipHorizontally||!1,t.transform.flipVertically=r.options.flipVertically||!1),a&&(t.transform.start=a.options.start,t.transform.end=a.options.end,t.transform.rotation=a.options.rotation||0,t.transform.identifier=a.options.meta?a.options.meta.identifier:""),t}},{key:"deserialize",value:function(i){var t,r,o=this,n={};i.meta&&!e.checkIfPlatformHTML(i.meta.platform)&&console.warn("Read serialisation from another Platform");var s=this.editor.engineMediator.output.container.getResolution(),p=this.editor.engineMediator.image.container.getBounds().size;return this.outputSize=s,this.imageSize=p,this.cropSpace=this.editor.engine.getOutputContainer(),this.outputScale=this.cropSpace.getScale(),i.operations.forEach((function(i){switch(i.type){case"filter":n.filter=e.deserializeFilter(i.options);break;case"adjustments":n.adjustment=e.deserializeAdjustments(i.options);break;case"focus":n.focus=o.deserializeFocus(i.options);break;case"sprite":i.options.sprites.forEach((function(i){switch(i.type){case"frame":n.frame=o.deserializeFrame(i.options);break;case"overlay":n.overlay=e.deserializeOverlay(i.options);break;case"brush":var t;if(n.brush)(t=n.brush.strokes).push.apply(t,Object(a.a)(o.deserializeBrush(i.options).strokes));else n.brush=o.deserializeBrush(i.options);break;case"sticker":case"text":case"textdesign":n.sprite||(n.sprite={spriteIdList:[],sticker:{},text:{},textdesign:{},common:{}});var r=Object(l.m)();n.sprite.spriteIdList.push(r),n.sprite.common[r]={order:o.spriteOrder,position:o.mapRelativeCropPointToImageSpace(i.options.position),tool:"sticker",rotation:i.options.rotation||0,flipHorizontally:i.options.flipHorizontally,flipVertically:i.options.flipVertically},o.spriteOrder+=1,"sticker"===i.type?(n.sprite.common[r].tool="sticker",n.sprite.common[r].size={width:o.mapRelativeCropSizeToScaledImageSize(i.options.dimensions.x),height:o.mapRelativeCropSizeToScaledImageSize(i.options.dimensions.y)},n.sprite.sticker[r]=e.deserializeStickers(i.options)):"text"===i.type?(n.sprite.common[r].tool="text",n.sprite.text[r]=o.deserializeTexts(i.options)):"textdesign"===i.type&&(n.sprite.common[r].tool="textdesign",n.sprite.textdesign[r]=o.deserializeTextDesign(i.options))}}))}})),i.assetLibrary&&(n.customStickers=(null==(r=null==(t=i.assetLibrary)?void 0:t.assets)?void 0:r.stickers)||[]),n}},{key:"deserializeFrame",value:function(i){return{identifier:i.identifier,opacity:i.alpha,width:this.mapRelativeCropSizeToUnscaledImageSize(i.size),color:e.deserialzeColor(i.tintColor)}}},{key:"deserializeFocus",value:function(e){switch(e.type){case"linear":return{identifier:"linear",linear:this.deserializeLinearFocus(e.options)};case"gaussian":return{identifier:"gaussian",gaussian:this.deserializeGaussianFocus(e.options)};case"radial":return{identifier:"radial",radial:this.deserializeRadialFocus(e.options)};case"mirrored":return{identifier:"mirrored",mirrored:this.deserializeMirroredFocus(e.options)};default:return}}},{key:"deserializeRadialFocus",value:function(e){return{center:this.mapRelativeCropPointToImageSpace(e.start),radius:new l.p(this.mapRelativeCropPointToImageSpace(e.start)).subtract(new l.p(this.mapRelativeCropPointToImageSpace(e.end))).magnitude,blurRadius:this.mapRelativeCropSizeToScaledImageSize(e.blurRadius)}}},{key:"deserializeLinearFocus",value:function(e){return{start:this.mapRelativeCropPointToImageSpace(e.start),end:this.mapRelativeCropPointToImageSpace(e.end),blurRadius:this.mapRelativeCropSizeToScaledImageSize(e.blurRadius)}}},{key:"deserializeGaussianFocus",value:function(e){return{blurRadius:this.mapRelativeCropSizeToScaledImageSize(e.blurRadius)}}},{key:"deserializeMirroredFocus",value:function(e){var i=new l.p(this.mapRelativeCropPointToImageSpace(e.start)).subtract(new l.p(this.mapRelativeCropPointToImageSpace(e.end)));return{origin:new l.p(this.mapRelativeCropPointToImageSpace(e.start)).add(new l.p(this.mapRelativeCropPointToImageSpace(e.end))).divide(2),rotation:Math.atan2(i.y,i.x),size:this.mapRelativeCropSizeToScaledImageSize(e.size),blurRadius:this.mapRelativeCropSizeToScaledImageSize(e.blurRadius)}}},{key:"deserializeTexts",value:function(i){return{identifier:Object(l.j)(i.fontIdentifier),fontSize:this.mapRelativeCropSizeToScaledImageSize(i.fontSize),width:this.mapRelativeCropSizeToScaledImageSize(i.maxWidth),alignment:i.alignment,textColor:e.deserialzeColor(i.color),backgroundColor:e.deserialzeColor(i.backgroundColor),lineHeight:i.lineHeight,text:i.text}}},{key:"deserializeTextDesign",value:function(i){return{identifier:i.identifier,width:this.mapRelativeCropSizeToScaledImageSize(i.width),padding:this.mapRelativeCropSizeToScaledImageSize(i.padding),color:e.deserialzeColor(i.color),seed:i.seed,text:i.text,isInverted:i.inverted}}},{key:"deserializeBrush",value:function(i){var t=this;return{strokes:i.paths.map((function(i){return{path:{controlPoints:i.points.map(t.mapRelativeCropPointToImageSpace)},brush:{id:"imgly_brush_radial",color:e.deserialzeColor(i.brush.color),size:i.brush.size,hardness:i.brush.hardness}}}))}}}],[{key:"deserializeFilter",value:function(e){return{intensity:e.intensity,identifier:e.identifier}}},{key:"deserializeAdjustments",value:function(e){return Object(r.a)({},e)}},{key:"deserializeOverlay",value:function(e){return{identifier:e.identifier,opacity:e.intensity,blendMode:e.blendMode.replace(/([ _][a-z])/g,(function(e){return e.toUpperCase().replace(" ","").replace("_","")}))}}},{key:"initializeEmptyTransform",value:function(){return{outputRotation:0,flipHorizontally:!1,flipVertically:!1,start:{x:0,y:0},end:{x:1,y:1},rotation:0}}},{key:"deserialzeColor",value:function(e){return e&&e.rgba?e.rgba:[0,0,0,0]}},{key:"checkIfPlatformHTML",value:function(e){return"html5"===e}},{key:"deserializeStickers",value:function(i){return{identifier:i.identifier,opacity:i.alpha||0,tintMode:i.tintMode||"none",tintColor:e.deserialzeColor(i.tintColor)}}}]),e}(),m="5.19.0",h=function(){function e(i,t,r,a,o,s){var p=this;Object(n.a)(this,e),this.version="3.12.0",this.mapImagePointToRelativeCropPoint=function(e){var i=l.eb.pointFromSpaceToSpace(e,p.imageSpace,p.cropSpace,!1);return l.eb.absoluteToRelativePoint(i,p.cropSpace,!1)},this.mapSizeToRelativeUnscaledCropSize=function(e){return e/Math.min(p.outputSize.height,p.outputSize.width)},this.mapSizeToRelativeScaledCropSize=function(e){return e/Math.min(p.outputSize.height*p.outputScale.x,p.outputSize.width*p.outputScale.y)},this.getPointInDirection=function(e){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:3,r=Math.tan(i),a=Math.sqrt(Math.pow(r,2)+1);return{x:e.x+t/a,y:e.y+t*r/a}},this.previewPosition=i,this.previewSize=t,this.outputSize=r,this.imageSize=a,this.imageSpace=o,this.cropSpace=s,this.outputScale=s.getScale()}return Object(s.a)(e,[{key:"serialise",value:function(i,t,r){var a=this,o=e.serializeMetaData(),n={width:this.imageSize.width,height:this.imageSize.height};t&&(n.type=r,n.data=t);var s=[],l=[],p=i.adjustment;Object.keys(p).map((function(e){return p[e]})).filter(Boolean).length&&s.push(e.serializeAdjustments(p));var u=i.filter;"identity"!==u.identifier&&s.push(e.serializeFilters(u));var d=i.overlay;if("identity"!==d.identifier&&l.push(e.serializeOverlay(d)),i.transform){var c=this.serializeTransform(i.transform),m=c.transform,h=c.orientation,f=[0!==m.options.start.x,0!==m.options.start.y,1!==m.options.end.x,1!==m.options.end.y,0!==m.options.rotation],z=[0!==h.options.rotation,!1!==h.options.flipVertically,!1!==h.options.flipHorizontally];f.some((function(e){return e}))&&s.push(m),z.some((function(e){return e}))&&s.push(h)}var S=i.frame;"identity"!==S.identifier&&l.push(this.serialzeFrame(S));var g=i.focus;if("identity"!==g.identifier&&s.push(this.serializeFocus(g)),i.sprite&&i.sprite.spriteIdList.forEach((function(e){var t=i.sprite.common[e];switch(t.tool){case"sticker":var r=i.sprite.sticker[e];l.push(a.serializeSticker(r,t,i.transform));break;case"text":var o=i.sprite.text[e];l.push(a.serializeText(o,t));break;case"textdesign":var n=i.sprite.textdesign[e];l.push(a.serializeTextDesign(n,t))}})),i.brush.strokes.length&&l.push({type:"brush",options:{paths:i.brush.strokes.map((function(e){return{points:e.path.controlPoints.map(a.mapImagePointToRelativeCropPoint),brush:{color:{rgba:e.brush.color},size:e.brush.size,hardness:e.brush.hardness}}}))}}),l.length){var v={type:"sprite",options:{sprites:l}};s.push(v)}var y={assets:{stickers:i.customStickers}};return{version:this.version,meta:o,image:n,operations:s,assetLibrary:y}}},{key:"serialzeFrame",value:function(e){return{type:"frame",options:{identifier:e.identifier,alpha:e.opacity,tintColor:{rgba:e.color},size:this.mapSizeToRelativeUnscaledCropSize(e.width)}}}},{key:"serializeFocus",value:function(e){var i=Math.sqrt(Math.pow(this.previewSize.width,2)+Math.pow(this.previewSize.height,2));switch(e.identifier){case"linear":return{type:"focus",options:{type:"linear",options:{start:this.mapImagePointToRelativeCropPoint(e.linear.start),end:this.mapImagePointToRelativeCropPoint(e.linear.end),blurRadius:this.mapSizeToRelativeScaledCropSize(e.linear.blurRadius)}}};case"radial":return{type:"focus",options:{type:"radial",options:{start:this.mapImagePointToRelativeCropPoint(e.radial.center),end:this.mapImagePointToRelativeCropPoint(this.getPointInDirection(e.radial.center,0,e.radial.radius)),blurRadius:this.mapSizeToRelativeScaledCropSize(e.radial.blurRadius),gradientRadius:.1}}};case"mirrored":var t=e.mirrored;return{type:"focus",options:{type:"mirrored",options:{start:this.mapImagePointToRelativeCropPoint(this.getPointInDirection(t.origin,t.rotation,i/2)),end:this.mapImagePointToRelativeCropPoint(this.getPointInDirection(t.origin,t.rotation,-i/2)),size:this.mapSizeToRelativeScaledCropSize(e.mirrored.size),blurRadius:this.mapSizeToRelativeScaledCropSize(e.mirrored.blurRadius),gradientSize:.1}}};default:return{type:"focus",options:{type:"gaussian",options:{blurRadius:this.mapSizeToRelativeScaledCropSize(e.gaussian.blurRadius)}}}}}},{key:"serializeSticker",value:function(e,i,t){return{type:"sticker",options:{position:this.mapImagePointToRelativeCropPoint(i.position),dimensions:{x:this.mapSizeToRelativeScaledCropSize(i.size.width),y:this.mapSizeToRelativeScaledCropSize(i.size.height)},rotation:i.rotation,flipVertically:(i.flipVertically||!1)!==(t.flipVertically||!1),flipHorizontally:(i.flipHorizontally||!1)!==(t.flipHorizontally||!1),identifier:e.identifier,alpha:e.opacity,tintColor:{rgba:e.tintColor},tintMode:e.tintMode}}}},{key:"serializeText",value:function(e,i){return{type:"text",options:{position:this.mapImagePointToRelativeCropPoint(i.position),rotation:i.rotation,flipVertically:!1,flipHorizontally:!1,fontIdentifier:e.identifier,fontSize:this.mapSizeToRelativeScaledCropSize(e.fontSize),maxWidth:this.mapSizeToRelativeScaledCropSize(e.width),text:e.text,lineHeight:e.lineHeight,color:{rgba:e.textColor},backgroundColor:{rgba:e.backgroundColor},alignment:e.alignment}}}},{key:"serializeTextDesign",value:function(e,i){return{type:"textdesign",options:{position:this.mapImagePointToRelativeCropPoint(i.position),rotation:i.rotation,flipVertically:!1,flipHorizontally:!1,identifier:e.identifier,inverted:e.isInverted,text:e.text,seed:e.seed,width:this.mapSizeToRelativeScaledCropSize(e.width),padding:this.mapSizeToRelativeScaledCropSize(e.padding),color:{rgba:e.color}}}}},{key:"serializeTransform",value:function(e){return{transform:{type:"transform",options:{start:e.start,end:e.end,rotation:e.rotation,meta:{identifier:e.identifier}}},orientation:{type:"orientation",options:{rotation:e.outputRotation,flipHorizontally:e.flipHorizontally,flipVertically:e.flipVertically}}}}}],[{key:"serializeFilters",value:function(e){return{type:"filter",options:{intensity:e.intensity,identifier:e.identifier}}}},{key:"serializeAdjustments",value:function(e){return{type:"adjustments",options:e}}},{key:"serializeOverlay",value:function(e){return{type:"overlay",options:{identifier:e.identifier,intensity:e.opacity,blendMode:e.blendMode.replace(/[A-Z]/g,(function(e){return" ".concat(e.toLowerCase())}))}}}},{key:"serializeMetaData",value:function(){return{platform:"html5",version:m,createdAt:(new Date).toISOString()}}}]),e}(),f={"3.9.0":c,"3.12.0":u}}}]);
//# sourceMappingURL=0.346ae856.chunk.js.map