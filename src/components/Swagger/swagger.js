import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css"

const Swagger = () => {
    return <SwaggerUI url="http://localhost:3002/api-docs/v1/swagger.json" />
}

export default Swagger