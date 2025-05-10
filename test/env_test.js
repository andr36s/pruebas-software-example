const assert = require('assert');
const {tiMonth, fuelEnergySelector, fuelConsumption, costElectricalKM} = require("../calculators/environment")

describe("testFuelSelector - Andrés Gómez", () => {
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
    
    it("Combustible con baja energía y alto consumo", () => {
    const combustion = 5; // muy alto
    const fuel_energy = 10; // muy bajo
    const result = fuelConsumption(combustion, fuel_energy);
    
    assert.strictEqual(result, 0.5);
    });

    it("Costo por km con consumo eléctrico 0", () => {
    const cost = costElectricalKM(0, 250); // energía cuesta 250 sin consumir
    assert.strictEqual(cost, 0);
    });

})