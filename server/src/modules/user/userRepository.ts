import type { ResultSetHeader } from "mysql2";
import client from "../../database/client";


export interface IUser{
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    hashPassword: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}
class UserRepository{
    async create(user: Omit<IUser, "id" | "createdAt" | "updatedAt"> ){
        const [result] = await client.query<ResultSetHeader>(
            "insert into users (email, firstName, lastName, password) values (?, ?, ?, ?)",
            [user.email, user.firstName, user.lastName, user.hashPassword]
        )
        return result.insertId;
    }

    async readAll() {
        const [rows] = await client.query("select * from users");
        return rows as IUser[];
    }

    async read(id: number) {
        const [rows] = await client.query("select * from users where id = ?", [id]);
        return rows as IUser[];
    }

    async update(user: Omit<IUser, "createdAt" | "updatedAt">) {
        const [result] = await client.query<ResultSetHeader>(
            "update users set email = ?, firstName = ?, lastName = ?, password = ? where id = ?",
            [user.email, user.firstName, user.lastName, user.hashPassword, user.id]
        );
        return result.affectedRows;
    }

    async delete(id: number) {
        const [result] = await client.query<ResultSetHeader>(
            "delete from users where id = ?",
            [id]
        );
        return result.affectedRows;
    }

    async findByEmail(email: string) {
        const [rows] = await client.query("select * from users where email = ?", [email]);
        return rows as IUser[];
    }
}
export default UserRepository;