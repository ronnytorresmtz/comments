/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(6);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

Nova.booting(function (Vue, router, store) {

  Vue.component('comments', __webpack_require__(2));
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(3)
/* script */
var __vue_script__ = __webpack_require__(4)
/* template */
var __vue_template__ = __webpack_require__(5)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/Tool.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-68ff5483", Component.options)
  } else {
    hotAPI.reload("data-v-68ff5483", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['resourceName', 'resourceId', 'panel'],

  mounted: function mounted() {
    this.initProperties();
    this.getComments();
  },
  data: function data() {
    return {
      comment: '',
      userId: '',
      userName: '',
      comments: {},
      baseUrl: '/nova-vendor/comments/comments',
      url: '',
      pagination: [],
      per_page: '',
      showOnlyMyComments: ''
    };
  },


  methods: {
    initProperties: function initProperties() {
      this.url = this.baseUrl;
      this.per_page = this.panel.fields[0].per_page === undefined ? this.per_page = 5 : this.per_page = this.panel.fields[0].per_page;
      this.userId = Nova.config.user.id;
      this.userName = Nova.config.user.name;
      this.userCompanyId = Nova.config.user.company_id || null;
      this.showOnlyMyComments = this.panel.fields[0].showOnlyMyComments === undefined ? false : this.panel.fields[0].showOnlyMyComments;
    },
    applyShowOnlyMyComments: function applyShowOnlyMyComments() {
      this.showOnlyMyComments = !this.showOnlyMyComments;
      this.fetchPaginateComments(this.baseUrl);
    },
    fetchPaginateComments: function fetchPaginateComments(url) {
      this.url = url;
      this.getComments();
    },
    getComments: function getComments() {
      var _this = this;

      axios.get(this.url, {
        params: {
          resourceName: this.resourceName,
          resourceId: this.resourceId,
          per_page: this.per_page,
          showOnlyMyComments: this.showOnlyMyComments
        } }).then(function (response) {
        _this.comments = response.data;
        _this.pagination = response.data;
      }).catch(function (error) {
        _this.$toasted.show(error, { type: 'error' });
      });
    },
    makepagination: function makepagination(data) {
      return {
        current_page: data.current_page,
        last_page: data.last_page,
        next_page_url: data.next_page_url,
        prev_page_url: data.prev_page_url,
        from: data.from,
        to: data.to,
        total: total
      };
    },
    saveComment: function saveComment() {
      var _this2 = this;

      if (this.isEmpty(this.comment)) {
        this.$toasted.show('Write your comment before saving', { type: 'error' });
      } else {
        var comment = this.getComment();
        axios.post(this.baseUrl, comment).then(function (response) {
          _this2.resetComment();
          _this2.$toasted.show('Comment was added!', { type: 'success' });
          _this2.fetchPaginateComments(_this2.baseUrl);
        }).catch(function (error) {
          _this2.$toasted.show(error, { type: 'error' });
        });
      }
    },
    getComment: function getComment() {
      return {
        resourceId: this.resourceId,
        resourceName: this.resourceName,
        company_id: this.userCompanyId,
        user_id: this.userId,
        username: this.userName,
        text: this.comment
      };
    },
    deleteComment: function deleteComment(id) {
      var _this3 = this;

      axios.delete(this.baseUrl + '/' + id).then(function (response) {
        _this3.$toasted.show('Comment was deleted!', { type: 'success' });
        _this3.fetchPaginateComments(_this3.baseUrl);
      }).catch(function (error) {
        _this3.$toasted.show(error, { type: 'error' });
      });
    },
    isEmpty: function isEmpty(value) {
      return value === undefined || value == null || value.length <= 0 ? true : false;
    },
    resetComment: function resetComment() {
      this.comment = '';
    },
    formatDate: function formatDate(created_at) {
      return moment(created_at).format('llll');
    },
    getClassForPreviusNext: function getClassForPreviusNext(value) {
      var textColor = value ? 'text-primary' : 'text-gray';
      return 'btn btn-link btn-border-none py-3 px-4 dim ' + textColor;
    },
    showPagination: function showPagination() {
      if (this.pagination.total === undefined || this.pagination.total === 0) {
        return false;
      }

      return true;
    }
  }

});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("div", { staticClass: "flex justify-between pb-4 border-b border-40" }, [
      _c("h1", { staticClass: "flex-no-shrink text-90 font-normal text-2xl" }, [
        _vm._v("\n      Comments \n      "),
        _c(
          "span",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.pagination.total !== undefined,
                expression: "pagination.total !== undefined"
              }
            ]
          },
          [_vm._v(" \n        (" + _vm._s(_vm.pagination.total) + ") \n      ")]
        )
      ]),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass:
            "btn btn-default btn-primary inline-flex items-center relative",
          attrs: { type: "submit" },
          on: {
            click: function($event) {
              $event.preventDefault()
              return _vm.saveComment($event)
            }
          }
        },
        [_vm._v("\n        Save Comment\n    ")]
      )
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "card" }, [
      _c(
        "div",
        { staticClass: "card mb-6 py-3 px-6" },
        [
          _c("div", { staticClass: "flex justify-between" }, [
            _c("h4", { staticClass: "font-normal text-80" }, [
              _vm._v("\n            Write new comment\n          ")
            ]),
            _vm._v(" "),
            _c("div", [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.showOnlyMyComments,
                    expression: "showOnlyMyComments"
                  }
                ],
                attrs: { type: "checkbox", id: "showOnlyMyComments" },
                domProps: {
                  checked: Array.isArray(_vm.showOnlyMyComments)
                    ? _vm._i(_vm.showOnlyMyComments, null) > -1
                    : _vm.showOnlyMyComments
                },
                on: {
                  click: function($event) {
                    return _vm.applyShowOnlyMyComments()
                  },
                  change: function($event) {
                    var $$a = _vm.showOnlyMyComments,
                      $$el = $event.target,
                      $$c = $$el.checked ? true : false
                    if (Array.isArray($$a)) {
                      var $$v = null,
                        $$i = _vm._i($$a, $$v)
                      if ($$el.checked) {
                        $$i < 0 && (_vm.showOnlyMyComments = $$a.concat([$$v]))
                      } else {
                        $$i > -1 &&
                          (_vm.showOnlyMyComments = $$a
                            .slice(0, $$i)
                            .concat($$a.slice($$i + 1)))
                      }
                    } else {
                      _vm.showOnlyMyComments = $$c
                    }
                  }
                }
              }),
              _vm._v(" "),
              _c(
                "label",
                {
                  staticClass: "font-normal text-80",
                  attrs: { for: "showOnlyMyComments" }
                },
                [_vm._v("Show Only My Comments")]
              ),
              _c("br")
            ])
          ]),
          _vm._v(" "),
          _c("textarea", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.comment,
                expression: "comment"
              }
            ],
            staticClass:
              "w-full form-control form-input form-input-bordered py-3 h-auto mt-2 mb-2",
            attrs: { id: "commenter", dusk: "commenter", rows: "5" },
            domProps: { value: _vm.comment },
            on: {
              keyup: function($event) {
                if (!$event.type.indexOf("key") && $event.keyCode !== 13) {
                  return null
                }
                if (!$event.ctrlKey) {
                  return null
                }
                return _vm.saveComment($event)
              },
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.comment = $event.target.value
              }
            }
          }),
          _vm._v(" "),
          _c("div", { staticClass: "help-text" }, [
            _vm._v(
              "\n            On MacOS, press ⌘ + Enter, on Windows press Ctrl + Enter to save\n        "
            )
          ]),
          _vm._v(" "),
          _vm._l(_vm.comments.data, function(comment) {
            return _c("div", { key: comment.id }, [
              _c(
                "div",
                { staticClass: "commenter__comment py-4 border-t border-40" },
                [
                  _c("div", { staticClass: "font-light text-80 text-sm" }, [
                    _c(
                      "a",
                      {
                        staticClass: "no-underline dim text-primary font-bold",
                        attrs: { href: "/nova/resources/users/" + _vm.userId }
                      },
                      [
                        _vm._v(
                          "\n                  " +
                            _vm._s(comment.username) +
                            "  \n                "
                        )
                      ]
                    ),
                    _vm._v(" "),
                    _c("span", { staticClass: "mr-1" }, [
                      _vm._v(
                        " said on " +
                          _vm._s(_vm.formatDate(comment.created_at)) +
                          " "
                      )
                    ]),
                    _vm._v(" "),
                    _c(
                      "span",
                      {
                        staticClass: "mr-2 cursor-pointer",
                        on: {
                          click: function($event) {
                            return _vm.deleteComment(comment.id)
                          }
                        }
                      },
                      [
                        _c(
                          "svg",
                          {
                            staticClass: "fill-current text-80",
                            attrs: {
                              xmlns: "http://www.w3.org/2000/svg",
                              width: "14",
                              height: "14",
                              viewBox: "0 0 20 20",
                              "aria-labelledby": "delete",
                              role: "presentation"
                            }
                          },
                          [
                            _c("path", {
                              attrs: {
                                "fill-rule": "nonzero",
                                d:
                                  "M6 4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2h5a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6H1a1 1 0 1 1 0-2h5zM4 6v12h12V6H4zm8-2V2H8v2h4zM8 8a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1z"
                              }
                            })
                          ]
                        )
                      ]
                    )
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "mt-2" }, [
                    _vm._v(
                      "\n              " +
                        _vm._s(comment.text) +
                        "\n            "
                    )
                  ])
                ]
              )
            ])
          })
        ],
        2
      ),
      _vm._v(" "),
      _c(
        "nav",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.showPagination(),
              expression: "showPagination()"
            }
          ],
          staticClass: "flex justify-between items-center bg-20 rounded-b"
        },
        [
          _c(
            "button",
            {
              class: _vm.getClassForPreviusNext(_vm.pagination.prev_page_url),
              attrs: { disabled: !_vm.pagination.prev_page_url },
              on: {
                click: function($event) {
                  return _vm.fetchPaginateComments(_vm.pagination.prev_page_url)
                }
              }
            },
            [_vm._v("\n            Previous\n        ")]
          ),
          _vm._v(" "),
          _c("span", { staticClass: "text-sm text-80 px-4" }, [
            _vm._v(
              " " +
                _vm._s(_vm.pagination.from) +
                "-" +
                _vm._s(_vm.pagination.to) +
                " of " +
                _vm._s(_vm.pagination.total)
            )
          ]),
          _vm._v(" "),
          _c(
            "button",
            {
              class: _vm.getClassForPreviusNext(_vm.pagination.next_page_url),
              attrs: { disabled: !_vm.pagination.next_page_url },
              on: {
                click: function($event) {
                  return _vm.fetchPaginateComments(_vm.pagination.next_page_url)
                }
              }
            },
            [_vm._v("\n            Next\n        ")]
          )
        ]
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-68ff5483", module.exports)
  }
}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);