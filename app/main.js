"use strict";
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var app_component_1 = require("./app.component");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var YoutubeSearchComponent_1 = require("./YoutubeSearchCmp/YoutubeSearchComponent");
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [forms_1.provideForms(), YoutubeSearchComponent_1.youTubeServiceInjectables, http_1.HTTP_PROVIDERS]).catch(function (err) {
    console.error("err", err);
});
//# sourceMappingURL=main.js.map