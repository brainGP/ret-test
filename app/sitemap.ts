import { getProducts } from "@/apis/products";

export default async function sitemap() {
  const base = "https://retevis.mn";

  //get all cms
  const stations = await getProducts();
  const stationsURL =
    stations?.map((stations) => {
      return {
        url: `${base}/stations/${stations.name}`,
        lastModified: new Date(),
      };
    }) ?? [];

  return [
    {
      url: base,
      lastModified: new Date(),
    },
    ...stationsURL,
  ];
}
