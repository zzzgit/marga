import Entity from "../../entity/Entity"

abstract class BeadEntity extends Entity {
	abstract isTie(): boolean
	abstract isBancoWon(): boolean
	abstract isPuntoWon(): boolean
}

export default BeadEntity
