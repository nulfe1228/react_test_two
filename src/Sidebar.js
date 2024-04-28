import './Sidebar.css'

function Sidebar({ open, children }){
    return (
        <div className={`sidebar ${open? 'open': ''}`}>
            <div className="sidebar-menus">{children}</div>
        </div>
    )
}
export default Sidebar