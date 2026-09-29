function updateEmployee(employees, employeeId, values) {
  return employees.map((employee) => employee.id === employeeId
    ? { ...employee, ...values }
    : employee)
}

export default updateEmployee