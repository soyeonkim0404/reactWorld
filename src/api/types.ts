export interface CardData {
  id: string;
  title: string;
  description?: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  tags?: string[];
  link?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}
