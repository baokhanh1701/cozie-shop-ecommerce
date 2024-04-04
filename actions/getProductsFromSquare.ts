"use server";
import jsonata from "jsonata";
import { Client, Environment, ApiError } from "square";
/*
curl https://connect.squareup.com/v2/catalog/list?types=ITEM&cursor= \
  -H 'Square-Version: 2024-03-20' \
  -H 'Authorization: Bearer EAAAlz_Brq_K9jP9cdHn9GoJ-PgpvrIcn5vb-XHTjQTWklL8kVLDRiuj-QwHMTH1' \
  -H 'Content-Type: application/json'
*/

const square_client = new Client({
  accessToken:
    "EAAAlz_Brq_K9jP9cdHn9GoJ-PgpvrIcn5vb-XHTjQTWklL8kVLDRiuj-QwHMTH1",
  environment: Environment.Production,
});

const { catalogApi } = square_client;

export default async function getProductsFromSquare() {
  const jsonata_query: string =
    "($getItem := function($input_image_id) {($.objects[type='IMAGE'][id=$input_image_id].imageData.url)};    $.objects[type='ITEM'].{'images': [{'color': 'Blue','colorCode': '#0000FF','image': $getItem(itemData.imageIds[0])}],'id': id,'name': itemData.name,'description': itemData.description,'price': itemData.variations[0].itemVariationData.priceMoney.amount,'brand': 'Cozie Shop','category': 'Accessories','inStock': true,'reviews': []})";
  try {
    const { result, ...httpResponse } = await catalogApi.listCatalog(
      "",
      "ITEM,IMAGE"
    );
    const { statusCode } = httpResponse;
    const expression = jsonata(jsonata_query);
    const products = await expression.evaluate(result);
    console.log(statusCode);

    //* Whenever retrieve products from Square --> add to database if not exists
    

    return products;
  } catch (error: any) {
    if (error instanceof ApiError) {
      error.result.errors.forEach(function (e : any) {
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



