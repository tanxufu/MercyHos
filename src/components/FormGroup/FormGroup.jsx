/* eslint-disable react/prop-types */
function FormGroup({ label, name, type, placeHolder, register, errorMessage }) {
    return (
        <div className={`form-group ${type === 'hide' && 'd-none'}`}>
            <label>
                <p className={`form-group__label `}>{label}</p>
                <input
                    className='form-group__input'
                    type={type}
                    name={name}
                    placeholder={placeHolder}
                    {...register(name)}
                />
            </label>

            <p className={`form-group__error `}>{errorMessage}</p>
        </div>
    );
}

export default FormGroup;
