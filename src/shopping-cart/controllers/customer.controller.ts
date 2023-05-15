import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CustomerService } from "../services/customer.service";
import { ApiBody, ApiParam, ApiTags } from "@nestjs/swagger";
import { CreateCustomerDto } from "../dto/create-customer.dto";

@ApiTags("Customer")
@Controller("/customer")
export class CustomerController {
  constructor(private readonly service: CustomerService) {
  }

  @Post()
  @ApiBody({ type: CreateCustomerDto })
  async create(@Body() body: CreateCustomerDto) {
    return this.service.createCustomer(body);
  }

  @Get("/:id")
  @ApiParam({ name: "id", type: "number" })
  async getCustomerById(@Param() param) {
    return this.service.findById(+param.id);
  }
}
