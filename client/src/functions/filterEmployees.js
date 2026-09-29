function filterEmployees(employees, search, department) {
  const term = search.trim().toLowerCase()

  return employees.filter((employee) => {
    const matchesSearch = !term || [employee.name, employee.role, employee.department, employee.email, employee.id]
      .some((value) => value.toLowerCase().includes(term))

    return matchesSearch && (department === 'All departments' || employee.department === department)
  })
}

export default filterEmployees