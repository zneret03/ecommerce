import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import {
  Login,
  Logout,
  NotFound,
  Register,
  SellerDashboard,
  Category,
  Orders,
  AdminProducts,
  StockManagement,
  AddProducts,
  UpdateProducts,
  Home,
  ProductPage
} from "pages"

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/logout" element={<Logout />} />
        <Route exact path="/404" element={<NotFound />}/>

        {/**Admin pages */}
        <Route exact path="/admin" element={<SellerDashboard />} />
        <Route exact path="/admin/category" element={<Category />} />
        <Route exact path="/admin/orders" element={<Orders />} />
        <Route exact path="/admin/products" element={<AdminProducts />} />
        <Route exact path="/admin/stockManagement" element={<StockManagement />} />
        <Route exact path="/admin/addProducts/" element={<AddProducts />} />
        <Route exact path="/admin/updateProducts/:id" element={<UpdateProducts />} />

        <Route exact path="/product/:id" element={<ProductPage />} />

      </Routes>
    </Router>
  )
}

export default App
