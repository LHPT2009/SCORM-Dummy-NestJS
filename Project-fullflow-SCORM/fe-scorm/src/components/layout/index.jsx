import { Layout } from "antd";
import React from "react";
import HeaderComponet from "../header";
import ContentComponet from "../content";
import FooterComponet from "../footer";
import { Outlet } from 'react-router-dom';

const LayoutComponent = () => {
    return (
        <>
            <Layout style={{ height: "auto", width: "100vw" }}>
                <HeaderComponet>
                    asd
                </HeaderComponet>
                <ContentComponet>
                    <Outlet />
                </ContentComponet>
                <FooterComponet>
                    sadas
                </FooterComponet>
            </Layout>
        </>
    );
}

export default LayoutComponent;