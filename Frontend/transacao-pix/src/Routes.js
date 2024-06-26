
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import Home from './Pages/Home';
import Transferencia from './Pages/Transferencia';
import Relatorio from './Pages/Relatorio';
import Resultado from './Pages/Resultado';
import Edicao from './Pages/Edicao';
import Cadastro from './Pages/Cadastro';



export default function Rotas(){
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/Relatorio",
            element: <Relatorio />,
        },
        {
            path: "/Transferencia",
            element: <Transferencia />,
        },
        {
            path: "/Resultado",
            element: <Resultado />,
        },
        {
            path: "/Edicao",
            element: <Edicao />,
        },
        {
            path: "/Cadastro",
            element: <Cadastro />,
        },
    ]);
    
    return(
        <RouterProvider router={router} />
    )
}
