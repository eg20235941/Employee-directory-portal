function getInitials(name) {
  return name.split(' ').map((part) => part[0]).join('')
}

export default getInitials