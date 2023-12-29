import ScheduleDay from "./scheduleDay";

export default function Schedule() {
  return (
    <table>
      <thead>
        <tr>
          <th>Day</th>
          <th>Hour</th>
          <th>1st Grade</th>
          <th>2nd Grade</th>
          <th>3rd Grade</th>
          <th>4th Grade</th>
        </tr>
      </thead>
      <tbody>
        {["monday", "tuesday", "wednesday", "thursday", "friday"].map((day) => (
          <ScheduleDay key={day} day={day} />
        ))}
      </tbody>
    </table>
  );
}
