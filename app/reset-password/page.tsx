import '../../styles/sign-in.css'
export default function SignIn() {
    return (
        <div>
            <form>
                <input name="form-email" type="email" placeholder="Correo electrónico"></input>
                <input id="form-button" type="submit" value="Enviar código"></input>
            </form>
        </div>
    )
}
