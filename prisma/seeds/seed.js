// prisma/seeds/seed.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

const prisma = new PrismaClient();

async function main() {
    try {
        // First, delete ALL existing admin accounts
        console.log('Deleting existing admin accounts...');
        await prisma.admin.deleteMany({});
        console.log('Existing admin accounts deleted.');

        // Hash the new password
        const hashedPassword = await hashPassword('Tubelight@01');
        
        // Create new admin account with hardcoded values to ensure update
        const admin = await prisma.admin.create({
            data: {
                email: 'Vipnumbershop.india@gmail.com',
                password: hashedPassword
            }
        });

        console.log('New admin account created successfully with email:', admin.email);
        
        // Verify the update
        const verifyAdmin = await prisma.admin.findUnique({
            where: {
                email: 'Vipnumbershop.india@gmail.com'
            }
        });
        
        if (verifyAdmin) {
            console.log('Verified: Admin account exists with new email');
        } else {
            console.log('Error: Admin account not found after creation');
        }
    } catch (error) {
        console.error('Error in seed script:', error);
        throw error;
    }
}

main()
    .catch((e) => {
        console.error('Error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });