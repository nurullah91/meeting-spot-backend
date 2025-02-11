import QueryBuilder from '../../../builder/QueryBuilder';
import { TRooms } from './rooms.interface';
import Room from './rooms.model';
import { Review } from '../reviews/reviews.model';
import { ReviewServices } from '../reviews/reviews.service';

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

  // Manually calculate and add avgRatings
  const avgRatings =
    result.ratings && result.ratings.length > 0
      ? result.ratings.reduce((sum, rating) => sum + rating, 0) /
        result.ratings.length
      : 0;

  const reviews = await ReviewServices.getSingleRoomsReviewsFromDB(id);
  // const reviews = await Review.find({ room: id });

  return { ...result, avgRatings, reviews };
};

const getAllRoomCategoriesFromDB = async () => {
  const result = await Room.distinct('category');
  return result;
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
  //   { details: { $exists: true } },
  //   {
  //     $set: {
  //       details:
  //         "<p>Step into <strong>Summit Room</strong>, a spacious and well-equipped <strong>seminar hall</strong> designed to host <strong>conferences, corporate events, and large-scale gatherings</strong>. With a generous <strong>capacity of 500 guests</strong>, this venue ensures a comfortable and professional atmosphere for any occasion.</p><p>Featuring <strong>modern decor and premium facilities</strong>, The Summit Room is perfect for <strong>business presentations, keynote speeches, training workshops, and networking events</strong>.</p><p><br></p><h3><strong aria-hidden='true'>Key Features &amp; Amenities</strong></h3><p>✔️ <strong>High-Speed Wi-Fi</strong> – Seamless connectivity for presentations and live streaming</p><p>✔️ <strong>Breakfast &amp; Lunch Service</strong> – Energize your attendees with delicious catering</p><p>✔️ <strong>Advanced Audio-Visual Setup</strong> – TV &amp; Projector for impactful presentations</p><p>✔️ <strong>Dedicated Stage</strong> – Ideal for speakers, performances, and panel discussions</p><p>✔️ <strong>Comfortable Seating</strong> – Spacious layout with cozy sofa arrangements</p><p><br></p><h3><strong aria-hidden='true'>Why Choose Summit Room?</strong></h3><p>🔹 <strong>Spacious &amp; Well-Designed</strong> – Ample space for networking and discussions</p><p>🔹 <strong>Affordable &amp; High-Value</strong> – At just <strong>$80 per slot</strong>, it's a budget-friendly option</p><p>🔹 <strong>Versatile Setup</strong> – Adaptable for corporate, academic, and social events</p><p>Book <strong>Summit Room</strong> today and host a <strong>successful, seamless, and engaging event</strong> at <strong>Meeting Spot</strong>!</p>",
  //     },
  //   },
  // );
  const result = await Review.find({ room: '66771ae7f6ab22de871a25a3' });
  return result;
};
export const RoomServices = {
  createRoomsIntoDB,
  getAllRoomsFromDB,
  testQueryIntoDB,
  getSingleRoomsFromDB,
  getAllRoomCategoriesFromDB,
  updateSingleRoomsIntoDB,
  deleteSingleRoomFromDB,
};
