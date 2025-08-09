import { useEffect, useState } from "react"
import "./TaskbarClock.css"

const TaskbarClock = () => {
	const [currentTime, setCurrentTime] = useState(new Date())

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTime(new Date())
		}, 1000)

		return () => clearInterval(timer)
	}, [])

	const formatTime = (date) => {
		return date.toLocaleTimeString([], {
			hour: "numeric",
			minute: "2-digit",
			hour12: true,
		})
	}

	return <div className="clock">{formatTime(currentTime)}</div>
}

export default TaskbarClock
