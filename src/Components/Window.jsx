import "./Window.css"
import { useState, useRef, useEffect, useCallback } from "react"
import PropTypes from "prop-types"

const Window = ({ isOpen, closeWindow, title, children }) => {
	const [isDragging, setIsDragging] = useState(false)
	const [position, setPosition] = useState({ x: 100, y: 100 })
	const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
	const windowRef = useRef(null)

	const handleMouseDown = (e) => {
		if (e.target.closest(".win98-controls")) return

		setIsDragging(true)
		const rect = windowRef.current.getBoundingClientRect()
		setDragOffset({
			x: e.clientX - rect.left,
			y: e.clientY - rect.top,
		})
	}

	const handleMouseMove = useCallback(
		(e) => {
			if (!isDragging) return

			setPosition({
				x: e.clientX - dragOffset.x,
				y: e.clientY - dragOffset.y,
			})
		},
		[isDragging, dragOffset.x, dragOffset.y]
	)

	const handleMouseUp = useCallback(() => {
		setIsDragging(false)
	}, [])

	useEffect(() => {
		if (isDragging) {
			document.addEventListener("mousemove", handleMouseMove)
			document.addEventListener("mouseup", handleMouseUp)
			document.body.style.userSelect = "none"
		}

		return () => {
			document.removeEventListener("mousemove", handleMouseMove)
			document.removeEventListener("mouseup", handleMouseUp)
			document.body.style.userSelect = ""
		}
	}, [handleMouseMove, handleMouseUp, isDragging])

	if (!isOpen) return

	return (
		<div
			className="win98-window"
			ref={windowRef}
			style={{
				left: `${position.x}px`,
				top: `${position.y}px`,
				cursor: isDragging ? "grabbing" : "default",
			}}
		>
			<div
				className="win98-title-bar"
				onMouseDown={handleMouseDown}
				style={{ cursor: isDragging ? "grabbing" : "default" }}
			>
				{title && <span className="win98-title">{title}</span>}

				<div className="win98-controls">
					<button className="win98-control-btn minimize-btn">
						_
					</button>
					<button className="win98-control-btn">□</button>
					<button className="win98-control-btn" onClick={closeWindow}>
						X
					</button>
				</div>
			</div>

			<div className="win98-content">{children}</div>
		</div>
	)
}

export default Window

Window.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	closeWindow: PropTypes.func.isRequired,
	title: PropTypes.string,
	children: PropTypes.node,
}
