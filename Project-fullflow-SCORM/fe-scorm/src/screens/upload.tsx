import { Flex, Typography, Button, Form, Upload, Row, Col } from "antd";
import React, { useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { InboxOutlined } from "@ant-design/icons";
import axios from "axios";

const { Dragger } = Upload;

const { Title } = Typography

const UploadPage: React.FC = () => {

    const schema = yup
        .object({
            file: yup
                .mixed()
                .required("File is required")
        })
        .required();
    const {
        control,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm(
        {
            resolver: yupResolver(schema),
            defaultValues: {
                file: undefined,
            },
        }
    );

    const [status, setStatus] = useState(false);
    const [urlHTML, setUrlHTML] = useState("")

    const [fileListArr, setFileListArr] = useState<any[]>([]);

    const handleclear = () => {
        reset()
        setFileListArr([])
        setStatus(false)
    }

    const handleFileUpload = async (event: any) => {
        const file = event.file[0]?.originFileObj;

        if (!file) {
            console.error('No file selected!');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            await axios.post('http://localhost:3000/scorm/upload', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
                .then((item) => {
                    setStatus(true);
                    setUrlHTML(item.data);
                })
                .catch((err) => { console.log(err); });
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };


    return (
        <>
            {!status ? <>
                <Form
                    name="basic"
                    style={{
                        width: '100%',
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    layout="vertical"
                    requiredMark={false}
                    onFinish={handleSubmit(handleFileUpload)}
                >
                    <Form.Item>
                        <Row gutter={[0, 16]}>
                            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                <Flex justify="flex-start" align="center">
                                    <Title level={3} style={{ padding: 0, margin: 0 }}>Upload Documents</Title>
                                </Flex>
                            </Col>
                            <Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={18}>
                                <Flex justify="flex-end">
                                    <Button size="large" type="text" style={{ width: "120px" }}>Cancel</Button>
                                    <Button size="large" type="primary" style={{ width: "120px" }} htmlType="submit">Publish</Button>
                                </Flex>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item
                        label={"Upload file"}
                        name="file"
                        help={errors.file && <span style={{ color: 'red' }}>{errors.file.message}</span>}
                    >
                        <Controller
                            name="file"
                            control={control}
                            render={({ field }) => (
                                <Dragger
                                    {...field}
                                    fileList={fileListArr}
                                    maxCount={1}
                                    beforeUpload={(file) => {
                                        const isZip = file.type === 'application/zip' || file.name.endsWith('.zip');
                                        if (!isZip) {
                                            alert('You can only upload ZIP files!');
                                        }
                                        return isZip || Upload.LIST_IGNORE;
                                    }}
                                    onChange={({ fileList }) => {
                                        if (fileList.length > 0) {
                                            setValue("file", fileList);
                                            setFileListArr(fileList);
                                        } else {
                                            setFileListArr([]);
                                            setValue("file", undefined as any);
                                        }
                                    }}
                                >
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                    <p className="ant-upload-hint">
                                        Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                                        banned files.
                                    </p>
                                </Dragger>
                            )}
                        />
                    </Form.Item>
                </Form>
            </> : <>
                <Button size="large" onClick={handleclear} type="primary">clear state</Button>

                <Flex vertical justify="center" align="center" style={{ marginTop: "20px" }}>
                    <iframe src={urlHTML} width="1200" height="800" title="Iframe Example" />
                </Flex>
            </>}
        </>
    );
}

export default UploadPage;