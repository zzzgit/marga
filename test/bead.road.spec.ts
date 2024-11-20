import { BeadRoad, BlueBeadEntity, RedBeadEntity } from '../src'

const blueBigEntity: BlueBeadEntity = new BlueBeadEntity(2)
const redBigEntity: RedBeadEntity = new RedBeadEntity(2)

describe('beadRoad.ts', ()=> {
	test('getFirstEntity', ()=> {
		const bead: BeadRoad = new BeadRoad(2)
		bead.addEntity(blueBigEntity)
		bead.addEntity(redBigEntity)
		return expect(bead.getFirstEntity()).toBeInstanceOf(BlueBeadEntity)
	})
	test('getLastEntity', ()=> {
		const bead: BeadRoad = new BeadRoad(2)
		bead.addEntity(blueBigEntity)
		bead.addEntity(redBigEntity)
		return expect(bead.getLastEntity()).toBeInstanceOf(RedBeadEntity)
	})
	test('getShoeIndex', ()=> {
		const bead: BeadRoad = new BeadRoad(2)
		return expect(bead.getShoeIndex()).toBe(2)
	})
	test('addEntity', ()=> {
		const bead: BeadRoad = new BeadRoad(2)
		bead.addEntity(blueBigEntity)
		bead.addEntity(redBigEntity)
		bead.addEntity(redBigEntity)
		return expect(bead.getSize()).toBe(2)
	})
})
