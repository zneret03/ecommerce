import { Home, File, Archive, ShoppingCart, Box, LogOut } from "react-feather"

const iconSize = 18

const sidebarList = [
  {
    id: 1,
    title: "Home",
    icon: <Home size={iconSize} />,
    path: "/admin",
  },
  {
    id: 2,
    title: "Stock Management",
    icon: <Archive size={iconSize} />,
    path: "/stockManagement",
  },
  {
    id: 3,
    title: "Manage Category",
    icon: <File size={iconSize} />,
    path: "/category",
  },
  {
    id: 4,
    title: "Orders",
    icon: <ShoppingCart size={iconSize} />,
    path: "/orders",
  },
  {
    id: 5,
    title: "Products",
    icon: <Box size={iconSize} />,
    path: "/products",
  },
  {
    id: 6,
    title: "Logout",
    icon: <LogOut size={iconSize} />,
    path: "/logout"
  },
]

export { sidebarList }
