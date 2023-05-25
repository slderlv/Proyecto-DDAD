import '../../styles/sign-up.css'
export default function SignUp() {
    return (
        <div>
            <form>
                <input name="form-username" type="text" placeholder="Nombre de usuario"></input>
                <input name="form-email" type="email" placeholder="Correo electrónico"></input>
                <input name="form-password" type="password" placeholder="Contraseña"></input>
                <input name="form-second-password" type="password" placeholder="Confirmar contraseña"></input>
                <input name="form-button" type="submit" value="Registrarse"></input>
            </form>
        </div>
    )
}