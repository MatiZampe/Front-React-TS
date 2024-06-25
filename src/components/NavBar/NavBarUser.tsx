import {HStack,Text,IconButton,Center,Divider,} from "@chakra-ui/react";
import { ApplicationUser, UserTypeEnum } from "../../api/types";
import { TbLogout } from "react-icons/tb";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router-dom";
  
  const NavbarUser = () => {
    const user = useAuthUser<ApplicationUser>();
    const signOut = useSignOut();
    const navigate = useNavigate();
    const logout = () => {
      // Sign out
      signOut();
      navigate("/login");
    };
    return (
      <>
        {user && (
          <HStack color={"white"}>
            {/* <Text fontSize={"1rem"}>{user.fullName}</Text>
            <Text fontSize={"1rem"}>{UserTypeEnum[user.userType]}</Text> */}
            <Center height="2rem">
              <Divider
                orientation="vertical"
                variant={"solid"}
                borderColor={"#171C8F"}
              />
            </Center>
            <IconButton
              colorScheme={"white"}
              variant={"ghost"}
              icon={<TbLogout />}
              aria-label="sign out"
              size={"lg"}
              onClick={logout}
            />
          </HStack>
        )}
      </>
    );
  };
  export default NavbarUser;