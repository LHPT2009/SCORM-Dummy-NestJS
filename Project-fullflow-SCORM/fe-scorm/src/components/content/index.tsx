"use client"
import React from "react";
import { Layout, theme } from "antd";

const { Content } = Layout

interface ContentProps {
    children: React.ReactNode;
}

const ContentComponet: React.FC<ContentProps> = ({ children }) => {

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Content style={{ padding: '0 48px', marginTop: "50px" }}>
            <div
                style={{
                    background: colorBgContainer,
                    height: "100%",
                    padding: 24,
                    borderRadius: borderRadiusLG,
                }}
            >
                {children}
            </div>
        </Content>
    );
}

export default ContentComponet;