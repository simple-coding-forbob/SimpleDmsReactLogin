import { lazy } from "react";

// 예약 게시판
const BookingList = lazy(() => import("../pages/booking/BookingList"));
const AddBooking = lazy(() => import("../pages/booking/AddBooking"));
const BookingDetail = lazy(() => import("../pages/booking/BookingDetail"));

export const bookingRoutes = [
  { path: "booking", element: <BookingList /> },
  { path: "add-booking", element: <AddBooking /> },
  { path: "booking-detail/:rid", element: <BookingDetail /> },
];
