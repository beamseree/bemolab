import React, { useEffect } from "react";
import "./App.css";
import { ReactComponent as BemoLogo } from "./img/bemolab.svg";
import { useState } from "react";
import Edit from "./components/Edit.jsx";
import { FiEdit } from "react-icons/fi";
import { IoText } from "react-icons/io5";
import { IoCubeOutline } from "react-icons/io5";
import { AiOutlineLayout } from "react-icons/ai";
import { IoColorFillOutline } from "react-icons/io5";
import Wordmark from "./components/Wordmark";
import { DownloadOutlined } from "@ant-design/icons";
import { Tooltip, Button, ConfigProvider } from "antd";
import WebFont from "webfontloader";
import IconicMark from "./components/IconicMark";

import { ReactComponent as DefaultLogo } from "./logos/logo0.svg";
import Layout from "./components/Layout";
import Color from "./components/Color";
import html2canvas from "html2canvas";

// GOOGLE FONTS API KEY: AIzaSyCKGeWrVUZdldp4vfA3BcSYyfRXy71cHao

const App = () => {
    const [toolbar, setToolbar] = useState(0);
    const [wordmark, setWordmark] = useState("ACME");

    const [letterSpacing, setLetterSpacing] = useState(0);
    const [letterCase, setLetterCase] = useState("none");

    const [fontFamily, setFontFamily] = useState("Roboto");
    const [fontWeight, setFontWeight] = useState("400");
    const [fontList, setFontList] = useState([]);

    const [fontDataLoaded, setFontDataLoaded] = useState(false);
    const [fontData, setFontData] = useState([]);

    const [LogoMark, setLogoMark] = useState(DefaultLogo);

    const [logoSize, setLogoSize] = useState(100);
    const [fontSize, setFontSize] = useState(80);
    const [gap, setGap] = useState(20);
    const [direction, setDirection] = useState("row");

    const [logoColor, setLogoColor] = useState("#212121");
    const [wordmarkColor, setWordmarkColor] = useState("#212121");
    const [bgColor, setBgColor] = useState("#fff");

    useEffect(() => {
        fetch(
            "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyCKGeWrVUZdldp4vfA3BcSYyfRXy71cHao"
        )
            .then((response) => response.json())
            .then((data) => {
                // Group fonts by category
                // console.log(data.items)
                const grouped = data.items.reduce((acc, font, index) => {
                    // Include the index here
                    if (!acc[font.category]) {
                        acc[font.category] = [];
                    }
                    acc[font.category].push({
                        label: font.family,
                        value: index, // Use the index as the value
                    });
                    return acc;
                }, {});

                // Map grouped object back to an array
                const result = Object.entries(grouped).map(
                    ([label, options]) => ({
                        label: label
                            .split("-")
                            .map(
                                (word) =>
                                    word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(" "),
                        options,
                    })
                );

                setFontList(result);
                setFontData(data.items);
                setFontDataLoaded(true);
            });
    }, []);

    useEffect(() => {
        console.log(LogoMark);
    }, [LogoMark]);

    const changeFont = (newFont, weight) => {
        // Dynamically load the new font
        WebFont.load({
            google: {
                families: [newFont + ":" + weight],
            },
            fontactive: (familyName) => {
                // Update the state to change the font
                if (familyName === newFont) {
                    setTimeout(() => {
                        setFontFamily(familyName);
                        setFontWeight(weight);
                    }, 500);
                }
            },
        });
    };

    const exportToImage = async () => {
        const input = document.getElementsByClassName("canvas-content")[0];
        const canvas = await html2canvas(input, { backgroundColor: null });
        const imgData = canvas.toDataURL('image/png');
        const imgBlob = await (await fetch(imgData)).blob();
    
        // Use showSaveFilePicker
        try {
          const options = {
            suggestedName: "Logo",
            types: [
              {
                description: 'PNG files',
                accept: {
                  'image/png': ['.png'],
                },
              },
            ],
          };
          const handle = await window.showSaveFilePicker(options);
          const writable = await handle.createWritable();
          await writable.write(imgBlob);
          await writable.close();
        } catch(err) {
          console.error(err.name, err.message);
          const link = document.createElement('a');
          link.download = 'Logo.png';
          link.href = imgData;
          link.click();
        }
    };

    return (
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#212121',
          },
        }}
      >
        <div className="App">
            <div className="nav">
                <BemoLogo className="logo" />

                <Button
                    type="primary"
                    icon={<DownloadOutlined />}
                    size="large"
                    onClick={() => {
                        exportToImage();
                    }}
                >
                    Download
                </Button>
            </div>
            <div className="body">
                <div className="sidebar">
                    <Tooltip
                        placement="right"
                        title="Edit Content"
                        arrow={false}
                    >
                        <div
                            className={`sidebar-icon-cont ${
                                toolbar === 0 ? "current" : ""
                            }`}
                            onClick={() => {
                                setToolbar(0);
                            }}
                        >
                            <FiEdit size={20} color="#666" />
                        </div>
                    </Tooltip>
                    <Tooltip
                        placement="right"
                        title="Edit Wordmark"
                        arrow={false}
                    >
                        <div
                            className={`sidebar-icon-cont ${
                                toolbar === 1 ? "current" : ""
                            }`}
                            onClick={() => {
                                setToolbar(1);
                            }}
                        >
                            <IoText size={20} color="#666" />
                        </div>
                    </Tooltip>
                    <Tooltip
                        placement="right"
                        title="Edit Iconic Mark"
                        arrow={false}
                    >
                        <div
                            className={`sidebar-icon-cont ${
                                toolbar === 2 ? "current" : ""
                            }`}
                            onClick={() => {
                                setToolbar(2);
                            }}
                        >
                            <IoCubeOutline size={20} color="#666" />
                        </div>
                    </Tooltip>
                    <Tooltip
                        placement="right"
                        title="Edit Layout"
                        arrow={false}
                    >
                        <div
                            className={`sidebar-icon-cont ${
                                toolbar === 3 ? "current" : ""
                            }`}
                            onClick={() => {
                                setToolbar(3);
                            }}
                        >
                            <AiOutlineLayout size={20} color="#666" />
                        </div>
                    </Tooltip>
                    <Tooltip placement="right" title="Edit Color" arrow={false}>
                        <div
                            className={`sidebar-icon-cont ${
                                toolbar === 4 ? "current" : ""
                            }`}
                            onClick={() => {
                                setToolbar(4);
                            }}
                        >
                            <IoColorFillOutline size={20} color="#666" />
                        </div>
                    </Tooltip>
                </div>
                <div className="toolbar">
                    <Edit
                        wordmark={wordmark}
                        setWordmark={setWordmark}
                        toolbar={toolbar}
                    />
                    <Wordmark
                        toolbar={toolbar}
                        letterSpacing={letterSpacing}
                        setLetterSpacing={setLetterSpacing}
                        letterCase={letterCase}
                        setLetterCase={setLetterCase}
                        fontList={fontList}
                        fontData={fontData}
                        setFontFamily={setFontFamily}
                        fontFamily={fontFamily}
                        setFontWeight={setFontWeight}
                        fontWeight={fontWeight}
                        changeFont={changeFont}
                        fontDataLoaded={fontDataLoaded}
                    />
                    <IconicMark toolbar={toolbar} setLogoMark={setLogoMark} />
                    <Layout
                        toolbar={toolbar}
                        logoSize={logoSize}
                        setLogoSize={setLogoSize}
                        fontSize={fontSize}
                        setFontSize={setFontSize}
                        gap={gap}
                        setGap={setGap}
                        direction={direction}
                        setDirection={setDirection}
                    />
                    <Color
                        toolbar={toolbar}
                        logoColor={logoColor}
                        setLogoColor={setLogoColor}
                        wordmarkColor={wordmarkColor}
                        setWordmarkColor={setWordmarkColor}
                        bgColor={bgColor}
                        setBgColor={setBgColor}
                    />
                </div>
                <div className="content">
                    <div
                        className="canvas"
                        style={{ backgroundColor: bgColor }}
                    >
                        <div
                            className="canvas-content"
                            style={{
                                rowGap: gap,
                                columnGap: gap,
                                flexDirection: direction,
                                backgroundColor: "transparent",
                            }}
                        >
                            {LogoMark && (
                                <LogoMark
                                    width={`${
                                        direction == "row" ? logoSize : "auto"
                                    }`}
                                    height={`${
                                        direction == "column"
                                            ? logoSize
                                            : "auto"
                                    }`}
                                    style={{ color: logoColor }}
                                />
                            )}
                            <p
                                className="wordmark"
                                style={{
                                    lineHeight: "100%",
                                    color: wordmarkColor,
                                    fontSize: fontSize,
                                    fontFamily: fontFamily,
                                    fontWeight: fontWeight,
                                    letterSpacing:
                                        (fontSize * letterSpacing) / 100 + "px",
                                    marginLeft:
                                        (fontSize * letterSpacing) / 100 + "px",
                                    textTransform: letterCase,
                                }}
                            >
                                {wordmark}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </ConfigProvider>
    );
};

export default App;
