import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Box,
  Input,
  Container,
  Button,
  Text,
  Select,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { useNavigate } from "react-router-dom";
const FormPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("");
  const [standardInput, setStandardInput] = useState("");
  const [sourceCode, setSourceCode] = useState("");
  const [nameError, setNameError] = useState("");
  const [languageError, setLanguageError] = useState("");
  const [sourceCodeError, setSourceCodeError] = useState("");

  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!name) {
        setNameError("Name is required");
        return;
      } else {
        setNameError("");
      }

      if (!preferredLanguage) {
        setLanguageError("Language is required");
        return;
      } else {
        setLanguageError("");
      }

      if (!sourceCode) {
        setSourceCodeError("Source Code is required");
        return;
      } else {
        setSourceCodeError("");
      }

      const response = await fetch(
        "https://codesnippethub-backend.onrender.com/api/submit-form",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            preferredLanguage,
            standardInput,
            sourceCode,
          }),
        }
      );
      if (response.ok) {
        toast({
          title: "Submission Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setName("");
        setPreferredLanguage("");
        setStandardInput("");
        setSourceCode("");
        navigate("/info");
      } else {
        console.error("Failed to submit form data");
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  return (
    <>
      <div
        style={{
          height: "100vh",
          fontFamily: "sans-serif",
          marginTop: "4rem",
        }}
      >
        <Container maxW="xl" centerContent>
          <Box
            p={5}
            bg="rgb(245,249,252)"
            w="100%"
            borderRadius="lg"
            borderWidth="3px"
            shadow="md"
          >
            <h2
              style={{
                textAlign: "center",
                fontSize: "20px",
                marginBottom: "4px",
              }}
            >
              {" "}
              Submit your code
            </h2>
            <hr style={{ marginBottom: "10px" }} />
            <form onSubmit={handleSubmit}>
              <FormControl mb={4}>
                <FormLabel>Username</FormLabel>
                <Input
                  bg="white"
                  type="text"
                  placeholder="Ex: John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Text fontSize="13px" color="red">
                  {nameError}
                </Text>
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Language</FormLabel>
                <Select
                  bg="white"
                  placeholder="Select a language"
                  value={preferredLanguage}
                  onChange={(e) => setPreferredLanguage(e.target.value)}
                >
                  <option value="C++">C++</option>
                  <option value="Java">Java</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Python">Python</option>
                </Select>
                <Text fontSize="13px" color="red">
                  {languageError}
                </Text>
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Input</FormLabel>
                <Input
                  type="text"
                  bg="white"
                  value={standardInput}
                  onChange={(e) => setStandardInput(e.target.value)}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Source Code</FormLabel>
                <textarea
                  value={sourceCode}
                  onChange={(e) => setSourceCode(e.target.value)}
                  placeholder="def sum(a, b):
                         return a + b"
                  rows={5}
                  cols={50}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "8px",
                    width: "100%",
                  }}
                />
                <Text fontSize="13px" color="red">
                  {sourceCodeError}
                </Text>
              </FormControl>
              <Box align="right" mt="20px">
                <Button
                  type="submit"
                  colorScheme="green"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Box>
            </form>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default FormPage;
