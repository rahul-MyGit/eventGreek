# Event Booking Application

- Tech stack use are: Next + Ts + NextAuth + prisma + vitest

## To Run Locally

- Step 1

```bash
  https://github.com/codes30/events-platform.git
```

- Step 2

```bash
-- npm install
-- npx auth secret
```

- step 3

```bash
-- In your .env.local file write all urls mentioned in .env.example
```

- step 4

```bash
-- npm prisma migrate dev --name init
```

- step 5

```bash
-- npm run dev
```

## Installation with Docker

- Start project using docker

```bash
  docker-compose up --build
```

- Stop project using docker

```bash
  docker-compose down
```

## Functionality and Features

- Users can view all available categories.

- One categories have many events.

- Users can book a events by paying online using the razorpay payment gateway.

- Users can view their booked events after booking.

- User can also create, edit, and delete his own created events.

- User can see his booking in bookingDetails.
