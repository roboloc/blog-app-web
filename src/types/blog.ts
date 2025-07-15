import { User } from "./user";

export interface Blog {
  id: number;
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  content: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;

  user?: Omit<User, "password">;
}
