const assert = require('assert');
const {tiMonth, fuelEnergySelector} = require("../calculators/environment")

// test('env_ipc', () => { 
//     assert.strictEqual(tiMonth(1.4), 5)
// })

describe("testFuelSelector", () => {
    it("Diesel", () => {
        assert.deepEqual(fuelEnergySelector("Diesel"), {
            "fuel_price": 12000,
            "fuel_energy": 40.7,
            "emision_factor": 70.4
          })
    })
    
    it("Gasolina", () => {
        assert.deepEqual(fuelEnergySelector("Gasolina"), {
            "fuel_price": 16700,
            "fuel_energy": 38.58,
            "emision_factor": 69.25
          })
    })

    it("DatoDiferente", () => {
        assert.deepEqual(fuelEnergySelector("Perro"), {
            "error": "Tipo de combustible no reconocido",
            "error_code": 500
        })
    })
    
    it("", () => {
        // assert.deepEqual(fuelEnergySelector(""), )
    })

})