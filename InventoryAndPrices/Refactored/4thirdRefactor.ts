interface Product {
  id: number;
  name: string;
  stockNumber: number; // 在庫数
}

export class InventoryChecker {
  /**
   * 1. 同じIDの商品は1日に1回しかチェックしないこと（同じIDを2回見ようとしたら、1回目のデータのみ更新)
   * 2. 同じIDの商品の在庫を20個以上もたないMAX19個
   * 3. 在庫が10個未満の場合は2個発注しているので、必ず補充される
   *
   * @param products  商品リスト
   * @returns 処理済み商品リスト
   */
  updateInventoryInformation(products: Product[]): Product[] {
    // forループをArrayメソッドに置き換えた
    return products
      .filter((product, index, self) =>
        this.productIsEqual(product, index, self)
      )
      .map((product) => this.updateProduct(product));
  }

  // 判定処理の変更にともなってこちらも変更
  private productIsEqual(
    checkingProduct: Product,
    index: number,
    origin: Product[],
  ): boolean {
    return origin.findIndex(
      (product) => product.id === checkingProduct.id,
    ) === index;
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
