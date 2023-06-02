import "./toolbar.css";
import { Segmented, Select, Card, Tooltip } from "antd";
import { useEffect, useState } from "react";

import { ReactComponent as logo0 } from "../logos/logo0.svg";
import { ReactComponent as logo1 } from "../logos/logo1.svg";
import { ReactComponent as logo2 } from "../logos/logo2.svg";
import { ReactComponent as logo3 } from "../logos/logo3.svg";
import { ReactComponent as logo4 } from "../logos/logo4.svg";
import { ReactComponent as logo5 } from "../logos/logo5.svg";
import { ReactComponent as logo6 } from "../logos/logo6.svg";
import { ReactComponent as logo7 } from "../logos/logo7.svg";
import { ReactComponent as logo8 } from "../logos/logo8.svg";
import { ReactComponent as logo9 } from "../logos/logo9.svg";

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

const logos = {
    logo0,
    logo1,
    logo2,
    logo3,
    logo4,
    logo5,
    logo6,
    logo7,
    logo8,
    logo9,
};

const IconicMark = (props) => {
    const [weightOptions, setWeightOptions] = useState([]);

    const onChangeSpacing = (value) => {
        if (isNaN(value)) {
            return;
        }
        props.setLetterSpacing(value);
    };

    const selectFont = (value) => {
        // props.setFontFamily(props.fontData[value].family);
        console.log(value);
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
    }, [props.fontDataLoaded]);

    return (
        <div className={`toolbar-cont ${props.toolbar !== 2 ? "hidden" : ""}`}>
            <h3 className="toolbar-heading">Edit Iconic Mark</h3>
            <div className="toolbar-input-group">
                <p className="label">Default Iconic Marks</p>
                <div className="card-cont">
                    {Object.entries(logos).map(
                        ([imageName, ImageComponent], index) => (
                            <Card
                                title={"LAB LOGO " + index}
                                style={{
                                    width: "100%",
                                    height: "250px",
                                }}
                                bodyStyle={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "calc(100% - 50px)",
                                }}
                                size="small"
                                hoverable={true}
                                onClick={() => {props.setLogoMark(ImageComponent)}}
                            >
                                <ImageComponent
                                    key={index}
                                    width={100}
                                    height={100}
                                    className="logo-showcase"
                                />
                            </Card>
                        )
                    )}
                </div>
                {/* {Object.entries(logos).map((logo, index) => {
                    // <logo />
                    <img src={logo} alt="" />
                // <Card
                //     title="Default size card"
                //     style={{
                //         width: "100%",
                //     }}
                //     size="small"
                // >
                // </Card>
                })} */}
            </div>
        </div>
    );
};

export default IconicMark;
