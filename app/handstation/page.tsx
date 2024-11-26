import React from "react";
import Filter from "@/components/Filter";
import ProductGrid from "@/components/ProductGrid";
import Breadcrumb from "@/components/BreadCrumb";

const products = Array(12).fill({
  name: "Retevis гар станц",
  price: "120'000₮",
  image: "retevis-sample.png",
});

const Home: React.FC = () => {
  return (
    <div className="flex flex-row gap-4">
      {/* Filter Sidebar */}
      <aside className="w-1/4 p-4 bg-gray-50 border rounded-lg hide">
        <Filter />
      </aside>

      {/* Product Grid */}
      <main className="flex-1 ">
        <Breadcrumb />
        <ProductGrid title="Гар станц" products={products} />
      </main>
    </div>
  );
};

export default Home;
