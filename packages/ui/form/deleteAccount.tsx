import { useEffect, useState } from "react";
import { H1, Span, H2, Input, Button } from "../component/basicComponents";
import Frame from "../component/frame";
import getCookie from "../utils/getCookie";

type funcType = () => Promise<{
    err: any;
} | undefined>

const DeleteAccountForm = ({deleteAccountFunction}:{deleteAccountFunction:funcType}) => {

    const [confirm , setConfirm] = useState(false)
    const [userEmail , setUserEmail] = useState('')
    const [text , setText] = useState('')
    const [isloading , setIsloading] = useState(false)
    
    const handleClick_Continue = () => {
        if (text == "Confirm deleting account"){
            setConfirm(true)
        }
    }

    const handleClick_Delete = () => {
        setIsloading(true)
        deleteAccountFunction().catch(err => {
            alert(err);
        }).then((res)=> {
            if(res?.err){
                alert(res.err)
            }
            setIsloading(false)
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
        
        <Frame color="secondary">
            <H1>Delete Account</H1>
            {
                !confirm ?
                    <Span> Are you sure you want to delete account <br />
                            with email <Span color="accent">{userEmail}</Span> 
                    </Span>
                :
                    <Span> Your account with <br />
                         email <Span color="accent">{userEmail}</Span> <br />
                         will be permanently deleted
                    </Span>
            }
            <div style={{
                position: 'absolute',
                top: '178.25px',
                width:'264px',
                
            }}>
                {
                    !confirm ?
                    <>
                        <H2>Type ‘Confirm deleting account’</H2>
                        <Input type="text" onChnageFunc={setText} />
                    </>
                    :
                    <H2> </H2>
                }
            </div>
            <div style={{
                position: 'absolute',
                bottom: !confirm ? '30px' : '90px',
                width: '264px'
            }} >
                {
                    !confirm ?
                        <Button onClickFunc={handleClick_Continue} isDisable={isloading} butType="secondary" maincolor="red">
                            CONTINUE
                        </Button>
                    :
                        <Button onClickFunc={handleClick_Delete} isDisable={isloading} butType="primary" maincolor="red">
                            DELETE
                        </Button>
                }
            </div>
        </Frame>
        
    )
}

export default DeleteAccountForm;