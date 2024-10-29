// App.js
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './Context/AuthContext';
import { PrivateRoute } from './Context/PrivateRoute';
import './App.css';
import AdminStack from './Pages/AppStack/AdminStack/AdminStack';
import ForgotPassword from './Pages/AuthStack/ForgotPassword/ForgotPassword';
import SignIn from './Pages/AuthStack/SignIn/SignIn';
import Products from './Pages/AppStack/AdminStack/Products/Products';
import Categories from './Pages/AppStack/AdminStack/Categories/Categories';
import Orders from './Pages/AppStack/AdminStack/Orders/Orders';
import Sellers from './Pages/AppStack/AdminStack/Sellers/Sellers';
import Customers from './Pages/AppStack/AdminStack/Customers/Customers';
import Reviews from './Pages/AppStack/AdminStack/Reviews/Reviews';
import Profile from './Pages/AppStack/AdminStack/Profile/Profile';
import AppNotifications from './Pages/AppStack/AdminStack/AppNotifications/AppNotifications';
import AddCustomers from './Pages/AppStack/AdminStack/AddCustomers/AddCustomers';
import AddSeller from './Pages/AppStack/AdminStack/AddSeller/AddSeller';
import AddProducts from './Pages/AppStack/AdminStack/AddProducts/AddProducts';
import AddCategory from './Pages/AppStack/AdminStack/AddCategory/AddCategory';
import AppStack from './Pages/AppStack/AppStack';
import SignUp from './Pages/AuthStack/SignUp/SignUp';
import NotAuthorized from './Pages/NotAuthorized/NotAuthorized';
import NotFound from './Pages/NotFound/NotFound';
import CsrStack from './Pages/AppStack/CsrStack/CsrStack';
import VendorStack from './Pages/AppStack/VendorStack/VendorStack';
import CsrDashboard from './Pages/AppStack/CsrStack/Dashboard/CsrDashboard';
import VendorDashboard from './Pages/AppStack/VendorStack/Dashboard/VendorDashboard';
import AdminDashboard from './Pages/AppStack/AdminStack/Dashboard/AdminDashboard';
import AuthStack from './Pages/AuthStack/AuthStack';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<h1>hello</h1>} />

          {/* Auth Stack */}
          <Route path="/auth" element={<AuthStack />}>
            <Route index element={<SignIn />} />
            <Route path="signIn" element={<SignIn />} />
            <Route path="signUp" element={<SignUp />} />
            <Route path="forgot" element={<ForgotPassword />} />
          </Route>

          {/* App Stack (protected) */}
          <Route path="/app" element={<AppStack />}>

            {/* Admin Routes (protected by admin role) */}
            <Route element={<PrivateRoute roles={['ADMIN']} />}>
              <Route path="admin" element={<AdminStack />}>
                <Route index element={<AdminDashboard />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="products" element={<Products />} />
                <Route path="addProduct" element={<AddProducts />} />
                <Route path="editProduct/:id" element={<AddProducts />} />
                <Route path="categories" element={<Categories />} />
                <Route path="addCategory" element={<AddCategory />} />
                <Route path="editCategory/:id" element={<AddCategory />} />
                <Route path="orders" element={<Orders />} />
                <Route path="sellers" element={<Sellers />} />
                <Route path="addSeller" element={<AddSeller />} />
                <Route path="editSeller/:id" element={<AddSeller />} />
                <Route path="customers" element={<Customers />} />
                <Route path="addCustomer" element={<AddCustomers />} />
                <Route path="editCustomer/:id" element={<AddCustomers />} />
                <Route path="reviews" element={<Reviews />} />
              </Route>
            </Route>

            {/* CSR Routes (protected by csr role) */}
            <Route element={<PrivateRoute roles={['CSR']} />}>
              <Route path="csr" element={<CsrStack />}>
                <Route index element={<CsrDashboard />} />
                <Route path="dashboard" element={<CsrDashboard />} />
              </Route>
            </Route>

            {/* Vendor Routes (protected by vendor role) */}
            <Route element={<PrivateRoute roles={['VENDOR']} />}>
              <Route path="vendor" element={<VendorStack />}>
                <Route index element={<VendorDashboard />} />
                <Route path="dashboard" element={<VendorDashboard />} />
              </Route>
            </Route>

            {/* common profile for all */}
            <Route path="notifications" element={<AppNotifications />} />
            <Route path="profile" element={<Profile />} />

          </Route>

          {/* Not Authorized and Not Found */}
          <Route path="/notauthorized" element={<NotAuthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
