import BeadEntity from "./BeadEntity"

/**
 * Blue is for Punto in the Bead Plate
 */
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
