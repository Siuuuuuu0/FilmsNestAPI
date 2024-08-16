import { IsEmail, IsEnum, IsNotEmpty, IsString, PrimaryGeneratedColumn } from "class-validator";

export class CreateMovieDto {
    @PrimaryGeneratedColumn()
    id: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsEnum(["INTERN", "ENGINEER", "ADMIN"], {
        message: 'Valid role required'
    })
    role: "INTERN" | "ENGINEER" | "ADMIN";
}