export interface Stock {
  symbol: string;
  name: string;
  sector: string;
  price: number;
  previousClose: number;
  volume: number;
  updatedAt: Date;
}
