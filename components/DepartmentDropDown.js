/** @format */
import { useState } from "react";
export default function DepartmentDropDown() {
  const govtDepartments = [
    "Who or Where did you bribed ?",
    "Police",
    "Traffic Police",
    "State Electricity Board",
    "Municipal Corporation",
    "Driving licence office",
  ];

  const [dept, setDept] = useState(govtDepartments[0]);
  return (
    <select
      aria-label="Department or Staff that you bribed"
      value={dept}
      onChange={(e) => setDept(e.target.value)}
      className="form-control"
    >
      {Object.entries(govtDepartments).map(([key, value]) => (
        <option key={key} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
}
