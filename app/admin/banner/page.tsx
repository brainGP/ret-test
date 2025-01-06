"use client";
import React, { useEffect, useState } from "react";
import { getBanners } from "@/apis/banner";
import Image from "next/image";
import { baseUrl } from "@/lib/staticData";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
const BannerPage = () => {
  const [banners, setBanners] = useState<any[]>([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const bannersData = await getBanners();
        setBanners(bannersData);
      } catch {
        toast.error("Error occurred while fetching banners.");
      }
    };

    fetchBanners();
  }, []);

  const handleDelete = (imageId: string) => {
    console.log(`Deleting image with ID: ${imageId}`);

    toast.success("Image deleted successfully!");
  };

  return (
    <div className="md:px-8 p-4 m-4">
      <Button className="mb-4 px-4 py-2">Add Banner</Button>

      <ScrollArea className="w-full overflow-x-auto rounded-md border">
        <Table>
          <TableCaption>A list of all banner images.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[30px] text-center">#</TableHead>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead className="w-[100px] text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {banners.length > 0 ? (
              banners.map((banner, index) =>
                banner.images.map((image: { _id: string; image: string }) => (
                  <TableRow key={image._id}>
                    <TableCell className="text-center font-medium">
                      {index + 1}.
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center p-4">
                        <Image
                          src={`${baseUrl}${image.image}`}
                          alt={`Banner image ${image._id}`}
                          width={300}
                          height={300}
                          className="rounded-md"
                        />
                      </div>
                    </TableCell>

                    <TableCell className="text-center">
                      <button
                        onClick={() => handleDelete(image._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              )
            ) : (
              <TableRow>
                <TableCell colSpan={2} className="text-center">
                  No banners available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}></TableCell>
            </TableRow>
          </TableFooter>
        </Table>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default BannerPage;
