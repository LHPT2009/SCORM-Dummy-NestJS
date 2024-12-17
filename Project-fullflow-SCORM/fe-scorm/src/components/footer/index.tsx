"use client"
import React from "react";
import { Layout } from "antd";

const { Footer } = Layout

interface FooterProps {
    children: React.ReactNode;
}

const FooterComponet: React.FC<FooterProps> = ({ children }) => {
    return (
        <Footer style={{ textAlign: 'center' }}>
            {children}
        </Footer>
    );
}

export default FooterComponet;