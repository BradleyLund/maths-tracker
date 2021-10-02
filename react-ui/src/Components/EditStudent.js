import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { Menu } from "@chakra-ui/menu";

export default function EditStudent(props) {
  const [firstName, setFirstName] = useState("");

  const [surname, setSurname] = useState("");

  const [difficultyLevel, setDifficultyLevel] = useState("");

  const [studentUsername, setStudentUsername] = useState("");

  const handleChange = (event) => {
    setDifficultyLevel(event.target.value);
  };

  const handleStudentChange = (event) => {
    setStudentUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/changedifficulty", {
        username: studentUsername,
        difficultyLevel: difficultyLevel,
      })
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <Container component="main" maxWidth="xs">
      <div id="loginPage">
        <h1 style={{ textAlign: "center" }}>
          Change a student's Difficulty Level
        </h1>
        <form noValidate>
          <div className="editBox">
            <Box sx={{ minWidth: 300 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Student Name
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={studentUsername}
                  label="Difficulty Level"
                  onChange={handleStudentChange}>
                  {props.studentsArray.map((student) => (
                    <MenuItem value={student.username}>
                      {student.username}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </div>

          <div className="editBox">
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Difficulty Level
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={difficultyLevel}
                  label="Difficulty Level"
                  onChange={handleChange}>
                  <MenuItem value={1}>Grade 1</MenuItem>
                  <MenuItem value={2}>Grade 2</MenuItem>
                  <MenuItem value={3}>Grade 3</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>

          <button className="button-66" onClick={handleSubmit}>
            Submit Change
          </button>
        </form>
      </div>
    </Container>
  );
}
