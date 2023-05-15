import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateCustomerDto } from "../dto/create-customer.dto";

@Injectable()
export class CustomerService {
  private readonly logger = new Logger(CustomerService.name);

  constructor(private readonly prisma: PrismaService) {
  }

  async createCustomer(data: CreateCustomerDto) {
    try {
      this.logger.log(`Invoked method createCustomer: ${JSON.stringify(data)}`);

      const customer = await this.prisma.customer.create({ data });

      this.logger.log(`Completed method createCustomer: ${JSON.stringify(customer)}`);
      return customer;
    } catch (error) {
      this.logger.error(`Failed method createCustomer: ${JSON.stringify({ data, error })}`);
      throw error;
    }
  }

  async findById(id: number) {
    try {
      this.logger.log(`Invoked method createCustomer: ${JSON.stringify({ id })}`);

      const customer = await this.prisma.customer.findUnique({ where: { id } });

      if (!customer) {
        throw new NotFoundException("Customer not found");
      }

      this.logger.log(`Completed method createCustomer: ${JSON.stringify(customer)}`);
      return customer;
    } catch (error) {
      this.logger.error(`Failed method createCustomer: ${JSON.stringify({ id, error })}`);
      throw error;
    }
  }
}
