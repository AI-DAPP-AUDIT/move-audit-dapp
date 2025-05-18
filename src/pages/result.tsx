import { Box, Progress, Text, Heading } from "@radix-ui/themes";
import PDFView from "../components/pdf"
import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { GetAudit } from "../api/audit";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "../components/Footer";

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
    const [blodId, setBlodId] = useState<string>("");

    if (!orderId || !digest) {
        navigate('/');
        return;
    }

    useEffect(() => {
        const steps = [
            { value: 30, text: "Step 2: Mcp reading files...", desc: "Reading file contents..." },
            { value: 50, text: "Step 3: Begin auditing...", desc: "Starting intelligent audit analysis..." },
            { value: 75, text: "Step 4: Audit Completed!", desc: "Audit analysis completed" },
            { value: 85, text: "Step 5: Generating Audit Report...", desc: "Generating audit report..." },
            { value: 100, text: "Audit Completed!", desc: "Audit report generated" },
        ];
        let currentStep = 0;
        const interval = setInterval(async () => {
            if (currentStep < steps.length) {
                const result = await GetAudit(orderId);
                if (result.ok) {
                    const statusValue = statusMap.get(result.data.status) ?? currentStep;
                    setProgressValue(steps[statusValue].value);
                    setProgressStep(steps[statusValue].text);
                    currentStep = statusValue;
                    if (result.data.blodId != "") {
                        setBlodId(result.data.blodId);
                        clearInterval(interval);
                    }
                }
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <main
                style={{
                    flex: 1,
                    background: 'linear-gradient(180deg, #1a1f2e 0%, #232634 100%)',
                    padding: '48px 24px',
                }}
            >
                <div
                    style={{
                        maxWidth: 1200,
                        margin: '0 auto',
                        display: 'flex',
                        gap: 40,
                        alignItems: 'flex-start',
                    }}
                >
                    <div style={{
                        flex: '0 0 380px',
                        position: 'sticky',
                        top: 24,
                    }}>
                        <Box
                            style={{
                                background: 'rgba(255, 255, 255, 0.03)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: 20,
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                padding: 32,
                                marginBottom: 24,
                            }}
                        >
                            <Heading 
                                size="5" 
                                style={{ 
                                    color: '#fff',
                                    marginBottom: 24,
                                    fontSize: 20,
                                    fontWeight: 600
                                }}
                            >
                                Audit Progress
                            </Heading>
                            <Progress 
                                value={progressValue} 
                                style={{
                                    height: 8,
                                    borderRadius: 4,
                                    background: 'rgba(255, 255, 255, 0.1)',
                                }}
                            />
                            <Text
                                as="p"
                                style={{
                                    color: '#a0aec0',
                                    fontSize: 14,
                                    marginTop: 16,
                                    textAlign: 'center',
                                }}
                            >
                                {progressValue}% Complete
                            </Text>
                        </Box>

                        <Box
                            style={{
                                background: 'rgba(255, 255, 255, 0.03)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: 20,
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                padding: 32,
                            }}
                        >
                            <Text
                                as="p"
                                style={{
                                    color: '#fff',
                                    fontSize: 16,
                                    lineHeight: 1.6,
                                    textAlign: 'center',
                                }}
                            >
                                {progressStep}
                            </Text>
                        </Box>
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                        {progressValue === 100 && (
                            <Box
                                style={{
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    borderRadius: 20,
                                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                                    padding: '32px 24px',
                                    animation: 'fadeIn 0.3s ease-out',
                                }}
                            >
                                <Heading
                                    size="5"
                                    style={{
                                        color: '#fff',
                                        marginBottom: 24,
                                        textAlign: 'center',
                                        fontSize: 20,
                                        fontWeight: 600,
                                    }}
                                >
                                    Audit Report Preview
                                </Heading>
                                <PDFView blodId={blodId} />
                            </Box>
                        )}
                    </div>
                </div>
            </main>
            <Footer />

            <style>
                {`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                `}
            </style>
        </div>
    );
}

export default Result;
