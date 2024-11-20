import BeadEntity from './BeadEntity'

/**
 * Red is for Banco in the Bead Plate
 */
class RedBeadEntity extends BeadEntity{

	isTie(): boolean{
		return false
	}

	isBancoWon(): boolean{
		return true
	}

	isPuntoWon(): boolean{
		return false
	}

}

export default RedBeadEntity
