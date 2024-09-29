export interface CommonResponseObject<T> {
  status: number;
  message: string;
  data: T;
}

export interface CommonPagingResponse<T> {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  data: T[];
}

export interface City {
  id: number;
  name: string;
  fullname: string;
}

export interface Filters {
  theme: string[];
  metropolitanGovernments: City[];
  localGovernments: City[];
}
