import "./Window.css"
import { useState, useRef, useEffect, useCallback } from "react"
import PropTypes from "prop-types"

const Window = ({ isOpen, closeWindow, title, children }) => {
	const [windowState, setWindowState] = useState({
		isMaximized: false,
		isDraggable: true,
		isDragging: false,
		position: { x: 100, y: 100 },
		dragOffset: { x: 0, y: 0 },
	})

	const handleMaximize = useCallback(() => {
		setWindowState((prev) => ({
			...prev,
			isMaximized: !prev.isMaximized,
			isDraggable: !prev.isDraggable,
		}))
	}, [])

	const windowRef = useRef(null)

	const handleMouseDown = useCallback(
		(e) => {
			if (e.target.closest(".win98-controls") || !windowState.isDraggable)
				return

			const rect = windowRef.current.getBoundingClientRect()
			setWindowState((prev) => ({
				...prev,
				isDragging: true,
				dragOffset: {
					x: e.clientX - rect.left,
					y: e.clientY - rect.top,
				},
			}))
		},
		[windowState.isDraggable]
	)

	const handleMouseMove = useCallback(
		(e) => {
			if (!windowState.isDragging) return

			setWindowState((prev) => ({
				...prev,
				position: {
					x: e.clientX - prev.dragOffset.x,
					y: e.clientY - prev.dragOffset.y,
				},
			}))
		},
		[windowState.isDragging]
	)

	const handleMouseUp = useCallback(() => {
		setWindowState((prev) => ({
			...prev,
			isDragging: false,
		}))
	}, [])

	useEffect(() => {
		if (windowState.isDragging) {
			document.addEventListener("mousemove", handleMouseMove)
			document.addEventListener("mouseup", handleMouseUp)
			document.body.style.userSelect = "none"
		}

		return () => {
			document.removeEventListener("mousemove", handleMouseMove)
			document.removeEventListener("mouseup", handleMouseUp)
			document.body.style.userSelect = ""
		}
	}, [handleMouseMove, handleMouseUp, windowState.isDragging])

	if (!isOpen) return

	return (
		<div
			className={`win98-window ${
				windowState.isMaximized ? "maximized" : ""
			}`}
			ref={windowRef}
			style={{
				...(!windowState.isMaximized && {
					left: `${windowState.position.x}px`,
					top: `${windowState.position.y}px`,
				}),
				cursor: windowState.isDragging ? "grabbing" : "default",
			}}
		>
			<div
				className="win98-title-bar"
				onMouseDown={handleMouseDown}
				style={{
					cursor:
						windowState.isDragging && windowState.isDraggable
							? "grabbing"
							: "default",
				}}
			>
				{title && <span className="win98-title">{title}</span>}

				<div className="win98-controls">
					<button className="win98-control-btn minimize-btn">
						_
					</button>
					<button
						className="win98-control-btn"
						onClick={handleMaximize}
					>
						□
					</button>
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
