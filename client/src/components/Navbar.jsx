import React from "react";
import {
  Box,
  Flex,
  IconButton,
  Button,
  Stack,
  Collapse,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  useToast,
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../redux/auth/action";
import { notify } from "../utils/extraFunction";
import logo from "../assets/logo.png";

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const token = useSelector((store) => store.AuthReducer.token);
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutSuccess());
    notify(toast, "Logout successfully", "success");
    navigate("/login", { replace: true });
  };

  return (
    <Box display={{ base: isOpen ? "block" : "none", md: "block" }}
    flexBasis={{ base: "100%", md: "auto" }} >
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4, md: "8" }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={5} h={5} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Box
            bg="black"
            p="0"
            borderRadius={"50%"}
            ml={{ base: "0px", md: "50px" }}
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
          >
            <Link to="/">
              <Image w="70px" src={logo} alt="Logo" />
            </Link>
          </Box>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Box position="relative">
        <Button
          onClick={token ? () => navigate("/albums/create") : undefined}
          disabled={!token}
          fontSize={"sm"}
          size={{ base: "sm", sm: "md" }}
          fontWeight={400}
          bg={"blue.400"}
          _hover={{ bg: "blue.500" }}
          color={"white"}
        >
          Add Album
        </Button>
      </Box>
          {token ? (
            <Button
              onClick={handleLogout}
              fontSize={"sm"}
              size={{ base: "sm", sm: "md" }}
              fontWeight={400}
              bg={"blue.400"}
              _hover={{ bg: "blue.500" }}
              color={"white"}
            >
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => {
                navigate("/login");
              }}
              fontSize={"sm"}
              size={{ base: "sm", sm: "md" }}
              fontWeight={400}
              bg={"blue.400"}
              _hover={{ bg: "blue.500" }}
              color={"white"}
              display="inline-flex"
            >
              Sign In
            </Button>
          )}

          <Button
            hidden={token}
            display={{ base: "none", md: "inline-flex" }}
            onClick={() => {
              navigate("/signup");
            }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"blue.400"}
            _hover={{ bg: "blue.500" }}
          >
            Sign Up
          </Button>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    ></Stack>
  );
};
