import IEntity from "../entity/IEntity"

interface IRoad {
	getFirstEntity(): IEntity | undefined
	getLastEntity(): IEntity | undefined
	// 不能出現重複的object,成功就返回true，其他的類，在其他的項目中，也要有這樣的實現
	addEntity(entity: IEntity): boolean
	getSize(): number
	getShoeIndex(): number
	// 可能應該重寫toString函數
	print():string[][] | string[]
}

export default IRoad
