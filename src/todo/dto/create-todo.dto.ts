import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @MinLength(1)
  text: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
