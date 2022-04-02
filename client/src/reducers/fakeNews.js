export default (state=[], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return {
                ...state,
                fakenews: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case 'FETCH_BY_SEARCH':
            return {...state, fakenews: action.payload};
        case 'FETCH_NEWS':
            return {...state, fakenewsitem: action.payload};
        case 'TRENDING':
            return {...state, trending:action.payload};
        case 'DELETE':
            return {...state, fakenews:state.fakenews.filter((news)=> news._id!=action.payload)}
        case 'LIKE':
        case 'DISLIKE':
            return { ...state, fakenews: state.fakenews.map((newsItem) => (newsItem._id === action.payload._id ? action.payload : newsItem)) };
        default:
            return state;
    }
}