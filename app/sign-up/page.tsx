import '../../styles/sign-up.css'
export default function SignUp() {
    return (
        <div id="sign-up-panel">
            <form id="sign-up-container">
                <input className="sign_up" name="form-username" type="text" placeholder="Nombre de usuario" maxLength={20} required></input>
                <input className="sign_up" name="form-email" type="email" placeholder="Correo electrónico" maxLength={320} required></input>
                <input className="sign_up" name="form-password" type="password" placeholder="Contraseña" maxLength={25} required></input>
                <input className="sign_up" name="form-second-password" type="password" placeholder="Confirmar contraseña" maxLength={25} required></input>
                <input className="sign_up" name="form-button" type="submit" value="Registrarse"></input>
            </form>
        </div>
    )
}