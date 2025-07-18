import {
  animate,
  sequence,
  state,
  style,
  transition,
  trigger
} from "./chunk-KGUSKD2Z.js";
import {
  DomSanitizer
} from "./chunk-ZWDLJ3FO.js";
import "./chunk-UOAWRUG2.js";
import "./chunk-KIBBLSJG.js";
import {
  NgForOf,
  NgIf
} from "./chunk-4GFUWGZZ.js";
import {
  DOCUMENT
} from "./chunk-S6KMFTFV.js";
import {
  ANIMATION_MODULE_TYPE,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Injectable,
  InjectionToken,
  Input,
  NgModule,
  Optional,
  Pipe,
  RendererFactory2,
  RuntimeError,
  ViewChild,
  ViewEncapsulation,
  inject,
  makeEnvironmentProviders,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdefinePipe,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵinject,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵsanitizeHtml,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵviewQuery
} from "./chunk-LTSEW744.js";
import "./chunk-NZN5AKWE.js";
import "./chunk-XYJ3Z5FP.js";
import {
  BehaviorSubject,
  Subject,
  filter,
  takeUntil
} from "./chunk-HEDKW4S6.js";
import "./chunk-7IZRYL2Z.js";
import {
  __publicField,
  __spreadProps,
  __spreadValues
} from "./chunk-HLNXGIF7.js";

// node_modules/@angular/animations/fesm2022/animations.mjs
var _AnimationBuilder = class _AnimationBuilder {
};
__publicField(_AnimationBuilder, "ɵfac", function AnimationBuilder_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AnimationBuilder)();
});
__publicField(_AnimationBuilder, "ɵprov", ɵɵdefineInjectable({
  token: _AnimationBuilder,
  factory: () => (() => inject(BrowserAnimationBuilder))(),
  providedIn: "root"
}));
var AnimationBuilder = _AnimationBuilder;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AnimationBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root",
      useFactory: () => inject(BrowserAnimationBuilder)
    }]
  }], null, null);
})();
var AnimationFactory = class {
};
var _BrowserAnimationBuilder = class _BrowserAnimationBuilder extends AnimationBuilder {
  animationModuleType = inject(ANIMATION_MODULE_TYPE, {
    optional: true
  });
  _nextAnimationId = 0;
  _renderer;
  constructor(rootRenderer, doc) {
    super();
    const typeData = {
      id: "0",
      encapsulation: ViewEncapsulation.None,
      styles: [],
      data: {
        animation: []
      }
    };
    this._renderer = rootRenderer.createRenderer(doc.body, typeData);
    if (this.animationModuleType === null && !isAnimationRenderer(this._renderer)) {
      throw new RuntimeError(3600, (typeof ngDevMode === "undefined" || ngDevMode) && "Angular detected that the `AnimationBuilder` was injected, but animation support was not enabled. Please make sure that you enable animations in your application by calling `provideAnimations()` or `provideAnimationsAsync()` function.");
    }
  }
  build(animation2) {
    const id = this._nextAnimationId;
    this._nextAnimationId++;
    const entry = Array.isArray(animation2) ? sequence(animation2) : animation2;
    issueAnimationCommand(this._renderer, null, id, "register", [entry]);
    return new BrowserAnimationFactory(id, this._renderer);
  }
};
__publicField(_BrowserAnimationBuilder, "ɵfac", function BrowserAnimationBuilder_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _BrowserAnimationBuilder)(ɵɵinject(RendererFactory2), ɵɵinject(DOCUMENT));
});
__publicField(_BrowserAnimationBuilder, "ɵprov", ɵɵdefineInjectable({
  token: _BrowserAnimationBuilder,
  factory: _BrowserAnimationBuilder.ɵfac,
  providedIn: "root"
}));
var BrowserAnimationBuilder = _BrowserAnimationBuilder;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BrowserAnimationBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: RendererFactory2
  }, {
    type: Document,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }], null);
})();
var BrowserAnimationFactory = class extends AnimationFactory {
  _id;
  _renderer;
  constructor(_id, _renderer) {
    super();
    this._id = _id;
    this._renderer = _renderer;
  }
  create(element, options) {
    return new RendererAnimationPlayer(this._id, element, options || {}, this._renderer);
  }
};
var RendererAnimationPlayer = class {
  id;
  element;
  _renderer;
  parentPlayer = null;
  _started = false;
  constructor(id, element, options, _renderer) {
    this.id = id;
    this.element = element;
    this._renderer = _renderer;
    this._command("create", options);
  }
  _listen(eventName, callback) {
    return this._renderer.listen(this.element, `@@${this.id}:${eventName}`, callback);
  }
  _command(command, ...args) {
    issueAnimationCommand(this._renderer, this.element, this.id, command, args);
  }
  onDone(fn) {
    this._listen("done", fn);
  }
  onStart(fn) {
    this._listen("start", fn);
  }
  onDestroy(fn) {
    this._listen("destroy", fn);
  }
  init() {
    this._command("init");
  }
  hasStarted() {
    return this._started;
  }
  play() {
    this._command("play");
    this._started = true;
  }
  pause() {
    this._command("pause");
  }
  restart() {
    this._command("restart");
  }
  finish() {
    this._command("finish");
  }
  destroy() {
    this._command("destroy");
  }
  reset() {
    this._command("reset");
    this._started = false;
  }
  setPosition(p) {
    this._command("setPosition", p);
  }
  getPosition() {
    var _a, _b, _c, _d;
    return (_d = (_c = (_b = (_a = unwrapAnimationRenderer(this._renderer)) == null ? void 0 : _a.engine) == null ? void 0 : _b.players[this.id]) == null ? void 0 : _c.getPosition()) != null ? _d : 0;
  }
  totalTime = 0;
};
function issueAnimationCommand(renderer, element, id, command, args) {
  renderer.setProperty(element, `@@${id}:${command}`, args);
}
function unwrapAnimationRenderer(renderer) {
  const type = renderer.ɵtype;
  if (type === 0) {
    return renderer;
  } else if (type === 1) {
    return renderer.animationRenderer;
  }
  return null;
}
function isAnimationRenderer(renderer) {
  const type = renderer.ɵtype;
  return type === 0 || type === 1;
}

// node_modules/ngx-spinner/fesm2022/ngx-spinner.mjs
var _c0 = ["overlay"];
var _c1 = ["*"];
function NgxSpinnerComponent_div_0_div_2_div_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "div");
  }
}
function NgxSpinnerComponent_div_0_div_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div");
    ɵɵtemplate(1, NgxSpinnerComponent_div_0_div_2_div_1_Template, 1, 0, "div", 6);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵclassMap(ctx_r0.spinner.class);
    ɵɵstyleProp("color", ctx_r0.spinner.color);
    ɵɵadvance();
    ɵɵproperty("ngForOf", ctx_r0.spinner.divArray);
  }
}
function NgxSpinnerComponent_div_0_div_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "div", 7);
    ɵɵpipe(1, "safeHtml");
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵproperty("innerHTML", ɵɵpipeBind1(1, 1, ctx_r0.template), ɵɵsanitizeHtml);
  }
}
function NgxSpinnerComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 2, 0);
    ɵɵtemplate(2, NgxSpinnerComponent_div_0_div_2_Template, 2, 5, "div", 3)(3, NgxSpinnerComponent_div_0_div_3_Template, 2, 3, "div", 4);
    ɵɵelementStart(4, "div", 5);
    ɵɵprojection(5);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵstyleProp("background-color", ctx_r0.spinner.bdColor)("z-index", ctx_r0.spinner.zIndex)("position", ctx_r0.spinner.fullScreen ? "fixed" : "absolute");
    ɵɵproperty("@.disabled", ctx_r0.disableAnimation)("@fadeIn", "in");
    ɵɵadvance(2);
    ɵɵproperty("ngIf", !ctx_r0.template);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r0.template);
    ɵɵadvance();
    ɵɵstyleProp("z-index", ctx_r0.spinner.zIndex);
  }
}
var LOADERS = {
  "ball-8bits": 16,
  "ball-atom": 4,
  "ball-beat": 3,
  "ball-circus": 5,
  "ball-climbing-dot": 4,
  "ball-clip-rotate": 1,
  "ball-clip-rotate-multiple": 2,
  "ball-clip-rotate-pulse": 2,
  "ball-elastic-dots": 5,
  "ball-fall": 3,
  "ball-fussion": 4,
  "ball-grid-beat": 9,
  "ball-grid-pulse": 9,
  "ball-newton-cradle": 4,
  "ball-pulse": 3,
  "ball-pulse-rise": 5,
  "ball-pulse-sync": 3,
  "ball-rotate": 1,
  "ball-running-dots": 5,
  "ball-scale": 1,
  "ball-scale-multiple": 3,
  "ball-scale-pulse": 2,
  "ball-scale-ripple": 1,
  "ball-scale-ripple-multiple": 3,
  "ball-spin": 8,
  "ball-spin-clockwise": 8,
  "ball-spin-clockwise-fade": 8,
  "ball-spin-clockwise-fade-rotating": 8,
  "ball-spin-fade": 8,
  "ball-spin-fade-rotating": 8,
  "ball-spin-rotate": 2,
  "ball-square-clockwise-spin": 8,
  "ball-square-spin": 8,
  "ball-triangle-path": 3,
  "ball-zig-zag": 2,
  "ball-zig-zag-deflect": 2,
  cog: 1,
  "cube-transition": 2,
  fire: 3,
  "line-scale": 5,
  "line-scale-party": 5,
  "line-scale-pulse-out": 5,
  "line-scale-pulse-out-rapid": 5,
  "line-spin-clockwise-fade": 8,
  "line-spin-clockwise-fade-rotating": 8,
  "line-spin-fade": 8,
  "line-spin-fade-rotating": 8,
  pacman: 6,
  "square-jelly-box": 2,
  "square-loader": 1,
  "square-spin": 1,
  timer: 1,
  "triangle-skew-spin": 1
};
var DEFAULTS = {
  BD_COLOR: "rgba(51,51,51,0.8)",
  SPINNER_COLOR: "#fff",
  Z_INDEX: 99999
};
var PRIMARY_SPINNER = "primary";
var NgxSpinner = class _NgxSpinner {
  constructor(init) {
    Object.assign(this, init);
  }
  static create(init) {
    if (!(init == null ? void 0 : init.template) && !(init == null ? void 0 : init.type)) {
      console.warn(`[ngx-spinner]: Property "type" is missed. Please, provide animation type to <ngx-spinner> component
        and ensure css is added to angular.json file`);
    }
    return new _NgxSpinner(init);
  }
};
var _NgxSpinnerService = class _NgxSpinnerService {
  /**
   * Creates an instance of NgxSpinnerService.
   * @memberof NgxSpinnerService
   */
  constructor() {
    this.spinnerObservable = new BehaviorSubject(null);
  }
  /**
   * Get subscription of desired spinner
   * @memberof NgxSpinnerService
   **/
  getSpinner(name) {
    return this.spinnerObservable.asObservable().pipe(filter((x) => x && x.name === name));
  }
  /**
   * To show spinner
   *
   * @memberof NgxSpinnerService
   */
  show(name = PRIMARY_SPINNER, spinner) {
    return new Promise((resolve, _reject) => {
      setTimeout(() => {
        if (spinner && Object.keys(spinner).length) {
          spinner["name"] = name;
          this.spinnerObservable.next(new NgxSpinner(__spreadProps(__spreadValues({}, spinner), {
            show: true
          })));
          resolve(true);
        } else {
          this.spinnerObservable.next(new NgxSpinner({
            name,
            show: true
          }));
          resolve(true);
        }
      }, 10);
    });
  }
  /**
   * To hide spinner
   *
   * @memberof NgxSpinnerService
   */
  hide(name = PRIMARY_SPINNER, debounce = 10) {
    return new Promise((resolve, _reject) => {
      setTimeout(() => {
        this.spinnerObservable.next(new NgxSpinner({
          name,
          show: false
        }));
        resolve(true);
      }, debounce);
    });
  }
};
_NgxSpinnerService.ɵfac = function NgxSpinnerService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgxSpinnerService)();
};
_NgxSpinnerService.ɵprov = ɵɵdefineInjectable({
  token: _NgxSpinnerService,
  factory: _NgxSpinnerService.ɵfac,
  providedIn: "root"
});
var NgxSpinnerService = _NgxSpinnerService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxSpinnerService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var NGX_SPINNER_CONFIG = new InjectionToken("NGX_SPINNER_CONFIG");
var _SafeHtmlPipe = class _SafeHtmlPipe {
  constructor(sanitizer) {
    this.sanitizer = sanitizer;
  }
  transform(value) {
    return value ? this.sanitizer.bypassSecurityTrustHtml(value) : "";
  }
};
_SafeHtmlPipe.ɵfac = function SafeHtmlPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _SafeHtmlPipe)(ɵɵdirectiveInject(DomSanitizer, 16));
};
_SafeHtmlPipe.ɵpipe = ɵɵdefinePipe({
  name: "safeHtml",
  type: _SafeHtmlPipe,
  pure: true
});
var SafeHtmlPipe = _SafeHtmlPipe;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SafeHtmlPipe, [{
    type: Pipe,
    args: [{
      name: "safeHtml",
      standalone: true
    }]
  }], () => [{
    type: DomSanitizer
  }], null);
})();
var _NgxSpinnerComponent = class _NgxSpinnerComponent {
  // TODO: https://github.com/Napster2210/ngx-spinner/issues/259
  // @HostListener("document:keydown", ["$event"])
  // handleKeyboardEvent(event: KeyboardEvent) {
  //   if (this.spinnerDOM && this.spinnerDOM.nativeElement) {
  //     if (
  //       this.fullScreen ||
  //       (!this.fullScreen && this.isSpinnerZone(event.target))
  //     ) {
  //       event.returnValue = false;
  //       event.preventDefault();
  //     }
  //   }
  // }
  /**
   * Creates an instance of NgxSpinnerComponent.
   *
   * @memberof NgxSpinnerComponent
   */
  constructor(spinnerService, changeDetector, elementRef, globalConfig) {
    this.spinnerService = spinnerService;
    this.changeDetector = changeDetector;
    this.elementRef = elementRef;
    this.globalConfig = globalConfig;
    this.disableAnimation = false;
    this.spinner = new NgxSpinner();
    this.ngUnsubscribe = new Subject();
    this.setDefaultOptions = () => {
      var _a, _b;
      const {
        type
      } = (_a = this.globalConfig) != null ? _a : {};
      this.spinner = NgxSpinner.create({
        name: this.name,
        bdColor: this.bdColor,
        size: this.size,
        color: this.color,
        type: (_b = this.type) != null ? _b : type,
        fullScreen: this.fullScreen,
        divArray: this.divArray,
        divCount: this.divCount,
        show: this.show,
        zIndex: this.zIndex,
        template: this.template,
        showSpinner: this.showSpinner
      });
    };
    this.bdColor = DEFAULTS.BD_COLOR;
    this.zIndex = DEFAULTS.Z_INDEX;
    this.color = DEFAULTS.SPINNER_COLOR;
    this.size = "large";
    this.fullScreen = true;
    this.name = PRIMARY_SPINNER;
    this.template = null;
    this.showSpinner = false;
    this.divArray = [];
    this.divCount = 0;
    this.show = false;
  }
  initObservable() {
    this.spinnerService.getSpinner(this.name).pipe(takeUntil(this.ngUnsubscribe)).subscribe((spinner) => {
      this.setDefaultOptions();
      Object.assign(this.spinner, spinner);
      if (spinner.show) {
        this.onInputChange();
      }
      this.changeDetector.detectChanges();
    });
  }
  /**
   * Initialization method
   *
   * @memberof NgxSpinnerComponent
   */
  ngOnInit() {
    this.setDefaultOptions();
    this.initObservable();
  }
  /**
   * To check event triggers inside the Spinner Zone
   *
   * @param {*} element
   * @returns {boolean}
   * @memberof NgxSpinnerComponent
   */
  isSpinnerZone(element) {
    if (element === this.elementRef.nativeElement.parentElement) {
      return true;
    }
    return element.parentNode && this.isSpinnerZone(element.parentNode);
  }
  /**
   * On changes event for input variables
   *
   * @memberof NgxSpinnerComponent
   */
  ngOnChanges(changes) {
    for (const propName in changes) {
      if (propName) {
        const changedProp = changes[propName];
        if (changedProp.isFirstChange()) {
          return;
        } else if (typeof changedProp.currentValue !== "undefined" && changedProp.currentValue !== changedProp.previousValue) {
          if (changedProp.currentValue !== "") {
            this.spinner[propName] = changedProp.currentValue;
            if (propName === "showSpinner") {
              if (changedProp.currentValue) {
                this.spinnerService.show(this.spinner.name, this.spinner);
              } else {
                this.spinnerService.hide(this.spinner.name);
              }
            }
            if (propName === "name") {
              this.initObservable();
            }
          }
        }
      }
    }
  }
  /**
   * To get class for spinner
   *
   * @memberof NgxSpinnerComponent
   */
  getClass(type, size) {
    this.spinner.divCount = LOADERS[type];
    this.spinner.divArray = Array(this.spinner.divCount).fill(0).map((_, i) => i);
    let sizeClass = "";
    switch (size.toLowerCase()) {
      case "small":
        sizeClass = "la-sm";
        break;
      case "medium":
        sizeClass = "la-2x";
        break;
      case "large":
        sizeClass = "la-3x";
        break;
      default:
        break;
    }
    return "la-" + type + " " + sizeClass;
  }
  /**
   * Check if input variables have changed
   *
   * @memberof NgxSpinnerComponent
   */
  onInputChange() {
    this.spinner.class = this.getClass(this.spinner.type, this.spinner.size);
  }
  /**
   * Component destroy event
   *
   * @memberof NgxSpinnerComponent
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
};
_NgxSpinnerComponent.ɵfac = function NgxSpinnerComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgxSpinnerComponent)(ɵɵdirectiveInject(NgxSpinnerService), ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NGX_SPINNER_CONFIG, 8));
};
_NgxSpinnerComponent.ɵcmp = ɵɵdefineComponent({
  type: _NgxSpinnerComponent,
  selectors: [["ngx-spinner"]],
  viewQuery: function NgxSpinnerComponent_Query(rf, ctx) {
    if (rf & 1) {
      ɵɵviewQuery(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.spinnerDOM = _t.first);
    }
  },
  inputs: {
    bdColor: "bdColor",
    size: "size",
    color: "color",
    type: "type",
    fullScreen: "fullScreen",
    name: "name",
    zIndex: "zIndex",
    template: "template",
    showSpinner: "showSpinner",
    disableAnimation: "disableAnimation"
  },
  features: [ɵɵNgOnChangesFeature],
  ngContentSelectors: _c1,
  decls: 1,
  vars: 1,
  consts: [["overlay", ""], ["class", "ngx-spinner-overlay", 3, "background-color", "z-index", "position", 4, "ngIf"], [1, "ngx-spinner-overlay"], [3, "class", "color", 4, "ngIf"], [3, "innerHTML", 4, "ngIf"], [1, "loading-text"], [4, "ngFor", "ngForOf"], [3, "innerHTML"]],
  template: function NgxSpinnerComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵtemplate(0, NgxSpinnerComponent_div_0_Template, 6, 12, "div", 1);
    }
    if (rf & 2) {
      ɵɵproperty("ngIf", ctx.spinner.show);
    }
  },
  dependencies: [SafeHtmlPipe, NgIf, NgForOf],
  styles: [".ngx-spinner-overlay[_ngcontent-%COMP%]{position:fixed;top:0;left:0;width:100%;height:100%}.ngx-spinner-overlay[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:not(.loading-text){top:50%;left:50%;margin:0;position:absolute;transform:translate(-50%,-50%)}.loading-text[_ngcontent-%COMP%]{position:absolute;top:60%;left:50%;transform:translate(-50%,-60%)}"],
  data: {
    animation: [trigger("fadeIn", [state("in", style({
      opacity: 1
    })), transition(":enter", [style({
      opacity: 0
    }), animate(300)]), transition(":leave", animate(200, style({
      opacity: 0
    })))])]
  },
  changeDetection: 0
});
var NgxSpinnerComponent = _NgxSpinnerComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxSpinnerComponent, [{
    type: Component,
    args: [{
      imports: [SafeHtmlPipe, NgIf, NgForOf],
      selector: "ngx-spinner",
      changeDetection: ChangeDetectionStrategy.OnPush,
      animations: [trigger("fadeIn", [state("in", style({
        opacity: 1
      })), transition(":enter", [style({
        opacity: 0
      }), animate(300)]), transition(":leave", animate(200, style({
        opacity: 0
      })))])],
      template: `<div
  [@.disabled]="disableAnimation"
  [@fadeIn]="'in'"
  *ngIf="spinner.show"
  class="ngx-spinner-overlay"
  [style.background-color]="spinner.bdColor"
  [style.z-index]="spinner.zIndex"
  [style.position]="spinner.fullScreen ? 'fixed' : 'absolute'"
  #overlay
>
  <div *ngIf="!template" [class]="spinner.class" [style.color]="spinner.color">
    <div *ngFor="let index of spinner.divArray"></div>
  </div>
  <div *ngIf="template" [innerHTML]="template | safeHtml"></div>
  <div class="loading-text" [style.z-index]="spinner.zIndex">
    <ng-content></ng-content>
  </div>
</div>
`,
      styles: [".ngx-spinner-overlay{position:fixed;top:0;left:0;width:100%;height:100%}.ngx-spinner-overlay>div:not(.loading-text){top:50%;left:50%;margin:0;position:absolute;transform:translate(-50%,-50%)}.loading-text{position:absolute;top:60%;left:50%;transform:translate(-50%,-60%)}\n"]
    }]
  }], () => [{
    type: NgxSpinnerService
  }, {
    type: ChangeDetectorRef
  }, {
    type: ElementRef
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [NGX_SPINNER_CONFIG]
    }]
  }], {
    bdColor: [{
      type: Input
    }],
    size: [{
      type: Input
    }],
    color: [{
      type: Input
    }],
    type: [{
      type: Input
    }],
    fullScreen: [{
      type: Input
    }],
    name: [{
      type: Input
    }],
    zIndex: [{
      type: Input
    }],
    template: [{
      type: Input
    }],
    showSpinner: [{
      type: Input
    }],
    disableAnimation: [{
      type: Input
    }],
    spinnerDOM: [{
      type: ViewChild,
      args: ["overlay"]
    }]
  });
})();
var _NgxSpinnerModule = class _NgxSpinnerModule {
  static forRoot(config) {
    return {
      ngModule: _NgxSpinnerModule,
      providers: [{
        provide: NGX_SPINNER_CONFIG,
        useValue: config
      }]
    };
  }
};
_NgxSpinnerModule.ɵfac = function NgxSpinnerModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgxSpinnerModule)();
};
_NgxSpinnerModule.ɵmod = ɵɵdefineNgModule({
  type: _NgxSpinnerModule,
  imports: [NgxSpinnerComponent, SafeHtmlPipe],
  exports: [NgxSpinnerComponent]
});
_NgxSpinnerModule.ɵinj = ɵɵdefineInjector({});
var NgxSpinnerModule = _NgxSpinnerModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxSpinnerModule, [{
    type: NgModule,
    args: [{
      imports: [NgxSpinnerComponent, SafeHtmlPipe],
      exports: [NgxSpinnerComponent]
    }]
  }], null, null);
})();
var provideSpinnerConfig = (config) => {
  const providers = [{
    provide: NGX_SPINNER_CONFIG,
    useValue: config
  }];
  return makeEnvironmentProviders(providers);
};
export {
  DEFAULTS,
  LOADERS,
  NgxSpinner,
  NgxSpinnerComponent,
  NgxSpinnerModule,
  NgxSpinnerService,
  PRIMARY_SPINNER,
  provideSpinnerConfig
};
/*! Bundled license information:

@angular/animations/fesm2022/animations.mjs:
  (**
   * @license Angular v19.2.13
   * (c) 2010-2025 Google LLC. https://angular.io/
   * License: MIT
   *)
*/
//# sourceMappingURL=ngx-spinner.js.map
