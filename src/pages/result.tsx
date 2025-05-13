import { Box, Container, Progress, Text, Card, Heading } from "@radix-ui/themes";
import PDFView from "../components/pdf"
import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import {GetAudit} from "../api/audit";
import { useNavigate, useLocation } from "react-router-dom";

function Result() {
    const [progressValue, setProgressValue] = useState(10);
    const [progressStep, setProgressStep] = useState("Step 1: Wait for audit...");
    const statusMap = new Map<string, number>();
    statusMap.set("reading", 0);
    statusMap.set("auditing", 1);
    statusMap.set("auditted", 2);
    statusMap.set("reporting", 3);
    statusMap.set("reported", 4);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const orderId = searchParams.get("order_id");
    const digest = searchParams.get("digest");
    const navigate = useNavigate();
    if (!orderId || !digest) {
        navigate('/');
        return;
    }

    console.log(orderId, digest);

    useEffect(() => {
        const steps = [
            { value: 30, text: "Step 2: Mcp reading files..." },
            { value: 50, text: "Step 3: Begin auditing..." },
            { value: 75, text: "Step 4: Audit Completed!" },
            { value: 85, text: "Step 5: Generating Audit Report..." },
            { value: 100, text: "Audit Completed!" },
        ];
        let currentStep = 0;
        const interval = setInterval(async () => {
            if (currentStep < steps.length) {
                const result = await GetAudit(orderId);
                if (result.ok) {
                    const statusValue = statusMap.get(result.data.status) ?? currentStep;
                    setProgressValue(statusValue);
                    setProgressStep(result.data.status);
                    currentStep = statusValue;
                }
            } else {
                clearInterval(interval);
            }
        }, 3000);

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
