import { VStack, Input, Button } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import React, { useState } from "react";
import { Toaster, toaster } from "@/components/ui/toaster";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [pic, setPic] = useState();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);

    if (password !== confirmpassword) {
      toaster.create({
        title: "Error",
        description: "Passwords don't match",
        type: "error",
        duration: 5000,
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/user",
        { name, email, password, pic },
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

  const postDetails = (pic) => {
    const cld = new Cloudinary({ cloud: { cloudName: "da7magcim" } });
    const img = cld
      .image(pic)
      .format("auto")
      .quality("auto")
      .resize(auto().gravity(autoGravity()).width(500).height(500));
    setPic(img.toURL());
  };

  return (
    <form onSubmit={submitHandler}>
      <VStack gap="4">
        <Field label="Name" required>
          <Input
            placeholder="Enter your name"
            variant="subtle"
            _placeholder={{ color: "gray.600" }}
            color="black"
            backgroundColor={"blue.100"}
            borderRadius="md"
            fontSize="sm"
            onChange={(e) => setName(e.target.value)}
          />
        </Field>
        <Field label="Email" required>
          <Input
            placeholder="Enter your email"
            variant="subtle"
            _placeholder={{ color: "gray.600" }}
            color="black"
            backgroundColor={"blue.100"}
            borderRadius="md"
            fontSize="sm"
            onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              style={{ flex: 1 }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{ marginLeft: "8px" }}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </Field>
        <Field label="Confirm Password" required>
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <Input
              placeholder="Enter your password again"
              type={showConfirmPassword ? "text" : "password"}
              variant="subtle"
              _placeholder={{ color: "gray.600" }}
              color="black"
              backgroundColor={"blue.100"}
              borderRadius="md"
              fontSize="sm"
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ flex: 1 }}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={{ marginLeft: "8px" }}
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>
        </Field>
        <Field label="Upload profile picture">
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <Input
              type="file"
              accept="image/*"
              placeholder="Upload your profile picture"
              variant="subtle"
              _placeholder={{ color: "gray.600" }}
              color="black"
              backgroundColor={"blue.100"}
              borderRadius="md"
              fontSize="sm"
              onChange={(e) => postDetails(e.target.files[0])}
            />
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
          Sign Up
        </Button>
      </VStack>
    </form>
  );
};

export default Signup;
