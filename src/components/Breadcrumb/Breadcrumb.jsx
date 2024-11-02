import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";

function Bread () {
    return (
        <div className="container breadcrumb">
            <Breadcrumb
    items={[
      {
        href: '/',
        title: <HomeOutlined/>,
      },
      {
        href: '/emptyprofile',
        title: (
          <>
            <UserOutlined />
            <span>Chọn hồ sơ</span>
          </>
        ),
      },
    //   {
    //     title: 'Application',
    //   },
    ]}
  />
        </div>
     );
}

export default Bread;