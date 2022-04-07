


import React, { useEffect, useState} from "react";
import { AppBar, Typography, CircularProgress, Grid,Button, Paper,TextField} from "@material-ui/core";
import useStyles from "./styles";
import { useSelector, useDispatch} from "react-redux";
import {useNavigate} from 'react-router-dom'
import FakeNews from "../fakeNews/FakeNews";
import { addnewadmin } from "../../api";
const NewAdmin = () => {
    const [textValue, setTextValue] = useState("");
    const navigate = useNavigate();
    const onTextChange = (e) => {return(setTextValue(e.target.value))};
    const handleSubmit = async() => {
            await addnewadmin({email:textValue})
            navigate("/")
            console.log(textValue)
    };
    const handleReset = () => setTextValue("");
    return (
      <Paper>
        <h2>Add New Admin</h2>
  
        <TextField
          onChange={onTextChange}
          value={textValue}
          label={"Email Id"} //optional
        />
  
        <Button onClick={handleSubmit}>Submit</Button>
        <Button onClick={handleReset}>Reset</Button>
      </Paper>
    );
};

export default NewAdmin;
