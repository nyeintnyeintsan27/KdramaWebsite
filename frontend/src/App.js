import { Routes, Route } from "react-router-dom";

import CustomerLayout from "./layouts/CustomerLayout";
import AdminLayout from "./layouts/AdminLayout";
import AdminMovieList from "./pages/AdminMovieList";
import EditMovie from "./pages/EditMovie";
import AddUpcoming from "./pages/AddUpcoming"; 
// Customer Pages
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import UpcomingList from "./pages/UpcomingList"; // <-- list of upcoming movies
import UpcomingDetail from "./pages/UpcomingDetail"; // optional: detail page

// Admin Pages
import AdminDashboard from "./pages/AdminDashboardPage";
import MovieList from "./pages/MovieList";
import AddMovie from "./pages/AddMoviePage";
import AdminUpcomingList from "./pages/AdminUpcomingList";

function App() {
  return (
    <Routes>

      {/* CUSTOMER ROUTES */}
      <Route element={<CustomerLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<MovieList />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
         <Route path="/upcoming" element={<UpcomingList />} />
        <Route path="/upcoming/:id" element={<UpcomingDetail />} />
      </Route>

      {/* ADMIN ROUTES */}
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/movies" element={<AdminMovieList />} />
        <Route path="/admin/movies/edit/:id" element={<EditMovie />} />
        <Route path="/admin/movies/add" element={<AddMovie />} />
        <Route path="/admin/upcoming" element={<AddUpcoming />} />

        <Route path="/admin/upcoming/list" element={<AdminUpcomingList />} />
      </Route>

    </Routes>
  );
}

export default App;