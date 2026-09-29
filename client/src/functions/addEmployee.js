function addEmployee(employees, values) {
  const employee = {
    ...values,
    id: `EMP-${Date.now().toString().slice(-4)}`,
    color: ['mint', 'peach', 'lilac', 'butter', 'blue', 'rose'][employees.length % 6],
  }

  return [employee, ...employees]
}

export default addEmployee