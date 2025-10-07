import { lazy } from "react";

// QnA
const PublicCarList = lazy(() => import("../pages/publiccar/PublicCarList"));
const AddPublicCar = lazy(() => import("../pages/publiccar/AddPublicCar"));
const PublicCarDetail = lazy(() => import("../pages/publiccar/PublicCarDetail"));

export const publicCarRoutes = [
  { path: "public-car", element: <PublicCarList /> },
  { path: "add-public-car", element: <AddPublicCar /> },
  { path: "public-car-detail/:pid", element: <PublicCarDetail /> },
];
