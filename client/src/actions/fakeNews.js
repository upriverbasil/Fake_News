import * as api from '../api'


//action creators
export const getFakeNews = (page) => async(dispatch) => {
    try {
        const {data} = await api.fetchNews(page);

        dispatch({type: 'FETCH_ALL',payload: data})
    } catch (error) {
        console.log(error.message)
    }
}


export const getFakeNewsBySearch = (searchQuery) => async(dispatch) => {
  try {
    const { data: { data } } = await api.fetchNewsBySearch(searchQuery);

    dispatch({type:'FETCH_BY_SEARCH', payload:data})
  } catch (error) {
      console.log(error.message)
  }
}

export const likeNews = (id) => async (dispatch) => {
    try {
      const { data } = await api.likeNews(id);
  
      dispatch({ type: 'LIKE', payload: data });
    } catch (error) {
      console.log(error.message);
    }
};

export const dislikeNews = (id) => async (dispatch) => {
  try {
    const { data } = await api.dislikeNews(id);

    dispatch({ type: 'DISLIKE', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

