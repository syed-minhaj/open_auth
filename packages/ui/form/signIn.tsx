import "../component/signIn.css"
import { useState } from "react";
import Frame from "../component/frame";
import Footer from "../component/footer";
import { H1, H2, Span, Input,Button } from "../component/basicComponents";

type funcType = ({ email }: { email: string; }) => 
        Promise<{ err: any; } | undefined>

const SignInForm = ({signInFunction}:{signInFunction:funcType}) => {

    const [email , setEmail] = useState('')
    const [isloading , setIsloading] = useState(false)
    const handleClick = () => {
        setIsloading(true)
        signInFunction({email: email}).catch(err => {
            console.log(err)
        }).then((res)=> {
            if(res?.err){
                alert(res.err)
            }
            setIsloading(false)
        })
    }
    
    return (
        
        <Frame>
            <H1>Sign In</H1>
            <Span> Sign in though OTP </Span>
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
        
    )
}

export default SignInForm;