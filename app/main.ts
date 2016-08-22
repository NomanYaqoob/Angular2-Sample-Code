import {bootstrap} from "@angular/platform-browser-dynamic";
import {AppComponent} from "./app.component"
import {provideForms} from "@angular/forms"
import {HTTP_PROVIDERS} from "@angular/http"
import {youTubeServiceInjectables} from "./YoutubeSearchCmp/YoutubeSearchComponent"
bootstrap(AppComponent, [provideForms(), youTubeServiceInjectables, HTTP_PROVIDERS]).catch((err: any) => {
    console.error("err", err);
});
