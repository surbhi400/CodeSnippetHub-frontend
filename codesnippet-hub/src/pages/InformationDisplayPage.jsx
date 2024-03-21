import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";

const InformationDisplayPage = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/data");
      if (response.ok) {
        const data = await response.json();
        setData(data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredData = data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );
    setData(filteredData);
  };
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div
      style={{
        // backgroundColor: "rgb(245,249,252)",
        height: "100vh",
        fontFamily: "sans-serif",
        marginTop: "4rem",
      }}
    >
      <Container maxW="full">
        <Box
          p={5}
          bg="rgb(245,249,252)"
          w="100%"
          borderRadius="lg"
          borderWidth="3px"
          shadow="md"
          maxWidth="100%"
          overflowX="auto"
          whiteSpace="nowrap"
        >
          <Input
            type="text"
            placeholder="Search User..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            mb={4}
            width="40%"
          />

          <Table variant="simple">
            <Thead>
              <Tr>
                <Th
                  borderBottom="1px solid #cbd5e0"
                  borderRight="1px solid #cbd5e0"
                >
                  UserName
                </Th>
                <Th
                  borderBottom="1px solid #cbd5e0"
                  borderRight="1px solid #cbd5e0"
                >
                  UserId
                </Th>
                <Th
                  borderBottom="1px solid #cbd5e0"
                  borderRight="1px solid #cbd5e0"
                >
                  Language
                </Th>
                <Th
                  borderBottom="1px solid #cbd5e0"
                  borderRight="1px solid #cbd5e0"
                >
                  Source Code
                </Th>
                <Th
                  borderBottom="1px solid #cbd5e0"
                  borderRight="1px solid #cbd5e0"
                >
                  Input
                </Th>
                <Th
                  borderBottom="1px solid #cbd5e0"
                  borderRight="1px solid #cbd5e0"
                >
                  Submission time
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredData.map((item, index) => (
                <Tr key={index}>
                  <Td
                    borderBottom="1px solid #cbd5e0"
                    borderRight="1px solid #cbd5e0"
                  >
                    {item.userId}
                  </Td>
                  <Td
                    borderBottom="1px solid #cbd5e0"
                    borderRight="1px solid #cbd5e0"
                  >
                    {item.name}
                  </Td>
                  <Td
                    borderBottom="1px solid #cbd5e0"
                    borderRight="1px solid #cbd5e0"
                  >
                    {item.preferred_language}
                  </Td>
                  <Td
                    borderBottom="1px solid #cbd5e0"
                    borderRight="1px solid #cbd5e0"
                  >
                    {item.source_code.substring(0, 100)}
                  </Td>
                  <Td
                    borderBottom="1px solid #cbd5e0"
                    borderRight="1px solid #cbd5e0"
                  >
                    {item.standard_input}
                  </Td>
                  <Td
                    borderBottom="1px solid #cbd5e0"
                    borderRight="1px solid #cbd5e0"
                  >
                    {item.submission_time}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Container>
    </div>
  );
};

export default InformationDisplayPage;
