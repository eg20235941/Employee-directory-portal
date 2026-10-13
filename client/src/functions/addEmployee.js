const addEmployee = async (employees, values) => {
    try {
        const response = await fetch('http://localhost:5000/api/employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values) 
        });

        if (response.ok) {
            const savedEmployee = await response.json();
            return [savedEmployee, ...employees];
        } else {
            console.error("Server returned an error");
            return employees;
        }
    } catch (error) {
        console.error("Failed to connect to backend:", error);
        return employees;
    }
}

// THIS IS THE LINE THE BROWSER WAS LOOKING FOR
export default addEmployee;