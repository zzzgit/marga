import IEntity from "../entity/IEntity"

interface IRoad {
	getFirstEntity(): IEntity | undefined
	getLastEntity(): IEntity | undefined
	/**
	 * Add an entity to the road.
	 * @todo avoid duplicate objects
	 * @param {IEntity} entity The entity to add
	 * @return {boolean} True if the entity was added, false if it was not
	 */
	addEntity(entity: IEntity): boolean
	getSize(): number
	getShoeIndex(): number
	/**
	 * Print the road to the console.
	 * @todo or just rewrite toString()
	 * @return {string[][] | string[]}
	 */
	print():string[][] | string[]
}

export default IRoad
