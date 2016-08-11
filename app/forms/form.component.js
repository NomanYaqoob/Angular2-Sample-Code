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
var forms_1 = require("@angular/forms");
var FormCmp = (function () {
    function FormCmp(formBuilder) {
        this.myForm = formBuilder.group({
            'sku': ['', forms_1.Validators.compose([forms_1.Validators.required, this.skuValidator])]
        });
        // Validators.compose are used to merge validations
        // this.sku = this.myForm.controls["sku"];
    }
    FormCmp.prototype.onSubmit = function (form) {
        console.log('you submitted value:', form);
    };
    // Writing a Custom Validtor with Regx
    FormCmp.prototype.skuValidator = function (c) {
        if (!c.value.match(/^123/)) {
            return { invalidSku: true };
        }
    };
    FormCmp = __decorate([
        core_1.Component({
            selector: "my-form",
            templateUrl: "./app/forms/form.component.html",
            directives: [forms_1.REACTIVE_FORM_DIRECTIVES, forms_1.FORM_DIRECTIVES] //added form directives
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder])
    ], FormCmp);
    return FormCmp;
}());
exports.FormCmp = FormCmp;
//# sourceMappingURL=form.component.js.map