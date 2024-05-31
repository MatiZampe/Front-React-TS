import { Box, HStack, Hide, Icon, Show } from "@chakra-ui/react";
import NavbarUser from "./NavBarUser";
import NavbarItem from "./NavBarItem";


const Navbar = () => {
  
  const routes = [
    {
      label: "Branches",
      path: "/branch",
    },
    {
      label: "Products",
      path: "/product",
    },
    {
      label: "Menus",
      path: "/menu",
    }
  ];

  return (
    <Box w={"full"} h={"16vh"} bg={"black"} mb={0}>
      <HStack
        w={"full"}
        h={"full"}
        py={2}
        justifyContent={{
          base: "space-between",
          sm: "space-between",
          md: "space-around",
          lg: "space-around",
        }}
        alignItems={"center"}
      >
        <Hide below="md">
          <HStack h={"full"}>
            {routes.map((route) => (
              <NavbarItem
                key={route.path}
                label={route.label}
                to={route.path}
                path={route.path}
              />
            ))}
          </HStack>
        </Hide>
        <NavbarUser />
      </HStack>
    </Box>
  );
};

export default Navbar;