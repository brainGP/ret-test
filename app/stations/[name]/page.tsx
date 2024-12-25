import Breadcrumb from "@/components/BreadCrumb";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import { getProductByName } from "@/apis/products";
import NotFound from "@/app/not-found";
import RelatedProducts from "./related";
import StationCard from "./station";

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
      <Header />
      <div className="px-8 flex-1 justify-center gap-8">
        <div className="flex-1 space-y-4 py-4">
          <Breadcrumb />
          <BackButton />
        </div>
        <StationCard station={station} />
        <RelatedProducts brand={station.brand} id={station._id} />
      </div>
      <Footer />
    </>
  );
};

export default StationNamePage;
