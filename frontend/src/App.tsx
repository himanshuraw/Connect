import { BrowserRouter, Route, Routes } from "react-router"
import Login from "./components/authentication/Login"
import Register from "./components/authentication/Register"
import ProtectedRoute from "./components/ProtectedRoute"
import Application from "./layouts/Application"
import Authentication from "./layouts/Authentication"
import Home from "./pages/Home"
import { useAppDispatch } from "./store/hooks"
import { useEffect } from "react"
import { initializeAuth } from "./store/slices/authSlice"
import Profile from "./pages/Profile"
import Explore from "./pages/Explore"
import Search from "./pages/Search"

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);


  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Authentication Routes */}
          <Route element={<Authentication />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Application />}>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/search" element={<Search />} />
              <Route path="/:username" element={<Profile />} />
            </Route>
          </Route>



        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
