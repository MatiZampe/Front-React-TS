import { Text, VStack } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

interface Props {
  label: string;
  to: string;
  path: string;
}

const NavbarItem = ({ label, to, path }: Props) => {
  const location = useLocation();
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