export default (state=[],action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload
        case 'LIKE':
        case 'DISLIKE':
            return state.map((newsItem) => (newsItem._id === action.payload._id ? action.payload : newsItem));
        default:
            return state;
    }
}