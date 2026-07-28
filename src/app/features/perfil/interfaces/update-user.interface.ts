import { PartialUserDto } from "./partial-user.interface";

export interface UpdateUserDto {
  ok: boolean;
  message: string;
  user: PartialUserDto;
}