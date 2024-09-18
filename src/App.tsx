import { VStack, Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar/NavBar";
import RequireAuth from "@auth-kit/react-router/RequireAuth";
import SignIn from "./pages/SignIn/SignIn";
import Products from "./pages/products/Products";

import Branches from "./pages/branches/Branches";
import ProductDetailedView from "./pages/products/ProductDetailedView";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { ApplicationUser, UserTypeEnum } from "./api/types";
import BranchesTable from "./pages/Admin/branches/BranchesTable";
import Home from "./pages/home/Home";
import ProductsTable from "./pages/Admin/products/ProductsTable";
import Menu from "./pages/menu/Menu";
import CategoriesTable from "./pages/Admin/category/CategoriesTable";
import MenuTable from "./pages/Admin/menu/MenuTable";

const signInPath = "/login";


const App = () => {
  const user = useAuthUser<ApplicationUser>();
  return (
    <VStack w="full" minH="100vh" spacing={0}>

      <RequireAuth fallbackPath={signInPath}>
        <Navbar />
      </RequireAuth>


      <Box w="full" flex={1} bgColor="whitesmoke">
        <Routes>
          <Route path={signInPath} element={<SignIn />} />
          <Route path="/" element={<Home />} />
          <Route path="/branch/menu/:id" element={<Menu />} />
<<<<<<< HEAD
=======
          {/* <Route
            path="/product"
            element={
              <RequireAuth fallbackPath={signInPath}>
                <Products />
              </RequireAuth>
            }
          /> */}
          {/* <Route
            path="/branch"
            element={
              <RequireAuth fallbackPath={signInPath}>
                <Branches />
              </RequireAuth>
            }
          /> */}
>>>>>>> a4e4ffca650648b7b345b08da9238c36f5fbc9ac
          <Route path="/branch/menu/product/:id" element={<ProductDetailedView />} />
          {user && user.userType === UserTypeEnum.Admin &&
            <>
         
              <Route path="/adminProducts" element={<ProductsTable />}></Route>
              <Route path="/adminBranches" element={<BranchesTable />}></Route>
              <Route path="/adminCategory" element={<CategoriesTable />}></Route>
              <Route path="/adminMenu" element={<MenuTable />}></Route>
            </>
          }

        </Routes>
      </Box>
      
    </VStack>
  );
};

export default App;