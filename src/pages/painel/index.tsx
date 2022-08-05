import {Authorities} from "types/auth";
import {Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {hasAuthority} from "store/slices/authSlices";

type Props = {
    role?: Authorities[];
}

const HasPermissao = ({role} : Props) => {
    const hasRole = useSelector(state => hasAuthority(state, role));

    if(role) {
        if(hasRole){
            return <Outlet/>
        }else{
            return <Navigate to="/painel" replace />;
        }
    }else {
        return <Outlet/>
    }
}


export default HasPermissao;