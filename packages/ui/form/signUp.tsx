import {useState} from "react";
import Frame from "../component/frame";
import Footer from "../component/footer";
import { H1, H2, Span, Input,Button } from "../component/basicComponents";

type funcType =  ({ username, email }: { username: string; email: string; }) => 
    Promise<{ err: any; } | undefined>

const SignUpForm = ({signUpFunction , appName}:{signUpFunction:funcType , appName : string}) => {   
    const [email , setEmail] = useState('')
    const [username , setUsername] = useState('')

    const [isloading , setIsloading] = useState(false)
    const handleClick = () => {
        setIsloading(true)
        signUpFunction({username: username, email: email}).catch(err => {
            alert(err);
        }).then((res)=> {
            if(res?.err){
                alert(res.err)
            }
            setIsloading(false)
        })
    }
    return(
        <Frame appName={appName}>
            <H1>Sign Up</H1>
            <Span> Create account <br />
            Enter Email and unique username </Span>
            <div style={{
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                top: '158.25px',
                width:'264px',
                gap:'6px'
            }}>
                <div>
                    <H2>Email</H2>
                    <Input type="email" onChnageFunc={setEmail} />
                </div>
                <div>
                    <H2>Username</H2>
                    <Input type="text" onChnageFunc={setUsername} />
                </div>
            </div>
            <div style={{
                position: 'absolute',
                bottom: '30px',
                width: '264px'
            }} >
                <Button onClickFunc={handleClick} isDisable={isloading} butType="primary">
                    CONTINUE
                </Button>
                <Footer form="signUp" />
            </div>
        </Frame>
    )
}

export default SignUpForm;