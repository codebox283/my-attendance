// src/Attendance.tsx
import React, { useEffect, useState } from 'react';

interface Student {
  name: string;
  status: 'Present' | 'Absent';
}

const Attendance: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<{ date: string; name: string; status: string }[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/students.json');
      const data: Student[] = await response.json();
      setStudents(data);
    };
    fetchData();
  }, []);

  const handleStatusChange = (index: number, status: 'Present' | 'Absent') => {
    const newStudents = [...students];
    newStudents[index].status = status;
    setStudents(newStudents);

    const currentDate = new Date().toLocaleDateString();
    setAttendanceRecords(prevRecords => [
      ...prevRecords,
      { date: currentDate, name: newStudents[index].name, status: status }
    ]);
  };

  return (
    <div>
      <h1>Attendance System</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.name}>
              <td>{student.name}</td>
              <td>
                <select
                  value={student.status}
                  onChange={(e) => handleStatusChange(index, e.target.value as 'Present' | 'Absent')}
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Attendance Records</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.map((record, index) => (
            <tr key={index}>
              <td>{record.date}</td>
              <td>{record.name}</td>
              <td>{record.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
