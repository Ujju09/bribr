/** @format */

// import { Dropdown } from "@nextui-org/react";
import { useState } from "react";

export default function StatesDropDown() {
  const indianStates = [
    "Select state",
    "Jammu and Kashmir",
    "Punjab",
    "Haryana",
    "Jharkhand",
    "Uttar Pradesh",
    "Delhi",
  ];

  const [selectedState, setSelectedState] = useState(indianStates[0]);

  return (
    <>
      <select
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}

        className="form-control"
      >
        {Object.entries(indianStates).map(([key, value]) => (
          <option key={key} value={value}>
            {value}
          </option>
        ))}
      </select>

    </>
  );
}
