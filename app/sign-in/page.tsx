import '../../styles/sign-in.css'
export default function SignIn() {
    return (
        <div id="container">
            <form>
                <input name="username" id="username-id" type="text" maxLength={20} placeholder="Nombre de usuario"></input>
                <input name="password" id="password-id" type="password" maxLength={20} placeholder="Contraseña"></input>
                <input id="submit-id" type="submit" value="Ingresar"></input>
            </form>
        </div>
    )
}