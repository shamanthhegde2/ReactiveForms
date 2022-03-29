import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ReactiveForms';
  registrationForm!: any;
  constructor(private fm: FormBuilder) {}
  ngOnInit(): void {
    this.registrationForm = this.fm.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.pattern('[a-zA-Z ]*'),
        ],
      ],
      gender: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      age: [''],
    });
    console.log(this.registrationForm.get('country'));
    this.registrationForm
      .get('country')
      .valueChanges.subscribe((value: any) => {
        console.log(value);
        const age = this.registrationForm.get('age');
        if (value == 'IN' || value == 'CA' || value == 'US') {
          age.setValidators(Validators.required);
        } else {
          age.clearValidators();
        }
        age.updateValueAndValidity();
      });
  }

  formSubmit() {
    console.log(this.registrationForm.value);
    console.log('submitted');
  }
  get firstName() {
    return this.registrationForm.get('firstName');
  }
  get gender() {
    return this.registrationForm.get('gender');
  }
  get country() {
    return this.registrationForm.get('country');
  }
  get city() {
    return this.registrationForm.get('city');
  }
  get age() {
    return this.registrationForm.get('age');
  }
}
