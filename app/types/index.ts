export type QueryResponseType<TData> = {
  code: number;
  message: string;
  data: TData;
  meta: {
    pagination: {
      page: number;
      limit: number;
      total_page: number;
      total_count: number;
    };
  };
};
