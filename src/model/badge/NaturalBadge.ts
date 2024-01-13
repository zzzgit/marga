import Badge from './Badge'

class NaturalBadge extends Badge{
	score: number

	constructor(score: number){
		super()
		this.score = score
	}
}

export default NaturalBadge
