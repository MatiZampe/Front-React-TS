import { VStack, Box, Menu } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar/NavBar";
// import RequireAuth from "@auth-kit/react-router/RequireAuth";
import SignIn from "./pages/SignIn/SignIn";
import Products from "./pages/products/Products";
import Footer from "./components/footer/Footer";

const signInPath = "/login";

const App = () => {
  return (
    <VStack w={"full"} minH={"100vh"} spacing={0}>
      <Navbar />
      <Box w={"full"} flex={1} bgColor={"whitesmoke"}>
        <Routes>
          <Route path={signInPath} element={<SignIn />} />
<<<<<<< HEAD
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
=======
          <Route
            path={"/product"}
            element={
              // <RequireAuth fallbackPath={signInPath}>
                <Products />
              // </RequireAuth>
            }
          ></Route>
          {/* <Route path={"/product/:id"} element={<ProductDetailedView />} />
          <Route path={"/branch"} element={<Branch />} />
          <Route path={"/menu"} element={<Menu />} /> */}
>>>>>>> parent of 285a453 (squash example)

        </Routes>
      </Box>
      <Footer />
    </VStack>
  );
};

export default App;