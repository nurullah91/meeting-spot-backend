import QueryBuilder from '../../../builder/QueryBuilder';
import { TRooms } from './rooms.interface';
import Room from './rooms.model';
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
  // const result = await User.updateMany(
  //   { profilePhoto: { $exists: false } },
  //   {
  //     $set: {
  //       profilePhoto:
  //         'https://res.cloudinary.com/dbwftcxvx/image/upload/v1727985302/image_8_sdrdqj.jpg',

  //       coverPhoto:
  //         'https://res.cloudinary.com/dbwftcxvx/image/upload/v1735279938/Brown_Modern_Hotel_Promo_Instagram_Post_1200_x_330_px_p1e49r.png',
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
