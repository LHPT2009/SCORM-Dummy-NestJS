import { Flex, Button, Row, Col } from "antd";
import React, { useState } from "react";

interface UploadPageProps {
    courseTitle: string;
    scoList: { id: string; href: string }[];
}

const ViewPage: React.FC<UploadPageProps> = ({ courseTitle, scoList }) => {
    const [selectedSco, setSelectedSco] = useState('');
    return (
        <>
            <div style={{ height: "700px", width: "auto" }}>
                <h1>SCORM Upload</h1>
                {courseTitle && <h2>Course Title: {courseTitle}</h2>}
                <Row>
                    <Col span={3}>
                        <Flex gap="small" wrap>
                            {scoList
                                .filter((sco: any) => sco.href)
                                .map((sco: any, index: number) => (
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

const ScormPlayer: React.FC<{ scoUrl: string }> = ({ scoUrl }) => {
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