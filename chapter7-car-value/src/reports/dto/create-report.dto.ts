import {
  IsString,
  IsInt,
  Min,
  Max,
  IsLatitude,
  IsLongitude,
} from 'class-validator';
export default class CreateReportDto {
  @Min(100)
  @Max(1_000_000)
  price: number;

  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsInt()
  @Min(1900)
  @Max(2023)
  year: number;

  @IsLongitude()
  lng: number;

  @IsLatitude()
  lat: number;

  @IsInt()
  @Min(0)
  @Max(1_000_000)
  mileage: number;
}
