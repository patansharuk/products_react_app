import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css"

const getAccessToken = () => {
    return localStorage.getItem('jwt_token')
}

const requestInterceptor = (req) => (
    {
        ...req,
        headers: {
            Authorization: `Bearer ${getAccessToken()}`
        },
    }
)

const Swagger = () => {
    return <SwaggerUI url="http://localhost:3002/api-docs/v1/swagger.json" requestInterceptor={requestInterceptor}/>
}

export default Swagger