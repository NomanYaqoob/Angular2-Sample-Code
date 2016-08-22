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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
// import * as Rx from "rxjs/observable"
var YOUTUBE_API_KEY = "AIzaSyAnqjz5Cl8J3quOwZG5ESo7RLGakSUNdxM";
var YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/search";
// let loadingGif: string = ((<any>window).__karma__) ? '' : require('../images/loading.gif');
var SearchResult = (function () {
    function SearchResult(obj) {
        this.id = obj && obj.id || null;
        this.title = obj && obj.title || null;
        this.description = obj && obj.description || null;
        this.thumbnailUrl = obj && obj.thumbnailUrl || null;
        this.videoUrl = obj && obj.videoUrl ||
            "https://www.youtube.com/watch?v=" + this.id;
    }
    return SearchResult;
}());
var YouTubeService = (function () {
    function YouTubeService(http, apiKey, apiUrl) {
        this.http = http;
        this.apiKey = apiKey;
        this.apiUrl = apiUrl;
    }
    YouTubeService.prototype.search = function (query) {
        var params = [
            ("q=" + query),
            ("key=" + this.apiKey),
            "part=snippet",
            "type=video",
            "maxResults=10"
        ].join('&');
        var queryUrl = this.apiUrl + "?" + params;
        return this.http.get(queryUrl)
            .map(function (response) {
            return response.json().items.map(function (item) {
                console.log("raw item", item); // uncomment if you want to debug
                return new SearchResult({
                    id: item.id.videoId,
                    title: item.snippet.title,
                    description: item.snippet.description,
                    thumbnailUrl: item.snippet.thumbnails.high.url
                });
            });
        });
    };
    YouTubeService = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Inject(YOUTUBE_API_KEY)),
        __param(2, core_1.Inject(YOUTUBE_API_URL)), 
        __metadata('design:paramtypes', [http_1.Http, String, String])
    ], YouTubeService);
    return YouTubeService;
}());
exports.YouTubeService = YouTubeService;
exports.youTubeServiceInjectables = [
    core_1.bind(YouTubeService).toClass(YouTubeService),
    core_1.bind(YOUTUBE_API_KEY).toValue(YOUTUBE_API_KEY),
    core_1.bind(YOUTUBE_API_URL).toValue(YOUTUBE_API_URL)
];
var SearchBox = (function () {
    function SearchBox(youtube, el) {
        this.youtube = youtube;
        this.el = el;
        this.loading = new core_1.EventEmitter();
        this.results = new core_1.EventEmitter();
    }
    SearchBox.prototype.ngOnInit = function () {
        var _this = this;
        Rx_1.Observable.fromEvent(this.el.nativeElement, 'keyup')
            .map(function (e) { return e.target.value; })
            .filter(function (text) { return text.length > 1; })
            .debounceTime(250)
            .do(function () { return _this.loading.next(true); })
            .map(function (query) { return _this.youtube.search(query); })
            .switch()
            .subscribe(function (results) {
            _this.loading.next(false);
            _this.results.next(results);
        }, function (err) {
            console.log("err", err);
            _this.loading.next(false);
        }, function () {
            _this.loading.next(false);
        });
    };
    SearchBox = __decorate([
        core_1.Component({
            selector: "search-box",
            outputs: ['loading', 'results'],
            template: "\n    <input type=\"text\" class=\"form-control\" placeholder=\"Search\" autofocus>\n    "
        }), 
        __metadata('design:paramtypes', [YouTubeService, core_1.ElementRef])
    ], SearchBox);
    return SearchBox;
}());
var SearchResultComponent = (function () {
    function SearchResultComponent() {
    }
    SearchResultComponent = __decorate([
        core_1.Component({
            inputs: ['result'],
            selector: 'search-result',
            template: "\n <div class=\"col-sm-6 col-md-3\">\n <div class=\"thumbnail\">\n <img src=\"{{result.thumbnailUrl}}\">\n <div class=\"caption\">\n <h3>{{result.title}}</h3>\n <p>{{result.description}}</p>\n <p><a href=\"{{result.videoUrl}}\"\n class=\"btn btn-default\" role=\"button\">Watch</a></p>\n </div>\n </div>\n </div>\n "
        }), 
        __metadata('design:paramtypes', [])
    ], SearchResultComponent);
    return SearchResultComponent;
}());
exports.SearchResultComponent = SearchResultComponent;
var YouTubeSearchComponent = (function () {
    function YouTubeSearchComponent() {
    }
    YouTubeSearchComponent.prototype.updateResults = function (results) {
        this.results = results;
        // console.log("results:", this.results); // uncomment to take a look
    };
    YouTubeSearchComponent = __decorate([
        core_1.Component({
            selector: 'youtube-search',
            directives: [SearchBox, SearchResultComponent],
            template: "\n <div class='container'>\n <div class=\"page-header\">\n <h1>YouTube Search\n <img\n style=\"float: right;\"\n *ngIf=\"loading\"\n src='' />\n </h1>\n </div>\n\n <div class=\"row\">\n <div class=\"input-group input-group-lg col-md-12\">\n <search-box\n (loading)=\"loading = $event\"\n (results)=\"updateResults($event)\"\n ></search-box>\n\n </div>\n </div>\n\n <div class=\"row\">\n <search-result\n *ngFor=\"let result of results\"\n [result]=\"result\">\n </search-result>\n </div>\n </div>\n "
        }), 
        __metadata('design:paramtypes', [])
    ], YouTubeSearchComponent);
    return YouTubeSearchComponent;
}());
exports.YouTubeSearchComponent = YouTubeSearchComponent;
//# sourceMappingURL=YoutubeSearchComponent.js.map