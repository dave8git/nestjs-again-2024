import { Transform } from 'class-transformer';
import { IsNotEmpty, Length, IsString } from 'class-validator';

export class UpdateOrderDTO {
    @IsNotEmpty()
    @IsString()
    productId: string;

    @IsNotEmpty()
    @IsString()
    @Length(5, 30)
    client: string;

    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => (Array.isArray(value) ? value.join(', '): ''))
    address: string;
};