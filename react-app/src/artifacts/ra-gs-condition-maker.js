
export class RaGsConditionMaker {

    static whereMaker(data, key, value, type){
        if(!data.where){
            data.where = {}
        }
        if (!data.where[type]){
            data.where[type] = {}
        }
        data.where[type][key] = value;
        return data;
    }

    static equal(data, key, value){
        return this.whereMaker(data, key, value, "equal");
    }

    static like(data, key, value){
        return this.whereMaker(data, key, "%" + value + "%", "like");
    }

    static order(data, key, value){
        return this.whereMaker(data, key, value, "order");
    }
}