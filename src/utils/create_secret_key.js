import crypto from 'crypto';
const create_secret_key = () => {
    return crypto.randomBytes(64).toString('hex');
}
export default create_secret_key;