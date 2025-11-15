import { Controller, Get } from '@nestjs/common';

type Anime = {
  id: string;
  name: string;
  description: string;
  img: string;
  type: string;
  episodes: string;
  status: string;
  genre: string;
  source: string;
  release: string;
  studio: string;
  'MPAA rank': string;
  peggy: string;
  duration: number;
  dubbing: string;
  sameAs: { id: string; name: string; img: string }[];
};

@Controller('app')
export class AppController {
  constructor() {}

  @Get()
  getHello(): void {
    console.log('Get hell');
  }
}
