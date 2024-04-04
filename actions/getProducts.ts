import prisma from "@/libs/prismadb";
import getProductsFromSquare from "./getProductsFromSquare";
import { ObjectId } from "mongodb";

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

function generateObjectIdLikeString(inputString : string) {
  // Convert input string to hexadecimal representation
  let hexString = Buffer.from(inputString).toString('hex');

  // Ensure the hexadecimal string is exactly 24 characters long
  if (hexString.length < 24) {
      hexString += '0'.repeat(24 - hexString.length);
  } else if (hexString.length > 24) {
      hexString = hexString.slice(0, 24);
  }

  return hexString;
}


export default async function getProducts(params: IProductParams) {
  try {
    const { category, searchTerm } = params;
    let searchString = searchTerm;

    if (!searchTerm) {
      searchString = "";
    }
    const products_from_square = await getProductsFromSquare();
    for (const product of products_from_square) {
      const { name, description, brand, category, inStock, images, price, id } =
        product;

      const existing_product = await prisma.product.findFirst({
        where: {
          id: generateObjectIdLikeString(id),
        },
      });
      if (!existing_product) {
        await prisma.product.create({
          data: {
            id: generateObjectIdLikeString(id),
            name: name,
            description: description,
            brand: brand,
            category: category,
            inStock: inStock,
            images: images,
            price: parseFloat(price),
          },
        });
      } else {
        await prisma.product.update({
          where: {
            id: generateObjectIdLikeString(id),
          },
          data: {
            name: name,
            description: description,
            brand: brand,
            category: category,
            inStock: inStock,
            images: images,
            price: parseFloat(price),
          }
        })
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
    }

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
