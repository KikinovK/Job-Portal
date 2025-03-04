import ConnectDB from '@/DB/connectDB';
import validateToken from '@/middleware/tokenValidation';
import Job from '@/models/Job';
import Joi from 'joi';

import i18next from '@/i18n_backend';


const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    user: Joi.required(),
    email: Joi.string().email().required(),
    company: Joi.string().required(),
    job_category: Joi.string().required(),
    job_type: Joi.string().required(),
    job_experience: Joi.string().required(),
    job_vacancy: Joi.number().required(),
    job_deadline: Joi.date().required(),
    salary: Joi.number().required(),
});


export default async (req, res) => {
    await ConnectDB();

    const lng = req.headers['accept-language'] || (
        Array.isArray(i18next.options.fallbackLng)
            ? i18next.options.fallbackLng[0]
            : i18next.options.fallbackLng
    );
    i18next.changeLanguage(lng);

    const { method } = req;
    switch (method) {
        case 'POST':
            await validateToken(req, res, async () => {
                await postAJob(req, res);
            });
            break;
        default:
            res.status(400).json({ success: false, message: i18next.t('error_request') });
    }
}

const postAJob =  async (req, res) => {
    await ConnectDB();
    const data = req.body;
    const { user ,title,description , salary , company , email , job_category , job_type , job_experience , job_vacancy , job_deadline } = data;
    const { error } = schema.validate({ user ,title,description , salary , company , email , job_category , job_type , job_experience , job_vacancy , job_deadline });

    if (error) return res.status(401).json({ success: false, message: error.details[0].message.replace(/['"]+/g, '') });

    try {
        const creatingUser =  await Job.create({user , title,description , salary , company , email , job_category , job_type , job_experience , job_vacancy , job_deadline });
        return res.status(200).json({ success: true, message: i18next.t('job_posted_successfully') })
    } catch (error) {
        console.log('Error in posting a job (server) => ', error);
        return res.status(500).json({ success: false, message: i18next.t('error_retry_login') })
    }
}
