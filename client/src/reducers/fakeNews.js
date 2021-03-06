export default (state = { fakenews: [], isLoading: true }, action) => {
  switch (action.type) {
    case "START_LOADING":
      return { ...state, isLoading: true };
    case "END_LOADING":
      return { ...state, isLoading: false };
    case "FETCH_ALL":
      return {
        ...state,
        fakenews: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case "FETCH_BY_SEARCH":
      return {
        ...state,
        fakenews: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case "FETCH_NEWS":
      return { ...state, fakenewsitem: action.payload };
    case "TRENDING":
      return { ...state, trending: action.payload };
    case "DELETE":
      return {
        ...state,
        fakenews: state.fakenews.filter((news) => news._id != action.payload),
      };
    case "RECOMMENDED":
      return { ...state, recommendednews: action.payload };
    case "LIKE":
    case "DISLIKE":
      return {
        ...state,
        fakenews: state.fakenews.map((newsItem) =>
          newsItem._id === action.payload._id ? action.payload : newsItem
        ),
      };
    case "COMMENT":
      return {
        ...state,
        fakenews: state.fakenews.map((newsItem) => {
          if (newsItem._id === action.payload._id) return action.payload;
          
          return newsItem;
        })
      }
    default:
      return state;
  }
};
