import QueryBuilder from '../../../builder/QueryBuilder';
import { TRooms } from './rooms.interface';
import Room from './rooms.model';
import { ReviewServices } from '../reviews/reviews.service';
import { Review } from '../reviews/reviews.model';

const createRoomsIntoDB = async (payload: TRooms) => {
  const result = await Room.create(payload);

  return result;
};

const getAllRoomsFromDB = async (query: Record<string, unknown>) => {
  const roomQuery = new QueryBuilder(Room.find(), query)
    .search(['name', 'amenities', 'category'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await roomQuery.countTotal();
  // Execute the query

  // Add avgRatings field to each room
  const result = await roomQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleRoomsFromDB = async (id: string) => {
  const result = await Room.findById(id).lean();

  if (!result) {
    return null;
  }

  // const reviews = await ReviewServices.getSingleRoomsReviewsFromDB(id);
  const reviews = await Review.find({ room: id });

  return { ...result, reviews };
};

const updateSingleRoomsIntoDB = async (
  id: string,
  payload: Partial<TRooms>,
) => {
  const result = await Room.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteSingleRoomFromDB = async (id: string) => {
  const result = await Room.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    },
  );

  return result;
};

const testQueryIntoDB = async () => {
  // const result = await Room.updateMany(
  //   { details: { $exists: false } },
  //   {
  //     $set: {
  //       details:
  //         'Meeting Room A at Meeting Spot is a premium venue designed to host grand gatherings, conferences, and large-scale events. Situated on the 4th floor, Room No. 400 boasts an impressive capacity of 500 guests, making it perfect for corporate seminars, workshops, or special ceremonies. The room is elegantly equipped with modern amenities, including high-speed Wi-Fi for seamless connectivity, a comfortable sofa setup, and catering options featuring breakfast and lunch. A dedicated stage adds to its versatility, making it ideal for presentations or performances. Priced affordably at $200 per slot, Meeting Room A ensures exceptional value without compromising on quality. The space is complemented by stunning decor, as showcased in the detailed gallery. Experience a combination of style, functionality, and comfort at Meeting Spot’s Meeting Room A, where every detail is crafted for success',

  //       description:
  //         "Meeting Room A is the perfect choice for hosting large-scale events, conferences, and seminars. Located on the 4th floor of Meeting Spot, this spacious room can comfortably accommodate up to 500 guests, making it ideal for both corporate and social gatherings, The room is thoughtfully designed with modern amenities, including high-speed Wi-Fi for uninterrupted connectivity, a cozy sofa seating area for informal discussions, and catering services offering breakfast and lunch to keep attendees refreshed. A dedicated stage adds versatility, making it suitable for presentations, performances, or keynote speeches. With a competitive price of $200 per slot, Meeting Room A delivers a premium experience at an exceptional value. Whether you're hosting a formal business event or a celebratory occasion, this room offers the perfect blend of functionality and comfort.",
  //       isFeatured: false,
  //       discount: 0,
  //       ratings: [],
  //       category: 'Seminar Halls',
  //     },
  //   },
  // );
  const result = await Room.find();
  return result;
};
export const RoomServices = {
  createRoomsIntoDB,
  getAllRoomsFromDB,
  testQueryIntoDB,
  getSingleRoomsFromDB,
  updateSingleRoomsIntoDB,
  deleteSingleRoomFromDB,
};
