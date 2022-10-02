import React, { useEffect, useRef } from 'react'
import * as jose from 'jose'
import { useDispatch } from 'react-redux'
import { useSignInMutation } from '../features/usersAPI'
import { setCredentials } from '../features/authSlice'

export default function SignInGoogle() {
    const buttonDiv = useRef(null)
    const [signIn] = useSignInMutation()
    const dispatch = useDispatch()
    
    async function handleCredentialResponse(response) {
        let userObject = jose.decodeJwt(response.credential)
        let user  = {
            mail: userObject.email,
            password: userObject.sub,
            role: 'user',
            from: 'google',
        }

        try {
          let res = await signIn(user)
          if (res.data?.success) {
            console.log(res.data)
            dispatch(setCredentials(res.data.response.user))
            localStorage.setItem('token',res.data.response.token)
          }
          localStorage.setItem('user', JSON.stringify(res.data.response.user))
        } catch (error) {
          console.log(error)
        }
    }
    
    useEffect(() => {

        /* global google */
        google.accounts.id.initialize({
            client_id: "919249866967-qffo42lhcei7m2472ut3sntdmgm23umi.apps.googleusercontent.com",
            callback: handleCredentialResponse,
            context: "use"
          });

          google.accounts.id.renderButton(
            buttonDiv.current,
            { theme: "outline", size: "large", text: "continue_with", shape: "pill" }
          );
    }, [])

  return (
    <div ref={buttonDiv}></div>
  )
}
