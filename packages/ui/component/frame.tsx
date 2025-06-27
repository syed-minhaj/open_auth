
const Frame = ({children}:{children:React.ReactNode}) => {
    return (
        <div style={{
            width : '300px',
            height: '385px',
            background : '#F3F4F6',
            boxShadow: '0 0 18.5px 1.5px rgba(0,0,0, 0.25)',
            borderRadius : '9px',
            position : 'relative',
            padding : '18px', 
            paddingTop: '30px',
            paddingBottom:' 30px',
            display: 'flex',
            flexDirection: 'column',
        }} >
            <div style={{
                position: 'absolute',
                top: '191px',
                left: '-15px',
                background: '#06B99B',
                borderTopLeftRadius: '9px',
                borderTopRightRadius: '9px',
                height: '30px',
                width: '185px',
                transform: 'rotate(270deg)',
                transformOrigin: 'left center',
                display: 'flex',
                justifyContent: 'center',
                alignItems:'center',
                fontWeight: '600',
                fontSize: '12px',
                color: '#F5F5F5D9',
            }}>
                Powered by open_Auth
            </div>
            <h2 style={{
                fontWeight: '700',
                fontSize : '14px',
                color: '#000000',
                opacity: '0.85',
                lineHeight : '1.22',
            }}>open_Auth</h2>
            {children}
        </div>
    )
}
export default Frame;