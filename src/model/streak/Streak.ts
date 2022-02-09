import BigEntity from "../road/big/BigEntity"


class Streak {
	private _firstEntity: BigEntity | undefined

	private _lastEntity: BigEntity | undefined

	private _next:Streak | undefined

	private _prev:Streak | undefined

	private _length:number = 0

	getFirstEntity(): BigEntity|undefined {
		return this._firstEntity
	}

	getLastEntity(): BigEntity | undefined {
		return this._lastEntity
	}

	getNextStreak(): Streak | undefined {
		return this._next
	}

	getPreviousStreak(): Streak | undefined {
		return this._prev
	}

	setNextStreak(streak: Streak): void {
		this._next = streak
	}

	setPreviousStreak(streak: Streak): void {
		this._prev = streak
		streak.setNextStreak(this)
	}

	getLength(): number {
		return this._length
	}

	addEntity(entity: BigEntity) :boolean {
		if (!this._lastEntity) {
			this._firstEntity = this._lastEntity = entity
			this._length++
			return true
		}
		if (this.getLastEntity()?.isBanker != entity.isBanker) {
			return false
		}
		entity.setPreviousEntity(this._lastEntity)
		this._lastEntity = entity
		this._length++
		return true
	}
}

export default Streak
