import BancoPairBadge from '../../badge/BancoPairBadge'
import PuntoPairBadge from '../../badge/PuntoPairBadge'
import Entity from '../../entity/Entity'

abstract class BeadEntity extends Entity{

	abstract isTie(): boolean

	abstract isBancoWon(): boolean

	abstract isPuntoWon(): boolean

	hasAnyPair(): boolean{
		return this.hasBancoPair() || this.hasPuntoPair()
	}

	hasBothPair(): boolean{
		return this.hasBancoPair() && this.hasPuntoPair()
	}

	hasBancoPair(): boolean{
		return this.getTagArray().some((tag)=> {
			return tag instanceof BancoPairBadge
		})
	}

	hasPuntoPair(): boolean{
		return this.getTagArray().some((tag)=> {
			return tag instanceof PuntoPairBadge
		})
	}

}

export default BeadEntity
