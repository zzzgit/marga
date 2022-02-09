import InnerError from "../../../error/InnerError"
import Entity from "../../entity/Entity"
import IEntity from "../../entity/IEntity"
import Streak from "../../streak/Streak"
import BeadRoad from "../bead/BeadRoad"
import GreenBeadEntity from "../bead/GreenBeadEntity"
import RedBeadEntity from "../bead/RedBeadEntity"
import IStreakRoad from "../IStreakRoad"
import BankerBigEntity from "./BankerBigEntity"
import BigEntity from "./BigEntity"
import PlayerBigEntity from "./PlayerBigEntity"

class BigRoad implements IStreakRoad {
	static from(beadRoad: BeadRoad): BigRoad {
		const bigroad = new BigRoad(beadRoad.getShoeIndex())
		let currentBead:IEntity = beadRoad.getFirstEntity() as IEntity
		while (currentBead) {
			if (currentBead instanceof GreenBeadEntity) {
			// entity = 修改上一個entity，添加tag
			} else {
				let entity: BigEntity
				if (currentBead instanceof RedBeadEntity) {
					entity = new BankerBigEntity()
				} else {
					entity = new PlayerBigEntity()
				}
				bigroad.addEntity(entity)
			}
			currentBead = currentBead.getNextEntity() as IEntity
		}
		return bigroad
	}

	private _length: number = 0


	private _firstStreak: Streak | undefined

	private _lastStreak: Streak | undefined

	private readonly _shoeIndex: number

	private _setLastStreak(streak: Streak): void {
		this._lastStreak = streak
	}

	private _setFirstStreak(streak: Streak): void {
		this._firstStreak = streak
	}

	constructor(index: number) {
		this._shoeIndex = index
	}

	print(): string[] | string[][] {
		const result:string[][] = []
		let streak = this.getFirstStreak()
		while (streak) {
			const streakArr = []
			const first = streak.getFirstEntity()
			if (first?.isBanker) {
				for (let i = 0, len = streak.getLength(); i < len; i++) {
					streakArr.push("B ")
				}
			} else {
				for (let i = 0, len = streak.getLength(); i < len; i++) {
					streakArr.push("P ")
				}
			}
			result.push(streakArr)
			streak = streak.getNextStreak() as Streak
		}
		return result
	}

	getSize(): number {
		return this._length
	}

	addEntity(entity: BigEntity): boolean {
		// no streak
		if (!this.getFirstStreak()) {
			const steak: Streak = new Streak()
			this._setFirstStreak(steak)
			this._setLastStreak(steak)
		}
		const lastStreak = this.getLastStreak() as Streak
		// streak is not suitable
		const result = lastStreak.addEntity(entity)
		if (!result) {
			const newStreak: Streak = new Streak()
			newStreak.setPreviousStreak(lastStreak)
			this._setLastStreak(newStreak)
			this.getLastStreak()?.addEntity(entity)
		}
		entity.setIndex(this._length)
		this._length++
		return true
	}

	getFirstStreak(): Streak | undefined {
		return this._firstStreak
	}

	getLastStreak(): Streak | undefined {
		return this._lastStreak
	}

	getFirstEntity(): Entity | undefined {
		throw new InnerError(`[BigRoad][getFirstEntity]:`)
	}

	getLastEntity(): IEntity | undefined {
		throw new InnerError(`[BigRoad][getLastEntity]:`)
	}

	getShoeIndex(): number {
		return this._shoeIndex
	}
}

export default BigRoad
