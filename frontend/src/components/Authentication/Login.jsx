import React from "react";
import { useState } from "react";
import { VStack, Input, Button } from "@chakra-ui/react";
import axios from "axios";
import { Toaster, toaster } from "@/components/ui/toaster";
import { useNavigate } from "react-router-dom";
import { Field } from "@/components/ui/field";
const Login = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
   const submitHandler = async (e) => {
     e.preventDefault();
     setLoading(true);

     try {
       const config = {
         headers: {
           "Content-Type": "application/json",
         },
       };

       const { data } = await axios.post(
         "http://localhost:5000/api/user/login",
         {email, password},
         config
       );
       toaster.create({
         description: "User created successfully",
         type: "success",
         duration: 5000,
       });
       localStorage.setItem("userInfo", JSON.stringify(data));
       setLoading(false);
       navigate("/chats");
     } catch (err) {
       toaster.create({
         description: err.response?.data?.message || "An error occurred",
         type: "error",
         duration: 9000,
       });
       setLoading(false);
     }
   };

  return (
    <form onSubmit={submitHandler}>
      <VStack gap="4">
        <Field label="Email" required>
          <Input
            placeholder="Enter your email"
            variant="subtle"
            _placeholder={{ color: "gray.600" }}
            color="black"
            backgroundColor={"blue.100"}
            borderRadius="md"
            fontSize="sm"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Field>
        <Field label="Password" required>
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <Input
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              variant="subtle"
              _placeholder={{ color: "gray.600" }}
              color="black"
              backgroundColor={"blue.100"}
              borderRadius="md"
              fontSize="sm"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              style={{ flex: 1 }}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              style={{ marginLeft: "8px" }}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </Field>
        <Button
          variant="surface"
          colorPalette="blue"
          width={"100%"}
          style={{ marginTop: "15px" }}
          type="submit"
          isLoading={loading}
        >
          Login
        </Button>
        <Button
          variant="solid"
          colorPalette="red"
          width={"100%"}
          style={{ marginTop: "15px" }}
          onClick={() => {
            setEmail("guest@example.com");
            setPassword("password");
          }}
        >
          Get guest credentials
        </Button>
      </VStack>
    </form>
  );
};

export default Login;
