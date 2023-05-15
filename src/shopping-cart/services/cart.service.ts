import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateCartDto } from "../dto/create-cart.dto";
import { AddProductToCartDto } from "../dto/add-product-to-cart.dto";
import * as moment from "moment";

@Injectable()
export class CartService {
  private readonly logger = new Logger(CartService.name);

  constructor(private readonly prisma: PrismaService) {
  }

  async addProductToCart(data: AddProductToCartDto) {
    try {
      this.logger.log(`Invoked addProductToCart: ${JSON.stringify(data)}`);

      const { cartId, productId } = data;

      const [foundCart, foundProduct] = await Promise.all([
        this.prisma.cart.findUnique({ where: { id: cartId } }),
        this.prisma.product.findUnique({ where: { id: productId } }),
      ]);


      if (!foundCart || !foundProduct) {
        throw new BadRequestException("incorrect data");
      }

      const livetimeOfCart = moment().diff(foundCart.createdAt);

      if (livetimeOfCart > 5 * 60 * 1000) { // milliseconds
        await this.prisma.productCart.deleteMany({ where: { cartId: foundCart.id } });
      }
      const added = await this.prisma.productCart.create({ data });

      this.logger.log(`Completed method addProductToCart: ${JSON.stringify({ added })}`);
    } catch (error) {
      this.logger.error(`Failed method addProductToCart: ${JSON.stringify({ data, error })}`);
      throw error;
    }
  }

  async createNewCart(data: CreateCartDto) {
    try {
      this.logger.log(`Invoked method createNewCart: ${JSON.stringify({ data })}`);

      const { customerId } = data;
      const foundCustomer = await this.prisma.customer.findUnique({ where: { id: customerId } });

      if (!foundCustomer) {
        throw new BadRequestException("can not create cart beacouse customer not exists");
      }

      const cart = await this.prisma.cart.create({ data });

      this.logger.log(`Completed method createNewCart: ${JSON.stringify({ cart })}`);
      return cart;
    } catch (error) {
      this.logger.error(`Failed method createNewCart: ${JSON.stringify({ data, error })}`);
      throw error;
    }
  }
}
