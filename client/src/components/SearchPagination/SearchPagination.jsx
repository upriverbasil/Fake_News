import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getFakeNewsBySearch } from "../../actions/fakeNews";

import useStyles from "./styles";

const Paginate = ({ searchQuery, page, language }) => {
  const { numberOfPages } = useSelector((state) => state.fakeNews);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchQuery && page) {
      dispatch(getFakeNewsBySearch(searchQuery, page, language));
    }
  }, [page, searchQuery, language]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      siblingCount={3}
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/fake-news/search?searchQuery=${searchQuery}&page=${item.page}&lang=${language}`}
        />
      )}
    />
  );
};

export default Paginate;
