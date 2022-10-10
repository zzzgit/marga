import Badge from "./Badge"


class TieBadge extends Badge {
	isPre :boolean = false

	constructor(isPre: boolean = false) {
		super()
		this.isPre = isPre
	}
}

export default TieBadge
