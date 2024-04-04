"use client"
import getProductsFromSquare from "@/actions/getProductsFromSquare";

export default async function testActions() {
  return (
    <button onClick={getProductsFromSquare}>Get Products From Square</button>
  );
}
