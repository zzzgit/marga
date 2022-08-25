import BeadEntity from "./BeadEntity"

// player
class BlueBeadEntity extends BeadEntity {
	isTie(): boolean {
		return false
	}

	isBancoWon(): boolean {
		return false
	}

	isPuntoWon(): boolean {
		return true
	}
}

export default BlueBeadEntity
