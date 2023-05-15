import { Module } from "@nestjs/common";
import { ShoppingCartModule } from "./shopping-cart/shopping-cart.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [ConfigModule.forRoot(), ShoppingCartModule]
})
export class AppModule {
}
