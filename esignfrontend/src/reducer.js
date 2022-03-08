import Store from "./store";

const reducer = (state = Store, action) => {
  const { type, value } = action;
  switch (type) {
    case "status":
      return { ...state, pageStatus: value };
    default:
      return state;
  }
};
export default reducer;
