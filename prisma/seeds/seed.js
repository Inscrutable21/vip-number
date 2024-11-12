// prisma/seeds/seed.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

// Check for required environment variables
function checkRequiredEnvVars() {
    const required = ['ADMIN_EMAIL', 'ADMIN_PASSWORD'];
    const missing = required.filter(key => !process.env[key]);
    
    if (missing.length > 0) {
        throw new Error(
            `Missing required environment variables: ${missing.join(', ')}\n` +
            'Please make sure these are defined in your .env file'
        );
    }
}

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

const prisma = new PrismaClient();

async function main() {
    try {
        // Verify environment variables are present
        checkRequiredEnvVars();

        // First, delete ALL existing admin accounts
        console.log('Deleting existing admin accounts...');
        await prisma.admin.deleteMany({});
        console.log('Existing admin accounts deleted.');

        // Hash the password from environment variable
        const hashedPassword = await hashPassword(process.env.ADMIN_PASSWORD);
        
        // Create new admin account using environment variables
        const admin = await prisma.admin.create({
            data: {
                email: process.env.ADMIN_EMAIL,
                password: hashedPassword
            }
        });

        console.log('New admin account created successfully with email:', admin.email);
        
        // Verify the update
        const verifyAdmin = await prisma.admin.findUnique({
            where: {
                email: process.env.ADMIN_EMAIL
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