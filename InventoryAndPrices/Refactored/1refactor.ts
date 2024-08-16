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
    const updated = [];
    for (let i = 0; products.length > i; i++) {
      // 1. 同じIDの商品は1回しか更新しない且つ初回のデータを正とする
      for (let j = 0; updated.length > j; j++) {
        if (products[i].id === updated[j].id) {
          break;
        }
      }

      const updatedProduct = this.updateProduct(products[i]);
      updated.push(updatedProduct);
    }
    return updated;
  }

  // 在庫数を変更する処理を切り出した
  private updateProduct(product: Product): Product {
    const checkedProduct = product; // 引数を変更したくないのでコピー

    // 2. 在庫が20個以上になったら在庫過多なので破棄する
    if (checkedProduct.stockNumber >= 20) {
      const tooMany = checkedProduct.stockNumber - 19; //捨てる個数を計算
      console.log(
        `productId: ${checkedProduct.id} is too many stockNumber: ${tooMany}`,
      );
      checkedProduct.stockNumber -= tooMany; // 捨てる
    } else {
      // 3. 在庫が10個未満なら補充する
      if (checkedProduct.stockNumber < 10) {
        checkedProduct.stockNumber += 2; // 毎日2個ずつ補充がくる
      }
    }

    return checkedProduct;
  }
}
