import { Select } from "antd";

export function TimezoneSelect({ timezone, handleTimezoneChange }) {
  const { Option } = Select;
  return (
    <Select defaultValue={timezone} style={{ width: 200 }} onChange={handleTimezoneChange}>
      <Option value="Europe/London">London</Option>
      <Option value="Europe/Moscow">Moscow</Option>
      <Option value="America/New_York">New York</Option>
      <Option value="Asia/Tokyo">Tokyo</Option>
    </Select>
  );
}