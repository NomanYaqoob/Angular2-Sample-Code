import {Component} from "@angular/core";
import {Headers, Http, Response, RequestOptions} from "@angular/http"

@Component({
    selector: 'http-child',
    templateUrl: "./app/http/http.component.html"
})

export class HttpCmp {
    data: Object;
    loading: boolean;
    constructor(private http: Http) {

    }

    request() {
        this.loading = true;
        this.http.request('http://jsonplaceholder.typicode.com/posts/1').subscribe((res: Response) => {
            this.data = res.json();
            this.loading = false;
        })
    }
}