const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    department: { 
        type: String, 
        required: true 
    },
    position: { 
        type: String, 
        required: true 
    },
    phone: { 
        type: String, 
        required: true 
    },
    status: { 
        type: String, 
        default: 'Active' 
    }
}, { 
    // Automatically adds createdAt and updatedAt fields
    timestamps: true 
});

module.exports = mongoose.model('Employee', employeeSchema);