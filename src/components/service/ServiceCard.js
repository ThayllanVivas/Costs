import { BsFillTrashFill } from 'react-icons/bs'
import styles from '../styles/ProjectCard.module.css'

export default
function ServiceCard({id, name, description, cost, handleRemove}) {

    function remove(e){
        e.preventDefault()
        handleRemove(id, cost)
    }
    return(
        <div className={styles.project_card}>
            <h4>{name}</h4>
            <p>
                <span>Custo total: </span> R${cost}
            </p>
            <p>
                <span>Descrição:</span> {description}
            </p>
            <div className={styles.project_card_actions}>
                <button onClick={remove}>
                    <BsFillTrashFill />
                    Excluir
                </button>
            
            </div>
        </div>
    )
}