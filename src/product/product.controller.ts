import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ApiConflictResponse, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Request } from 'express';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @ApiCreatedResponse({ description : 'Product created successfully'})
  @ApiConflictResponse({ description: 'Returns an error if there is an existing product with the same name as specified in the request body' })
  @Post('create')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @ApiOkResponse({ description: 'Returns all products' })
  @Get()
  findAll(@Req() request: Request) {
    return this.productService.findAll();
  }

  @ApiOkResponse({ description: 'Returns product with the specified ID' })
  @ApiNotFoundResponse({description: 'Product with ID specified in the request not found on this server'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @ApiOkResponse({ status: 200, description: 'Deletes product with the specified ID' })
  @ApiNotFoundResponse({description: 'Product with ID specified in the request not found on this server'})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
