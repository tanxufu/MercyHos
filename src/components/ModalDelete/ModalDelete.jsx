import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";

const { confirm } = Modal;
const showDeleteConfirm = () => {
  confirm({
    title: 'Xác nhận xoá!',
    icon: <ExclamationCircleFilled style={{color:'red'}}/>,
    okText: 'Có',
    okType: 'danger',
    cancelText: 'Không',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};

export default showDeleteConfirm;