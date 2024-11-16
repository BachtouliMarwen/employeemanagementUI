import PropTypes from 'prop-types'

const InputField = ({label, placeholder, Icon}) => {
  return (
    <div className="w-1/2 px-3 mb-5">
        <label className="text-xs font-semibold px-1">{label}</label>
        <div className="flex">
            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                <Icon className="text-gray-400 text-lg" />
            </div>
            <input 
                type="text"
                className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                placeholder={placeholder}
            />
        </div>
    </div>
  )   
}

InputField.propTypes = {
    label: PropTypes.string.isRequired, 
    placeholder: PropTypes.string.isRequired, 
    Icon: PropTypes.elementType.isRequired, 
};

export default InputField