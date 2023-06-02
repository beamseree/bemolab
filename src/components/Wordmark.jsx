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

const weightMapping = {
    100: "Thin",
    200: "ExtraLight",
    300: "Light",
    regular: "Regular",
    500: "Medium",
    600: "SemiBold",
    700: "Bold",
    800: "ExtraBold",
    900: "Black",
};

const Wordmark = (props) => {
    const [weightOptions, setWeightOptions] = useState([]);

    const onChangeSpacing = (value) => {
        if (isNaN(value)) {
            return;
        }
        props.setLetterSpacing(value);
    };

    const selectFont = (value) => {
        // props.setFontFamily(props.fontData[value].family);
        console.log(value)
        props.changeFont(props.fontData[value].family, "Regular");
        props.setFontWeight("Regular");
        // props.setFontFamily(props.fontData[value].family);
        // console.log(props.fontData[value].files);
        const mappedFontVariants = Object.entries(props.fontData[value].files)
            .filter(([label, value]) => {
                let isItalic = label.includes("italic");
                return !isItalic; // Exclude entries where isItalic is true
            })
            .map(([label, value]) => {
                let weight = label.replace("italic", ""); // Remove 'italic' from the label to get the weight

                let textLabel = weightMapping[weight] || weight; // Default to the numeric label if no text label is found

                if (textLabel === "") {
                    textLabel = "Regular";
                }

                let sortKey;
                if (label === "regular") {
                    sortKey = "400";
                    label = "400";
                } else sortKey = label;

                return {
                    value: label,
                    label: textLabel,
                    sortKey,
                };
            })
            .sort((a, b) => {
                // Compare the sortKeys to sort the elements
                return a.sortKey.localeCompare(b.sortKey);
            });

        setWeightOptions(mappedFontVariants);
    };

    const selectWeight = (value) => {
        console.log(value);
        // props.setFontWeight(value);
        props.changeFont(props.fontFamily, value);
    };

    useEffect(() => {
        if (props.fontDataLoaded) {
            selectFont(577);
        }

        // setFontFamily("Montserrat");
        // setFontWeight("400");
        // changeFont("Montserrat", "Regular");
    }, [props.fontDataLoaded]);

    return (
        <div className={`toolbar-cont ${props.toolbar !== 1 ? "hidden" : ""}`}>
            <h3 className="toolbar-heading">Edit Wordmark</h3>
            <div className="toolbar-input-group">
                <p className="label">Font Family</p>
                <Select
                    showSearch
                    placeholder="Select a person"
                    optionFilterProp="children"
                    onSelect={(e) => {
                        selectFont(e);
                    }}
                    // onSearch={onSearch}
                    filterOption={(input, option) =>
                        (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                    }
                    options={props.fontList}
                    size="large"
                    style={{ width: "100%" }}
                    value={props.fontFamily}
                />
            </div>
            <div className="toolbar-input-group">
                <p className="label">Font Weight</p>
                <Select
                    showSearch
                    placeholder="Select a person"
                    optionFilterProp="children"
                    value={props.fontWeight}
                    onSelect={(e) => {
                        selectWeight(e);
                    }}
                    // onSearch={onSearch}
                    filterOption={(input, option) =>
                        (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                    }
                    options={weightOptions}
                    size="large"
                    style={{ width: "100%" }}
                />
            </div>
            <div className="toolbar-input-group">
                <p className="label">Letter Spacing</p>
                <Row
                    style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                <Col flex="auto">
                        <Slider
                            min={-50}
                            max={50}
                            onChange={onChangeSpacing}
                            size="large"
                            value={
                                typeof props.letterSpacing === "number"
                                    ? props.letterSpacing
                                    : 0
                            }
                            step={0.1}
                        />
                    </Col>
                    <Col flex="100px">
                        <InputNumber
                            min={-50}
                            max={50}
                            formatter={(value) => `${value}%`}
                            parser={(value) => value.replace("%", "")}
                            style={{
                                marginLeft: "16px",
                            }}
                            step={0.5}
                            value={props.letterSpacing}
                            size="large"
                            onChange={onChangeSpacing}
                        />
                    </Col>
                </Row>
            </div>
            <div className="toolbar-input-group">
                <p className="label">Case</p>
                <Segmented
                    block
                    // options={["None", "Ag", "AG", "ag"]}
                    options={[
                        {
                            value: "none",
                            label: (
                                <Tooltip
                                    title="As Typed"
                                    arrow={false}
                                    placement="bottom"
                                >
                                    <div
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    >
                                        None
                                    </div>
                                </Tooltip>
                            ),
                        },
                        {
                            value: "capitalize",
                            label: (
                                <Tooltip
                                    title="Title Case"
                                    arrow={false}
                                    placement="bottom"
                                >
                                    <div
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    >
                                        Ag
                                    </div>
                                </Tooltip>
                            ),
                        },
                        {
                            value: "uppercase",
                            label: (
                                <Tooltip
                                    title="Uppercase"
                                    arrow={false}
                                    placement="bottom"
                                >
                                    <div
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    >
                                        AG
                                    </div>
                                </Tooltip>
                            ),
                        },
                        {
                            value: "lowercase",
                            label: (
                                <Tooltip
                                    title="Lowercase"
                                    arrow={false}
                                    placement="bottom"
                                >
                                    <div
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    >
                                        ag
                                    </div>
                                </Tooltip>
                            ),
                        },
                    ]}
                    defaultValue={props.letterCase}
                    size="large"
                    onChange={(value) => {
                        props.setLetterCase(value);
                    }}
                />
            </div>
        </div>
    );
};

export default Wordmark;
