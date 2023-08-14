import { InfoCircleOutlined } from "@ant-design/icons";
import { Popover } from "antd";

const skillcontent = (
    <ul className="flex flex-col space-y-1">
        <p>A - Master</p>
        <p>B - Expert</p>
        <p>C - Intermediate</p>
        <p>D - Beginner</p>
    </ul>
);


const SkillsInfo = () => {
    return (
        <Popover content={skillcontent} title="Skill Levels">
            <InfoCircleOutlined />
        </Popover>
    )
}

export default SkillsInfo