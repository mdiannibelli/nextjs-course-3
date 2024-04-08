import prisma from "@/lib/prisma";
import bcrypt from 'bcryptjs'

export const signInEmailPassword = async(email:string, password:string) => {
    if(!email || !password) return null;

    const user = await prisma.user.findUnique({where: {email}})

    // Si el usuario no existe crealo en la base de datos
    if(!user) {
        const dbUser = await createUser(email, password);
        return dbUser;
    }

    //Si el usuario existe compara que la contraseña haga match con la contraseña de la db
    if(!bcrypt.compareSync(password, user.password ?? '')) {
        // Si no hacen match
        return null
    } 
    // Si hace match y lo encuentra en la base de datos
    return user;
}

const createUser = async(email:string, password:string) => {
    const user = await prisma.user.create({
        data: {
            email: email,
            password: bcrypt.hashSync(password),
            name: email.split('@')[0]
        }
    })
    return user;
}