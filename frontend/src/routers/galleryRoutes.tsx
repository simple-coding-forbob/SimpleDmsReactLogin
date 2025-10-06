import { lazy } from "react";

// 갤러리
const GalleryList = lazy(() => import("../pages/gallery/GalleryList"));
const AddGallery = lazy(() => import("../pages/gallery/AddGallery"));

export const galleryRoutes = [
      { path: "gallery", element: <GalleryList /> },
      { path: "add-gallery", element: <AddGallery /> },
];
