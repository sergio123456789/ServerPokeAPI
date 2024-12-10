class Pokemon {
    constructor(id, name, type, level, trainerId) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.level = level;
        this.trainerId = trainerId;
        this.createdAt = new Date();  
    }
}
module.exports = Pokemon;