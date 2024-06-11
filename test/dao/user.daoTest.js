import mongoose from "mongoose";
import UserServiceDao from "../../src/services/dao/mongo/users.serivces.js";
import chai from "chai";

mongoose.connect("mongodb://localhost:27017/tests?retryWrites=true&w=majority");
const expect = chai.expect;

describe('first', () => {
    before(function () {
        this.usersDao = new UserServiceDao()
    });

    beforeEach(async function () {
        this.timeout(5000);
        await mongoose.connection.collection('users').drop().catch(err => {
            if (err.code === 26) {
                console.log('Colección no encontrada, saltando el drop.');
            } else {
                throw err;
            }
        });
    });

    it('Los usuarios deben ser devueltos en formato Array', async function () {
        const emptyArray = [];
        const result = await this.usersDao.userList();

        expect(result).to.be.deep.equal(emptyArray);
        expect(Array.isArray(result)).to.be.ok;
        expect(Array.isArray(result)).to.be.equal(true);
        expect(result.length).to.be.deep.equal(emptyArray.length);
    });

    it('El usuario debe ser devuelto en formato Array', async function () {
        const id = '662c27e92845f4e43b13b3ec'
        const emptyArray = []
        const result = await this.usersDao.userById(id)
        expect(result).to.be.deep.equal(emptyArray);
        expect(Array.isArray(result)).to.be.ok;
        expect(Array.isArray(result)).to.be.equal(true);
        expect(result.length).to.be.deep.equal(emptyArray.length);
    })

    let tempId = mongoose.isValidObjectId()
    it('El usuario debe guardarse correctamente en la base de datos.', async function () {
        const testUser = {
            first_name: "Roberto",
            last_name: "Carlos",
            age: 25,
            email: "carlitos@gmail.com",
            password: "123123",
            role: "admin"
        };

        const result = await this.usersDao.userSave(testUser);
        tempId = result._id
        console.log(tempId);
        expect(result._id).to.be.ok;
    });

    // it('El Usuario debe poder actualizar sus datos en la base de datos', async function () {
    //     const testUpdateUser = {
    //         first_name: 'Juan'
    //     }
    //     console.log('2', tempId);
    //     const result = await this.usersDao.updateInfo(tempId,testUpdateUser)
    //     console.log(result);
    // })

    afterEach(async function () {
        await mongoose.connection.collection('users').drop().catch(err => {
            if (err.code === 26) {
                console.log('Colección no encontrada, saltando el drop.');
            } else {
                throw err;
            }
        });
    });
});