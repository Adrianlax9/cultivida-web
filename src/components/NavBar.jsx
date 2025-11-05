import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function NavBar() {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const link = "px-3 py-2 rounded-md text-sm font-medium hover:text-yellow-300";
  const active = "text-yellow-300";

  return (
    <nav className="bg-green-700 text-white shadow-md">
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex h-16 items-center justify-between"> {/* aumenté un poco la altura */}
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/images/logo1.png" // asegúrate de que esté en public/images/
            alt="Cultivida Logo"
            className="h-16 w-auto rounded-xl hover:scale-150"
            
          />
        </Link>

          <div className="flex gap-4 items-center">
            <NavLink to="/" className={({ isActive }) => (isActive ? `${link} ${active}` : link)}>
              Inicio
            </NavLink>
            <NavLink to="/productos" className={({ isActive }) => (isActive ? `${link} ${active}` : link)}>
              Productos
            </NavLink>
            <NavLink to="/beneficios" className={({ isActive }) => (isActive ? `${link} ${active}` : link)}>
              Beneficios
            </NavLink>
            <NavLink to="/nosotros" className={({ isActive }) => (isActive ? `${link} ${active}` : link)}>
              Nosotros
            </NavLink>
            <NavLink to="/contacto" className={({ isActive }) => (isActive ? `${link} ${active}` : link)}>
              Contáctanos
            </NavLink>

            <NavLink to="/carrito" className={({ isActive }) => (isActive ? `${link} ${active}` : link)}>
              🛒 Carrito {count > 0 && <span className="ml-1 bg-yellow-400 text-green-900 px-2 py-0.5 rounded-full text-xs font-bold">{count}</span>}
            </NavLink>

            {user && user.role === "admin" && (
              <>
                <NavLink to="/admin/productos" className={({ isActive }) => (isActive ? `${link} ${active}` : link)}>
                  Admin Productos
                </NavLink>
                <NavLink to="/admin/pedidos" className={({ isActive }) => (isActive ? `${link} ${active}` : link)}>
                  Admin Pedidos
                </NavLink>
              </>
            )}
              {user && (
  <NavLink to="/opiniones" className={({isActive}) => (isActive? `${link} ${active}` : link)}>
    Opinar
  </NavLink>
)}

            {!user ? (
              <>
                <NavLink to="/login" className={({ isActive }) => (isActive ? `${link} ${active}` : link)}>
                  Ingresar
                </NavLink>
                <NavLink to="/registro" className={({ isActive }) => (isActive ? `${link} ${active}` : link)}>
                  Registrarse
                </NavLink>
              </>
            ) : (
              <button onClick={logout} className="bg-yellow-400 text-green-900 px-3 py-1 rounded-md hover:bg-yellow-500">
                Salir
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
