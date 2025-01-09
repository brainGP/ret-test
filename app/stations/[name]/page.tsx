import Breadcrumb from "@/components/BreadCrumb";
import BackButton from "@/components/BackButton";
import { getProductByName } from "@/apis/products";
import NotFound from "@/app/not-found";
import RelatedProducts from "./related";
import StationCard from "./station";
import MetaTags from "@/components/Metatags";

const StationNamePage = async ({
  params,
}: {
  params: Promise<{ name: string }>;
}) => {
  const name = (await params).name;
  const station = await getProductByName({ name });
  if (!station) {
    return <NotFound />;
  }

  return (
    <>
      <MetaTags data={station} />
      <div className="px-4 flex-1 justify-center gap-8">
        <div className="flex gap-4 items-center md:ml-20">
          <BackButton />
          <Breadcrumb />
        </div>
        <StationCard station={station} />
        <RelatedProducts brand={station.brand} id={station._id} />
      </div>
    </>
  );
};

export default StationNamePage;
