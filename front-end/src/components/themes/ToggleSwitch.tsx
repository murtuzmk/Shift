import React, { useState, ChangeEvent } from 'react';
import { StyledLabel } from './StyledLabel'; // Adjust the import path as necessary

// Props for the ToggleSwitch component
interface ToggleSwitchProps {
  checked: boolean; // If it is toggled or not
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  id : string;
}

// ID is because we have two toggles on the page, each one is unique so then it wont reference the same toggle
const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange, id}) => {

  return (
      <StyledLabel htmlFor={id} checked={checked}>
        <input
          id= {id}
          type="checkbox"
          checked={checked}
          onChange={onChange} // Use the passed onChange prop
          style={{ opacity: 0, width: 0, height: 0 }}
        />
      </StyledLabel>
  );
};

export default ToggleSwitch;