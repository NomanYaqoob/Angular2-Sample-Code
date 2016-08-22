"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var form_component_1 = require("./forms/form.component");
var http_component_1 = require("./http/http.component");
var YoutubeSearchComponent_1 = require("./YoutubeSearchCmp/YoutubeSearchComponent");
var $;
var AppComponent = (function () {
    function AppComponent() {
        this.state = 'active';
    }
    AppComponent.prototype.clicked = function () {
        this.myCSSObject = "{'background-color':'red','font-size':'18px}";
        setTimeout(function () {
            $('.head').addClass('magictime tinRightOut');
            setTimeout(function () {
                $('.head').removeClass("tinRightOut");
                $('.head').addClass('tinRightIn');
                setTimeout(function () {
                    $('.head').removeClass('tinRightIn');
                }, 1000);
            }, 1000);
        }, 0);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            templateUrl: "./app/app.component.html",
            directives: [form_component_1.FormCmp, http_component_1.HttpCmp, YoutubeSearchComponent_1.YouTubeSearchComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map