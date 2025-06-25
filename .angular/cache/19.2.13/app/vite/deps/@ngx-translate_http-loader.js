import {
  HttpClient
} from "./chunk-KIBBLSJG.js";
import "./chunk-S6KMFTFV.js";
import {
  Inject,
  Injectable,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-LTSEW744.js";
import "./chunk-NZN5AKWE.js";
import "./chunk-XYJ3Z5FP.js";
import "./chunk-HEDKW4S6.js";
import "./chunk-7IZRYL2Z.js";
import {
  __publicField
} from "./chunk-HLNXGIF7.js";

// node_modules/@ngx-translate/http-loader/fesm2022/ngx-translate-http-loader.mjs
var _TranslateHttpLoader = class _TranslateHttpLoader {
  http;
  prefix;
  suffix;
  constructor(http, prefix = "/assets/i18n/", suffix = ".json") {
    this.http = http;
    this.prefix = prefix;
    this.suffix = suffix;
  }
  /**
   * Gets the translations from the server
   */
  getTranslation(lang) {
    return this.http.get(`${this.prefix}${lang}${this.suffix}`);
  }
};
__publicField(_TranslateHttpLoader, "ɵfac", function TranslateHttpLoader_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _TranslateHttpLoader)(ɵɵinject(HttpClient), ɵɵinject(String), ɵɵinject(String));
});
__publicField(_TranslateHttpLoader, "ɵprov", ɵɵdefineInjectable({
  token: _TranslateHttpLoader,
  factory: _TranslateHttpLoader.ɵfac
}));
var TranslateHttpLoader = _TranslateHttpLoader;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TranslateHttpLoader, [{
    type: Injectable
  }], () => [{
    type: HttpClient
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [String]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [String]
    }]
  }], null);
})();
export {
  TranslateHttpLoader
};
//# sourceMappingURL=@ngx-translate_http-loader.js.map
