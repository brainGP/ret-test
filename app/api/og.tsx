import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string; type: string; name: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const name = decodeURIComponent(params.name);

  try {
    const product = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/find/${name}`
    ).then((res) => {
      if (!res.ok) throw new Error("Failed to fetch product");
      return res.json();
    });

    const previousImages = (await parent)?.openGraph?.images || [];

    return {
      title: product.name || "Retevis Mongolia",
      description: product.description || "No description available",
      openGraph: {
        images: [
          product.images?.[0]?.image || "/noresult.png",
          ...previousImages,
        ],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);

    return {
      title: "Product Not Found",
      description: "The product you're looking for could not be found.",
      openGraph: {
        images: ["/noresult.png"],
      },
    };
  }
}
