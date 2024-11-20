import {
	BancoBigEntity,
	BeadRoad,
	BigRoad,
	BlueBeadEntity,
	PuntoBigEntity,
	RedBeadEntity,
	Streak,
} from '../src'

const blueBeadEntity: BlueBeadEntity = new BlueBeadEntity(2)
const redBeadEntity: RedBeadEntity = new RedBeadEntity(2)
const blueBigEntity: PuntoBigEntity = new PuntoBigEntity(2)
const redBigEntity: BancoBigEntity = new BancoBigEntity(2)

describe('bigroad.ts', ()=> {
	test('from', ()=> {
		const bead: BeadRoad = new BeadRoad(2)
		bead.addEntity(blueBeadEntity)
		bead.addEntity(redBeadEntity)
		const big: BigRoad = BigRoad.from(bead)
		return expect(big.getSize()).toBe(2)
	})
	test('print', ()=> {
		const big: BigRoad = new BigRoad(2)
		big.addEntity(blueBigEntity)
		big.addEntity(redBigEntity)
		return expect(big.print()).toBeInstanceOf(Array)
	})
	test('getSize', ()=> {
		const big: BigRoad = new BigRoad(2)
		big.addEntity(blueBigEntity)
		big.addEntity(redBigEntity)
		return expect(big.getSize()).toBe(2)
	})
	test('addEntity', ()=> {
		const big: BigRoad = new BigRoad(2)
		big.addEntity(blueBigEntity)
		big.addEntity(redBigEntity)
		// 重複
		big.addEntity(redBigEntity)
		return expect(big.getSize()).toBe(3)
	})
	test('getFirstStreak', ()=> {
		const big: BigRoad = new BigRoad(2)
		big.addEntity(blueBigEntity)
		big.addEntity(redBigEntity)
		return expect(big.getFirstStreak()).toBeInstanceOf(Streak)
	})
	test('getLastStreak', ()=> {
		const big: BigRoad = new BigRoad(2)
		big.addEntity(blueBigEntity)
		big.addEntity(redBigEntity)
		return expect(big.getLastStreak()).toBeInstanceOf(Streak)
	})
	test('getShoeIndex', ()=> {
		const big: BigRoad = new BigRoad(2)
		return expect(big.getShoeIndex()).toBe(2)
	})
})
