import style from '../styles/ProjectCard.module.css'
import {BsPencil, BsFillTrashFill, BsTrashFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'

function ProjectCard({id, name, budget, category, handleRemove}){
    const removeProject = (e) => {
        e.preventDefault()
        handleRemove(id)
    }

    return(
        <div className={style.project_card}>
            <h4>{name}</h4>
            <p>
                <span>Orçamento:</span>R${budget}
            </p>
            <p className={style.category_text}>
                <span className={`${style[category.toLowerCase()]}`}></span> {category}
            </p>
            <div className={style.project_card_actions}>
                <Link to={`/project/${id}`}>
                    <BsPencil /> Editar
                </Link>
                <button onClick={removeProject}>
                    <BsTrashFill />
                    Remover
                </button>
            </div>
        </div>
    )
}

export default ProjectCard