import { useState } from 'react'
import addEmployee from './functions/addEmployee'
import removeEmployee from './functions/deleteEmployee'
import filterEmployees from './functions/filterEmployees'
import getDepartments from './functions/getDepartments'
import getInitials from './functions/getInitials'
import updateEmployee from './functions/updateEmployee'
import starterEmployees from './data/starterEmployees'
import './App.css'

function App() {
  const [employees, setEmployees] = useState(starterEmployees)
  const [search, setSearch] = useState('')
  const [department, setDepartment] = useState('All departments')
  const [notice, setNotice] = useState('')
  const [modal, setModal] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const departments = getDepartments(employees)
  const visibleEmployees = filterEmployees(employees, search, department)

  function selectEmployee(employee) {
    setModal({ type: 'details', employee })
  }

  function saveEmployee(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const values = Object.fromEntries(form.entries())
    if (modal.type === 'add') {
      setEmployees((current) => addEmployee(current, values))
      setNotice(`${values.name} was added to the directory.`)
    } else {
      setEmployees((current) => updateEmployee(current, modal.employee.id, values))
      setNotice(`${values.name}'s profile was updated.`)
    }
    setModal(null)
    setSearch('')
    setDepartment('All departments')
  }

  function deleteEmployee() {
    if (!modal?.employee) return
    setEmployees((current) => removeEmployee(current, modal.employee.id))
    setNotice(`${modal.employee.name} was removed from the directory.`)
    setModal(null)
  }

  if (!isLoggedIn) {
    return (
      <main className="login-screen">
        <section className="login-panel">
          <div className="login-form-wrap">
            <a className="brand login-brand" href="#login">
              <span className="brand-mark">E</span>
              <span>Employee Directory</span>
            </a>
            <h2>Sign in</h2>
            <p className="login-intro">Enter your email and password.</p>
            <form onSubmit={(event) => { event.preventDefault(); setIsLoggedIn(true) }} className="login-form">
              <label>Work email<input type="email" placeholder="you@company.com" autoComplete="username" required autoFocus /></label>
              <label>Password<input type="password" placeholder="Enter your password" autoComplete="current-password" required /></label>
              <button className="primary-button login-submit">Sign in <span>→</span></button>
            </form>
            <p className="login-demo-note">Demo login: any email and password.</p>
          </div>
        </section>
      </main>
    )
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#directory" onClick={() => { setSearch(''); setDepartment('All departments') }}>
          <span className="brand-mark">E</span>
          <span>Employee Directory</span>
        </a>
        <div className="nav-label">WORKSPACE</div>
        <nav className="side-nav" aria-label="Main navigation">
          <a className="nav-item active" href="#directory"><span className="nav-icon" aria-hidden="true">▦</span>Directory</a>
        </nav>
        <div className="sidebar-foot">
          <div className="help-mark">?</div>
          <div><strong>Help</strong><span>Contact support</span></div>
          <span className="help-arrow">↗</span>
        </div>
      </aside>

      <main className="main-area" id="directory">
        <header className="topbar">
          <div className="breadcrumb">Workspace <span>/</span> <strong>People</strong></div>
          <div className="topbar-right">
            <span className="today-label">{new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date()).toUpperCase()}</span>
            <span className="topbar-divider" />
            <span className="signed-in"><span className="login-dot" /> Signed in</span>
            <div className="user-avatar" aria-label="Workspace user">JD</div>
          </div>
        </header>

        <div className="page-content">
          <section className="welcome-row">
            <div>
              <h1>Employee directory</h1>
            </div>
            <button className="primary-button" onClick={() => setModal({ type: 'add' })}><span>+</span> Add employee</button>
          </section>

          <section className="stats-row" aria-label="Directory summary">
            <div className="stat-block"><span className="stat-label">TEAM MEMBERS</span><strong>{employees.length.toString().padStart(2, '0')}</strong><span className="stat-note"><i className="stat-up">↗</i> Across {departments.length - 1} departments</span></div>
            <div className="stat-block"><span className="stat-label">DEPARTMENTS</span><strong>{(departments.length - 1).toString().padStart(2, '0')}</strong></div>
          </section>

          <section className="directory-section">
            <div className="directory-tabs" role="tablist" aria-label="Employee views">
              <button className="directory-tab active" role="tab" aria-selected="true">All employees <span className="count-pill">{visibleEmployees.length}</span></button>
            </div>

            <div className="toolbar">
              <label className="search-box" htmlFor="employee-search"><span aria-hidden="true">⌕</span>
                <input id="employee-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search people, roles, or email" />
                <kbd>/</kbd>
              </label>
              <label className="filter-select"><span className="filter-icon">☷</span>
                <select value={department} onChange={(event) => setDepartment(event.target.value)} aria-label="Filter by department">
                  {departments.map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
              <span className="results-label">{visibleEmployees.length} RESULTS</span>
            </div>

            {notice && <div className="notice" role="status"><span>✓</span>{notice}<button onClick={() => setNotice('')} aria-label="Dismiss notification">×</button></div>}

            <div className="employee-grid">
              {visibleEmployees.map((employee) => <article key={employee.id} className="employee-card">
                <button className="card-profile-button" onClick={() => selectEmployee(employee)} aria-label={`View ${employee.name}'s details`}>
                  <div className="card-top"><div className={`person-avatar ${employee.color}`}>{getInitials(employee.name)}</div><span className="view-profile">View profile ↗</span></div>
                  <div className="person-info"><h3>{employee.name}</h3><p>{employee.role}</p></div>
                  <div className="card-rule" />
                  <div className="person-meta"><span className="department-tag">{employee.department}</span><span>{employee.location}</span></div>
                  <span className="employee-id">{employee.id}</span>
                </button>
                <a className="email-link" href={`mailto:${employee.email}`}>{employee.email}<span>↗</span></a>
              </article>)}
              {visibleEmployees.length === 0 && <div className="empty-state"><span>⌕</span><h3>No people found</h3><p>Try another name, email, or department.</p><button className="text-action" onClick={() => { setSearch(''); setDepartment('All departments') }}>Clear filters</button></div>}
            </div>
            <footer className="page-footer"><span>Showing {visibleEmployees.length} of {employees.length} team members</span></footer>
          </section>
        </div>
      </main>

      {modal && <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setModal(null) }}>
        <section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <button className="modal-close" onClick={() => setModal(null)} aria-label="Close dialog">×</button>
          {modal.type === 'details' ? <>
            <div className={`detail-avatar person-avatar ${modal.employee.color}`}>{getInitials(modal.employee.name)}</div>
            <h2 id="modal-title">{modal.employee.name}</h2><p className="modal-copy">{modal.employee.role}</p>
            <div className="profile-details">
              <div><span>Department</span><strong>{modal.employee.department}</strong></div>
              <div><span>Location</span><strong>{modal.employee.location}</strong></div>
              <div><span>Work email</span><a href={`mailto:${modal.employee.email}`}>{modal.employee.email}</a></div>
              <div><span>Employee ID</span><strong>{modal.employee.id}</strong></div>
            </div>
            <div className="modal-actions profile-actions">
              <button className="delete-button" onClick={() => setModal({ type: 'confirm-delete', employee: modal.employee })}>Delete</button>
              <button className="primary-button form-submit" onClick={() => setModal({ type: 'edit', employee: modal.employee })}>Update profile <span>→</span></button>
            </div>
          </> : modal.type === 'confirm-delete' ? <>
            <h2 id="modal-title">Delete this profile?</h2><p className="modal-copy">{modal.employee.name} will be removed from the directory. This cannot be undone.</p>
            <div className="modal-actions"><button className="cancel-button" onClick={() => setModal({ type: 'details', employee: modal.employee })}>Cancel</button><button className="delete-button" onClick={deleteEmployee}>Delete employee</button></div>
          </> : <>
            <h2 id="modal-title">{modal.type === 'add' ? 'Add employee' : 'Edit employee'}</h2>
            <form onSubmit={saveEmployee} className="employee-form">
              <label>Full name<input name="name" defaultValue={modal.employee?.name ?? ''} placeholder="e.g. Alex Morgan" required autoFocus /></label>
              <label>Job title<input name="role" defaultValue={modal.employee?.role ?? ''} placeholder="e.g. Product Designer" required /></label>
              <div className="form-pair"><label>Department<input name="department" defaultValue={modal.employee?.department ?? ''} placeholder="e.g. Design" required /></label><label>Location<input name="location" defaultValue={modal.employee?.location ?? ''} placeholder="e.g. New York" required /></label></div>
              <label>Work email<input name="email" type="email" defaultValue={modal.employee?.email ?? ''} placeholder="name@company.com" required /></label>
              <div className="modal-actions"><button type="button" className="cancel-button" onClick={() => setModal(null)}>Cancel</button><button className="primary-button form-submit">{modal.type === 'add' ? 'Add employee' : 'Save changes'} <span>→</span></button></div>
            </form>
          </>}
        </section>
      </div>}
    </div>
  )
}

export default App
