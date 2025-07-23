import { Request } from 'express';
import { PrismaClient, FileUploadStatus } from '@prisma/client';

// Authentication types
export interface AuthenticatedUser {
  id: number;
  email: string;
  name?: string;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
}

// File upload types
export interface FileUploadData {
  filename: string;
  originalName: string;
  fileSize: number;
  mimeType: string;
  filePath?: string;
  fileUrl?: string;
  userId: number;
}

export interface FileUploadResponse {
  id: number;
  filename: string;
  originalName: string;
  fileSize: number;
  status: FileUploadStatus;
  createdAt: Date;
  updatedAt: Date;
}

// Pagination and filtering types
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface FileFilterParams extends PaginationParams {
  status?: FileUploadStatus;
  filename?: string;
  createdAt?: {
    from?: string;
    to?: string;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    limit: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

// Excel data types
export interface ProductData {
  name: string;
  description?: string;
  price: number;
  category?: string;
  sku?: string;
}

export interface SaleData {
  productId?: number;
  productName?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  saleDate: Date;
  customerName?: string;
  customerEmail?: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// Background job types
export interface ProcessingJob {
  fileId: number;
  userId: number;
  filePath: string;
  fileType: 'products' | 'sales' | 'users';
}