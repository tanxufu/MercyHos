/* eslint-disable react/prop-types */
function FormGroup({
    label,
    name,
    type,
    placeHolder,
    register,
    errorMessage,
    value
}) {
    return (
        <div className={`form-group ${type === 'hide' && 'd-none'}`}>
            <label>
                <p className={`form-group__label `}>{label}</p>
                <input
                    className='form-group__input'
                    type={type}
                    name={name}
                    value={value}
                    placeholder={placeHolder}
                    {...register(name)}
                />
            </label>

            <p className={`form-group__error `}>{errorMessage}</p>
        </div>
    );
}

export default FormGroup;
