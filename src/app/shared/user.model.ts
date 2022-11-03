export class UserModel{
    constructor(
        public email: string, 
        public id: string,
        private _token: string,
        private _tokenExpiresIn: Date){}

    
    get token(){
        if(this._tokenExpiresIn === null || new Date() > this._tokenExpiresIn){
            return null
        }
        return this._token
    }
}