import ConnectDB from '@/DB/connectDB';
import User from '@/models/User';
import Joi from 'joi';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import i18next from '@/i18n_backend';


const schema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'validation.email_invalid',
        'string.empty': 'validation.email_required',
        'any.required': 'validation.email_required',
      }),
    password: Joi.string().required().messages({
        'string.empty': 'validation.password_required',
        'any.required': 'validation.password_required',
      }),
});




export default async (req, res) => {
    await ConnectDB();

    const lng = req.query.lng || (Array.isArray(i18next.options.fallbackLng) ? i18next.options.fallbackLng[0] : i18next.options.fallbackLng);
    i18next.changeLanguage(lng);

    const { email, password } = req.body;
    const { error } = schema.validate({ email, password });

    if (error) return res.status(401).json({ success: false, message: i18next.t(error.details[0].message) });

    try {
        const checkUser = await User.findOne({ email });
        if (!checkUser) return res.status(401).json({ success: false, message: i18next.t('account_not_found') });

        const isMatch = await compare(password, checkUser.password);
        if (!isMatch) return res.status(401).json({ success: false, message: i18next.t('incorrect_password') });

        const token = jwt.sign({ id: checkUser._id, email: checkUser.email }, process.env.JWT_SECREAT, { expiresIn: '1d' });
        const finalData = {token , user : checkUser}
        return res.status(200).json({ success: true, message: i18next.t('login_successfull'),  finalData})

    } catch (error) {
        console.log('Error in register (server) => ', error);
        return res.status(500).json({ success: false, message: i18next.t('error') })
    }
}
