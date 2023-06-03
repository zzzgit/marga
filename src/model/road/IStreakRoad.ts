import Streak from "../streak/Streak"
import IRoad from "./IRoad"

interface IStreakRoad extends IRoad {
	getFirstStreak(): Streak | undefined
	getLastStreak(): Streak | undefined
}

export default IStreakRoad
