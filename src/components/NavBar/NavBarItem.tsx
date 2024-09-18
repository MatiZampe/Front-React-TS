import { Menu, MenuButton, MenuItem, MenuList, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdKeyboardArrowDown } from 'react-icons/md'

interface Props {
  label: string;
  to: string;
  path: string;
  isAdmin?: boolean;
  adminRoutes?: { label: string; path: string }[];
}

const NavbarItem = ({ label, to, path, isAdmin = false, adminRoutes = [] }: Props) => {

  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(false);
  };

  if (isAdmin) {
    return (
      <Menu autoSelect={false}>
        <MenuButton
          as={Link}
          to={to}
          onClick={() => setIsOpen(!isOpen)}
          h={"full"}
          p={8}
          display="flex"
          alignItems="center"
          _hover={{
            transform: "scale(1.01)",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
            borderBottomWidth: location.pathname === path ? "4px" : "unset",
            borderBottomColor: location.pathname === path ? "secondary" : "unset",
          }}
          fontWeight={location.pathname === path ? "bold" : "normal"}
        >
          <Text
            fontSize={{ lg: "1.4rem", xl: "1.4rem" }}
            color={"white"}
            fontWeight={"bolder"}
            justifyContent={"center"}
            mr={2}
          >
            {label}
          </Text>
        </MenuButton>
        <MenuList
           zIndex={10} 
           position="absolute" 
           left={"1.5rem"} 
        >
          {adminRoutes.map((route) => (
            <MenuItem key={route.path} onClick={handleClick} as={Link} to={route.path}>
              {route.label}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    );
  }

  return (
    <Link to={to}>
      <VStack justifyContent={"center"} h={"full"} p={8}>
        <Text
          fontSize={{ lg: "1.4rem", xl: "1.4rem" }}
          color={"white"}
          _hover={{
            transform: "scale(1.01)",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
          }}
          fontWeight={location.pathname === path ? "bold" : "bold"}
          borderBottom={location.pathname === path ? "4px" : "unset"}
          borderBottomColor={location.pathname === path ? "secondary" : "unset"}
        >
          {label}
        </Text>
      </VStack>

    </Link>
  );
};

export default NavbarItem;

