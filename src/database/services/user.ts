// const { sqlz, User, EventTable } = require('../controllers/index.ts');
import { sqlz, User, EventTable } from '../controllers/index';

interface user {
    name: string,
    status: number,
    number: string
}

class Users {

    async getALl(user: user): Promise<user[]> {

        return [user];
    }

    async create(user: user): Promise<user> {


        return user;
    }

    async update(user: user): Promise<user> {

        return user;
    }
}