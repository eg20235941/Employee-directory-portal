const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// 1. POST: Add a new employee
router.post('/', async (req, res) => {
    try {
        // Create a new employee using the data sent from the frontend (req.body)
        const newEmployee = new Employee(req.body);
        const savedEmployee = await newEmployee.save();
        
        // Send back a 201 Created status and the saved data
        res.status(201).json(savedEmployee);
    } catch (error) {
        // Send a 400 Bad Request error if validation fails (e.g., missing name)
        res.status(400).json({ message: error.message });
    }
});

// 2. GET: Fetch all employees
router.get('/', async (req, res) => {
    try {
        // Retrieve all employee documents from MongoDB
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;