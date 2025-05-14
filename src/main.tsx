import React from "react";
import ReactDOM from "react-dom/client";
import "@mysten/dapp-kit/dist/index.css";
import "@radix-ui/themes/styles.css";
import "./css/fonts.css";

import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Theme } from "@radix-ui/themes";
import App from "./App.tsx";
import Product from "./pages/product.tsx"
import { networkConfig } from "./networkConfig.ts";
import { BrowserRouter, Routes, Route } from "react-router";
import Upload from "./pages/upload.tsx"
import Result from "./pages/result.tsx"
import { currentConfig } from "./config";
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

const queryClient = new QueryClient();

// Configure PDF.js worker


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Theme appearance="dark">
      <QueryClientProvider client={queryClient}>
        <SuiClientProvider networks={networkConfig} defaultNetwork={currentConfig.NETWORK}>
          <WalletProvider autoConnect>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<App />} />
                <Route path="/product" element={<Product />}></Route>
                <Route path="/upload" element={<Upload />}></Route>
                <Route path="/result" element={<Result />}></Route>
              </Routes>
            </BrowserRouter>
          </WalletProvider>
        </SuiClientProvider>
      </QueryClientProvider>
    </Theme>
  </React.StrictMode>,
);
