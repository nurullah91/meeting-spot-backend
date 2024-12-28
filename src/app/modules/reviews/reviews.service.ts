import Room from '../rooms/rooms.model';
import { TReviews } from './reviews.interface';
import { Review } from './reviews.model';

const createReviewsIntoDB = async (payload: TReviews) => {
  const result = await Review.create(payload);
  // Update rooms ratings array
  await Room.findByIdAndUpdate(payload.room, {
    $push: { ratings: payload.ratings },
  });
  return result;
};

//   const getAllReviewsFromDB = async (query: Record<string, unknown>) => {
//     const roomQuery = new QueryBuilder(Room.find(), query)
//       .search(['name', 'amenities'])
//       .filter()
//       .sort()
//       .paginate()
//       .fields();

//     const meta = await roomQuery.countTotal();
//     // Execute the query

//     // Add avgRatings field to each room
//     const result = await Room.aggregate([
//       {
//         $match: roomQuery.modelQuery.getFilter(),
//       },
//       {
//         $addFields: {
//           avgRatings: {
//             $cond: [{ $eq: [{ $size: '$ratings' }, 0] }, 0, { $avg: '$ratings' }],
//           },
//         },
//       },
//     ]);

//     return {
//       meta,
//       result,
//     };
//   };

const getSingleRoomsReviewsFromDB = async (id: string) => {
  const result = await Review.find({ room: id }).populate('user');

  return result;
};

const updateSingleReviewIntoDB = async (
  id: string,
  payload: Partial<TReviews>,
) => {
  const result = await Review.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteSingleReviewFromDB = async (id: string) => {
  const result = await Review.findByIdAndUpdate(
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
export const ReviewServices = {
  createReviewsIntoDB,
  updateSingleReviewIntoDB,
  deleteSingleReviewFromDB,
  getSingleRoomsReviewsFromDB,
};
