import {useState , useEffect} from "react";
import Frame from "../component/frame";
import Footer from "../component/footer";
import { H1, H2, Span, Input,Button } from "../component/basicComponents";
import getCookie from "../utils/getCookie";


type signUpFuncType = ({ password }: {
    password: number;
}) => Promise<{
    err: any;
} | undefined>

type resendFucnType = () => Promise<{
    err: any;
    message?: undefined;
} | {
    message: any;
    err?: undefined;
}>
const SignUpPassForm = ({signUpPassFunction , resendFunction , appName}:{signUpPassFunction:signUpFuncType , resendFunction:resendFucnType , appName: string}) => {
    
    const [userEmail , setUserEmail] = useState('')
    const [password , setPassword] = useState<number>()
    const [isloadingResend , setIsloadingResend] = useState(false)
    const [isloadingSignIn , setIsloadingSignIn] = useState(false)
    const handleResend = () => {
        setIsloadingResend(true)
        resendFunction().then(({message , err}) => {
            if(err){
                alert(err)
            }else{
                alert(message)
            }
        })
    }
    const handleSignUp = () => {
        setIsloadingSignIn(true)
        if(!password){
            alert('Please enter password')
            setIsloadingSignIn(false)
            return
        }
        signUpPassFunction({password : password}).catch(err => {
            alert(err)
        }).then((res)=> {
            if(res?.err){
                alert(res.err)
            }
            setIsloadingSignIn(false)
        })
    }
    useEffect(() => {
        const userEmail = getCookie('open_auth_email');
        if(!userEmail){
            return;
        }
        setUserEmail(userEmail)
    },[])
    
    return (
        <Frame appName={appName}>
            <H1>Sign Up</H1>
            <Span> OTP( one time password ) send to <br />
                email<Span color="accent"> {userEmail} </Span>. <br />
                You have <Span color="accent"> 10 </Span>tries and <Span color="accent"> 5 </Span>minutes 
            </Span>
            <div style={{
                position: 'absolute',
                top: '178.25px',
                width:'264px',
                
            }}>
                <H2>Password</H2>
                <Input type="number" onChnageFunc={setPassword} />
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                position: 'absolute',
                bottom: '30px',
                width: '264px'
            }} >
                <Button onClickFunc={handleResend} isDisable={isloadingResend} butType="secondary">
                    Resend Password
                </Button>
                <div style={{height:'8px'}}></div>
                <Button onClickFunc={handleSignUp} isDisable={isloadingSignIn} butType="primary">
                    SIGN UP
                </Button>
                <Footer form="signUpPassword" />
            </div>
        </Frame>
    )
}

export default SignUpPassForm;