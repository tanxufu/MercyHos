import { useState } from 'react';
import AccountModal from '../../components/AccountModel/AccountModel';
import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../apis/user.api';

function AccountSetting() {
    const [modal, setModal] = useState(null);

    const { data } = useQuery({
        queryKey: ['user'],
        queryFn: () => getCurrentUser()
    });
    const user = data?.data?.data?.data;

    const handleModelChange = (modalName) => {
        setModal(modalName);
    };

    return (
        <div className='account-setting'>
            <h1>Cài đặt tài khoản</h1>
            <span>Nhấn vào chi tiết để chỉnh sửa</span>

            <div className='account-setting__edit'>
                <div className='row gy-lg-0'>
                    <div className='col-6 col-lg-12'>
                        <div
                            className='account-setting__info'
                            onClick={() => handleModelChange('name')}
                        >
                            <p className='account-setting__label'>
                                Tên người dùng
                            </p>
                            <div className='account-setting__data'>
                                {user?.name}
                            </div>
                        </div>
                    </div>

                    <div className='col-6 col-lg-12'>
                        <div
                            className='account-setting__info'
                            onClick={() => handleModelChange('email')}
                        >
                            <p className='account-setting__label'>
                                Địa chỉ Email
                            </p>
                            <div className='account-setting__data'>
                                {user?.email}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-6 col-lg-12'>
                        <div
                            className='account-setting__info'
                            onClick={() => handleModelChange('password')}
                        >
                            <p className='account-setting__label'>Mật khẩu</p>
                            <div className='account-setting__data'>
                                ••••••••••••••••
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <AccountModal modal={modal} modalClose={() => setModal(null)} />
        </div>
    );
}

export default AccountSetting;
