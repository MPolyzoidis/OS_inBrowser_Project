import "./WindowShortcut.css"
import PropTypes from "prop-types"

const WindowShortcut = ({
	id,
	iconSrc,
	openNewWindow,
	imageAltText = "",
	title = "",
	isSelected,
	onSelect,
}) => {
	const handleClick = (e) => {
		e.stopPropagation()
		onSelect(id)
		//Makes it so double click on same icon is needed to open the window
		if (isSelected) {
			openNewWindow()
		}
	}

	return (
		<div
			className={`icon-container ${isSelected ? "selected" : ""}`}
			onClick={handleClick}
		>
			<div className="icon">
				<img src={iconSrc} alt={imageAltText} className="icon-btn" />
				<div className="icon-title">{title}</div>
			</div>
			<div className="selection-overlay"></div>
		</div>
	)
}

export default WindowShortcut

WindowShortcut.propTypes = {
	id: PropTypes.string.isRequired,
	iconSrc: PropTypes.string.isRequired,
	openNewWindow: PropTypes.func.isRequired,
	imageAltText: PropTypes.string,
	title: PropTypes.string,
	isSelected: PropTypes.bool.isRequired,
	onSelect: PropTypes.func.isRequired,
}
