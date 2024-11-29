// // app/stations/[id]/page.tsx
// "use client";
// import React, { useState, useEffect } from "react";
// import stations from "@/data/stations.json";
// import NotFound from "@/app/not-found";

// const StationIdPage = ({ params: { id } }) => {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = stations.find((station) => station.id === id);
//       setData(data);
//     };
//     fetchData();
//   }, [id]);

//   if (!data) return <NotFound />;

//   return <div>{data.name}</div>;
// };

// export default StationIdPage;
import React from "react";

function StationIdPage() {
  return <div>id aar n </div>;
}

export default StationIdPage;
