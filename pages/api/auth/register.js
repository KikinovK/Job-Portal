import ConnectDB from '@/DB/connectDB';
import User from '@/models/User';
import Joi from 'joi';
import { hash } from 'bcryptjs';
import i18next from '@/i18n_backend';


const schema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'validation.email_invalid',
        'string.empty': 'validation.email_required',
        'any.required': 'validation.email_required',
      }),
    password: Joi.string().min(8).required().messages({
        'string.min': 'validation.password_min',
        'string.empty': 'validation.password_required',
        'any.required': 'validation.password_required',
      }),
    name: Joi.string().required().messages({
        'string.empty': 'validation.name_required',
        'any.required': 'validation.name_required',
      })
});


export default async (req, res) => {
    await ConnectDB();

    const lng = req.query.lng || (Array.isArray(i18next.options.fallbackLng) ? i18next.options.fallbackLng[0] : i18next.options.fallbackLng);

    i18next.changeLanguage(lng);

    const { email, password, name } = req.body;
    const { error } = schema.validate({ email, password, name });

    if (error) return res.status(401).json({ success: false, message: i18next.t(error.details[0].message) });

    try {
        const ifExist = await User.findOne({ email });

        if (ifExist) {
            return res.status(406).json({ success: false, message: i18next.t('user_already_exist') });
        }

        else {
            const hashedPassword = await hash(password, 12)
            const createUser = await User.create({ email, name, password: hashedPassword });
            return res.status(201).json({ success: true, message: i18next.t('account_created_successfully') });
        }
    } catch (error) {
        console.log('Error in register (server) => ', error);
        return res.status(500).json({ success: false, message: i18next.t('error') })
    }
}
