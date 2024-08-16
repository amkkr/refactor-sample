import { assertEquals } from "testing";
// import { InventoryChecker } from "../first.ts";
// import { InventoryChecker } from "../second.ts";
// import { InventoryChecker } from "../3bug-fix.ts";
import { InventoryChecker } from "../4thirdRefactor.ts";

Deno.test("在庫が19個の商品はそのままにする", () => {
  const sut = new InventoryChecker();
  const products = [
    { id: 1, name: "name", stockNumber: 19 },
  ];
  const actual = sut.updateInventoryInformation(products);

  assertEquals(actual, products);
});

Deno.test("在庫が10個の商品はそのままにする", () => {
  const sut = new InventoryChecker();
  const products = [
    { id: 1, name: "name", stockNumber: 10 },
  ];
  const actual = sut.updateInventoryInformation(products);

  assertEquals(actual, products);
});

Deno.test("在庫が21個の商品は19個にする", () => {
  const sut = new InventoryChecker();
  const products = [
    { id: 1, name: "name", stockNumber: 21 },
  ];
  const actual = sut.updateInventoryInformation(products);

  assertEquals(actual[0].stockNumber, 19);
});

Deno.test("在庫が9個の商品は2個増える", () => {
  const sut = new InventoryChecker();
  const products = [
    { id: 1, name: "name", stockNumber: 9 },
  ];
  const actual = sut.updateInventoryInformation(products);

  assertEquals(actual[0].stockNumber, 11);
});

Deno.test("同じ商品は1回しか処理しない", () => {
  const sut = new InventoryChecker();
  const products = [
    { id: 1, name: "name", stockNumber: 100 },
    { id: 2, name: "name", stockNumber: 100 },
    { id: 3, name: "name", stockNumber: 100 },
    { id: 1, name: "name", stockNumber: 11 },
  ];
  const actual = sut.updateInventoryInformation(products);

  assertEquals(actual.length, 3);
  assertEquals(actual[0].stockNumber, 19);
});
