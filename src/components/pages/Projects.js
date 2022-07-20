import {useLocation} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Message from "../layout/Message"
import Container from '../layout/Container'
import LinkButton from '../layout/LinkButton'
import styles from '../styles/Projects.module.css'
import ProjectCard from '../project/ProjectCard'
import Loading from '../layout/Loading'
import { BsSim } from 'react-icons/bs'

function Projects(){
    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [removeProjectMessage, setRemoveProjectMessage] = useState('')

    const location = useLocation()
    let message = ''
    if (location.state) {
        message = location.state.message
    }

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:5000/projects', {
                method: 'GET',
                headers: {
                    'Content-Type': 'applicaton/json',
                },
            })
            .then((resp) => resp.json())
            .then((data) => {
                setProjects(data)
                setRemoveLoading(true)
            })
            .catch((err) => console.log(err))
        }, 100)
    }, []);


    function removeProject(id) {
        setRemoveProjectMessage('')

        const confirm = prompt('Deseja realmente apagar o projeto selecionado?\n')
        console.log("confirm" + confirm)
        if(confirm != null) {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then((resp) => resp.json())
            .then((data) => {
                setProjects(projects.filter((project) => project.id !== id))
                setRemoveProjectMessage('Projeto removido com sucesso!')
            })
        }    
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar projeto" />
            </div>
            {message && <Message msg={message} type="sucess"/>}
            {removeProjectMessage && <Message msg={removeProjectMessage} type="sucess"/>}
            <Container customClass="start">
                {projects.length > 0 &&
                projects.map((project) => (
                    <ProjectCard 
                    id={project.id}
                    budget={project.budget}
                    category={project.category.name}
                    name={project.name} 
                    key={project.id}
                    handleRemove={removeProject}/>
                ))}
            </Container>
            {!removeLoading && <Loading />}
        </div>
    )
}

export default Projects