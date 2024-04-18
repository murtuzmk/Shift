import React, { useState, ChangeEvent } from 'react';
import { StyledLabel } from './themes/StyledLabel'; // Adjust the import path as necessary
import { useEventFilter } from '@/context/EventFilterContext';

// Props for the ToggleSwitch component
interface ToggleSwitchProps {
  id : string;
  toggleType: 'shifts' | 'conflicts';
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ id, toggleType}) => {
  const { showShifts, setShowShifts } = useEventFilter();
  const { showConflicts, setShowConflicts } = useEventFilter();

  const isChecked = toggleType === 'shifts' ? showShifts : showConflicts;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (toggleType === 'shifts') {
      console.log("Toggling Shifts:", event.target.checked);
      setShowShifts(event.target.checked);
    } else {
      console.log("Toggling Conflicted:", event.target.checked);
      setShowConflicts(event.target.checked);
    }
  };

  return (
    <StyledLabel htmlFor={id} checked={isChecked }>
      <input
        id={id}
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        style={{ opacity: 0, width: 0, height: 0 }}
      />
    </StyledLabel>
  );
};

export default ToggleSwitch;