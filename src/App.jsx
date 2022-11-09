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
  ProductPage,
  Products,
  Cart,
  Shop,
  ShopPage,
  Checkout,
  MyPurchase
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
        <Route exact path="/admin/shop" element={<Shop />} />

        <Route exact path="/product/:id" element={<ProductPage />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/shop" element={<ShopPage />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/checkout" element={<Checkout />} />
        <Route exact path="/mypurchase" element={<MyPurchase />} />

      </Routes>
    </Router>
  )
}

export default App
