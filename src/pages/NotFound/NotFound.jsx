import Button from '../../components/Button';
import notFoundImg from '../../assets/images/404.svg';

function NotFound() {
    return (
        <div className='container'>
            <div className='not-found-page'>
                <img src={notFoundImg} alt='' />
                <Button to='/'>Quay lại trang chủ</Button>
            </div>
        </div>
    );
}

export default NotFound;
