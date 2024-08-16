export class TaxCalculation {
  constructor(
    private readonly _taxRate: number, // 関数をまとめるのが主題なのでここが税率クラスがいいとかそういうのは別で
  ) {}
  calculate(price: number): number {
    return price + price * this._taxRate;
  }
}
