import InnerError from "../../../error/InnerError"
import Entity from "../../entity/Entity"
import IEntity from "../../entity/IEntity"
import Streak from "../../streak/Streak"
import BeadRoad from "../bead/BeadRoad"
import GreenBeadEntity from "../bead/GreenBeadEntity"
import RedBeadEntity from "../bead/RedBeadEntity"
import IStreakRoad from "../IStreakRoad"
import BancoBigEntity from "./BancoBigEntity"
import BigEntity from "./BigEntity"
import PuntoBigEntity from "./PuntoBigEntity"

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
					entity = new BancoBigEntity(currentBead.getGameId())
				} else {
					entity = new PuntoBigEntity(currentBead.getGameId())
				}
				bigroad.addEntity(entity)
			}
			currentBead = currentBead.getNextEntity() as IEntity
		}
		return bigroad
	}

	private _length: number = 0

	private _entityIndex: number = -1

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
			if (first?.isBanco) {
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
		this._entityIndex++
		entity.setIndex(this._entityIndex)
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

	getPingpongIterator(): Generator<BigEntity[], void, boolean> {
		const first = this.getFirstStreak()
		const gen = function* (): Generator<BigEntity[], void, boolean> {
			const entities_arr: BigEntity[] = []
			let streak = first
			while (streak) {
				if (streak.getLength() === 1) {	// 當前streak是單跳
					entities_arr.push(streak.getFirstEntity() as BigEntity)
				} else {
					if (streak.getPreviousStreak()?.getLength() === 1) {
						const result = [...entities_arr]
						entities_arr.length = 0
						yield result
					}
				}
				streak = streak.getNextStreak()
			}
			if (entities_arr.length) {
				const result = [...entities_arr]
				entities_arr.length = 0
				yield result
			}
		}
		return gen()
	}
}

export default BigRoad
