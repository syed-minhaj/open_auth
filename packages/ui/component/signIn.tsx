import "./signIn.css"
import { useState } from "react";
import Frame from "./frame";
import Footer from "./footer";
import { H1, H2, Span, Input,Button } from "./basicComponents";

type functionType = ({ email }: { email: string; }) => 
        Promise<{ err: any; } | undefined>

const SignInForm = ({signInFunction}:{signInFunction:functionType}) => {

    const [email , setEmail] = useState('')
    const [isloading , setIsloading] = useState(false)
    const handleClick = () => {
        setIsloading(true)
        signInFunction({email: email}).catch(err => {
            console.log(err)
        }).then(()=> {
            setIsloading(false)
        })
    }
    
    return (
        <>
        <div className="frame">
            <div className="poweredby">
                Powered by open_Auth
            </div>
            <h2 >open_Auth</h2>
            <h1  style={{
                marginTop: '9.25px'
            }} 
            >Sign In</h1>
            <p > Sign in though OPT </p>
            <div style={{
                position: 'absolute',
                top: '178.25px',
                width:'264px',
                
            }}>
                <h2  style={{
                    opacity: '0.8',
                    fontWeight: '600',
                    marginBottom: '7.75px'
                }}>Email</h2>
                <input  type="email" onChange={(e) => {setEmail(e.target.value)}} />
            </div>
            <div style={{
                position: 'absolute',
                bottom: '30px',
                width: '264px'
            }} >
                <button onClick={handleClick} disabled={isloading} type="button" 
                 className="Main-button" >
                    CONTINUE
                </button>
                <div style={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    width: 'fit-content',
                }}>
                    <p  style={{fontSize: '10.5px',}}
                    >Don't have an account? <a href="/signUp" style={{
                        color: '#06B99B',
                        textDecoration: 'none'
                    }}>Sign Up</a></p>
                </div>
            </div>
        </div>
        <div>test test test </div>
        <Frame>
            <H1>Sign In</H1>
            <Span> Sign in though OPT </Span>
            <div style={{
                position: 'absolute',
                top: '178.25px',
                width:'264px',
                
            }}>
                <H2>Email</H2>
                <Input type="email" onChnageFunc={setEmail} />
                {/* <input  type="email" onChange={(e) => {setEmail(e.target.value)}} /> */}
            </div>
            <div style={{
                position: 'absolute',
                bottom: '30px',
                width: '264px'
            }} >
                {/* <button onClick={handleClick} disabled={isloading} type="button" 
                 className="Main-button" >
                    CONTINUE
                </button> */}
                <Button onClickFunc={handleClick} isDisable={isloading} butType="primary">
                    CONTINUE
                </Button>
                <Footer form="signIn" />
            </div>
        </Frame>
        </>
    )
}

export default SignInForm;