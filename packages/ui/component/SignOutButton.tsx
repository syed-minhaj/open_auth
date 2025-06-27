
type funcType = () => {
    message: string;
}

const SignOutButton = ({signOutFunction}:{signOutFunction:funcType}) => {
    const handleClick = () => {
        const { message } = signOutFunction()
        alert(message)
    }

    return (
        <button onClick={handleClick} type="button" style={{
            backgroundColor: '#F94664',
            width: '77px',
            height: '30px',
            borderRadius: '3px',
            color: '#F5F5F5D9',
            fontSize: '10.5px',
            fontWeight: '600'
        }}
        >SIGN OUT</button>
    )
}
export default SignOutButton;