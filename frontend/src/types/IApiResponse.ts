
export interface IApiResponse<T> {
  success: boolean;
  message: string;
  result: T;
  page: number;
  totalNumber: number;
}