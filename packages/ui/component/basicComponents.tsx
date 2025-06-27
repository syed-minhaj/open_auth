

type InputType = "email" | "password" | "text" | "number";
type ButtonType = "primary" | "secondary";
type TextColor = "primary" | "accent";

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

const Button = ({onClickFunc, isDisable , butType , children}:{onClickFunc : () => void, isDisable : boolean, butType : ButtonType, children:React.ReactNode}) => {
    
    const bgColor = butType === "primary" ? (isDisable ? "#06b99bcc" : "#06B99B") : 
                  butType === "secondary" ? "#F3F4F6" : "#06B99B";
    
    const color = butType === "primary" ?  "#F3F4F6" :
                  butType === "secondary" ? (isDisable ? "#06b99bcc" : "#06B99B") : "#F3F4F6";
    return (
        <button onClick={onClickFunc} type="button" disabled={isDisable}
        style={{
            border: (butType === "primary" ? "None" : (isDisable ? "1px solid #06b99bcc" : "1px solid #06B99B")),
            width: '100%',
            height: '30px',
            borderRadius: '3px',
            backgroundColor: bgColor,
            fontSize: '10.5px',
            fontWeight: '600',
            color: color,
        }}>{children}</button>
    )
}

export {H1, H2, Span , Input , Button};