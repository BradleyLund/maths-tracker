import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";

export default function EditStudent() {
  const [firstName, setFirstName] = useState("");

  const [surname, setSurname] = useState("");

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleSurnameChange = (event) => {
    setSurname(event.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div id="loginPage">
        <h1>Edit Insert name here</h1>
        <form noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoFocus
            value={firstName}
            onChange={handleFirstNameChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="surname"
            label="Surname"
            name="surname"
            autoFocus
            value={surname}
            onChange={handleSurnameChange}
          />

          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </form>
      </div>
    </Container>
  );
}
