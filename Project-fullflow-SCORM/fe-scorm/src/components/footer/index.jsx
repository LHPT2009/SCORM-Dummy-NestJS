import React from "react";
import { Layout } from "antd";

const { Footer } = Layout

const FooterComponet = ({ children }) => {
    return (
        <Footer style={{ textAlign: 'center' }}>
            {children}
        </Footer>
    );
}

export default FooterComponet;