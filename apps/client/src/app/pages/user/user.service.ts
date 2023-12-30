import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUserDTO, UpdateUserDTO, UserDTO } from '@mongo/libs';
import { Apollo, gql } from 'apollo-angular';
import { ObjectId } from 'mongoose';
import { Subject, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _path = 'users';
  private _refresh$ = new Subject<void>();
  constructor(
    private readonly httpClient: HttpClient,
    private readonly apollo: Apollo
  ) {}

  findAll() {
    return this._refresh$.pipe(
      switchMap(() =>
        this.apollo.query<any>({
          query: gql`
            {
              users {
                username
                email
              }
            }
          `,
        })
      ),
      switchMap((res) => res.data.users)
    );
  }

  findById(id: ObjectId) {
    return this._refresh$.pipe(
      switchMap(() => this.httpClient.get<UserDTO>(`${this._path}/${id}`))
    );
  }

  create(body: CreateUserDTO) {
    return this.httpClient.post<UserDTO>(`${this._path}`, body);
  }

  update(id: ObjectId, body: UpdateUserDTO) {
    return this.httpClient.patch<UserDTO>(`${this._path}/${id}`, body);
  }

  delete(id: ObjectId) {
    return this.httpClient.delete<UserDTO>(`${this._path}/${id}`);
  }

  refresh() {
    this._refresh$.next();
  }
}
