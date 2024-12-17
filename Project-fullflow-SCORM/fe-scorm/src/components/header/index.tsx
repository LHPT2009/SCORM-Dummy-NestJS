"use client"
import React from "react";
import { Layout } from "antd";

const { Header } = Layout

interface HeaderProps {
    children: React.ReactNode;
}

const HeaderComponet: React.FC<HeaderProps> = ({ children }) => {
    return (
        <Header style={{ display: 'flex', alignItems: 'center' }}>
            {children}
        </Header>
    );
}

export default HeaderComponet;