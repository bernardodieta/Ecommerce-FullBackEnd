import { ordersService } from "../services/services.js"
import { NotFoundError } from "../utils/errors.js"
import { response } from "../utils/response.js"
import { catchedAsync } from "../utils/catchedAsync.js";


const getAllOrderByuserId = async (req, res, next) => {
    try {
        const { userId } = req.params
        const orders = await ordersService.getAllOrderByuserId(userId, req.logger)
        if (!orders) {
            req.logger.warning(`${req.method} en ${req.url} - Error: 'No se encontro una orden con ese ID.' - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
            throw new NotFoundError('No se encontro una orden con ese ID.')
        }
        response(res, 200, orders)
    } catch (error) {
        next(error)
    }
}

const getOrderByIdController = async (req, res, next) => {
    const { id } = req.params
    const result = await ordersService.getOrderById(id, req.logger)
    response(res, 200, result)
}

const getAllOrder = async (req, res, next) => {
    try {
        const result = await ordersService.getOrders(req.logger)
        response(res, 200, result)
    } catch (error) {
        next(error)
    }
}


const confirmOrder = async (req, res, next) => {
    try {
        const { orderId } = req.params
        let newStatus = 'Entregada'
        const result = await ordersService.updateOrderStatus(orderId, newStatus, req.logger)
        if (!result) {
            req.logger.warning(`${req.method} en ${req.url} - Error: 'No existe una orden a confirmar' - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
            throw new NotFoundError('No existe una orden a confirmar')
        }
        response(res, 200, { message: 'Orden confirmada.', order: result })
    } catch (error) {
        next(error)
    }

}

const cancelOrder = async (req, res, next) => {
    try {
        const { orderId } = req.params
        let newStatus = 'Cancelada'
        const result = await ordersService.updateOrderStatus(orderId, newStatus, req.logger)
        if (!result) {
            req.logger.warning(`${req.method} en ${req.url} - Error: 'No existe una orden para cancelar' - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)

            throw new NotFoundError('No existe una orden para cancelar')
        }
        response(res, 200, { message: 'Orden Cancelada.', order: result })
    } catch (error) {
        next(error)
    }

}

const updateAddressOrder = async (req, res, next) => {
    const { id } = req.params
    const { selectedAddress } = req.body
    console.log(id);
    console.log(selectedAddress);
    const updateAddress = await ordersService.updateOrderAddress(id, selectedAddress, req.logger)
    console.log('respuesta de updateaddress', updateAddress);
    response(res, 200, selectedAddress)

}



const TuninggetAllOrderByuserId = catchedAsync(getAllOrderByuserId)
const TuninggetAllOrder = catchedAsync(getAllOrder)
const TuninggetOrderByIdController = catchedAsync(getOrderByIdController)
const TuningconfirmOrder = catchedAsync(confirmOrder)
const TuningcancelOrder = catchedAsync(cancelOrder)
const TuningupdateAddressOrder = catchedAsync(updateAddressOrder)

export {
    TuninggetAllOrderByuserId as getAllOrderByuserId,
    TuninggetOrderByIdController as getOrderByIdController,
    TuninggetAllOrder as getAllOrder,
    TuningconfirmOrder as confirmOrder,
    TuningcancelOrder as cancelOrder,
    TuningupdateAddressOrder as updateAddressOrder,
}