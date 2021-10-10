import React, { useState } from "react";
import Select from "react-select";
import "./../App.css";

const TestClient = () => {
  // some code here
  const allOptions = [
    { id: 2, gender: "female" },
    { id: 1, gender: "male" },
  ];
  //some state here
  const [genderOption, setGenderOption] = useState(allOptions.gender);
  //The fucntion to handle the state
  const handleGenderChange = (e) => {
    setGenderOption(e.gender);
  };
  // look for way to store the data in the database
  //   so some function to send the data in the database
  //   And the function should be here
  return (
    <div>
      <h3>This is for testing purposes</h3>
      {/* <select> */}
      {/* <option value="gender">Your gender</option>
        <option value="female">Female</option>
        <option value="male">Male</option> */}
      {/* {options.map(({ id, gender }) => {
          <option key={id}>{gender}</option>;
        })}
      </select> */}

      {/* This is another selec6t about the gender options */}
      <Select
        options={allOptions}
        onChange={handleGenderChange}
        styles={{ color: "black", backgroundColor: "red", width: "20%" }}
      />
      <h3>{genderOption}</h3>
    </div>
  );
};

export default TestClient;
