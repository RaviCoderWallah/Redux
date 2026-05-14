export const apiMiddleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    const BASE_URL = "https://fakestoreapi.com";
    if (action.type == "api/makeCall") {
      next(action);
      const { url, onStart, onError, onSuccess } = action.payload;
      async function fetchingProduct() {
        try {
          dispatch({
            type: onStart,
            payload: false,
          });

          const response = await fetch(`${BASE_URL}/${url}`);
          const data = await response.json();

          dispatch({
            type: onSuccess,
            payload: data,
          });
        } catch (error) {
          dispatch({
            type: onError,
          });
        }
      }
      fetchingProduct();
    } else {
      next(action);
    }
  };

//API action createors
export const fetchData = (payload) => ({ type: "api/makeCall", payload });
