import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, Length, IsString, Min } from 'class-validator';

export class CreateProductDTO {
    @IsNotEmpty()
    @IsString()
    @Length(10, 30)
    name: string;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    price: number;

    @IsNotEmpty()
    @Length(10, 200)
    @Transform(({ value }) => (Array.isArray(value) ? value.join(', '): ''))
    description: string;
};