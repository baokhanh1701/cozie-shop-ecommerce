import prisma from "@/libs/prismadb";

function generateObjectIdLikeString(inputString: string) {
  // Convert input string to hexadecimal representation
  let hexString = Buffer.from(inputString).toString("hex");

  // Ensure the hexadecimal string is exactly 24 characters long
  if (hexString.length < 24) {
    hexString += "0".repeat(24 - hexString.length);
  } else if (hexString.length > 24) {
    hexString = hexString.slice(0, 24);
  }

  return hexString;
}

export default async function syncProductsSquare2Db(
  products_from_db: any,
  products_from_square: any
) {
  for (const product of products_from_square) {
    const { name, description, brand, category, inStock, images, price, id } =
      product;

    const existing_product = products_from_db.find((x: any) => x.id == generateObjectIdLikeString(id));
    //If not exists --> create else update
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
    } else if (
      existing_product.name !== name ||
      existing_product.description !== description ||
      existing_product.brand !== brand ||
      existing_product.category !== category ||
      existing_product.inStock !== inStock ||
      existing_product.price !== parseFloat(price)
    ) {
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
        },
      });
    }
  }

}
