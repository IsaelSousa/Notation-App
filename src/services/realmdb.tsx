import Realm, { ObjectSchema } from 'realm';
import { Image, Notation } from '../models/types';


const schema: ObjectSchema = {
    name: 'notation',
    properties: {
        id: 'string',
        message: 'string',
        image: 'imageModel?',
        createAt: 'date',
        audio: 'string?'
    },
    primaryKey: 'id'
}

const imageSchema: ObjectSchema = {
    name: 'imageModel',
    properties: {
        path: 'string',
        height: 'int',
        width: 'int',
        mime: 'string',
    }
}

class RealmDb {
    private realm: Realm;

    constructor() {
        this.realm = new Realm({ schema: [schema, imageSchema] });
    }

    public addData(data: Notation) {
        this.realm.write(() => {
            this.realm.create(schema.name, data);
        })
    }

    public getAllData(): Notation[] {
        var data: Notation[] = [];

        this.realm.objects(schema.name)
        .forEach(item => {
            var itemResp = (item.toJSON()) as Notation;
            if (itemResp.image) {
                data.push({
                    id: itemResp.id,
                    message: itemResp.message,
                    createAt: new Date(),
                    image: {
                        height: itemResp.image.height,
                        mime: itemResp.image.mime,
                        path: itemResp.image.path,
                        width: itemResp.image.width
                    }
                })
            } else {
                data.push({
                    id: itemResp.id,
                    message: itemResp.message,
                    createAt: new Date()
                })
            }
        });

        return data;
    }

    public deleteData(id: string) {
        const data = this.realm.objectForPrimaryKey(schema.name, id);
        this.realm.write(() => {
            this.realm.delete(data);
        });
    }

    public deleteAllData () {
        this.realm.write(() => {
            this.realm.deleteAll();
        });
    }
}

export default new RealmDb();