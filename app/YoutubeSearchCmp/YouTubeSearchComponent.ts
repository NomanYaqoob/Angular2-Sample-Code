import {Injectable, EventEmitter, Inject, bind, Component, OnInit, ElementRef} from "@angular/core"
import { Http, Response} from "@angular/http"
import {Observable} from "rxjs/Rx";
// import * as Rx from "rxjs/observable"


let YOUTUBE_API_KEY: string = "AIzaSyAnqjz5Cl8J3quOwZG5ESo7RLGakSUNdxM";
let YOUTUBE_API_URL: string = "https://www.googleapis.com/youtube/v3/search";
// let loadingGif: string = ((<any>window).__karma__) ? '' : require('../images/loading.gif');
class SearchResult {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    videoUrl: string;

    constructor(obj?: any) {
        this.id = obj && obj.id || null;
        this.title = obj && obj.title || null;
        this.description = obj && obj.description || null;
        this.thumbnailUrl = obj && obj.thumbnailUrl || null;
        this.videoUrl = obj && obj.videoUrl ||
            `https://www.youtube.com/watch?v=${this.id}`;
    }

}


@Injectable()
export class YouTubeService {
    constructor(public http: Http,
        @Inject(YOUTUBE_API_KEY) private apiKey: string,
        @Inject(YOUTUBE_API_URL) private apiUrl: string) {
    }

    search(query: string): Observable<SearchResult[]> {
        let params: string = [
            `q=${query}`,
            `key=${this.apiKey}`,
            `part=snippet`,
            `type=video`,
            `maxResults=10`
        ].join('&');
        let queryUrl: string = `${this.apiUrl}?${params}`;
        return this.http.get(queryUrl)
            .map((response: Response) => {
                return (<any>response.json()).items.map(item => {
                    console.log("raw item", item); // uncomment if you want to debug
                    return new SearchResult({
                        id: item.id.videoId,
                        title: item.snippet.title,
                        description: item.snippet.description,
                        thumbnailUrl: item.snippet.thumbnails.high.url
                    });
                });
            });
    }
}
export var youTubeServiceInjectables: Array<any> = [
    bind(YouTubeService).toClass(YouTubeService),
    bind(YOUTUBE_API_KEY).toValue(YOUTUBE_API_KEY),
    bind(YOUTUBE_API_URL).toValue(YOUTUBE_API_URL)
];


@Component({
    selector: "search-box",
    outputs: ['loading', 'results'],
    template: `
    <input type="text" class="form-control" placeholder="Search" autofocus>
    `
})

class SearchBox implements OnInit {


    constructor(public youtube: YouTubeService, private el: ElementRef) {

    }
    ngOnInit() {
        Observable.fromEvent(this.el.nativeElement, 'keyup')
            .map((e: any) => e.target.value)
            .filter((text: string) => text.length > 1)
            .debounceTime(250)
            .do(() => this.loading.next(true))
            .map((query: string) => this.youtube.search(query))
            .switch()
            .subscribe((results: SearchResult[]) => {
                this.loading.next(false);
                this.results.next(results);
            }, (err: any) => {
                console.log("err", err);
                this.loading.next(false);
            }, () => {
                this.loading.next(false);
            });
    }
    loading: EventEmitter<boolean> = new EventEmitter<boolean>();
    results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();
}


@Component({
    inputs: ['result'],
    selector: 'search-result',
    template: `
 <div class="col-sm-6 col-md-3">
 <div class="thumbnail">
 <img src="{{result.thumbnailUrl}}">
 <div class="caption">
 <h3>{{result.title}}</h3>
 <p>{{result.description}}</p>
 <p><a href="{{result.videoUrl}}"
 class="btn btn-default" role="button">Watch</a></p>
 </div>
 </div>
 </div>
 `
})
export class SearchResultComponent {
    result: SearchResult;

}

@Component({
    selector: 'youtube-search',
    directives: [SearchBox, SearchResultComponent],
    template: `
 <div class='container'>
 <div class="page-header">
 <h1>YouTube Search
 <img
 style="float: right;"
 *ngIf="loading"
 src='' />
 </h1>
 </div>

 <div class="row">
 <div class="input-group input-group-lg col-md-12">
 <search-box
 (loading)="loading = $event"
 (results)="updateResults($event)"
 ></search-box>

 </div>
 </div>

 <div class="row">
 <search-result
 *ngFor="let result of results"
 [result]="result">
 </search-result>
 </div>
 </div>
 `
})

export class YouTubeSearchComponent {
    results: SearchResult[];

    updateResults(results: SearchResult[]): void {
        this.results = results;
        // console.log("results:", this.results); // uncomment to take a look
    }
}