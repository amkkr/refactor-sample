import { assertEquals } from "testing";
import { TaxCalculation } from "../TaxCalculation.ts";

Deno.test("日本では消費税が10%だから税抜き100円のものが110円になる", () => {
  const expected = 110;
  const sut = new TaxCalculation(0.1);
  const actual = sut.calculate(100);

  assertEquals(actual, expected);
});

Deno.test("アメリカでは消費税が8%だから税抜き100円のものが108円になる", () => {
  const expected = 108;
  const sut = new TaxCalculation(0.08);
  const actual = sut.calculate(100);

  assertEquals(actual, expected);
});

Deno.test("ドイツでは消費税が19%だから税抜き100円のものが119円になる", () => {
  const expected = 119;
  const sut = new TaxCalculation(0.19);
  const actual = sut.calculate(100);

  assertEquals(actual, expected);
});
