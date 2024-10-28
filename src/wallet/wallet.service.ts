import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { AxiosResponse } from 'axios';
import { Observable, map, catchError } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Wallet } from './entities/wallet.entity';
@Injectable()
export class WalletService {
  constructor(private readonly httpService: HttpService) {}
  create(createWalletDto: CreateWalletDto) {
    return this.httpService
      .post<Wallet>('http://localhost:8001/db/wallet/reload', createWalletDto)
      .pipe(
        map((response: AxiosResponse<Wallet>) => response.data),
        catchError((error) => {
          console.error('Error creating wallet balance:', error);
          throw error;
        }),
      );
  }
  findAll(query: any) {
    return this.httpService
      .get<
        Wallet[]
      >('http://localhost:8001/db/wallet/balance', { params: query })
      .pipe(
        map((response: AxiosResponse<Wallet[]>) => response.data),
        catchError((error) => {
          console.error('Error fetching wallet balance:', error);
          throw error;
        }),
      );
  }

  findOne(id: number) {
    return `This action returns a #${id} wallet`;
  }

  update(id: number, updateWalletDto: UpdateWalletDto) {
    return `This action updates a #${id} wallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }
}
