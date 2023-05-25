import '../../styles/sign-up.css'
export default function SignUp() {
    return (
        <div id="sign-up-panel">
            <form id="sign-up-container">
                <input className="sign_up" name="form-username" type="text" placeholder="Nombre de usuario"></input>
                <input className="sign_up" name="form-email" type="email" placeholder="Correo electrónico"></input>
                <input className="sign_up" name="form-password" type="password" placeholder="Contraseña"></input>
                <input className="sign_up" name="form-second-password" type="password" placeholder="Confirmar contraseña"></input>
                <input className="sign_up" name="form-button" type="submit" value="Registrarse"></input>
            </form>
        </div>
    )
}