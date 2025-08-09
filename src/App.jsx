import "./App.css"
import { useState } from "react"
import computerIcon from "./assets/windows98Icons/computerIcon.png"
import Window from "./Components/Window/Window"
import Taskbar from "./Components/Taskbar/Taskbar"

function App() {
	const [windows, setWindows] = useState([])

	const openNewWindow = () => {
		const newWindow = {
			id: Date.now(),
			title: "My Computer",
			content: <p>This is a Windows 98 styled window!</p>,
		}
		setWindows((prev) => [...prev, newWindow])
	}

	const handleCloseWindow = (windowId) => {
		setWindows((prev) => prev.filter((window) => window.id !== windowId))
	}

	return (
		<>
			<h1 className="whiteText">Hello World!</h1>
			<img
				src={computerIcon}
				alt="Windows98 Compouter Icon"
				className="computer-icon-btn"
				onClick={openNewWindow}
			></img>
			<p className="whiteText para">
				This is some random text that should be visible
			</p>

			{windows.map((window) => (
				<Window
					key={window.id}
					isOpen={true}
					closeWindow={() => handleCloseWindow(window.id)}
					title={window.title}
				>
					{window.content}
				</Window>
			))}

			<Taskbar />
		</>
	)
}

export default App
