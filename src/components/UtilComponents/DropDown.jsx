import React from 'react';

const DropDown = ({
  title,
  valuesArray,
  formData,
  formName,
  handleChange,
  defaultOption
}) => {
  return (
    <div className="dropdown">
      {title}
      <select
        selected={valuesArray[0]}
        value={formData[formName]}
        name={formName}
        onChange={(e) => handleChange(e)}
        className="dropdown-menu"
      >
        {defaultOption !== '' ? <option value="">{defaultOption}</option> : null}
        {valuesArray.map((value, idx) => (
          <option key={idx} value={value} className="sort-otpion">
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
