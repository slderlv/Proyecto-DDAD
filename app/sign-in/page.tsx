'use client'
import React, { ChangeEvent } from 'react'
import axios from 'axios'
import { User } from '../interfaces/interfaces'


export default function SignIn() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [passwordConfirmation, setPasswordConfirmation] = React.useState('')
    const [token, setToken] = React.useState('')
    const [user, setUser] = React.useState<User>({} as User);

    const handleLogin = async () => {
        console.log(email, password)
        const response = await axios.post('http://localhost:3000/auth/login', {
            email,
            password
        })
        
        
    }

    return (     
      <div>Hola</div>
  )
}