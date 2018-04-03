import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  ReflectMetadata,
  UseInterceptors,
  Param,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { ADMIN_ROLE } from '../user/user.constants';
import { LoggingInterceptor, TransformInterceptor } from '../common/interceptors/index';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';

@Controller('products')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Roles(ADMIN_ROLE)
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  async findAll(): Promise<Product[]> {
  // async findAll(): Promise<any[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseIntPipe())
    id,
  ): Promise<Product> {
    return this.productService.findById(id);
  }
}