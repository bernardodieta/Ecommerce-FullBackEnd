import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    email: {
        type: String,
        required: true
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        price: {
            type: Number,
            required: true
        },
        total: {
            type: Number,
            required: true
        }
    }],
    productssinStock: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }],
    total: {
        type: Number,
        required: true
    },
    address: [],

    deliverystatus: {
        type: String,
        enum: ['Pendiente', 'Entregada', 'Cancelada'],
        default: 'Pendiente'
    },
    paymentprocces: {
        type: String,
        enum: ['Rechazado', 'Pendiente', 'Incompleto', 'Completado'],
        default: 'Pendiente'
    },

    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

export const orderModel = mongoose.model('Order', orderSchema);
