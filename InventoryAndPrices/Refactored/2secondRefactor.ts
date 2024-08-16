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
      this.validateSameProduct(products[i]);
      const updatedProduct = this.updateProduct(products[i]);
      this.updated.push(updatedProduct);
    }
    return this.updated;
  }

  // バリデーションの箇所を関数に切り出した。
  // なんかおかしいことに気がつくが焦らず
  // まだそのままで
  private validateSameProduct(checkingProduct: Product): void {
    for (let j = 0; this.updated.length > j; j++) {
      if (checkingProduct.id === this.updated[j].id) {
        break;
      }
    }
  }

  // 切り出したことでスコープがわかり、いらない計算を省けることに気がついた
  private updateProduct(product: Product): Product {
    const checkedProduct = product;
    if (checkedProduct.stockNumber >= 20) {
      // 19個までしか持てないので計算せずに最大値にする
      checkedProduct.stockNumber = 19;
    }

    // elseがいらないことに気がついた
    if (checkedProduct.stockNumber < 10) {
      checkedProduct.stockNumber += 2; // 毎日2個ずつ補充がくる
    }

    return checkedProduct;
  }
}
