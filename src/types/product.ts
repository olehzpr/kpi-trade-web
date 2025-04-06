import { Category } from "./category";
import { User } from "./user";

export interface ProductImage {
  id: number;
  url: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  seller: User;
  category: Category;
  images: ProductImage[];
}

export interface ProductStatistics {
  viewCount: number;
  uniqueViewCount: number;
  timeOnPage: number;
}

export interface ProductWithDetails extends Product {
  createdAt: string;
  updatedAt: string;
  statistics: ProductStatistics;
  favorite: boolean;
}

export interface PageableInfo {
  pageNumber: number;
  pageSize: number;
  offset: number;
  sort: SortInfo;
  unpaged: boolean;
  paged: boolean;
}

export interface SortInfo {
  sorted: boolean;
  empty: boolean;
  unsorted: boolean;
}

export interface ProductsApiResponse {
  totalPages: number;
  totalElements: number;
  pageable: PageableInfo;
  first: boolean;
  last: boolean;
  size: number;
  content: ProductWithDetails[];
  number: number;
  sort: SortInfo;
  numberOfElements: number;
  empty: boolean;
}
