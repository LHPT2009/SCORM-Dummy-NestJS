import { Flex, Button, Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { LeftCircleOutlined } from "@ant-design/icons"
import SCORM_API from "../context/SCORMApi";

const ViewPage = () => {
    const navigate = useNavigate()
    const location = useLocation();

    useEffect(() => {
        return () => {
            console.log('________________________')
            SCORM_API.LMSInitialize();

            SCORM_API.LMSSetValue("cmi.core.lesson_status", "incomplete");
            SCORM_API.LMSSetValue("cmi.core.score.raw", "85");
            SCORM_API.LMSSetValue("cmi.core.student_name", "John Doe");

            SCORM_API.LMSCommit();
            SCORM_API.LMSFinish();
        };
    }, []);

    const { courseTitle, scoList } = location.state || {};
    const [selectedSco, setSelectedSco] = useState(scoList[0].href);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleBacktoUploadPage = () => {
        navigate('/')
    }

    const handleScoChange = (scoHref, index) => {
        // const validScoList = scoList.filter((sco) => sco.href);
        // const progress = ((index + 1) / validScoList.length) * 100;
        setSelectedSco(scoHref);
        setCurrentIndex(index);
    };


    return (
        <>
            <div style={{ height: "700px", width: "auto" }}>
                <Flex style={{ margin: 0, padding: 0 }}>
                    <LeftCircleOutlined style={{ fontSize: "30px", marginRight: "10px" }} onClick={handleBacktoUploadPage} />
                    <h1>SCORM Upload</h1>
                </Flex>
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