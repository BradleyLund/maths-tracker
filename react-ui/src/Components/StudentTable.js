import Table from "react-bootstrap/Table";

export default function StudentTable(props) {
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Student Name</th>
          <th>Difficulty Level</th>
          <th>Daily Streak</th>
          <th>Score</th>
          <th>Percentage</th>
          <th>Total Time Spent</th>
        </tr>
      </thead>
      <tbody>
        {props.studentsArray.map((student) => (
          <tr>
            <td>{student.username}</td>
            <td>{student.difficultyLevel}</td>
            <td>Calculate the daily streak</td>
            <td>Calculate the score</td>
            <td>Calculate the percentage</td>
            <td>Calculate the total time spent</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

{
  /* <tr>
          {Array.from({ length: 6 }).map((_, index) => (
            <td key={index}>Table cell {index}</td>
          ))}
        </tr>
        <tr>
          {Array.from({ length: 6 }).map((_, index) => (
            <td key={index}>Table cell {index}</td>
          ))}
        </tr>
        <tr>
          {Array.from({ length: 6 }).map((_, index) => (
            <td key={index}>Table cell {index}</td>
          ))}
        </tr> */
}
