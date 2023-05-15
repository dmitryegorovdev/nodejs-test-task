import { ApiBody, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProductService } from "../services/product.service";
import { CreateProductDto } from "../dto/create-product.dto";

@ApiTags("Product")
@Controller("/product")
export class ProductController {
  constructor(private readonly service: ProductService) {
  }

  @Post()
  @ApiBody({ type: CreateProductDto })
  async createProduct(@Body() body: CreateProductDto) {
    return this.service.createProduct(body);
  }

  @Get()
  async getAll() {
    return this.service.getAll();
  }
}
