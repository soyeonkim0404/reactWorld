export interface CardData {
  id: string;
  title: string;
  description?: string;
  content: string;
  tags?: string[];
  link?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}
