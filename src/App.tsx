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

        </Routes>
      </Box>
      <Footer />
    </VStack>
  );
};

export default App;