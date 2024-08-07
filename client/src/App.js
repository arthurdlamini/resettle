import Home from "./components/Pages/Home";
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation,
  NavLink,
} from "react-router-dom";
import Login from "./components/Pages/Login";
import Register from "./components/Pages/Register";
import Homesteads from "./components/AdminPanel/homestead/Homesteads";
import Users from "./components/AdminPanel/Users/Users";
import AddUser from "./components/AdminPanel/Users/AddUser";
import NewHome from "./components/AdminPanel/homestead/NewHome";
import ViewHomestead from "./components/AdminPanel/homestead/ViewHomestead";
import ResetPassword from "./components/Pages/ResetPassword";
import ResetPasswordForm from "./components/Pages/ResetPasswordForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Notfound from "./components/Pages/Notfound";
import { jwtDecode } from "jwt-decode";
import { logoutUser } from "./context/userSlice";
import { Link, useMatch } from "react-router-dom";
import Graves from "./components/AdminPanel/Graves/Graves";
import AddGrave from "./components/AdminPanel/Graves/AddGrave";
import Trees from "./components/AdminPanel/Trees/Trees";
import AddTree from "./components/AdminPanel/Trees/AddTree";
import Buildings from "./components/AdminPanel/Buildings/Buildings";
import AddBuildings from "./components/AdminPanel/Buildings/AddBuildings";
import Structures from "./components/AdminPanel/Structures/Structures";
import AddStructure from "./components/AdminPanel/Structures/AddStructure";
import Fields from "./components/AdminPanel/Fields/Fields";
import AddFields from "./components/AdminPanel/Fields/AddField";
import ViewGrave from "./components/AdminPanel/Graves/ViewGrave";
import ViewTree from "./components/AdminPanel/Trees/ViewTree";
import ViewUser from "./components/AdminPanel/Users/ViewUser";
import ViewField from "./components/AdminPanel/Fields/ViewField";
import AddFieldYield from "./components/AdminPanel/Fieldyield/AddFieldYield";
import ViewStructure from "./components/AdminPanel/Structures/ViewStructure";
import ViewBuilding from "./components/AdminPanel/Buildings/ViewBuilding";
import UsersLocal from "./components/AdminPanel/Users/UsersLocal";
import ViwUserLocal from "./components/AdminPanel/Users/ViwUserLocal";
import AddUserLocal from "./components/AdminPanel/Users/AddUserLocal";
import Dashboard from "./components/AdminPanel/Dashboard/Dashboard";
import Reports from "./components/AdminPanel/Reports/Reports";
import ViewCompensation from "./components/AdminPanel/homestead/ViewCompensation";
import Lookup from "./components/AdminPanel/homestead/Lookup";

function App() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const authToken = user?.token;
  let cleartimeout;
  const autoLogout = (expiresIn) => {
    cleartimeout = setTimeout(() => {
      dispatch(logoutUser());
      navigate("/login");
    }, expiresIn);
  };
  useEffect(() => {
    const checkTokenExpiration = () => {
      try {
        if (authToken) {
          const decodedToken = jwtDecode(authToken);
          const currentTime = Date.now() / 1000;
          if (decodedToken.exp < currentTime) {
            // Token is expired, logout user
            dispatch(logoutUser());
            navigate("/login");
            if (cleartimeout) {
              clearTimeout(cleartimeout);
            }
          } else {
            let date = new Date().getTime();
            let expDate = decodedToken.exp * 1000;
            autoLogout(expDate - date);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkTokenExpiration();
  }, [authToken, cleartimeout, dispatch, navigate]);

  function isAdmin() {
    if (authToken) {
      const decodedToken = jwtDecode(authToken);
      if (decodedToken.payload.role === "Admin") {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  function AdminRoute({ children }) {
    let location = useLocation();

    return isAuthenticated() ? (
      isAdmin() ? (
        children
      ) : (
        <Navigate to="/" replace state={{ from: location }} />
      )
    ) : (
      <Navigate to="/login" replace state={{ from: location }} />
    );
  }
  // This is a mock function, replace it with your actual authentication check
  function isAuthenticated() {
    return isLoggedIn;
    // return a boolean value indicating whether the user is authenticated or not
  }

  function ProtectedComponent({ children }) {
    let location = useLocation();

    return isAuthenticated() ? (
      children
    ) : (
      <Navigate to="/login" state={{ from: location }} />
    );
  }

  function PublicRoute({ children }) {
    let location = useLocation();

    return isAuthenticated() ? (
      <Navigate to="/" replace state={{ from: location }} />
    ) : (
      children
    );
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedComponent>
              <Home />
            </ProtectedComponent>
          }
        >
          <Route path="" element={<Dashboard />} />
          <Route
            path="person"
            element={
              <AdminRoute>
                <Users />
              </AdminRoute>
            }
          />
          <Route
            path="users"
            element={
              <AdminRoute>
                <UsersLocal />
              </AdminRoute>
            }
          /><Route
		  path="users/view/:id"
		  element={
			<AdminRoute>
			  <ViwUserLocal />
			</AdminRoute>
		  }
		/><Route
		path="users/add"
		element={
		  <AdminRoute>
			<AddUserLocal />
		  </AdminRoute>
		}
	  />
          <Route path="person/add" element={<AddUser />} />
          <Route path="person/view/:id" element={<ViewUser />} />
          <Route path="homesteads" element={<Homesteads />} />
          <Route path="homesteads/add" element={<NewHome />} />
          <Route path="graves" element={<Graves />} />
          <Route path="graves/add" element={<AddGrave />} />
          <Route path="graves/view/:id" element={<ViewGrave />} />
          <Route path="trees" element={<Trees />} />
          <Route path="trees/add" element={<AddTree />} />
          <Route path="trees/view/:id" element={<ViewTree />} />
          <Route path="buildings" element={<Buildings />} />
          <Route path="buildings/add" element={<AddBuildings />} />
          <Route path="buildings/view/:id" element={<ViewBuilding />} />
          <Route path="structures" element={<Structures />} />
          <Route path="structures/add" element={<AddStructure />} />
          <Route path="structures/view/:id" element={<ViewStructure />} />
          <Route path="fields" element={<Fields />} />
          <Route path="fields/add" element={<AddFields />} />
          <Route path="fields/addyield/:id" element={<AddFieldYield />} />
          <Route path="fields/view/:id" element={<ViewField />} />
          <Route path="homestead/view/:id" element={<ViewHomestead />} />
          <Route path="compansation/view/:id" element={<ViewCompensation />} />
          <Route path="reports" element={<Reports />} />
          <Route path="lookup" element={<Lookup />} />
        </Route>

        <Route
          path="/passwordReset/:token/:id"
          element={
            <PublicRoute>
              <ResetPasswordForm />
            </PublicRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />

        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
