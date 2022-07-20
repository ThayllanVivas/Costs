import styles from '../styles/ProjectForm.module.css'
import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import { useState, useEffect } from 'react'
import Message from '../layout/Message'

function ProjectForm({handleSubmit, btnText, projectData}) {
    const [categories, setCategories] = useState([])
    const [message, setMessage] = useState()
    const [type, setType] = useState()
    const [project, setProject] = useState(projectData || {})

    useEffect(() => {
        fetch("http://localhost:5000/categories", {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },
        })
        .then((resp) => resp.json())
        .then((data) => setCategories(data))
        .catch((err) => console.log(err))
    }, [])

    const submit = (e) => {
        e.preventDefault()
        // console.log(project)
        if(project.name.length == 0){          
            setMessage('O nome do projeto não pode ser vazio!')
            setType('error')
            return false
        }
        handleSubmit(project)
    }

    useEffect(() => {
        setTimeout(()=>{
            setMessage('')
        }, 3000)
    }, [message])

    function handleChange(e){
        setProject({...project, [e.target.name]:e.target.value})
    }

    function handleCategory(e){
        setProject({...project, category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text,
            },
        })
        // console.log(project)
    }

    return(
        <form onSubmit={submit} className={styles.form}>
            <Message msg={message} type={type}/>
            <Input 
                type="text" 
                text="Nome do projeto"
                name="name"
                placeholder="Insira o nome do projeto"
                handleOnChange={handleChange}
                value={project.name ? project.name : ''}
            />
            <Input 
                type="number" 
                text="Orçamento do projeto"
                name="budget"
                placeholder="Insira o orçamento total"
                handleOnChange={handleChange}
                value={project.budget ? project.budget : ''}
            />
            <Select  
                name="category_id" 
                text="Selecione a categoria" 
                options={categories} 
                handleOnChange={handleCategory}
                value={project.category ? project.category.id : ''}
            />
            <SubmitButton text={btnText}/>
        </form>
    )
}

export default ProjectForm