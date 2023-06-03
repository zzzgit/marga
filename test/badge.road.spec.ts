import {
	BancoNaturalBadge,
	BigRoad,
	PuntoBigEntity,
	BancoBigEntity,
} from "../src"

// const blueBeadEntity: BlueBeadEntity = new BlueBeadEntity(2)
// const redBeadEntity: RedBeadEntity = new RedBeadEntity(2)
const blueBigEntity: PuntoBigEntity = new PuntoBigEntity(2)
const redBigEntity: BancoBigEntity = new BancoBigEntity(2)

describe("entity.ts", () => {
	test("getTagArray", () => {
		const big = new BigRoad(3)
		big.addEntity(blueBigEntity)
		big.addEntity(redBigEntity)
		blueBigEntity.addTag(new BancoNaturalBadge(2))
		return expect(blueBigEntity.getTagArray()[0]).toBeInstanceOf(
			BancoNaturalBadge
		)
	})
})
