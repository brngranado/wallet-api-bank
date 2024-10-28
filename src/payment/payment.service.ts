import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';
import { HttpService } from '@nestjs/axios';
import { Payment } from './entities/payment.entity';
import { AxiosResponse } from 'axios';
import { Observable, map, catchError } from 'rxjs';
@Injectable()
export class PaymentService {
  constructor(private readonly httpService: HttpService) {}

  create(createPaymentDto: CreatePaymentDto) {
    return this.httpService
      .post<Payment>('http://localhost:8001/db/payment/pay', createPaymentDto)
      .pipe(
        map((response: AxiosResponse<Payment>) => response.data),
        catchError((error) => {
          console.error('Error creating payment:', error);
          throw error;
        }),
      );
  }

  confirm(confirmPaymentDto: ConfirmPaymentDto) {
    return this.httpService
      .post<Payment>(
        'http://localhost:8001/db/payment/confirm',
        confirmPaymentDto,
      )
      .pipe(
        map((response: AxiosResponse<Payment>) => response.data),
        catchError((error) => {
          console.error('Error creating confirm:', error);
          throw error;
        }),
      );
  }

  findAll() {
    return `This action returns all payment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
