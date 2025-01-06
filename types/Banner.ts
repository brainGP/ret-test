export interface BannerImage {
  _id: string;
  image: string;
}

export interface Banner {
  _id: string;
  images: BannerImage[];
}
