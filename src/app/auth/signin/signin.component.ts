import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup;
  errorMEssage: string;

  /* The FormBuilder provides syntactic sugar that shortens creating instances of a FormControl, 
  FormGroup, or FormArray. It reduces the amount of boilerplate needed to build complex forms. */
  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }


  ngOnInit() {
    this.initForm();
  }

  initForm() {
    /* This method creates a new FormGroup instance.
    A FormGroup instance tracks the value and validity state of a group of FormControl instances.*/
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    const email = this.signInForm.get('email').value;
    const password = this.signInForm.get('password').value;

    this.authService.signInUser(email, password).then(
      () => {
        this.router.navigate(['/books']);
      },
      (error) => {
        this.errorMEssage = error;
      }
    );
  }


}
