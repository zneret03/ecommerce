import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import {
  Login,
  Logout,
  NotFound,
  Register,
  SellerDashboard,
  Category,
  Orders,
  Products,
  StockManagement,
  AddProducts,
  UpdateProducts,
  Home,
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
        <Route exact path="/category" element={<Category />} />
        <Route exact path="/orders" element={<Orders />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/stockManagement" element={<StockManagement />} />
        <Route exact path="/addProducts/" element={<AddProducts />} />
        <Route exact path="/updateProducts/:id" element={<UpdateProducts />} />

      </Routes>
    </Router>
  )
}

export default App
