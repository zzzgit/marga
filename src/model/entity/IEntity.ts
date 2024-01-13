import Badge from '../badge/Badge'

interface IEntity {
	getIndex(): number
	setIndex(index: number): void
	getGameId(): number
	setPreviousEntity(entity: IEntity): void
	getPreviousEntity(): IEntity | undefined
	setNextEntity(entity: IEntity): void
	getNextEntity(): IEntity | undefined
	getTagArray(): Badge[]
	addTag(tag: Badge): void
}

export default IEntity
