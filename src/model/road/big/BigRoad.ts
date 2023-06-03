import InnerError from "../../../error/InnerError"
import TieBadge from "../../badge/TieBadge"
import Entity from "../../entity/Entity"
import IEntity from "../../entity/IEntity"
import Streak from "../../streak/Streak"
import BeadEntity from "../bead/BeadEntity"
import BeadRoad from "../bead/BeadRoad"
import GreenBeadEntity from "../bead/GreenBeadEntity"
import RedBeadEntity from "../bead/RedBeadEntity"
import IStreakRoad from "../IStreakRoad"
import BancoBigEntity from "./BancoBigEntity"
import BigEntity from "./BigEntity"
import PuntoBigEntity from "./PuntoBigEntity"

/**
 * The Big Road is a streak road that records the results of the game.
 */
class BigRoad implements IStreakRoad {
	/**
	 * Form a new BigRoad from a beadRoad object (which is a collection of bead entities).
	 * @param {BeadRoad} beadRoad
	 * @return {BigRoad} The new BigRoad
	 */
	static from(beadRoad: BeadRoad): BigRoad {
		const bigroad = new BigRoad(beadRoad.getShoeIndex())
		// 找到第一個非和局的 bead
		let firstNoneGreenBead = beadRoad.getFirstEntity()
		while (firstNoneGreenBead instanceof GreenBeadEntity) {
			firstNoneGreenBead = firstNoneGreenBead.getNextEntity()
		}
		// 根據上一步，創建第一個 bigEntity
		let bigEntity
		if (firstNoneGreenBead instanceof RedBeadEntity) {
			bigEntity = new BancoBigEntity(firstNoneGreenBead.getGameId())
		} else {
			const converted = firstNoneGreenBead as BeadEntity
			bigEntity = new PuntoBigEntity(converted.getGameId())
		}
		bigroad.addEntity(bigEntity)
		// 填充 preTieBadge
		let lastBead = firstNoneGreenBead?.getPreviousEntity()
		while (lastBead) {
			bigEntity.addTag(new TieBadge(true))
			lastBead = lastBead.getPreviousEntity()
		}
		// 向後繼續解析
		let currentBead = firstNoneGreenBead?.getNextEntity()
		while (currentBead) {
			if (currentBead instanceof GreenBeadEntity) {
				bigEntity.addTag(new TieBadge())
			} else {
				if (currentBead instanceof RedBeadEntity) {
					bigEntity = new BancoBigEntity(currentBead.getGameId())
				} else {
					bigEntity = new PuntoBigEntity(currentBead.getGameId())
				}
				bigroad.addEntity(bigEntity)
			}
			currentBead = currentBead.getNextEntity()
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
		const result: string[][] = []
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

	/**
	 * Add entity to the Big Road.
	 * @param {BigEntity} entity
	 * @return {boolean} If the entity is added successfully, return true, otherwise return false.
	 */
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
		// streak is not suitable(different color)
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
		throw new InnerError(`[BigRoad][getFirstEntity]: not implemented`)
	}

	getLastEntity(): IEntity | undefined {
		throw new InnerError(`[BigRoad][getLastEntity]: not implemented`)
	}

	getShoeIndex(): number {
		return this._shoeIndex
	}

	/**
	 * Get a generator that can iterate the Pingpong pattern in the Big Road.
	 * @return {Generator<BigEntity[], void, boolean>} A generator that can iterate the Pingpong pattern in the Big Road.
	 */
	getPingpongIterator(): Generator<BigEntity[], void, boolean> {
		const first = this.getFirstStreak()
		const gen = function* (): Generator<BigEntity[], void, boolean> {
			const entities_arr: BigEntity[] = []
			let streak = first
			while (streak) {
				if (streak.getLength() === 1) {
					// 當前streak是單跳
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
