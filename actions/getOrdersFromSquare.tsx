"use server";
import jsonata from "jsonata";
import { Client, Environment, ApiError } from "square";

const square_client = new Client({
  accessToken:
    "EAAAlz_Brq_K9jP9cdHn9GoJ-PgpvrIcn5vb-XHTjQTWklL8kVLDRiuj-QwHMTH1",
  environment: Environment.Production,
});

const { ordersApi } = square_client;

export default async function getProductsFromSquare() {
  const jsonata_query: string =
    "$.objects.{'images': [{'color': 'Blue','colorCode': '#0000FF','image': 'https://firebasestorage.googleapis.com/v0/b/cozie-shop.appspot.com/o/products%2F1712137534743-1I7xZIE.png?alt=media&token=694e25e2-2149-4d16-a9e6-5ee82758d7f9'}],'id': id,'name': itemData.name,'description': itemData.description,'price': itemData.variations[0].itemVariationData.priceMoney.amount,'brand': 'Cozie Shop','category': 'Accessories','inStock': true,'reviews': []}";
  try {
    const { result, ...httpResponse } = await ordersApi.listCatalog(
      "",
      "ITEM"
    );
    const { statusCode } = httpResponse;
    const expression = jsonata(jsonata_query);
    const products = await expression.evaluate(result);
    console.log(statusCode);
    return products;
  } catch (error: any) {
    if (error instanceof ApiError) {
      error.result.errors.forEach(function (e) {
        console.log(e.category);
        console.log(e.code);
        console.log(e.detail);
        throw new Error(error);
      });
    } else {
      console.log("Unexpected error occurred: ", error);
      throw new Error(error);
    }
  }
}

/*
curl https://connect.squareup.com/v2/catalog/list?types=ITEM&cursor= \
  -H 'Square-Version: 2024-03-20' \
  -H 'Authorization: Bearer EAAAlz_Brq_K9jP9cdHn9GoJ-PgpvrIcn5vb-XHTjQTWklL8kVLDRiuj-QwHMTH1' \
  -H 'Content-Type: application/json'
*/
