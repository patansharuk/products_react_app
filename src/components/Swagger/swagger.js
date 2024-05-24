import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css"
import { get_auth_token } from "../../utils/authUtils";

const requestInterceptor = (req) => (
    {
        ...req,
        headers: {
            Authorization: `Bearer ${get_auth_token()}`
        },
    }
)

const Swagger = () => {
    return <SwaggerUI url="http://localhost:3002/api-docs/v1/swagger.json" requestInterceptor={requestInterceptor}/>
}

export default Swagger