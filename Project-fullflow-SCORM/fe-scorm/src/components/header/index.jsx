import React from "react";
import { Layout } from "antd";

const { Header } = Layout

const HeaderComponet = ({ children }) => {
    return (
        <Header style={{ display: 'flex', alignItems: 'center' }}>
            {children}
        </Header>
    );
}

export default HeaderComponet;