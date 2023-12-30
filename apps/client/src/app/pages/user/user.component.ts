import { Component, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CreateUserDTO } from '@mongo/libs';
import { ObjectId } from 'mongoose';
import { UserService } from './user.service';

export type ModelFormGroup<T> = FormGroup<{
  [K in keyof T]: FormControl<T[K]>;
}>;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
})
export default class UserComponent implements OnInit {
  users = toSignal<any>(this.userService.findAll());

  formGroup: ModelFormGroup<CreateUserDTO> = new FormGroup({
    username: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });
  constructor(private readonly userService: UserService) {}
  ngOnInit(): void {
    this.userService.refresh();
    const res = this.users();
    console.log(res);
  }
  createUser() {
    const body = this.formGroup.getRawValue();
    if (this.formGroup.invalid) {
      return;
    }
    this.userService.create(body).subscribe((user) => {
      this.userService.refresh();
      this.formGroup.reset();
    });
  }
  deleteUser(_id: ObjectId) {
    this.userService.delete(_id).subscribe(() => {
      this.userService.refresh();
    });
  }
}
