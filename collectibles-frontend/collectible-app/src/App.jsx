import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import LoginPage from "./pages/LoginPage.jsx";
import CreateAccountPage from "./pages/CreateAccountPage.jsx";
import ProductHero from "./pages/views/ProductHero.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import "./App.css";
import Sidebar from "./components/Sidebar.jsx";
import CollectiblesPage from "./pages/CollectiblesPage.jsx";
import AddCollectibleListForm from "./components/AddCollectibleListForm.jsx";
import CollectibleListPage from "./pages/CollectibleListPage.jsx";
import AddCollectiblesForm from "./components/AddCollectiblesForm.jsx";
import AddSubcategoriesForm from "./components/AddSubcategoriesForm.jsx";
import AboutPAge from "./pages/AboutPage.jsx";
import HomePage from "./pages/HomePage.jsx";

function App() {
  return (
    <Router>
      <NavBar />
      <Sidebar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/about" element={<AboutPAge />} />

        {/* Protected Route: Dashboard */}
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<DashboardPage />} />}
        />

        {/* Protected Route: CollectibleDetailPage */}
        <Route
          path="/collectibles/:collectibleType"
          element={<PrivateRoute element={<CollectibleListPage />} />}
        />
        {/* Protected Route: CollectibleDetailPage */}
        <Route
          path="/collectibles/:collectibleType/:name"
          element={<PrivateRoute element={<CollectiblesPage />} />}
        />

        {/* Protected Route: AddCollectibleListForm */}
        <Route
          path="/dashboard/addCollectibleList"
          element={<PrivateRoute element={<AddCollectibleListForm />} />}
        />
        {/* Protected Route: AddCollectibleListForm */}
        <Route
          path="/dashboard/addCollectibleForm"
          element={<PrivateRoute element={<AddCollectiblesForm />} />}
        />
        {/* Protected Route: AddCollectibleListForm */}
        <Route
          path="/dashboard/addSubcategoriesForm"
          element={<PrivateRoute element={<AddSubcategoriesForm />} />}
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
