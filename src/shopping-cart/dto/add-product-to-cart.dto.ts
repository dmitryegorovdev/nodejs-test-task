import { ApiProperty } from "@nestjs/swagger";

export class AddProductToCartDto {
  @ApiProperty()
  readonly productId: number;

  @ApiProperty()
  readonly cartId: number;
}
