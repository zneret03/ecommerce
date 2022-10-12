import { Home, User, Archive, Folder, ShoppingCart, Box } from "react-feather"

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
    id: 2,
    title: "Manage Category",
    icon: <User size={iconSize} />,
    path: "/category",
  },
  {
    id: 3,
    title: "Inventory",
    icon: <Folder size={iconSize} />,
    path: "/inventory",
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
]

export { sidebarList }
