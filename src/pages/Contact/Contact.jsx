import { Link } from 'react-router-dom';

import message from '../../assets/icons/message.svg';
import zaloColor from '../../assets/icons/zalo-color.svg';
import fbColor from '../../assets/icons/fb-color.svg';
import calendarColor from '../../assets/icons/calendar-color.svg';

function Contact() {
    return (
        <div className='contact'>
            <div className='contact__top'>
                <div className='container'>
                    <div className='contact__heading'>
                        <h1>Liên hệ</h1>
                        <p>
                            Bạn đang quan tâm đến các dịch vụ của chúng tôi hoặc
                            cần tư vấn!
                        </p>
                        <p>Chúng tôi luôn sẵn sàng giúp đỡ bạn.</p>
                    </div>

                    <div className='contact__content'>
                        <div className='row row-cols-3 row-cols-md-1 gy-md-3'>
                            <div className='col'>
                                <article className='contact__item'>
                                    <h2>Hỏi đáp nhanh</h2>
                                    <p>
                                        Danh sách các câu hỏi đã được hệ thống
                                        hóa, bạn có thể tham khảo nhanh
                                    </p>

                                    <img src={message} alt='' />

                                    <Link to='/qa'>Tham khảo</Link>
                                </article>
                            </div>

                            <div className='col'>
                                <article className='contact__item'>
                                    <h2>Các kênh hỗ trợ</h2>
                                    <p>
                                        Liên hệ trực tiếp với chúng tôi qua các
                                        kênh hỗ trợ sau
                                    </p>

                                    <div>
                                        <img src={zaloColor} alt='' />
                                        <img src={fbColor} alt='' />
                                    </div>

                                    <Link to='#'>1900 9999</Link>
                                </article>
                            </div>

                            <div className='col'>
                                <article className='contact__item'>
                                    <h2>Thời gian làm việc</h2>
                                    <p>
                                        Thời gian làm việc từ thứ 2 đến thứ 7
                                        <span>7:30 - 16:30</span>
                                    </p>

                                    <img src={calendarColor} alt='' />
                                </article>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
