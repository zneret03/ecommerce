import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import {
  Login,
  Register,
  SellerDashboard,
  Category,
  Inventory,
  Orders,
  Products,
  StockManagement,
  Shop,
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
        <Route exact path="/inventory" element={<Inventory />} />
        <Route exact path="/orders" element={<Orders />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/stockManagement" element={<StockManagement />} />

        {/**Buyer pages */}
        <Route exact path="/shop" element={<Shop />} />
      </Routes>
    </Router>
  )
}

export default App
