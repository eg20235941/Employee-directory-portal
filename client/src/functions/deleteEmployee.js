const deleteEmployee = async (employees, employeeId) => {
    try {
        // Send DELETE to backend
        const response = await fetch(`http://localhost:5000/api/employees/${employeeId}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            // Remove the deleted person from the React list (MongoDB uses _id)
            return employees.filter((emp) => emp._id !== employeeId && emp.id !== employeeId);
        } else {
            return employees;
        }
    } catch (error) {
        console.error("Delete failed:", error);
        return employees; // Return the original list so the screen doesn't crash
    }
}

export default deleteEmployee;