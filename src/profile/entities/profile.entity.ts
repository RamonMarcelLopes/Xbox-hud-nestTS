import { User } from 'src/user/entities/user.entity';
export class Profile {
  id: string;
  title: string;
  imageUrl: string;
  user: User;
  createdAt: string;
  updatedAt: string;
  //userId: string;
}
