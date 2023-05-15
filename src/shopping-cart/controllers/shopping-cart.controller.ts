import { Body, Controller, Post } from "@nestjs/common";
import { CreateProductDto } from "../dto/create-product.dto";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { CartService } from "../services/cart.service";
import { CreateCartDto } from "../dto/create-cart.dto";
import { AddProductToCartDto } from "../dto/add-product-to-cart.dto";

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

  @Post()
  @ApiBody({ type: AddProductToCartDto })
  async addProduct(@Body() body: AddProductToCartDto) {
    return this.service.addProductToCart(body);
  }
}
