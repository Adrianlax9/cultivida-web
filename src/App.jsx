import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

// Tus páginas (asegúrate de que TODAS exporten default)
import Inicio from "./assets/pages/Inicio";
import Productos from "./assets/pages/Productos";
import Beneficios from "./assets/pages/Beneficios";
import Nosotros from "./assets/pages/Nosotros";
import Contacto from "./assets/pages/Contacto";
import Catalogo from "./assets/pages/Catalogo";
import Login from "./assets/pages/Login";
import Registro from "./assets/pages/Registro";
import Carrito from "./assets/pages/Carrito";
import AdminProductos from "./assets/pages/AdminProductos";
import AdminRoute from "./components/AdminRoute";
import Checkout from "./assets/pages/Checkout";
import OrderDetail from "./assets/pages/OrderDetail";
import PrivateRoute from "./components/PrivateRoute"; // si tienes uno; si no, entra solo logueado desde NavBar
import AdminOrders from "./assets/pages/AdminOrders";
import Opiniones from "./assets/pages/Opiniones";
// ...


export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white text-gray-800">
        <NavBar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/beneficios" element={<Beneficios />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/admin/productos" element={<AdminRoute><AdminProductos /></AdminRoute>} />
            <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>}/>
            <Route path="/orden/:id" element={<PrivateRoute><OrderDetail /></PrivateRoute>} />
            <Route path="/admin/pedidos" element={<PrivateRoute><AdminOrders /></PrivateRoute>} />
            <Route path="/opiniones" element={<Opiniones />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
<CDATASection className="apply"></CDATASection>