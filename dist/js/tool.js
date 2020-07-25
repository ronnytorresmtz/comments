!function(e){var t={};function n(s){if(t[s])return t[s].exports;var o=t[s]={i:s,l:!1,exports:{}};return e[s].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,s){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:s})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){n(1),e.exports=n(6)},function(e,t,n){Nova.booting(function(e,t,s){e.component("comments",n(2))})},function(e,t,n){var s=n(3)(n(4),n(5),!1,null,null,null);e.exports=s.exports},function(e,t){e.exports=function(e,t,n,s,o,a){var r,i=e=e||{},m=typeof e.default;"object"!==m&&"function"!==m||(r=e,i=e.default);var l,c="function"==typeof i?i.options:i;if(t&&(c.render=t.render,c.staticRenderFns=t.staticRenderFns,c._compiled=!0),n&&(c.functional=!0),o&&(c._scopeId=o),a?(l=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),s&&s.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(a)},c._ssrRegister=l):s&&(l=s),l){var u=c.functional,d=u?c.render:c.beforeCreate;u?(c._injectStyles=l,c.render=function(e,t){return l.call(t),d(e,t)}):c.beforeCreate=d?[].concat(d,l):[l]}return{esModule:r,exports:i,options:c}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:["resourceName","resourceId","panel"],mounted:function(){this.initProperties(),this.getComments()},data:function(){return{comment:"",userId:"",userName:"",comments:{},baseUrl:"/nova-vendor/comments/comments",url:"",pagination:[],per_page:"",showOnlyMyComments:"",loading:!0}},methods:{initProperties:function(){this.url=this.baseUrl,this.per_page=void 0===this.panel.fields[0].per_page?this.per_page=5:this.per_page=this.panel.fields[0].per_page,this.userId=Nova.config.user.id,this.userName=Nova.config.user.name,this.userCompanyId=Nova.config.user.company_id||null,this.showOnlyMyComments=!1},applyShowOnlyMyComments:function(){this.showOnlyMyComments=!this.showOnlyMyComments,this.fetchPaginateComments(this.baseUrl)},fetchPaginateComments:function(e){this.url=e,this.getComments()},getComments:function(){var e=this;this.loading=!0,axios.get(this.url,{params:{resourceName:this.resourceName,resourceId:this.resourceId,company_id:this.userCompanyId,per_page:this.per_page,showOnlyMyComments:this.showOnlyMyComments}}).then(function(t){e.comments=t.data,e.pagination=t.data,e.loading=!1}).catch(function(t){e.$toasted.show(t,{type:"error"}),e.loading=!1})},saveComment:function(){var e=this;if(this.isEmpty(this.comment))this.$toasted.show("Write your comment before saving",{type:"error"});else{this.loading=!0;var t=this.getComment();axios.post(this.baseUrl,t).then(function(t){e.resetComment(),e.fetchPaginateComments(e.baseUrl),e.$toasted.show("Comment was added!",{type:"success"})}).catch(function(t){e.$toasted.show(t,{type:"error"})})}},getComment:function(){return{resourceId:this.resourceId,resourceName:this.resourceName,company_id:this.userCompanyId,user_id:this.userId,username:this.userName,text:this.comment}},deleteComment:function(e){var t=this;this.loading=!0,axios.delete(this.baseUrl+"/"+e).then(function(e){t.fetchPaginateComments(t.baseUrl),t.$toasted.show("Comment was deleted!",{type:"success"})}).catch(function(e){t.$toasted.show(e,{type:"error"})})},isEmpty:function(e){return void 0===e||null==e||e.length<=0},resetComment:function(){this.comment=""},formatDate:function(e){return moment(e).format("llll")},getClassForPreviusNext:function(e){return"btn btn-link btn-border-none py-3 px-4 dim "+(e?"text-primary":"text-gray")},showPagination:function(){return void 0!==this.pagination.total&&0!==this.pagination.total}}}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"flex justify-between pb-4 border-b border-40"},[n("h1",{staticClass:"flex-no-shrink text-90 font-normal text-2xl"},[e._v("\n      Comments \n      "),n("span",{directives:[{name:"show",rawName:"v-show",value:void 0!==e.pagination.total,expression:"pagination.total !== undefined"}]},[e._v(" \n        ("+e._s(e.pagination.total)+") \n      ")])]),e._v(" "),n("button",{staticClass:"btn btn-default btn-primary inline-flex items-center relative",attrs:{type:"submit"},on:{click:function(t){return t.preventDefault(),e.saveComment(t)}}},[e._v("\n        Save Comment\n    ")])]),e._v(" "),n("div",{staticClass:"card"},[n("div",{staticClass:"card mb-6 py-3 px-6"},[n("div",{staticClass:"flex justify-between"},[n("h4",{staticClass:"font-normal text-80"},[e._v("\n            Write new comment\n          ")]),e._v(" "),n("div",[n("label",{staticClass:"flex items-center select-none"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.showOnlyMyComments,expression:"showOnlyMyComments"}],staticClass:"checkbox mr-2",attrs:{type:"checkbox",name:" Show Only My Comments"},domProps:{checked:Array.isArray(e.showOnlyMyComments)?e._i(e.showOnlyMyComments,null)>-1:e.showOnlyMyComments},on:{click:function(t){return e.applyShowOnlyMyComments()},change:function(t){var n=e.showOnlyMyComments,s=t.target,o=!!s.checked;if(Array.isArray(n)){var a=e._i(n,null);s.checked?a<0&&(e.showOnlyMyComments=n.concat([null])):a>-1&&(e.showOnlyMyComments=n.slice(0,a).concat(n.slice(a+1)))}else e.showOnlyMyComments=o}}}),e._v(" \n                Show Only My Comments\n            ")])])]),e._v(" "),n("textarea",{directives:[{name:"model",rawName:"v-model",value:e.comment,expression:"comment"}],staticClass:"w-full form-control form-input form-input-bordered py-3 h-auto mt-2 mb-2 text-90",attrs:{id:"commenter",dusk:"commenter",rows:"5"},domProps:{value:e.comment},on:{keyup:function(t){return(t.type.indexOf("key")||13===t.keyCode)&&t.ctrlKey?e.saveComment(t):null},input:function(t){t.target.composing||(e.comment=t.target.value)}}}),e._v(" "),n("div",{staticClass:"help-text mb-2"},[e._v("\n            On MacOS, press ⌘ + Enter, on Windows press Ctrl + Enter to save\n        ")]),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.loading,expression:"loading"}],staticClass:"mt-2"},[n("loader",{staticClass:"pb-6 text-60"})],1),e._v(" "),e._l(e.comments.data,function(t){return n("div",{key:t.id},[n("div",{staticClass:"commenter__comment py-4 border-t border-40"},[n("div",{staticClass:"font-light text-80 text-sm"},[t.userId===e.userId?n("span",[n("a",{staticClass:"no-underline dim text-primary font-bold",attrs:{href:"/nova/resources/users/"+e.userId}},[e._v("\n                    "+e._s(t.username)+"  \n                  ")])]):n("span",[n("span",{staticClass:"no-underline text-primary font-bold"},[e._v("\n                    "+e._s(t.username)+"  \n                  ")])]),e._v(" "),n("span",{staticClass:"mr-1"},[e._v(" said on "+e._s(e.formatDate(t.created_at))+" ")]),e._v(" "),n("span",{directives:[{name:"show",rawName:"v-show",value:t.userId===e.userId,expression:"(comment.userId === userId)"}],staticClass:"mr-2 cursor-pointer",on:{click:function(n){return e.deleteComment(t.id)}}},[n("svg",{staticClass:"fill-current text-80",attrs:{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"14",viewBox:"0 0 20 20","aria-labelledby":"delete",role:"presentation"}},[n("path",{attrs:{"fill-rule":"nonzero",d:"M6 4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2h5a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6H1a1 1 0 1 1 0-2h5zM4 6v12h12V6H4zm8-2V2H8v2h4zM8 8a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1z"}})])])]),e._v(" "),n("div",{staticClass:"mt-2"},[e._v("\n             "+e._s(t.text)+"\n            ")])])])})],2),e._v(" "),n("nav",{directives:[{name:"show",rawName:"v-show",value:e.showPagination(),expression:"showPagination()"}],staticClass:"flex justify-between items-center bg-20 rounded-b"},[n("button",{class:e.getClassForPreviusNext(e.pagination.prev_page_url),attrs:{disabled:!e.pagination.prev_page_url},on:{click:function(t){return e.fetchPaginateComments(e.pagination.prev_page_url)}}},[e._v("\n            Previous\n        ")]),e._v(" "),n("span",{staticClass:"text-sm text-80 px-4"},[e._v(" "+e._s(e.pagination.from)+"-"+e._s(e.pagination.to)+" of "+e._s(e.pagination.total))]),e._v(" "),n("button",{class:e.getClassForPreviusNext(e.pagination.next_page_url),attrs:{disabled:!e.pagination.next_page_url},on:{click:function(t){return e.fetchPaginateComments(e.pagination.next_page_url)}}},[e._v("\n            Next\n        ")])])])])},staticRenderFns:[]}},function(e,t){}]);