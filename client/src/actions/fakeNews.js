import * as api from "../api";

export const getFakeNewsItem = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchNewsItem(id);

    dispatch({ type: "FETCH_NEWS", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getFakeNews = (page) => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" });
    console.log("started");
    const { data } = await api.fetchNews(page);

    dispatch({ type: "FETCH_ALL", payload: data });
    dispatch({ type: "END_LOADING" });
    console.log("ended");
  } catch (error) {
    console.log(error.message);
  }
};

export const getFakeNewsBySearch =
  (searchQuery, page, language) => async (dispatch) => {
    try {
      //dispatch({ type: "START_LOADING" });
      const { data } = await api.fetchNewsBySearch(searchQuery, page, language);

      dispatch({ type: "FETCH_BY_SEARCH", payload: data });
      //dispatch({ type: "END_LOADING" });
    } catch (error) {
      console.log(error.message);
    }
  };

export const trending = () => async (dispatch) => {
  try {
    const { data } = await api.trending();

    dispatch({ type: "TRENDING", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const likeNews = (id) => async (dispatch) => {
  try {
    const { data } = await api.likeNews(id);

    dispatch({ type: "LIKE", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const dislikeNews = (id) => async (dispatch) => {
  try {
    const { data } = await api.dislikeNews(id);

    dispatch({ type: "DISLIKE", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteNews = (id) => async (dispatch) => {
  try {
    await api.deleteNews(id);

    dispatch({ type: "DELETE", payload: id });
  } catch (error) {
    console.log(error.message);
  }
};

export const getRecommended = (searchQuery) => async (dispatch) => {
  try {
    console.log(searchQuery, "iiiii");
    const {
      data: { data },
    } = await api.recommendedPosts(searchQuery);
    // console.log("oooo",data)
    dispatch({ type: "RECOMMENDED", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
