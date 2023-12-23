import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserDTO } from '@mongo/libs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
})
export default class HomeComponent implements OnInit {
  title = 'client';
  users: UserDTO[] = [];

  formGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private readonly httpClient: HttpClient) {}
  ngOnInit(): void {}
  getUsers() {
    this.httpClient
      .get<UserDTO[]>('http://localhost:3000/api/v1/users')
      .subscribe((res) => {
        console.log(res);
        this.users = res;
      });
  }
  deleteUser(id: string) {
    this.httpClient
      .delete<UserDTO>(`http://localhost:3000/api/v1/users/${id}`)
      .subscribe((res) => {
        console.log(res);
        console.log('User deleted');
      });
  }
  createUser() {
    this.httpClient
      .post<UserDTO>('http://localhost:3000/api/v1/users', this.formGroup.value)
      .subscribe((res) => {
        console.log(res);
        console.log('User created');
      });
  }
}
