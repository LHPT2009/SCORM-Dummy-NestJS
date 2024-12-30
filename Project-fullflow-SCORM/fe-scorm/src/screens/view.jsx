import { Flex, Button, Row, Col } from "antd";
import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import SCORM_API from "../context/SCORMApi";

const ViewPage = () => {
    const navigate = useNavigate()
    const location = useLocation();

    const { courseTitle, scoList = [] } = location.state || {};
    const [selectedSco, setSelectedSco] = useState(scoList[0]?.href || '');
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleScoChange = (scoHref, index) => {
        setSelectedSco(scoHref);
        setCurrentIndex(index);
    };

    const handleScoCommit = () => {
        SCORM_API.LMSCommit("");
    };

    const handleScoFinish = () => {
        SCORM_API.LMSFinish("");
        navigate('/', { state: null });
    };

    if (scoList.length === 0) {
        return (
            <div style={{ height: "700px", width: "auto" }}>
                <Row>
                    <Col span={12}>
                        <Flex justify="flex-start" style={{ margin: 0, padding: 0 }}>
                            <h1>No Content</h1>
                        </Flex>
                    </Col>
                    <Col span={12}>
                        <Flex justify="flex-end" style={{ margin: 0, padding: 0 }} wrap gap={16}>
                            <Button size="large" type="primary" style={{ width: "250px" }} onClick={() => navigate('/')}>Back to page upload!</Button>
                        </Flex>
                    </Col>
                </Row>
            </div>
        );
    }

    return (
        <div style={{ height: "700px", width: "auto" }}>
            <Row>
                <Col span={12}>
                    <Flex justify="flex-start" style={{ margin: 0, padding: 0 }}>
                        <h1>SCORM Upload</h1>
                    </Flex>
                </Col>
                <Col span={12}>
                    <Flex justify="flex-end" style={{ margin: 0, padding: 0 }} wrap gap={16}>
                        <Button size="large" type="primary" style={{ width: "150px" }} onClick={handleScoCommit}>Save</Button>
                        <Button size="large" type="primary" style={{ width: "150px" }} onClick={handleScoFinish}>Finish</Button>
                    </Flex>
                </Col>
            </Row>
            {courseTitle && <h2>Course Title: {courseTitle}</h2>}
            <h3>
                Progress: {((currentIndex + 1) / scoList.filter((sco) => sco.href).length * 100).toFixed(2)}%
            </h3>
            <Row>
                <Col span={3}>
                    <Flex gap="small" wrap>
                        {scoList
                            .filter((sco) => sco.href)
                            .map((sco, index) => (
                                <Button key={`${sco.id}-${index}`} onClick={() => handleScoChange(sco.href, index)}>
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