import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Box,
  Input,
  Container,
  Button,
} from '@chakra-ui/react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import { VscCode } from 'react-icons/vsc';
import { RiFileUploadFill } from 'react-icons/ri';

const FormPage = () => {
  const [sourceCode, setSourceCode] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [activeSection, setActiveSection] = useState();

  const handleCodeChange = (editor, data, value) => {
    setSourceCode(value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleLogoClick = (section) => {
    setActiveSection(section);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted:', { sourceCode, selectedFile });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container maxW="xl" centerContent position="relative" top="50px">
        <Box
          p={7}
          bg="white"
          w="100%"
          borderRadius="lg"
          borderWidth="3px"
          shadow="md"
        >
          <FormControl mb={4}>
            <FormLabel>Username</FormLabel>
            <Input type="text" placeholder="Ex: John Doe" />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Preferred Code Language</FormLabel>
            <Input type="text" placeholder="Ex: C++, Java, ..." />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Standard Input</FormLabel>
            <Input type="text" placeholder="stdin" />
          </FormControl>

          <FormControl>
            <FormLabel>Upload via</FormLabel>
            <Box align="center" display="flex" justifyContent="space-evenly" mb={4}>
            <VscCode
              style={{ cursor: 'pointer', width: '25px', height: '25px' }}
              onClick={() => handleLogoClick('editor')}
            />
            <RiFileUploadFill
              style={{ cursor: 'pointer', width: '25px', height: '25px' }}
              onClick={() => handleLogoClick('fileUpload')}
            />
            </Box>
        
        </FormControl>
          {activeSection === 'editor' && (
            <FormControl mb={4}>
              <FormLabel>Upload Source Code</FormLabel>
              <CodeMirror
                value={sourceCode}
                options={{
                  mode: 'javascript',
                  theme: 'material',
                  lineNumbers: true,
                }}
                onBeforeChange={handleCodeChange}
              />
            </FormControl>
          )}

          {activeSection === 'fileUpload' && (
            <FormControl mb={4}>
              <FormLabel>Upload Source Code File</FormLabel>
              <Input  type="file" accept=".js,.py,.java" onChange={handleFileChange} />
            </FormControl>
          )}
            <Box align="center">
            <Button width="50%" type="submit" colorScheme="blue">
              Submit
            </Button>
          </Box>   
        </Box>
      </Container>
    </form>
  );
};

export default FormPage;
