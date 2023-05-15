import { ApiProperty } from "@nestjs/swagger";

export class CreateCartDto {
  @ApiProperty()
  readonly customerId: number;
}
