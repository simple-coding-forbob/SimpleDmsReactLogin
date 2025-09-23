import { RouterProvider } from "react-router-dom";
import router from "./routers/routes2";
import "./App.css";
import { HeadProvider } from "react-head";

function App() {
  return (
    <HeadProvider>
      <RouterProvider router={router} />
    </HeadProvider>
  );
}

export default App;
