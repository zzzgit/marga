import BeadEntity from './BeadEntity'

/**
 * Green is for Tie in the Bead Plate
 */
class GreenBeadEntity extends BeadEntity{
	isTie(): boolean{
		return true
	}

	isBancoWon(): boolean{
		return false
	}

	isPuntoWon(): boolean{
		return false
	}
}

export default GreenBeadEntity
