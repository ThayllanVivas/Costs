import {useState} from 'react'
import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'
import Message from '../layout/Message'

import styles from '../styles/ProjectForm.module.css'

export default function ServiceForm({handleSubmit, btnText, projectData}) {

    const [service, setService] = useState()
    const [message, setMessage] = useState('')
    const [type, setType] = useState('')

    function submit(e){
        e.preventDefault() //evita comportamento padrão
        projectData.services.push(service)
        handleSubmit(projectData)
    }

    function handleChange(e){
        setService({...service, [e.target.name]: e.target.value})
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            {message && (
                <Message type={type} msg={message}/>
                )
            }
            <Input 
                type="text"
                text="Nome do serviço"
                name="name"
                placeholder='Insira o nome do serviço'
                handleOnChange={handleChange}
            />
            <Input 
                type="number"
                text="Custo do serviço"
                name="cost"
                placeholder='Insira o custo do serviço'
                handleOnChange={handleChange}
            />
            <Input 
                type="text"
                text="Descrição do serviço"
                name="description"
                placeholder='Descreva o serviço'
                handleOnChange={handleChange}
            />
            <SubmitButton text={btnText}/>
        </form>
    )
}
