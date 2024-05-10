import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  signupFailure,
  signupRequest,
  signupSuccess,
} from "../redux/auth/action";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  Textarea,
} from "@chakra-ui/react";
import { notify } from "../utils/extraFunction";

function Signup() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const handleChange = (e) => {
    let { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handlePhoneChange = (value, country) => {
    const countryCode = country.dialCode || '';
    setUser({ ...user, phone: `${countryCode}${value}` });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(signupRequest());
    axios
      .post(`/signup`, user)
      .then((res) => {
        if (res.data) {
          dispatch(signupSuccess(res.data));
          notify(toast, res.data.message, "success");
          navigate("/login");
        }
      })
      .catch((err) => {
        dispatch(signupFailure());
        notify(toast, err.response.data.message, "error");
      });
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign Up to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool{" "}
            <Text as="span" color={"blue.400"}>
              features
            </Text>{" "}
            ✌️
          </Text>
        </Stack>
        <form action="" onSubmit={handleSignup}>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl className="name">
                <FormLabel>Full Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  placeholder="Enter Full Name"
                />
              </FormControl>
              <FormControl className="name">
                <FormLabel>Nickname</FormLabel>
                <Input
                  type="text"
                  name="nickname"
                  onChange={handleChange}
                  placeholder="Enter Nickname"
                />
              </FormControl>
              <FormControl className="phone">
                <FormLabel>Phone Number</FormLabel>
                <PhoneInput
                    name="phone_number"
                    country={"id"}
                    placeholder="Enter Phone Number"
                    onChange={handlePhoneChange}
                />
              </FormControl>
              <FormControl className="name">
                <FormLabel>Home Address</FormLabel>
                <Textarea
                  name="home_address"
                  onChange={handleChange}
                  placeholder="Enter Home Address"
                />
              </FormControl>
              <FormControl className="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="Enter Email"
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="Enter your Password"
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                </Stack>
                <Button
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign Up
                </Button>
              </Stack>
            </Stack>
          </Box>
        </form>
      </Stack>
    </Flex>
  );
}

export default Signup;
