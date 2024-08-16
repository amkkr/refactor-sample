export class TaxCalculation {
  static calculateTaxForJapan(price: number): number {
    return price + price * 0.1; // 10% tax rate for Japan
  }

  static calculateTaxForUSA(price: number): number {
    return price + price * 0.08; // 8% tax rate for USA
  }

  static calculateTaxForGermany(price: number): number {
    return price + price * 0.19; // 19% tax rate for Germany
  }
}
