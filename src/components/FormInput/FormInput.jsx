import React from 'react';
import './form-input.css';

function FormInput({ handleChange, name, required, type, placeholder, Icon }) {
	return (
		<div className="input-container">
      <Icon className="input-icon" />
			<input className="input"
				required={required}
				name={name}
				onChange={handleChange}
				type={type}
				placeholder={placeholder}
			/>
		</div>
	);
}

export default FormInput;
