import { Layout } from "antd";
import React from "react";
import HeaderComponet from "../header";
import ContentComponet from "../content";
import FooterComponet from "../footer";
import { Outlet } from 'react-router-dom';

const LayoutComponent = () => {
    return (
        <>
            <Layout style={{ minHeight: "100vh", width: "100vw" }}>
                <HeaderComponet>

                </HeaderComponet>
                <ContentComponet>
                    <Outlet />
                </ContentComponet>
                <FooterComponet>
                    Scorm Project Application
                </FooterComponet>
            </Layout>
        </>
    );
}

export default LayoutComponent;