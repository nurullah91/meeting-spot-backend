export type TRooms = {
  name: string;
  roomNo: number;
  floorNo: number;
  capacity: number;
  pricePerSlot: number;
  discount: number;
  details: string;
  description: string;
  category: string;
  ratings: number[];
  img: string;
  detailImages: string[];
  amenities: string[];
  isFeatured: boolean;
  isDeleted: boolean;
};
