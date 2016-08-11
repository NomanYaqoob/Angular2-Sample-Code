import {Component} from "@angular/core";
import {FORM_DIRECTIVES,
    REACTIVE_FORM_DIRECTIVES, Validators,
    FormBuilder,
    FormGroup, AbstractControl, FormControl} from "@angular/forms"

@Component({
    selector: "my-form",
    templateUrl: "./app/forms/form.component.html",
    directives: [REACTIVE_FORM_DIRECTIVES, FORM_DIRECTIVES] //added form directives
})

export class FormCmp {
    myForm: FormGroup;
    sku: AbstractControl
    constructor(formBuilder: FormBuilder) {
        this.myForm = formBuilder.group({
            'sku': ['', Validators.compose([Validators.required, this.skuValidator])]
        });

        // Validators.compose are used to merge validations

        // this.sku = this.myForm.controls["sku"];
    }
    onSubmit(form: any): void {
        console.log('you submitted value:', form);
    }


    // Writing a Custom Validtor with Regx
    skuValidator(c: FormControl): { [s: string]: boolean } {
        if (!c.value.match(/^123/)) {
            return { invalidSku: true };
        }
    }
}