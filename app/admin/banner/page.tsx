"use client";
import React, { useEffect, useState } from "react";
import { getBanners } from "@/apis/banner";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DELETE } from "@/apis/axios";
import { getCookie } from "cookies-next";
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
import BannerModal from "../components/bannerModal";
import { baseUrl } from "@/lib/staticData";
import ConfirmationDialog from "../components/confirmation";
import Image from "next/image";
import { Banner } from "@/types/Banner";
import { postNewBanner } from "@/apis/banner";

const BannerPage = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [bannerToDelete, setBannerToDelete] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const bannersData = await getBanners();
        setBanners(bannersData);
      } catch (error) {
        console.error("Error fetching banners:", error);
        toast.error("Error occurred while fetching banners.");
      }
    };

    fetchBanners();
  }, []);

  const handleDelete = async () => {
    if (!bannerToDelete) return;
    try {
      const accessToken = getCookie("accessToken") as string;
      if (!accessToken) throw new Error("Unauthorized user");

      const response = await DELETE({
        route: `/api/dashboard/${bannerToDelete}`,
        token: accessToken,
      });

      if (response.status === 200) {
        setBanners((prev) =>
          prev.filter((banner) => banner._id !== bannerToDelete)
        );
        toast.success("Banner deleted successfully.");
      }
    } catch (error) {
      console.error("Error deleting banner:", error);
      toast.error("Failed to delete banner.");
    } finally {
      setIsDialogOpen(false);
      setBannerToDelete(null);
    }
  };

  const handleAddBanner = () => {
    setIsModalOpen(true);
  };

  const handleSaveBanner = async (newBanner: Banner, files: File[]) => {
    try {
      const formData = new FormData();

      formData.append("banner", files.length > 0 ? files[0] : newBanner.image);

      const banner = await postNewBanner(formData);
      toast.success("New banner added successfully.");
      setBanners((prev) => [...prev, banner]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving banner:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="md:px-8 p-4 m-4">
      <Button className="mb-4" onClick={handleAddBanner}>
        Add Banner
      </Button>
      {isModalOpen && (
        <BannerModal
          banner={{ _id: "", image: "" }}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveBanner}
        />
      )}

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
              banners.map((banner, index) => (
                <TableRow key={banner._id}>
                  <TableCell className="text-center font-medium">
                    {index + 1}.
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center p-4">
                      <Image
                        src={`${baseUrl}${banner.image}`}
                        alt={`Banner image ${banner._id}`}
                        width={300}
                        height={300}
                        className="rounded-md"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      className="px-4 py-2 bg-red-500 text-white"
                      onClick={() => {
                        setBannerToDelete(banner._id);
                        setIsDialogOpen(true);
                      }}
                    >
                      Устгах
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
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

      <ConfirmationDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        title="Баннер устгах"
        description="Энэ үйлдлийг буцаах боломжгүй. Та энэ баннерыг устгахдаа итгэлтэй байна уу?"
        callback={handleDelete}
        actionLabel="Устгах"
      />
    </div>
  );
};

export default BannerPage;
