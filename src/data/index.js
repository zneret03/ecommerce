import { Home, ShoppingBag ,File, Archive, ShoppingCart, Box, LogOut } from "react-feather"

const iconSize = 18

const sidebarList = [
  {
    id: 1,
    title: "Home",
    icon: <Home size={iconSize} />,
    path: "/admin",
    shop: true
  },
  {
    id: 2,
    title: "Shop",
    icon: <ShoppingBag size={iconSize} />,
    path: "/admin/shop",
  },
  {
    id: 3,
    title: "Stock Management",
    icon: <Archive size={iconSize} />,
    path: "/admin/stockManagement",
    shop: true
  },
  {
    id: 4,
    title: "Manage Category",
    icon: <File size={iconSize} />,
    path: "/admin/category",
    shop: true
  },
  {
    id: 5,
    title: "Orders",
    icon: <ShoppingCart size={iconSize} />,
    path: "/admin/orders",
    shop: true
  },
  {
    id: 6,
    title: "Products",
    icon: <Box size={iconSize} />,
    path: "/admin/products",
    shop: true
  },
  {
    id: 7,
    title: "Logout",
    icon: <LogOut size={iconSize} />,
    path: "/logout"
  },
]

export { sidebarList }
