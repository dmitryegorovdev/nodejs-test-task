import { Body, Controller, Post } from "@nestjs/common";
import { CreateProductDto } from "../dto/create-product.dto";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { CartService } from "../services/cart.service";
import { CreateCartDto } from "../dto/create-cart.dto";

@ApiTags("Shopping Cart")
@Controller("/shopping-cart")
export class ShoppingCartController {

  constructor(private readonly service: CartService) {
  }

  @Post()
  @ApiBody({ type: CreateCartDto })
  async createCart(@Body() body: CreateCartDto) {
    return this.service.createNewCart(body);
  }
}
