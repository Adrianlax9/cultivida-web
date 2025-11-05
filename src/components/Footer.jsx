export default function Footer(){
  return (
    <footer className="bg-green-700 text-white py-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-xl font-bold">CULTIVIDA</h2>
        <p className="text-sm">© {new Date().getFullYear()} Cultivida. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
