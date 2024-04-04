import jsonata from "jsonata";

export default async function getProductsFromSquare() {
  const jsonata_query: string =
    "$.objects.{'images': [{'color': 'Blue','colorCode': '#0000FF','image': 'https://firebasestorage.googleapis.com/v0/b/cozie-shop.appspot.com/o/products%2F1712137534743-1I7xZIE.png?alt=media&token=694e25e2-2149-4d16-a9e6-5ee82758d7f9'}],'id': id,'name': item_data.name,'description': item_data.description,'price': item_data.variations[0].item_variation_data.price_money.amount,'brand': 'Cozie Shop','category': 'Accessories','inStock': true,'reviews': []}";
  try {
    const products = await fetch(
      `https://connect.squareup.com/v2/catalog/list?types=ITEM`,
      {
        method: "get",
        headers: {
          "Square-Version": "2024-03-20",
          "Authorization": "Bearer EAAAlz_Brq_K9jP9cdHn9GoJ-PgpvrIcn5vb-XHTjQTWklL8kVLDRiuj-QwHMTH1",
          "Content-Type": "application/json",
        },
        cache: "force-cache",
        next: {
          tags: ["products"],
        }
      }
    )
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((res) => {
        console.log(res);
        return jsonata(jsonata_query).evaluate(res);
      });

    console.log(products);
    return products;
  } catch (error: any) {
    throw new Error(error);
  }
}

/*
curl https://connect.squareup.com/v2/catalog/list?types=ITEM&cursor= \
  -H 'Square-Version: 2024-03-20' \
  -H 'Authorization: Bearer EAAAlz_Brq_K9jP9cdHn9GoJ-PgpvrIcn5vb-XHTjQTWklL8kVLDRiuj-QwHMTH1' \
  -H 'Content-Type: application/json'
*/

// {
//   "images": [
//       {
//           "color": "White",
//           "colorCode": "#FFFFFF",
//           "image": "https://firebasestorage.googleapis.com/v0/b/cozie-shop.appspot.com/o/products%2F1712137499149-pexels-niklas-jeromin-16832092.jpg?alt=media&token=5c5e821b-81a0-4fb3-a3a1-7fb087a47e68"
//       },
//       {
//           "color": "Black",
//           "colorCode": "#000000",
//           "image": "https://firebasestorage.googleapis.com/v0/b/cozie-shop.appspot.com/o/products%2F1712137506633-alex-bierwagen-5tW1ca0Zq18-unsplash.jpg?alt=media&token=c8596df8-1bbc-4ada-abb7-48f830356b0e"
//       },
//       {
//           "color": "Silver",
//           "colorCode": "#c0c0c0",
//           "image": "https://firebasestorage.googleapis.com/v0/b/cozie-shop.appspot.com/o/products%2F1712137508849-christopher-gower-_aXa21cf7rY-unsplash.jpg?alt=media&token=4eaeaf02-0602-4bcb-8972-11639c30ca97"
//       },
//       {
//           "color": "Gray",
//           "colorCode": "#808080",
//           "image": "https://firebasestorage.googleapis.com/v0/b/cozie-shop.appspot.com/o/products%2F1712137511578-ghMVusa.png?alt=media&token=76a21153-d7f1-4059-b59b-d0d7aee1d81e"
//       },
//       {
//           "color": "red",
//           "colorCode": "#FF0000",
//           "image": "https://firebasestorage.googleapis.com/v0/b/cozie-shop.appspot.com/o/products%2F1712137520107-6hjELAT.png?alt=media&token=28b47a49-44dc-4849-b2ba-8bd07bab567b"
//       },
//       {
//           "color": "Gold",
//           "colorCode": "#FFD700",
//           "image": "https://firebasestorage.googleapis.com/v0/b/cozie-shop.appspot.com/o/products%2F1712137527675-2YAQucu.png?alt=media&token=8d290e6a-4748-4009-ac61-9d355b0b7439"
//       },
//       {
//           "color": "Blue",
//           "colorCode": "#0000FF",
//           "image": "https://firebasestorage.googleapis.com/v0/b/cozie-shop.appspot.com/o/products%2F1712137534743-1I7xZIE.png?alt=media&token=694e25e2-2149-4d16-a9e6-5ee82758d7f9"
//       },
//       {
//           "color": "Graphite",
//           "colorCode": "#383838",
//           "image": "https://firebasestorage.googleapis.com/v0/b/cozie-shop.appspot.com/o/products%2F1712137543136-0bvxo169pukb1.jpg?alt=media&token=7baf6e9d-33af-4640-8032-07c2041bf7d5"
//       }
//   ],
//   "id": "660d254c87074a2e47d08a2d",
//   "name": "iPhone 15 Pro Max 256GB",
//   "description": "<p data-mce-fragment=\"1\"><strong>Title: Modern Business Presentation Template</strong><span style=\"font-size: 0.875rem;\"></span></p>\n<p style=\"text-align: center;\" data-mce-fragment=\"1\"><span style=\"font-size: 0.875rem;\">Elevate your business presentations to new heights with our Modern Business Presentation Template.</span></p>\n<ul>\n<li><em>Designed for professionals seeking a sleek and polished look, this template offers a contemporary aesthetic coupled with intuitive functionality.</em></li>\n<li>Whether you're pitching ideas, showcasing reports, or delivering sales presentations, this versatile template provides the perfect canvas to captivate your audience and convey your message effectively.</li>\n</ul>\n<p>&nbsp;</p>\n<p><span style=\"text-decoration: underline;\"><em>Key Features:</em></span></p>\n<ol>\n<li>Stylish Design: Impress your audience with a modern and professional design that reflects your brand's sophistication and credibility.</li>\n<li>Easy Customization: Effortlessly personalize each slide to align with your content and branding, thanks to easy-to-use editing tools and customizable layouts.</li>\n<li>Versatile Slides: Choose from a wide range of slide layouts, including title slides, section breaks, infographics, charts, and more, to create a dynamic and engaging presentation.</li>\n</ol>\n<p style=\"text-align: right;\">Right-Aligned: <span data-mce-fragment=\"1\">Whether you're a corporate executive, entrepreneur, educator, or consultant, our Modern Business Presentation Template empowers you to deliver memorable presentations that resonate with your audience and drive results. </span></p>\n<p style=\"text-align: right;\">&nbsp;</p>\n<p style=\"text-align: right;\"><em><strong><span style=\"text-decoration: underline;\">Upgrade your presentations today and make a lasting impression with our sleek and professional template.</span></strong></em></p>",
//   "price": 1000,
//   "brand": "Cozie Shop",
//   "category": "Accesories",
//   "inStock": true,
//   "reviews": []
// }
