
type formType = "signUp" | "signIn" | "signInPassword" | "signUpPassword"

const Footer = ({form} : {form : formType}) => {

    const linkUrl = form === "signIn" ? "/signUp" :
                    form === "signUp" ? "/signIn" : 
                    form === "signInPassword" ? "/signIn" : 
                    form === "signUpPassword" ? "/signUp" : "";

    const linkText = form === "signIn" ? "Sign Up" :
                     form === "signUp" ? "Sign In" : 
                     form === "signInPassword" ? "Sign In" : 
                     form === "signUpPassword" ? "Sign Up" : "";

    const phase = form === "signIn" ? "Don't have an account ? " :
                  form === "signUp" ? "have a accout ? " : 
                  form === "signInPassword" ? "Use different Email " : 
                  form === "signUpPassword" ? "Use different Email " : "" ;
    
    
    return (
        <div style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            width: 'fit-content',
        }}>
            <p  style={{
                fontSize: '10.5px',
                color: '#0000007F',
                lineHeight: '1.22',
                marginTop: '4.25px',
            }}
            >{phase} <a href={linkUrl} style={{
                color: '#06B99B',
                textDecoration: 'none'
            }}> {linkText} </a></p>
        </div>
    )
}

export default Footer;