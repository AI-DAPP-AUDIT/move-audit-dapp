import { Box, Container, Progress, Text, Card, Heading } from "@radix-ui/themes";
import PDFView from "../components/pdf"
import { useState, useEffect } from "react";
import { Header } from "../components/Header";

function Result() {
    const [progressValue, setProgressValue] = useState(10);
    const [progressStep, setProgressStep] = useState("Step 1: MCP Reading Files...");

    useEffect(() => {
        const steps = [
            { value: 30, text: "Step 2: Analyzing Dependencies..." },
            { value: 60, text: "Step 3: Detecting Security Vulnerabilities..." },
            { value: 85, text: "Step 4: Generating Audit Report..." },
            { value: 100, text: "Audit Completed!" },
        ];
        let currentStep = 0;
        const interval = setInterval(() => {
            if (currentStep < steps.length) {
                setProgressValue(steps[currentStep].value);
                setProgressStep(steps[currentStep].text);
                currentStep++;
            } else {
                clearInterval(interval);
            }
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Header />
            <Container size="3" px="4" py="5">
            
            <Box mb="5">
                <Heading size="5" align="center" mb="3">Audit Progress</Heading>
                <Progress value={progressValue} size="3" mb="2" />
                <Text as="p" size="2" color="gray" align="center">
                    {progressStep}
                </Text>
            </Box>

            {progressValue === 100 && (
              <Box>
                  <Heading size="5" align="center" mb="3">Audit Report</Heading>
                  <Card variant="surface"> 
                      <PDFView />
                  </Card>
              </Box>
            )}
            </Container>
        </>
    );
}

export default Result;
