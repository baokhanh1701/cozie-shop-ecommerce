import prisma from "@/libs/prismadb";
import getProductsFromSquare from "./getProductsFromSquare";
import { ObjectId } from "mongodb";
import syncProduct from "./syncProductsSquare2Db";

export interface IProductParams {
  category?: string | null;
  searchTerm?: string | null;
}

function hexEncode(str: string) {
  var result = "";
  for (var i = 0; i < str.length; i++) {
    result += str.charCodeAt(i);
    // console.log(result, "\n");
  }
  return result;
}


export default async function getProducts(params: IProductParams) {
  try {
    const { category, searchTerm } = params;
    let searchString = searchTerm;

    if (!searchTerm) {
      searchString = "";
    }
    // const products_from_square = await getProductsFromSquare();

    // await syncProduct(products_from_square)

    let query: any = {};

    if (category) {
      query.category = category;
    }

    const products = await prisma.product.findMany({
      where: {
        ...query,
        OR: [
          {
            name: {
              contains: searchString,
              mode: "insensitive",
            },
            description: {
              contains: searchString,
              mode: "insensitive",
            },
          },
        ],
      },
      include: {
        reviews: {
          include: {
            user: true,
          },
          orderBy: {
            createdDate: "desc",
          },
        },
      },
    });
    // if (!products) {
    //   return null;
    // }

    return products;
  } catch (error: any) {
    throw new Error(error);
  }
}

// await prisma.product.upsert({
//   where: {
//     id: generateObjectIdLikeString(id),
//     name: name
//   },
//   create: {
//     name: name,
//     description: description,
//     brand: brand,
//     category: category,
//     inStock: inStock,
//     images: images,
//     price: parseFloat(price),
//   },
//   update: {
//     name: name,
//     description: description,
//     brand: brand,
//     category: category,
//     inStock: inStock,
//     images: images,
//     price: parseFloat(price),
//   },
// });
