function Profile() {
    return (
        <div className='container'>
            <div className='patient-profile'>
                <div className='sidebar'>
                    <button className='add-profile-btn'>Thêm hồ sơ</button>
                    <nav className='nav-menu'>
                        <a href='/' className='nav-item'>
                            Hồ sơ bệnh nhân
                        </a>
                        <a href='/' className='nav-item'>
                            Phiếu khám bệnh
                        </a>
                        <a href='/' className='nav-item'>
                            Thông báo
                        </a>
                    </nav>
                </div>
                <div className='profile-list'>
                    <div className='profile-card'>
                        <h3>Danh sách hồ sơ bệnh nhân</h3>
                        <div className='profile-details'>
                            <p>
                                <strong>Họ và tên:</strong>
                            </p>
                            <p>
                                <strong>Ngày sinh:</strong>
                            </p>
                            <p>
                                <strong>Số điện thoại:</strong>
                            </p>
                            <p>
                                <strong>Giới tính:</strong>
                            </p>
                            <p>
                                <strong>Địa chỉ:</strong>
                            </p>
                            <p>
                                <strong>Dân tộc:</strong>
                            </p>
                        </div>
                        <div className='profile-actions'>
                            <button className='delete-btn'>Xóa hồ sơ</button>
                            <button className='edit-btn'>Sửa hồ sơ</button>
                            <button className='details-btn'>Chi tiết</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
