import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "./react-redux";
import { store } from "./store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import WhishList from "./pages/WhishList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/whishlist",
        element: <WhishList />,
      },
    ],
  },
]);

createRoot(document.querySelector("#root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
