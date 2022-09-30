import React, { useEffect, useRef } from 'react'
import * as jose from 'jose'
import { useSignUpMutation } from '../features/usersAPI'
import { useNavigate } from 'react-router-dom'

export default function SignInGoogle() {
    const buttonDiv = useRef(null)
    const navigate = useNavigate()
    const [signUp] = useSignUpMutation()
    
    async function handleCredentialResponse(response) {
        let userObject = jose.decodeJwt(response.credential)
        console.log(userObject)

        let user = {
          name: userObject.given_name,
          lastName: userObject.family_name,
          photo: userObject.picture,
          mail: userObject.email,
          password: userObject.sub,
          country: "Argentina",
          role: 'user',
          from: 'google'
        }
        try {
          let res = await signUp(user)
          if (res.data?.success) {
            console.log(res.data)
            navigate('/signin', {replace:true})
          } else {
            console.log(res.error)
          }
        } catch (error) {
          console.log(error)
        }
      }
      
    useEffect(() => {

        /* global google */
        google.accounts.id.initialize({
            client_id: "919249866967-qffo42lhcei7m2472ut3sntdmgm23umi.apps.googleusercontent.com",
            callback: handleCredentialResponse,
            context: "signup"
          });

          google.accounts.id.renderButton(
            buttonDiv.current,
            { theme: "outline", size: "large", text: "signup_with", shape: "pill" }
          );
    }, [])

  return (
    <div ref={buttonDiv}></div>
  )
}
