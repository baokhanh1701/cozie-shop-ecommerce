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
    "(        $getItem := function($input_image_id) {        ($.objects[type='IMAGE'][id=$input_image_id].imageData.url)        };            $getCategory := function($input_id) {        ($.objects[type='CATEGORY'][id=$input_id].categoryData.name)    };        $.objects[type='ITEM'].{            'images':     [                    {                            'color': 'Blue',                            'colorCode': '#0000FF',                            'image': $getItem(itemData.imageIds[0]) ? $getItem(itemData.imageIds[0]) : 'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg'                        },        {            'color': 'Black',            'colorCode': '#000000',            'image': $getItem(itemData.imageIds[1]) ? $getItem(itemData.imageIds[1]) : 'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg'        },        {            'color': 'Silver',            'colorCode': '#c0c0c0',            'image': $getItem(itemData.imageIds[2]) ? $getItem(itemData.imageIds[2]) : 'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg'        },        {            'color': 'Gray',            'colorCode': '#808080',            'image': $getItem(itemData.imageIds[3]) ? $getItem(itemData.imageIds[3]) : 'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg'        },        {            'color': 'red',            'colorCode': '#FF0000',            'image': $getItem(itemData.imageIds[4]) ? $getItem(itemData.imageIds[4]) : 'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg'        },        {            'color': 'Gold',            'colorCode': '#FFD700',            'image': $getItem(itemData.imageIds[5]) ? $getItem(itemData.imageIds[5]) : 'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg'        },        {            'color': 'Blue',            'colorCode': '#0000FF',            'image': $getItem(itemData.imageIds[6]) ? $getItem(itemData.imageIds[6]) : 'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg'        },        {            'color': 'Graphite',            'colorCode': '#383838',            'image': $getItem(itemData.imageIds[7]) ? $getItem(itemData.imageIds[7]) : 'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg'        }            ],            'id': id,            'name': itemData.name,        'description': itemData.description,        'price': itemData.variations[0].itemVariationData.priceMoney.amount,        'brand': 'Cozie Shop',        'category': $getCategory(itemData.categories[0].id) ? $getCategory(itemData.categories[0].id) : 'Accessories',        'inStock': true,        'reviews': []        })";
  try {
    const { result, ...httpResponse } = await catalogApi.listCatalog(
      "",
      "ITEM,IMAGE,CATEGORY"
    );
    const { statusCode } = httpResponse;
    const expression = jsonata(jsonata_query);
    const products = await expression.evaluate(result);
    console.log(statusCode);

    return products;
  } catch (error: any) {
    if (error instanceof ApiError) {
      error.result.errors.forEach(function (e: any) {
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
