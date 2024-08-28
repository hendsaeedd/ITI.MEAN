import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product, ProductResponse } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentPage = 1;
  pageSize = 10;
  totalProducts = 0;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    const skip = (this.currentPage - 1) * this.pageSize;
    this.productService.getProducts(this.pageSize, skip).subscribe(
      (data: ProductResponse) => {
        this.products = data.products;
        this.totalProducts = data.total;
      },
      error => console.error('Error fetching products:', error)
    );
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.getTotalPages().length) {
      this.currentPage = page;
      this.loadProducts();
    }
  }

  getTotalPages(): number[] {
    const totalPages = Math.ceil(this.totalProducts / this.pageSize);
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
}
