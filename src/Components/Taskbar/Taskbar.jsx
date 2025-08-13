import TaskbarClock from "../TaskbarClock/TaskbarClock"
import "./Taskbar.css"

const Taskbar = () => {
	return (
		<div className="taskbar">
			<button className="start-button">
				<span>🖥️</span>
				Start
			</button>

			<div className="taskbar-programs">
				<button className="program-button active">
					<span className="program-icon">📁</span>
					My Computer
				</button>
			</div>

			<div className="system-tray">
				<div className="tray-icons">
					<span className="tray-icon">🔊</span>
					<span className="tray-icon">🌐</span>
				</div>
				<TaskbarClock />
			</div>
		</div>
	)
}

export default Taskbar
