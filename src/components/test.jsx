import React, { useId, useState } from "react";
import "./LanguageToggle.css";

function LanguageToggle() {
	const [isEnglish, setIsEnglish] = useState(true);
    const id = useId();

	const handleToggle = () => {
		setIsEnglish(!isEnglish);
	};

	return (
		<div className="toggle-switch">
			<div className="toggle-switch">
				<input type="checkbox" id={`${id}-language-toggle`} />
				<label htmlFor={`${id}language-toggle`}>
					<span className="toggle-switch-label left-label">Es</span>
					<span className="toggle-switch-slider"></span>
					<span className="toggle-switch-label right-label">En</span>
				</label>
			</div>
		</div>
	);
}

export default LanguageToggle;
