import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpService } from '@nestjs/axios';
import { User } from './entities/user.entity';
import { AxiosResponse } from 'axios';
import { Observable, map, catchError } from 'rxjs';

@Injectable()
export class UserService {
  constructor(private readonly httpService: HttpService) {}

  create(createUserDto: CreateUserDto) {
    return this.httpService
      .post<User>('http://localhost:8001/db/user', createUserDto)
      .pipe(
        map((response: AxiosResponse<User>) => response.data),
        catchError((error) => {
          console.error('Error creating user:', error);
          throw error;
        }),
      );
  }

  findAll(): Observable<User[]> {
    return this.httpService.get<User[]>('http://localhost:8001/db/user').pipe(
      map((response: AxiosResponse<User[]>) => response.data),
      catchError((error) => {
        console.error('Error fetching users:', error);
        throw error;
      }),
    );
  }

  findOne(id: number): Observable<User> {
    return this.httpService
      .get<User>(`http://localhost:8001/db/user/${id}`)
      .pipe(
        map((response: AxiosResponse<User>) => response.data),
        catchError((error) => {
          console.error(`Error fetching user with id ${id}:`, error);
          throw error;
        }),
      );
  }
  update(id: number, updateUserDto: UpdateUserDto) {
    return this.httpService
      .put<User>(`http://localhost:8001/db/user/${id}`, updateUserDto)
      .pipe(
        map((response: AxiosResponse<User>) => response.data),
        catchError((error) => {
          console.error(`Error updating user with id ${id}:`, error);
          throw error;
        }),
      );
  }

  remove(id: number) {
    return this.httpService
      .delete<void>(`http://localhost:8001/db/user/${id}`)
      .pipe(
        catchError((error) => {
          console.error(`Error removing user with id ${id}:`, error);
          throw error;
        }),
      );
  }
}
