import { Gender } from 'src/gender/entities/gender.entity';

export class Game {
  id: string;
  title: string;
  coverImageUrl: string;
  description: string;
  year: number;
  imbScore: number;
  trailerYoutubeUrl: string;
  gameplayYouTubeUrl: string;
  createdAt: string;
  updatedAt: string;
  genres?: Gender[];
}
