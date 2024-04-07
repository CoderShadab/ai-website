const AuthLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return ( 
        <div className="flex items-center justify-center h-full bg-pink-100 min-h-screen">
            {children}
        </div>
     );
}
 
export default AuthLayout;