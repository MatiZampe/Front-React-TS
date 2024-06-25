import { Box, HStack, Hide } from "@chakra-ui/react";
import NavbarUser from "./NavBarUser";
import NavbarItem from "./NavBarItem";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { ApplicationUser, UserTypeEnum } from '../../api/types';
import backgroundImage from '../../assets/images/bg-image.jpg'



const Navbar = () => {

  const user = useAuthUser<ApplicationUser>();

  const adminRoutes = [
    {
      label: "Products",
      path: "/adminProducts",
    },
    {
      label: "Branches",
      path: "/adminBranches",
    },
    {
      label: "Category",
      path: "/adminCategory"
    },
    {
      label: "Menu",
      path: "/adminMenu"
    }
  ];

  const routes = [

    ...(user && user.userType === UserTypeEnum.Admin ?
      [
        {
          label: "Admin",
          isAdmin: true,
          adminRoutes: adminRoutes
        }
      ]
      : [])
  ];

  return (
    <Box w={"full"} h={"10vh"}
      backgroundImage={`url(${backgroundImage})`}
      backgroundSize="cover" mb={0}
      backgroundPosition="center">
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
                isAdmin={route.isAdmin}
                adminRoutes={route.adminRoutes}
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