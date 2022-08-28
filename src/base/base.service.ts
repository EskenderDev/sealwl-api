import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { from, Observable, throwIfEmpty } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BaseEntity } from './base.entity';
import { IBaseService } from './iBase.service';

@Injectable()
export class BaseService<T extends BaseEntity, C, U>
  implements IBaseService<T, C, U>
{
  constructor(private readonly baseModel: Model<T>) {}

  findAll(): Observable<T[]> {
    return from(this.baseModel.find().exec()).pipe(
      throwIfEmpty(() => new NotFoundException('Recursos no encontrados')),
    );
  }
  findOne(id: string): Observable<T> {
    return from(this.baseModel.findById(id).exec()).pipe(
      throwIfEmpty(() => new NotFoundException(`Recurso ${id} no encontrado`)),
    );
  }
  update(id: string, entity: U): Observable<T> {
    return from(
      this.baseModel.findByIdAndUpdate(id, { entity }, { new: true }).exec(),
    ).pipe(
      throwIfEmpty(() => new NotFoundException(`Recurso ${id} no encontrado`)),
    );
  }
  create(entity: C): Observable<T> {
    const createdEntity = new this.baseModel(entity);

    return from(createdEntity.save());
  }
  delete(id: string): void {
    from(this.baseModel.findByIdAndDelete(id).exec()).pipe(
      tap((resource) => {
        if (resource === null) {
          throw new NotFoundException(`Recurso ${id} no encontrado`);
        }
      }),
    );
  }
}
