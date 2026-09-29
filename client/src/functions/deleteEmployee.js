function deleteEmployee(employees, employeeId) {
  return employees.filter((employee) => employee.id !== employeeId)
}

export default deleteEmployee