import BeadEntity from "./BeadEntity"

// banker
class RedBeadEntity extends BeadEntity {
	isTie(): boolean {
		return false
	}

	isBancoWon(): boolean {
		return true
	}

	isPuntoWon(): boolean {
		return false
	}
}

export default RedBeadEntity
