import { assertEquals } from "testing";
import { TaxCalculation } from "../TaxCalculation.ts";

Deno.test("日本では税抜き100円のものが110円になる", () => {
  const expected = 110;
  const actual = TaxCalculation.calculateTaxForJapan(100);

  assertEquals(actual, expected);
});

Deno.test("アメリカでは税抜き100円のものが108円になる", () => {
  const expected = 108;
  const actual = TaxCalculation.calculateTaxForUSA(100);

  assertEquals(actual, expected);
});

Deno.test("ドイツでは税抜き100円のものが119円になる", () => {
  const expected = 119;
  const actual = TaxCalculation.calculateTaxForGermany(100);

  assertEquals(actual, expected);
});
