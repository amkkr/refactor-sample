interface Product {
  id: number;
  name: string;
  stockNumber: number; // 在庫数
}

export class InventoryChecker {
  private updated: Product[] = [];

  /**
   * 1. 同じIDの商品は1日に1回しかチェックしないこと（同じIDを2回見ようとしたら、1回目のデータのみ更新)
   * 2. 同じIDの商品の在庫を20個以上もたないMAX19個
   * 3. 在庫が10個未満の場合は2個発注しているので、必ず補充される
   *
   * @param products  商品リスト
   * @returns 処理済み商品リスト
   */
  updateInventoryInformation(products: Product[]): Product[] {
    for (let i = 0; products.length > i; i++) {
      if (this.productIsEqual(products[i])) {
        break;
      }

      const updatedProduct = this.updateProduct(products[i]);
      this.updated.push(updatedProduct);
    }
    return this.updated;
  }

  // 判定処理を切り出したことで発見したバグを修正
  private productIsEqual(checkingProduct: Product): boolean {
    for (let j = 0; this.updated.length > j; j++) {
      if (checkingProduct.id === this.updated[j].id) {
        return true;
      }
    }

    return false;
  }

  private updateProduct(product: Product): Product {
    const checkedProduct = product;
    if (checkedProduct.stockNumber >= 20) {
      checkedProduct.stockNumber = 19;
    }

    if (checkedProduct.stockNumber < 10) {
      checkedProduct.stockNumber += 2;
    }

    return checkedProduct;
  }
}
