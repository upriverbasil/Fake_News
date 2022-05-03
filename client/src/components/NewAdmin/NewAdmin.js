import React, { useEffect, useState } from "react";
import {
  AppBar,
  Typography,
  CircularProgress,
  Grid,
  Button,
  Paper,
  TextField,
  Container,
} from "@material-ui/core";
import useStyles from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FakeNews from "../fakeNews/FakeNews";
import { addnewadmin } from "../../api";

const NewAdmin = () => {
  const [textValue, setTextValue] = useState("");
  const navigate = useNavigate();
  const classes = useStyles();

  const onTextChange = (e) => {
    return setTextValue(e.target.value);
  };

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const handleSubmit = async () => {
    if (textValue === "" || !validateEmail(textValue)) {
      alert("Please enter valid Email ID");
      return;
    }
    try {
      await addnewadmin({ email: textValue });
      navigate("/");
    } catch (error) {
      if (error.response) {
        alert(
          "Error " + error.response.status + ": " + error.response.data.message
        );
      }
    }
  };

  const handleReset = () => setTextValue("");

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper}>
        <Typography className={classes.headline} variant="h4">
          Add New Admin
        </Typography>

        <TextField
          className={classes.form}
          onChange={onTextChange}
          value={textValue}
          label={"Email Id"} //optional
        />

        <Button className={classes.submit} onClick={handleSubmit} variant="contained" color="primary">
          Submit
        </Button>
        <Button className={classes.reset} onClick={handleReset} variant="contained" color="primary">
          Reset
        </Button>
      </Paper>
    </Container>
  );
};

export default NewAdmin;
