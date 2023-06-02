import "./toolbar.css";
import { ColorPicker } from "antd";
import { useState } from "react";

const Color = (props) => {

    return (
        <div className={`toolbar-cont ${props.toolbar !== 4 ? "hidden" : ""}`}>
            <h3 className="toolbar-heading">Edit Color</h3>
            <div className="toolbar-input-group">
            <div className="toolbar-input-group horizontal">
                <p className="label">Iconic Mark Color</p>
                <ColorPicker value={props.logoColor} onChange={(value, hex) => {props.setLogoColor(hex)}}/>
            </div>
            <div className="toolbar-input-group horizontal">
                <p className="label">Wordmark Color</p>
                <ColorPicker value={props.wordmarkColor} onChange={(value, hex) => {props.setWordmarkColor(hex)}} />
            </div>
            <div className="toolbar-input-group horizontal">
                <p className="label">Background Color</p>
                <ColorPicker value={props.bgColor} onChange={(value, hex) => {props.setBgColor(hex)}} />
            </div>
            </div>
        </div>
    );
};

export default Color;
