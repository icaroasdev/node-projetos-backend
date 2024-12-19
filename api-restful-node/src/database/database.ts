import sqlite3 from 'sqlite3';
import type { Database } from 'sqlite3';

export interface User {
    id?: number;
    name: string;
    email: string;
}

export class DabaseService{
    private db: Database;

    constructor(){
        this.db = new sqlite3.Database(':memory:', (err) => {
            if (err) {
                console.error(err.message);
            }else{
                this.createTables();
            }
        });
    }

    private createTables(): void{
        const sql = `
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL
            )
        `;
        this.db.run(sql);
    }

    async createUser(user: User): Promise<number>{

        return new Promise((resolve, reject) => {

            const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';

            this.db.run(sql, [user.name, user.email], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });

    }

    async gerUsers(): Promise<User[]>{

        return new Promise((resolve, reject) => {

            const sql = 'SELECT * FROM users';

            this.db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows as User[]);
                }
            });
        })
    }

}


