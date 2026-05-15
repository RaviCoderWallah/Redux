export const func =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (typeof action.type === "function") {
      action(dispatch, getState);
    } else {
      next(action);
    }
  };
