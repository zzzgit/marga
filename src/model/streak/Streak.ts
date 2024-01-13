import BigEntity from '../road/big/BigEntity'

/**
 * The streak in the Big Road.
 */
class Streak{
	private _firstEntity: BigEntity | undefined

	private _lastEntity: BigEntity | undefined

	private _next: Streak | undefined

	private _prev: Streak | undefined

	private _length: number = 0

	getFirstEntity(): BigEntity | undefined{
		return this._firstEntity
	}

	getLastEntity(): BigEntity | undefined{
		return this._lastEntity
	}

	getNextStreak(): Streak | undefined{
		return this._next
	}

	getPreviousStreak(): Streak | undefined{
		return this._prev
	}

	setNextStreak(streak: Streak): void{
		this._next = streak
	}

	setPreviousStreak(streak: Streak): void{
		this._prev = streak
		streak.setNextStreak(this)
	}

	/**
	 * How many entities are in this streak.
	 * @return {number} The length of the streak
	 */
	getLength(): number{
		return this._length
	}

	/**
	 * Add an entity to the streak. The entity will be added to the end of the streak. If the entity is not the same(banco or punto) as the last entity in the streak, it will not be added.
	 * @param {BigEntity} entity
	 * @return {boolean} True if the entity was added, false if it was not
	 */
	addEntity(entity: BigEntity): boolean{
		if (!this._lastEntity){
			this._firstEntity = this._lastEntity = entity
			this._length++
			return true
		}
		if (this.getLastEntity()?.isBanco != entity.isBanco){
			return false
		}
		entity.setPreviousEntity(this._lastEntity)
		this._lastEntity = entity
		this._length++
		return true
	}
}

export default Streak
