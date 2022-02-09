import InnerError from "../../../error/InnerError"
import Entity from "../../entity/Entity"
import IEntity from "../../entity/IEntity"
import IRoad from "../IRoad"

class BeadRoad implements IRoad {
	private _set: Set<Entity> = new Set()

	private _firstEntity: Entity | undefined

	private _lastEntity: Entity | undefined

	private readonly _shoeIndex: number

	private _setLastEntity(entity: Entity): void {
		this._lastEntity = entity
	}

	private _setFirstEntity(entity: Entity): void {
		this._firstEntity = entity
	}

	constructor(index: number) {
		this._shoeIndex = index
	}

	print(): string[] | string[][] {
		throw new InnerError(`[BigRoad][getFirstEntity]: not implemented`)
	}


	getFirstEntity(): Entity | undefined {
		return this._firstEntity
	}

	getLastEntity(): IEntity | undefined {
		return this._lastEntity
	}

	getShoeIndex(): number {
		return this._shoeIndex
	}

	addEntity(entity: Entity): boolean {
		if (this._set.has(entity)) {
			return false
		}
		this._set.add(entity)
		if (!this.getFirstEntity()) {
			this._setFirstEntity(entity)
			this._setLastEntity(entity)
			return true
		}
		if (this.getLastEntity()) {
			entity.setPreviousEntity(this.getLastEntity() as Entity)
		}
		this._setLastEntity(entity)
		return true
	}


	getSize(): number {
		return this._set.size
	}

	// getBlueAmount(): number{

	// }
}

export default BeadRoad
