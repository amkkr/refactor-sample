interface Product {
  id: number;
  name: string;
  stockNumber: number; // 在庫数
}

/**
 * 手抜き修正のコード
 */
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
    const updated: Product[] = [];
    ALL_PRODUCT_LIST: for (let i = 0; products.length > i; i++) {
      // 1. 同じIDの商品は1回しか更新しない且つ初回のデータを正とする
      for (let j = 0; i > j; j++) {
        if (products[i].id === updated[j].id) {
          break ALL_PRODUCT_LIST; // 指定したループを抜けるTSの構文
        }
      }
      // 2. 在庫が20個以上になったら在庫過多なので破棄する
      if (products[i].stockNumber >= 20) {
        const tooMany = products[i].stockNumber - 19; //捨てる個数を計算
        console.log(
          `productId: ${products[i].id} is too many stockNumber: ${tooMany}`,
        );
        products[i].stockNumber -= tooMany; // 捨てる
      } else {
        // 3. 在庫が10個未満なら補充する
        if (products[i].stockNumber < 10) {
          products[i].stockNumber += 2; // 毎日2個ずつ補充がくる
        }
      }

      updated.push(products[i]);
    }

    return updated;
  }
}
