import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Order from './pages/order/Order'
import Home from './pages/home/Home'

import Cart from './pages/cart/Cart'
import Dashboard from './pages/admin/dashboard/Dashboard'
import Nopage from './pages/noPage/Nopage'
import Login from './pages/Registration/Login'
import SignUp from './pages/Registration/SignUp'
import ProductInfo from './pages/ProductInfo/ProductInfo'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import AddProduct from './pages/admin/Page/AddProduct'
import UpdateProduct from './pages/admin/Page/UpdateProduct'
import AllProducts from './pages/allProducts/AllProducts'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<protectedRoute>
          <Order />
        </protectedRoute>} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/allproducts" element={<AllProducts />} />
        <Route path="/dashboard" element={<ProtectedForAdminRoute>
          <Dashboard />
        </ProtectedForAdminRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/productinfo/:id" element={<ProductInfo />} />
        <Route path="/addproduct" element={<ProtectedForAdminRoute>
          <AddProduct />
        </ProtectedForAdminRoute>
        } />
        <Route path="/updateproduct" element={<ProtectedForAdminRoute>
          <UpdateProduct />
        </ProtectedForAdminRoute>} />
        <Route path="/nopage" element={<Nopage />} />

      </Routes>
      <ToastContainer />
    </>
  )
}

export default App


///Protected route
export const protectedRoute = ({ children }) => {
  const user = localStorage.getItem('user')
  if (!user) {
    return <Navigate to="/login" />
  }
  else {
    return children
  }
}

///admin route/
export const ProtectedForAdminRoute = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem('user'))
  if (admin.user.email == 'sanodiyaramnarayan92@gmail.com') {
    return children
  }
  else {
    return <Navigate to="/login" />
  }
}
