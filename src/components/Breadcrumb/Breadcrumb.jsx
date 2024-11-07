
import { Breadcrumb } from 'antd';
import PropTypes from 'prop-types';

function Bread({ items }) {
    return (
        <div className='breadcrumb'>
            <Breadcrumb items={items} />
        </div>
    );
}

Bread.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.node.isRequired,
            href: PropTypes.string // Bỏ isRequired vì không phải item nào cũng cần href
        })
    ).isRequired
};

export default Bread;