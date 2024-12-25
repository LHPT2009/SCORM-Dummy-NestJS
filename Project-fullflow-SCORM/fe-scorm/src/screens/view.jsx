import { Flex, Button, Row, Col } from "antd";
import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { LeftCircleOutlined } from "@ant-design/icons"
const ViewPage = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const { courseTitle, scoList } = location.state || {};
    const [selectedSco, setSelectedSco] = useState(scoList[0].href);

    const handleBacktoUploadPage = () => {
        navigate('/')
    }

    return (
        <>
            <div style={{ height: "700px", width: "auto" }}>
                <Flex style={{ margin: 0, padding: 0 }}>
                    <LeftCircleOutlined style={{ fontSize: "30px", marginRight: "10px" }} onClick={handleBacktoUploadPage} />
                    <h1>SCORM Upload</h1>
                </Flex>
                {courseTitle && <h2>Course Title: {courseTitle}</h2>}
                <Row>
                    <Col span={3}>
                        <Flex gap="small" wrap>
                            {scoList
                                .filter((sco) => sco.href)
                                .map((sco, index) => (
                                    <Button key={sco.id} onClick={() => setSelectedSco(sco.href)}>
                                        {index + 1}
                                    </Button>
                                ))}
                        </Flex>
                    </Col>
                    <Col span={21}>
                        {selectedSco && <ScormPlayer scoUrl={`http://localhost:3000/scorm-content/${selectedSco}`} />}
                    </Col>
                </Row>
            </div>
        </>
    );
};

const ScormPlayer = ({ scoUrl }) => {
    return (
        <iframe
            src={scoUrl}
            width="100%"
            height="500px"
            title="SCORM Player"
        ></iframe>
    );
};

export default ViewPage;