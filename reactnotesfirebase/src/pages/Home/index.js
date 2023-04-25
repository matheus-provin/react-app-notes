import { useContext } from "react"
import { AuthGoogleContext } from "../../context/authGoogle"
import Notas from "../Notas"

function Home() {
    
    const {user, signOut} = useContext(AuthGoogleContext)
    const userLogado = user
    console.log(userLogado.displayName)
    
    
    
    
    return (
        <div>
            <Notas/>
        </div>
    )
}
export default Home