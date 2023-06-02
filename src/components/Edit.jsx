import "./toolbar.css";
import { BankOutlined } from "@ant-design/icons";
import { Input } from "antd";

const Edit = (props) => {
    return (
        <div className={`toolbar-cont ${props.toolbar !== 0 ? "hidden" : ""}`}>
            <h3 className="toolbar-heading">Edit Content</h3>
            <div className="toolbar-input-group">
                <p className="label">Company Name</p>
                <Input
                    size="large"
                    prefix={<BankOutlined />}
                    showCount={true}
                    maxLength={30}
                    defaultValue={props.wordmark}
                    onChange={(e) => {
                        props.setWordmark(e.target.value);
                    }}
                />
            </div>
        </div>
    );
};

export default Edit;
