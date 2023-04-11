import {
  IsString,
  IsInt,
  Min,
  Max,
  IsLatitude,
  IsLongitude,
} from 'class-validator';
import { Transform } from 'class-transformer';
export default class GetEstimateDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @Transform(({ value }) => +value)
  @IsInt()
  @Min(1900)
  @Max(2023)
  year: number;

  @Transform(({ value }) => +value)
  @IsLongitude()
  lng: number;

  @Transform(({ value }) => +value)
  @IsLatitude()
  lat: number;

  @Transform(({ value }) => +value)
  @IsInt()
  @Min(0)
  @Max(1_000_000)
  mileage: number;
}
