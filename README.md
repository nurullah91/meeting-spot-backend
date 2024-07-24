# Meeting Spot server

This is a co-working spaces for meetings and discussions management website server. In this website you can create user, admin and login. Admin can create room and slots. Here is the features of this server. Here is 4 model

1. User Model
2. Room Model
3. Slots Model
4. Booking Model

## Features

- Admin Actions: Administrators have the privilege of creating, updating, and deleting rooms. They can specify details like the room's name, room number, floor number, capacity, price per slot, and available amenities. Additionally, admins are responsible for creating time slots for each room. They set the date, start time, and end time for these slots, ensuring that users have a range of options to choose from. Through the web interface, admins can effortlessly manage the co-working space inventory and slot availability, ensuring accurate and up-to-date information for users.

- User Interactions: On the user side, individuals can create bookings by selecting from the available time slots for their desired meeting times. They input the date and select specific slots for their sessions, along with their preferred room selection. The system automatically calculates the total amount based on the number of slots selected and the price per slot. Users receive real-time feedback on the availability of rooms and slots, ensuring smooth booking experiences without conflicts.

> ## _API end points_
>
> ### User
>
> - POST: api/auth/signup
> - POST: api/auth/login

> ### Rooms
>
> - POST: api/rooms(Only Accessible by Admin)
> - PUT:api/rooms/:id(Only Accessible by Admin)
> - DELETE:api/rooms/:id(Only Accessible by Admin)
> - GET: api/rooms
> - GET: api/rooms/:id

> ### Slots
>
> - POST: api/slots
> - PUT: api/v1/orders/:id
> - DELETE: api/v1/orders/:id
> - GET: /api/slots/availability
> - GET:/api/slots/availability?date=2024-06-15&roomId=60d9c4e4f3b4b544b8b8d1c5

> ### Bookings
>
> - POST: api/bookings
> - GET: api/bookings(only accessible by admin)
> - GET: api/bookings/my-bookings(only accessible by authenticated User)
> - PUT: api/bookings/:id(only accessible by admin)
> - DELETE: api/bookings/:id(only accessible by admin)

---

### Sample Request

**Create User:**
`/api/auth/signup`(POST)

```
{
  "name": "Programming Hero",
  "email": "web@meeting-spot.com",
  "password": "ms-password",
  "phone": "1234567890",
  "role": "admin", //role can be user or admin
  "address": "123 Main Street, City, Country"
}

```

**Login User:**
`/api/auth/login`(POST)

```
{
    "email": "web@meeting-spot.com",
    "password": "ms-password",
}
```

- Response model:

```
{
    "success": true,
    "statusCode": 200,
    "message": "User logged in successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MDYyOWI4ZThjZmNkOTI2Mzg0YjZlNWUiLCJuYW1lIjoiUHJvZ3JhbW1pbmcgSGVyb3MiLCJlbWFpbCI6IndlYkBwcm9ncmFtbWluZy1oZXJvLmNvbSIsInBob25lIjoiMTIzNDU2Nzg5MCIsInJvbGUiOiJhZG1pbiIsImFkZHJlc3MiOiIxMjMgTWFpbiBTdHJlZXQsIENpdHksIENvdW50cnkiLCJpYXQiOjE2MjQ1MTY2MTksImV4cCI6MTYyNDUyMDYxOX0.kWrEphO6lE9P5tvzrNBwx0sNogNuXpdyG-YoN9fB1W8",
    "data": {
        "_id": "60629b8e8cfcd926384b6e5e",
        "name": "Meeting Spot",
        "email": "web@meeting-spot.com",
        "phone": "1234567890",
        "role": "admin",
        "address": "123 Main Street, City, Country"
    }
}
```

---

**Create Room:**
`/api/rooms`(POST) only admin access

- Request headers:

```
Authorization:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

- Request Body:

```
 {
  "name": "Conference Room",
  "roomNo": 201,
  "floorNo": 1,
  "capacity": 20,
  "pricePerSlot": 100,
  "amenities": ["Projector", "Whiteboard"]
}
```

---

**Update Room:**
`/api/rooms/:id`(PUT) only admin access

- Request headers:

```
Authorization:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

- Request Body:

```
 {
  "pricePerSlot": 100,
}

```

---

**Create Slot:**
`/api/slots`(POST) only admin access

- Request headers:

```
Authorization:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

- Request Body:

```
 {
    "room": "60d9c4e4f3b4b544b8b8d1c5",
    "date": "2024-06-15",
    "startTime": "09:00",
    "endTime": "14:00"
}
```

---

**Bookings:**
`/api/bookings`(POST)Only Accessible by Authenticated User

- Request headers:

```
Authorization:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

- Request Body:

```
{
  "date": "2024-06-15",
  "slots": ["60d9c4e4f3b4b544b8b8d1c6", "60d9c4e4f3b4b544b8b8d1c7"],
  "room": "60d9c4e4f3b4b544b8b8d1c5",
  "user": "60d9c4e4f3b4b544b8b8d1c4"
}
```

---

**Update Booking:**
`/api/bookings/:id`(PUT) only admin access

- Request headers:

```
Authorization:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

- Request Body:

```
 {
  "isConfirmed": "confirmed",
}

```

---

- **Sample Error response:**

```
   {
    "success": false,
    "message": "E11000 duplicate key error collection: univerity-management.students index: email_1 dup key: { email: \\"user2@gmail.com\\" }",
    "errorMessages": [
        {
            "path": "",
            "message": "E11000 duplicate key error collection: univerity-management.students index: email_1 dup key: { email: \\"user2@gmail.com\\" }"
        }
    ],
    "stack": "MongoServerError: E11000 duplicate key error collection:meetingSpot.users index: email_1 dup key: { email: \\"user2@gmail.com\\" }\\n    at H:\\\\next-level-development\\\\university-management-auth-service\\\\node_modules\\\\mongodb\\\\src\\\\operations\\\\insert.ts:85:25\\n    at H:\\\\next-level-development\\\\university-management-auth-service\\\\node_modules\\\\mongodb\\\\src\\\\cmap\\\\connection_pool.ts:574:11\\n    at H:\\\\next-level-development\\\\university-writeOrBuffer (node:internal/streams/writable:391:12)"
}
```

---

- **No Data found response:**

```
   {
  "success": false,
  "statusCode": 404,
  "message": "No Data Found",
  "data":[]
}
```

---

- **Authentication error response:**

```
 {
  "success": false,
  "statusCode": 401,
  "message": "You have no access to this route",
}
```

---

### ** Use Authorization with bearer for every authenticated request **

---

### ■ Local installation guideline:

first clone this repository then give this command in you terminal

```language
npm i
npm run start:dev
```

---

> - Here is a video overview and understanding of this project [link](https://drive.google.com/file/d/1V3pFLosv9b41h-oU8JhIeUvX35ZScJXD/view?usp=drive_link)

## Live link of Server side production [link](https://meeting-spot-backend.vercel.app/)
