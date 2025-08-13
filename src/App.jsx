import { useState } from "react"
import computerIcon from "./assets/windows98Icons/computerIcon.png"
import Window from "./Components/Window/Window"
import Taskbar from "./Components/Taskbar/Taskbar"
import WindowShortcut from "./Components/WindowShortcut/WindowShortcut"

function App() {
	const [windows, setWindows] = useState([])
	const [selectedShortcut, setSelectedShortcut] = useState(null)

	const openNewWindow = (title, content) => {
		const newWindow = {
			id: Date.now(),
			title,
			content: <p>{content}</p>,
		}
		setWindows((prev) => [...prev, newWindow])
	}

	const handleCloseWindow = (windowId) => {
		setWindows((prev) => prev.filter((window) => window.id !== windowId))
	}

	const handleDesktopClick = () => {
		setSelectedShortcut(false)
	}

	return (
		<div className="desktop" onClick={handleDesktopClick}>
			<WindowShortcut
				id="my-computer"
				iconSrc={computerIcon}
				imageAltText={"My Computer Icon"}
				title="My Computer"
				openNewWindow={() =>
					openNewWindow("My Computer", "This is my Computer")
				}
				isSelected={selectedShortcut === "my-computer"}
				onSelect={(id) => setSelectedShortcut(id)}
			/>

			<WindowShortcut
				id="recycle-bin"
				iconSrc={computerIcon}
				imageAltText="Recycle Bin Icon"
				title="Recycle Bin"
				openNewWindow={() =>
					openNewWindow("Recycle Bin", "This is my Recycle Bin")
				}
				isSelected={selectedShortcut === "recycle-bin"}
				onSelect={(id) => setSelectedShortcut(id)}
			/>
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
		</div>
	)
}

export default App
