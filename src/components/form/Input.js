import styles from '../styles/Input.module.css'

function Input({type, text, name, placeholder, value, handleOnChange}){
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}</label>
            <input 
                type={type} 
                name={name}
                id={name} 
                placeholder={placeholder} 
                value={value} 
                onChange={handleOnChange}/>
        </div>
    )
}

export default Input