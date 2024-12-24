export type TRooms = {
  name: string;
  roomNo: number;
  floorNo: number;
  capacity: number;
  pricePerSlot: number;
  details: string;
  category: string;
  ratings: number[];
  img: string;
  detailImages: string[];
  amenities: string[];
  isDeleted: boolean;
};
