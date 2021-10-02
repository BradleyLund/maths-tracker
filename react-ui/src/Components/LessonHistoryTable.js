import Table from "react-bootstrap/Table";

export default function LessonHistoryTable(props) {
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Date</th>
          <th>Difficulty Level</th>
          <th>Score</th>
          <th>Percentage</th>
          <th>Total Time Spent</th>
        </tr>
      </thead>
      <tbody>
        {props.lessonHistoryArray.map((lesson) => (
          <tr>
            <td>{lesson.date}</td>
            <td>{lesson.difficultyLevel}</td>
            <td>{lesson.score}/10</td>
            <td>{lesson.score * 10}%</td>
            <td>{lesson.totalTime}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
