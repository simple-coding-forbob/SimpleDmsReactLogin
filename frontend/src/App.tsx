import { HeadProvider } from "react-head";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routers/router";

function App() {
  return (
    <HeadProvider>
      <RouterProvider router={router} />
    </HeadProvider>
  );
}

export default App;
