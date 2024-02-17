export interface APIResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  data: T;
}
