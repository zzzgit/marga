import BeadEntity from "./BeadEntity"

// tie
class GreenBeadEntity extends BeadEntity {
	isTie(): boolean {
		return true
	}

	isBancoWon(): boolean {
		return false
	}

	isPuntoWon(): boolean {
		return false
	}
}

export default GreenBeadEntity
