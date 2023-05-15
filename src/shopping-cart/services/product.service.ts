import { Injectable, Logger } from "@nestjs/common";
import { CartService } from "./cart.service";
import { CustomerService } from "./customer.service";
import { CreateProductDto } from "../dto/create-product.dto";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(private readonly prisma: PrismaService) {
  }

  async createProduct(body: CreateProductDto) {
    try {
      this.logger.log(`Invoked method createProduct: ${JSON.stringify(body)}`);

      const product = await this.prisma.product.create({ data: body });

      this.logger.log(`Completed method createProduct: ${JSON.stringify(product)}`);
    } catch (error) {
      this.logger.error(`Failed method createProduct: ${JSON.stringify({ body, error })}`);
      throw error;
    }
  }

  async getAll() {
    try {
      this.logger.log(`Invoked method getAll`);

      const products = await this.prisma.product.findMany();

      this.logger.log(`Completed method getAll: ${JSON.stringify(products)}`);

      return products;
    } catch (error) {
      this.logger.error(`Failed method getAll: ${JSON.stringify({ error })}`);
      throw error;
    }
  }
}
