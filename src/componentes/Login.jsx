import React, {useRef, useState } from 'react';
import '../css/Login.css'

const URL_LOGIN = "http://localhost:8080/Archivos_Login/login.php";

const enviarData = async (url,data)=> {

const resp =  await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
        'content-type': 'application/json'
        }
    });
     
    //console.log(resp);
    const json = await resp.json();
    //console.log(json)

    return json;
     
}


export default function Login(props) {

    const [error, setError]= useState(null);
    const [espera, setEspera]= useState(false);

    const refUsuario = useRef(null);
    const refClave = useRef(null);

    const handleLogin = async () =>{

        setEspera(true);

        const data = {
            "usuario": refUsuario.current.value,
            "clave" : refClave.current.value
        };
        console.log(data);
        const respuestaJson = await enviarData (URL_LOGIN, data);
        console.log("respuesta", respuestaJson);

        props.acceder(respuestaJson.conectado)
        setError(respuestaJson.error)

        setEspera(false);
       
    }



    return (
        <div className="Login">

            <div className="row">
                <div className="col-sm-4 offset-4 mt-5">
                    <div className="card pt-5">
                        <div className="card-header text-center">
                            <h1>🛡️ Validacion De Datos Consumiendo una API y Myql 🛡️</h1>
                        </div>
                        <div className="card-body">


                            {
                                error &&
                                <div className="alert alert-danger"> 
                                {error} 
                            </div>

                            }

                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">
                                    📧
                                </span>
                                <input
                                    type="gmail"
                                    className="form-control"
                                    placeholder="correo"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    ref = {refUsuario}
                                />
                            </div>

                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">
                                    🔑
                                </span>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="contraseña"
                                    aria-label="contraseña"
                                    aria-describedby="basic-addon2"
                                    ref={refClave}
                                />
                            </div>

                            <button id="boton" onClick = {handleLogin} disabled={espera} className="btn btn-info btn-lg btn-block"> ingresar </button>

                        </div>
                        <div className="card-footer">
                             <a href="http://">¿Olvido su contraseña?</a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}