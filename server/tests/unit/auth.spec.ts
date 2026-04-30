import argon2 from "argon2";
import jwt from "jsonwebtoken";
import UserRepository from "../../src/modules/user/userRepository";
import { describe } from "node:test";
import type { Request, Response } from "express";

jest.mock("../../src/modules/user/userRepository")
jest.mock("jsonwebtoken")
jest.mock("argon2")


function MockResponse() {
    return {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
        cookie: jest.fn().mockReturnThis(),
        clearCookie: jest.fn().mockReturnThis(),
    } as unknown as Response
}

describe("Testing login authentification", () => {
    it("Login successfull", () => {
        const req = {
            body: {
                email: "toto@gmail.com",
                password: "123456!"
            }
        } as Request;

        const res = MockResponse();
        (UserRepository.findByEmail as jest.Mock).mockResolvedValue({
            email: "toto@gmail.com",
            id: 1
        })
                
    })

})