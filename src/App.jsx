import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import {
  Login,
  Register,
  SellerDashboard,
  Category,
  Orders,
  Products,
  StockManagement,
  Shop,
  AddProducts,
} from "pages"

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />

        {/**Admin pages */}
        <Route exact path="/admin" element={<SellerDashboard />} />
        <Route exact path="/category" element={<Category />} />
        <Route exact path="/orders" element={<Orders />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/stockManagement" element={<StockManagement />} />
        <Route exact path="/addProducts" element={<AddProducts />} />

        {/**Buyer pages */}
        <Route exact path="/shop" element={<Shop />} />
      </Routes>
    </Router>
  )
}

export default App
