//posible coneccion de db para un futuro
class Database{
    static #instance

    constructor(){
        if (Database.#instance){
            return Database.#instance;
        }
        this.connection = "Conexion establecida"
        Database.#instance= this;

        query(sql){
            return "Ejecutando: "+sql;
        }
    }
}