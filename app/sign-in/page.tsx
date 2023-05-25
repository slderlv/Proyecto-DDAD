import '../../styles/sign-in.css'
export default function SignIn() {
    return (
        <div id="panel">
            <form id="container">
                <input name="form-username" id="input-username" type="text" maxLength={20} placeholder="Nombre de usuario" required></input>
                <input name="form-password" id="input-password" type="password" maxLength={25} placeholder="Contraseña" required></input>
                <input id="sign-in-submit" type="submit" value="Ingresar"></input>
            </form>
        </div>
    )
}