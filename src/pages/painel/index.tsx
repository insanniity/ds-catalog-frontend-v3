import {Authorities} from "types/auth";
import {useAuth} from "contexts/AuthContext";
import {Navigate, Outlet} from "react-router-dom";

type Props = {
    role?: Authorities[];
}

const HasPermissao = ({role} : Props) => {
    const {hasAnyRoles} = useAuth();
    if(role) {
        if(hasAnyRoles(role)){
            return <Outlet/>
        }else{
            return <Navigate to="/painel" replace />;
        }
    }else {
        return <Outlet/>
    }
}


export default HasPermissao;