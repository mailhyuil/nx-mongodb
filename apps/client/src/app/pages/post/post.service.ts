import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreatePostDTO, PostDTO, UpdatePostDTO } from '@mongo/libs';
import { Subject, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private _path = 'posts';
  private _refresh$ = new Subject<void>();
  constructor(private readonly httpClient: HttpClient) {}

  findAll() {
    return this._refresh$.pipe(
      switchMap(() => this.httpClient.get<PostDTO[]>(`${this._path}`))
    );
  }

  findById(id: string) {
    return this._refresh$.pipe(
      switchMap(() => this.httpClient.get<PostDTO>(`${this._path}/id`))
    );
  }

  create(body: CreatePostDTO) {
    return this.httpClient.post<PostDTO>(`${this._path}`, body);
  }

  update(id: string, body: UpdatePostDTO) {
    return this.httpClient.patch<PostDTO>(`${this._path}/id`, body);
  }

  delete(id: string) {
    return this.httpClient.delete<PostDTO>(`${this._path}/id`);
  }

  refresh() {
    this._refresh$.next();
  }
}
