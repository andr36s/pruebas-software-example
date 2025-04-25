const { Router } = require('express');
const response = require('../../network/response')
const router = Router();
const ctrl = require('./index');
const {tiMonth, fuelEnergySelector} = require('../../calculators/environment');
const { calcularAreaCirculo } = require('../../calculators/calcular-area-circulo');
const { describe } = require('pm2');


const tableInjected = 'my_table'

router.get('/list', async (req, res) => {
    try {
        const id = req.params.id
        const list = await ctrl.list(tableInjected);
        response.success(req, res, list, 200);    
    } catch (error) {
        response.error(req, res, error.message, 500); 
    }
})

router.get('/test_network/:radio', async (req, res) => {
    try {
        const radio = req.params.radio
        response.success(req, res, calcularAreaCirculo(radio), 200)
    } catch (error) {
        response.error(req, res, error.message, 500)
    }
})

router.get('/env_test', async (req, res) => {
    try {
        const list = {
            "month_inflation": tiMonth(2.8),
            "fuel_selected": fuelEnergySelector("Gasolina")
        }
        response.success(req, res, list, 200);    
    } catch (error) {
        response.error(req, res, error.message, 500); 
    }
})


router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const list = await ctrl.listById(tableInjected, id);
        response.success(req, res, list, 200);    
    } catch (error) {
        response.error(req, res, error.message, 500); 
    }
})


router.post('/add', async (req, res) => {
    try {
        await ctrl.addElement(tableInjected, data = {
            "data": req.body.data,
        });
        response.success(req, res, `Item Created`, 200);    
    } catch (error) {
        response.error(req, res, error.message, 500);
    }
});


router.put('/update', async (req, res) => {
    try {
        let { id, data } = req.body;
        await ctrl.updateElement(tableInjected, data = {
            "id": id,
            "data": data,
        });
        response.success(req, res, `Item updated`, 200);     
    } catch (error) {
        response.error(req, res, error.message, 500);
    }
});


module.exports = router ;