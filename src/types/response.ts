export interface BaseResponse<T = any> {
  succeeded: boolean;
  message: string | null;
  statusCode: string | null;
  data: T | null;
  errors: any;
}
