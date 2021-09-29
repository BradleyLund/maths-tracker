import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";

const difficultyExamples = {
  1: ["1 + 3 = ", "4 - 1 = "],
  2: ["13+15-3 = ", "27 - 9 = "],
  3: ["3 x 21 = ", "2 x 12 = "],
};

export default function DifficultyExamples() {
  const [difficultyLevel, setDifficultyLevel] = useState(1);

  const handleChange = (event) => {
    setDifficultyLevel(event.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div id="loginPage">
        <h1>Edit Insert name here</h1>
        <form noValidate>
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
        </form>
        <ul>
          {
            difficultyExamples[difficultyLevel].map((example, index) => (
              <li key={index}>{example}</li>
            ))

            /* {console.log(difficultyExamples[difficultyLevel], difficultyLevel)} */
          }
        </ul>
      </div>
    </Container>
  );
}

/* difficultyExamples[difficultyLevel].map((example) => (
            <li>Eg</li> ))*/
