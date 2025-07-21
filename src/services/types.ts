// base custom API response. not needed for jsonplaceholder
export type APIResponse<T> = {
  success: boolean;
  data: T;
  status?: number;
};
