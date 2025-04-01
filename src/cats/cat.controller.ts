import { Controller, Get } from "@nestjs/common";

@Controller()
export class CatController {

  @Get('/cats')
  getHealth(): string {
    return 'cat meow ~';
  }
}
