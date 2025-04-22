import "./App.css";
import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./utils/ProtecteRoutes";
import Navigation from "./pages/Navigation";
import Home from "./pages/Home";
import Login from "./pages/Login";
import StudentReport from "./pages/StudentReport";
import Levels from "./pages/Levels";
import Gallery from "./pages/Gallery";
import { Toaster } from "sonner";

function App() {
  return (
    <div className="app__container">
      <Navigation />
      <Toaster richColors />

      <Routes>
        <Route path="/log-in" element={<Login />} />
        <Route path="/niveles" element={<Levels />} />
        <Route path="/" element={<Home />} />
        <Route path="/galeria-fotos" element={<Gallery />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/reporte-estudiante" element={<StudentReport />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
