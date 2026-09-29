function getDepartments(employees) {
  return ['All departments', ...new Set(employees.map((employee) => employee.department))]
}

export default getDepartments