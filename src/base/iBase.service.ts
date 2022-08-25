import { Observable } from 'rxjs';

export interface IBaseService<T, C, U> {
  findAll(): Observable<T[]>;
  get(id: string): Observable<T>;
  update(id: string, entity: U): Observable<T>;
  create(entity: C): Observable<T>;
  delete(id: string): void;
}
