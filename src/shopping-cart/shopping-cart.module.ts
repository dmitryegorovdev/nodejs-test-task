import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { PrismaService } from "../prisma/prisma.service";
import { CustomerService } from "./services/customer.service";
import { CartService } from "./services/cart.service";
import { ShoppingCartController } from "./controllers/shopping-cart.controller";
import { CustomerController } from "./controllers/customer.controller";
import { ProductService } from "./services/product.service";
import { ProductController } from "./controllers/product.controller";

@Module({
  imports: [PrismaModule],
  controllers: [ShoppingCartController, CustomerController, ProductController],
  providers: [PrismaService, CustomerService, CartService, ProductService]
})
export class ShoppingCartModule {
}
