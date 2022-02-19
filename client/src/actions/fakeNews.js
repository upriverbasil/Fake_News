import * as api from '../api'


//action creators
export const getFakeNews = () => async(dispatch) => {
    
    try {
        const {data} = await api.fetchNews();
        dispatch({type:'FETCH_ALL',payload:data})
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

