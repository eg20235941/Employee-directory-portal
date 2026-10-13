const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: false 
    },
    email: { 
        type: String, 
        required: false, 
        unique: false
    },
    department: { 
        type: String, 
        required: false 
    },
    position: { 
        type: String, 
        required: false 
    },
    phone: { 
        type: String, 
        required: false 
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