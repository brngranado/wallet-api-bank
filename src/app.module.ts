import { Module } from '@nestjs/common';
import { WalletModule } from './wallet/wallet.module';
import { UserModule } from './user/user.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [WalletModule, UserModule, PaymentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
