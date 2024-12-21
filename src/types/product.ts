export interface Product {
  catalogNumber: string;
  description: string;
  uom: string;
  productGroup: string;
  quantityBreak: string;
  usListPrice2025: number;
}

export interface ProductFilters {
  search: string;
  productGroup: string;
  sortBy: string;
}
