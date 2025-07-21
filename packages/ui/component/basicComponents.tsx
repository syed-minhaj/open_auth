

type InputType = "email" | "password" | "text" | "number";
type ButtonType = "primary" | "secondary";
type TextColor = "primary" | "accent";
type ButtonColor = "blue" | "red";

const H1 = ({children}:{children:React.ReactNode}) => {
    return (
        <h1 style={{
            marginTop: '9.25px',
            fontWeight: '700',
            fontSize : '18px',
            color: '#000000d9',
            lineHeight:'1.22',
        }} 
        >{children}</h1>
    )
}

const H2 = ({children}:{children:React.ReactNode}) => {
    return (
        <h2 style={{
            opacity: '0.8',
            fontWeight: '600',
            marginBottom: '7.75px',
            fontSize : '14px',
            color: '#000000',
            lineHeight : '1.22',
        }}>{children}</h2>
    )
}

const Span = ({color , children}:{color? : TextColor, children:React.ReactNode}) => {
    //const textColor = color ? (color === "primary" ? "#0000007F" : "#06b99bcc") : "#0000007F";
    return (
        <span style={{
            display: 'inline',
            fontSize: '14px',
            color: color ? (color === "primary" ? "#0000007F" : "#06b99b") : "#0000007F",
            lineHeight: '1.22',
            marginTop: '4.25px',
        }}>{children}</span>
    )
}

const Input = ({type , onChnageFunc }:{type : InputType , onChnageFunc : (e:any) => void}) => {
    return (
        <input onChange={(e) => {onChnageFunc(e.target.value)}}
            type={type} style={{
            width: '100%',
            height: '30px',
            borderRadius: '3px',
            border: '1px solid #000000cc',
        }} />
    )
}

const Button = ({onClickFunc, isDisable , butType , maincolor , children}:
    {onClickFunc : () => void, isDisable : boolean, butType : ButtonType, maincolor?:ButtonColor, children:React.ReactNode}) => {
    
    

    const bgColor = () =>{
        if(butType === "secondary" ){
            return "#F3F4F6"
        }
        else if(butType === "primary" && (!maincolor || maincolor === "blue")){
            if(isDisable){
                return "#06b99bcc"
            }else{
                return "#06B99B"
            }
        }
        else if(butType === "primary" &&  maincolor === "red"){
            if(isDisable){
                return "#EE1D40cc"
            }else{
                return "#EE1D40"
            }
        }
        else{
            return "#06B99B"
        }
    }

    const color = () => {
        if(butType === "primary" ){
            return "#F3F4F6"
        }
        else if(butType === "secondary" && (!maincolor || maincolor === "blue")){
            if(isDisable){
                return "#06b99bcc"
            }else{
                return "#06B99B"
            }
        }
        else if(butType === "secondary" && maincolor === "red"){
            if(isDisable){
                return "#EE1D40cc"
            }else{
                return "#EE1D40"
            }
        }
        else{
            return "#F3F4F6"
        }
    }

    const border = () => {
        if(butType === "primary" ){
            return "None"
        }
        else if(butType === "secondary" && (!maincolor || maincolor === "blue")){
            if(isDisable){
                return "1px solid #06b99bcc"
            }else{
                return "1px solid #06B99B"
            }
        }
        else if(butType === "secondary" && maincolor === "red"){
            if(isDisable){
                return "1px solid #EE1D40cc"
            }else{
                return "1px solid #EE1D40"
            }
        }
        else{
            return "None"
        }
    }
    return (
        <button onClick={onClickFunc} type="button" disabled={isDisable}
        style={{
            border: border(),
            width: '100%',
            height: '30px',
            borderRadius: '3px',
            backgroundColor: bgColor(),
            fontSize: '10.5px',
            fontWeight: '600',
            color: color(),
        }}>{children}</button>
    )
}

export {H1, H2, Span , Input , Button};