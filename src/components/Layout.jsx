import "./toolbar.css";
import {
    Segmented,
    Select,
    Col,
    InputNumber,
    Row,
    Slider,
    Tooltip,
} from "antd";
import { useEffect, useState } from "react";
import {VerticalAlignTopOutlined} from "@ant-design/icons";

const Layout = (props) => {
    const onChangeIconicSize = (value) => {
        if (isNaN(value)) {
            return;
        }
        props.setLogoSize(value);
    };

    const onChangeWordSize = (value) => {
        if (isNaN(value)) {
            return;
        }
        props.setFontSize(value);
    };

    const onChangeGapSize = (value) => {
        if (isNaN(value)) {
            return;
        }
        props.setGap(value);
    };

    return (
        <div className={`toolbar-cont ${props.toolbar !== 3 ? "hidden" : ""}`}>
            <h3 className="toolbar-heading">Edit Wordmark</h3>
            <div className="toolbar-input-group">
                <p className="label">Iconic Mark Size</p>
                <Row
                    style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                <Col flex="auto">
                        <Slider
                            min={50}
                            max={300}
                            onChange={onChangeIconicSize}
                            size="large"
                            value={
                                typeof props.logoSize === "number"
                                    ? props.logoSize
                                    : 0
                            }
                            step={1}
                        />
                    </Col>
                    <Col flex="100px">
                        <InputNumber
                            min={50}
                            max={300}
                            formatter={(value) => `${value}px`}
                            parser={(value) => value.replace("px", "")}
                            style={{
                                marginLeft: "16px",
                            }}
                            step={1}
                            value={props.logoSize}
                            size="large"
                            onChange={onChangeIconicSize}
                        />
                    </Col>
                </Row>
            </div>
            <div className="toolbar-input-group">
                <p className="label">Wordmark Size</p>
                <Row
                    style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                <Col flex="auto">
                        <Slider
                            min={25}
                            max={150}
                            onChange={onChangeWordSize}
                            size="large"
                            value={
                                typeof props.fontSize === "number"
                                    ? props.fontSize
                                    : 0
                            }
                            step={1}
                        />
                    </Col>
                    <Col flex="100px">
                        <InputNumber
                            min={25}
                            max={150}
                            formatter={(value) => `${value}px`}
                            parser={(value) => value.replace("px", "")}
                            style={{
                                marginLeft: "16px",
                            }}
                            step={1}
                            value={props.fontSize}
                            size="large"
                            onChange={onChangeWordSize}
                        />
                    </Col>
                </Row>
            </div>
            <div className="toolbar-input-group">
                <p className="label">Gap</p>
                <Row
                    style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Col flex="auto">
                        <Slider
                            min={0}
                            max={100}
                            onChange={onChangeGapSize}
                            size="large"
                            value={
                                typeof props.gap === "number"
                                    ? props.gap
                                    : 0
                            }
                            step={1}
                        />
                    </Col>
                    <Col flex="100px">
                        <InputNumber
                            min={0}
                            max={100}
                            formatter={(value) => `${value}px`}
                            parser={(value) => value.replace("px", "")}
                            style={{
                                marginLeft: "16px",
                            }}
                            step={1}
                            value={props.gap}
                            size="large"
                            onChange={onChangeGapSize}
                        />
                    </Col>
                </Row>
            </div>
            <div className="toolbar-input-group">
                <p className="label">Layout</p>
                <Segmented
                    block
                    // options={["None", "Ag", "AG", "ag"]}
                    options={[
                        {
                            value: "row",
                            label: "Horizontal",
                            icon: <VerticalAlignTopOutlined style={{ transform: 'rotate(-90deg)' }} />,
                        },
                        {
                            value: "column",
                            label: "Vertical",
                            icon: <VerticalAlignTopOutlined/>,
                        },
                    ]}
                    defaultValue={props.letterCase}
                    size="large"
                    onChange={(value) => {
                        props.setDirection(value);
                    }}
                />
            </div>
        </div>
    );
};

export default Layout;
