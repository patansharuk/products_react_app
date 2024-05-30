export const PORT = 3003

export const DOMAIN = `localhost:${PORT}`

export const HOME_PATH = '/'

export const LOGIN_PATH = '/login'

export const LOGOUT_PATH = '/logout'

export const NOT_FOUND_PATH = '/notfound'

/**
 * API Routes related to Server
 * @example
 * ProductsApi.login_url()
 */
export class ProductsApi{
    static domain = 'http://localhost:3002/'

    static login_url(){
        return this.domain + 'login'
    }

    static signup_url(){
        return this.domain + 'signup'
    }

    static logout_url(){
        return this.domain + 'logout'
    }

    static products_url(){
        return this.domain + 'products'
    }
}

export class DealerDetailsApi{
    static domain = 'http://localhost:3002/'

    static dealer_details_url(){
        return this.domain + 'dealer_details'
    }

    static show_dealer_detail_url(id){
        return this.domain + `dealer_details/${id}`
    }
}