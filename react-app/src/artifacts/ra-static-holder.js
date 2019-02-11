
export default class RaStaticHolder {
    static message = {};
    static requestStack = {};

    static addMessageData(message, isSuccess = true){
        this.message = {isSuccess: isSuccess, message: message}
    }
}