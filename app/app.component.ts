import {Component, trigger, animate, state, style, transition} from "@angular/core";
import {FormCmp} from "./forms/form.component"
import {HttpCmp} from "./http/http.component"
import {YouTubeSearchComponent} from "./YoutubeSearchCmp/YoutubeSearchComponent"
var $: any;
@Component({
    selector: "my-app",
    templateUrl: "./app/app.component.html",
    directives: [FormCmp,HttpCmp,YouTubeSearchComponent]
})

export class AppComponent {
    state: string;
    myCSSObject: any;
    constructor() {
        this.state = 'active';
    }



    clicked() {
        this.myCSSObject = "{'background-color':'red','font-size':'18px}";
        setTimeout(function () {
            $('.head').addClass('magictime tinRightOut');
            setTimeout(function () {
                $('.head').removeClass("tinRightOut");
                $('.head').addClass('tinRightIn');
                setTimeout(function () {
                    $('.head').removeClass('tinRightIn');
                }, 1000)
            }, 1000)
        }, 0);


    }
}