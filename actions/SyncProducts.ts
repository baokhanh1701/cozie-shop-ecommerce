import prisma from "@/libs/prismadb";
import fs from "fs/promises";
import getProductsFromSquare from "./getProductsFromSquare";
import syncProductsSquare2Db from "./syncProductsSquare2Db";

async function checkDeleteProducts(
  products_from_db: any,
  products_from_square: any
) {
  //   console.log("Check Delete Products...");
  const result = products_from_db.filter(
    (dbProduct: any) =>
      !products_from_square.some(
        (squareProduct: any) => squareProduct.id === dbProduct.id
      )
  );
  return result;
}

export default async function syncProducts() {
  try {
    const products_from_db = await prisma.product.findMany();
    const products_from_square = await getProductsFromSquare();

    const deletedItems: any = await checkDeleteProducts(
      products_from_db,
      products_from_square
    );
    await syncProductsSquare2Db(products_from_db, products_from_square);
  } catch (error) {
    console.log(error);
  }
}
