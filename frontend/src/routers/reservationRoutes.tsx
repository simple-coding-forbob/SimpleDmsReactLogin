import { lazy } from "react";

// 예약 게시판
const ReservationList = lazy(
  () => import("../pages/reservation/ReservationList")
);
const AddReservation = lazy(
  () => import("../pages/reservation/AddReservation")
);
const ReservationDetail = lazy(
  () => import("../pages/reservation/ReservationDetail")
);

export const reservationRoutes = [
  { path: "reservation", element: <ReservationList /> },
  { path: "add-reservation", element: <AddReservation /> },
  { path: "reservation-detail/:rid", element: <ReservationDetail /> },
];
