import { useParams } from 'react-router-dom'
import {useState, useEffect} from 'react'
import {parse, v4 as uuidv4} from 'uuid'
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import styles from '../styles/Project.module.css'
import ProjectForm from './ProjectForm'
import Message from '../layout/Message'
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'

function Project() {
    const { id } = useParams()
    
    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(resp => resp.json())
            .then((data) => {
                setProject(data)
                setServices(data.services)
            })
            .catch(err => console.log(err))
        }, 100)
    }, [id])

    function toggleProjectForm(project){
        setShowProjectForm(!showProjectForm)
    }

    function toogleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }

    function editPost(project){
        setMessage('')

        if(project.budget < project.cost){
            //mensagem de erro
            setMessage('O orçamento não pode ser menor que o usto do projeto')
            setType('error')
            return false
        }

        
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project),
        })
        .then(resp => resp.json())
        .then((data) => {
            setProject(data) //atualizar a variavel adicionando o projeto 
            setShowProjectForm(false) //esconder a
            setMessage('Projeto atualizado!!') //atualizar a mensagem a ser exibida
            setType('sucess') //atualizar o tipo da mensagem caso haja sucesso na função
        })
        .catch(err => console.log(err))
    }   

    function createService() {
        setMessage('')

        const lastService = project.services[project.services.length -1]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        if(newCost > parseFloat(project.budget)){
            setMessage('Orçamento ultrapassado. Verifique o valor do serviço!')
            setType('error')
            project.services.pop()
            return false
        }

        project.cost = newCost

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project),
        })
        .then(resp => resp.json())
        .then((data) => {
            setServices(data.services) //inserir novos services dentro da variavel
            setShowServiceForm(false) //esconder o campo de adicionar serviço
            setMessage('Serviço inserido com sucesso!') //atualizar a mensagem a ser exibida
            setType('sucess') //atualizar o tipo da mensagem caso haja sucesso na função
        })
        .catch(err => console.log(err))
    }

    function removeService(serviceID, cost){
        setMessage('')
        setType('')

        const serviceUpdated = project.services.filter(
            (proj) => proj.id !== serviceID
        )
        const projectUpdated = project
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)
        projectUpdated.services = serviceUpdated
        console.log(projectUpdated)

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectUpdated)
        }).then(resp => resp.json())
        .then((data) => {
            setProject(projectUpdated)
            setServices(serviceUpdated)
            setMessage("Serviço removido com sucesso!")
            setType('sucess')
        })
        .catch(err => console.log(err))
        
    }

    return(
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column">
                        <div className={styles.message}>
                            {message && (
                                <Message type={type} msg={message}/>
                            )}
                        </div>
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name} </h1>
                            <button onClick={toggleProjectForm} className={styles.btn}>
                                {!showProjectForm ? "Editar projeto" : "Cancelar"}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria: </span>{project.category.name}
                                    </p>
                                    <p>
                                        <span>Total do Orçamento: </span>R${project.budget}
                                    </p>
                                    <p>
                                        <span>Total Utilizado: </span>R${project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <ProjectForm 
                                    handleSubmit={editPost}
                                    btnText="Concluir edição"
                                    projectData={project}/>
                                </div>
                            )}
                        </div>
                        <div className={styles.service_form_container}>
                            <h2>Adicione um serviço:</h2>
                            <button onClick={toogleServiceForm} className={styles.btn}>
                                {!showServiceForm ? "Adicionar serviço" : "Cancelar"}
                            </button>
                            <div className={styles.project_info}>
                                {showServiceForm && (
                                    <ServiceForm 
                                        handleSubmit={createService}
                                        btnText="Adicionar serviço"
                                        projectData={project}
                                    />
                                )}
                            </div>
                        </div>                       
                        <h2>Serviços</h2>
                        <Container customClass="start">
                            {services.length > 0 && (
                                services.map((service) => (
                                    <ServiceCard 
                                        id={service.id}
                                        name={service.name}
                                        description={service.description}
                                        cost={service.cost}
                                        key={service.id}
                                        handleRemove={removeService}
                                    />
                                ))
                            )}
                            {services.length === 0 && ( 
                                <p>Não há serviços inseridos</p> 
                            )}
                        </Container>
                    </Container>
                </div>
            ) : (
                <Loading />
            )}
        </>
    )
}

export default Project