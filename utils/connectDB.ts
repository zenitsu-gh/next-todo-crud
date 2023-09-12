import prisma from '../prisma'

export const connectDB = async () => {
    try {
        await prisma.$connect()
        console.log('DB connected successfully')
    } catch (err) {
        console.log('Error connecting DB', err)
    }
}