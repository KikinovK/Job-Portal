import ConnectDB from '@/DB/connectDB';
import Job from '@/models/Job';

import i18next from '@/i18n_backend';


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
        case 'GET':
            await getAllJobs(req, res);
            break;
        default:
            res.status(400).json({ success: false, message: i18next.t('error_request') });
    }
}


const getAllJobs = async (req, res) => {
    await ConnectDB();

    try {
        const gettingjobs = await Job.find({}).populate('user');
        return res.status(200).json({ success: true, data: gettingjobs })
    } catch (error) {
        console.log('Error in getting a job (server) => ', error);
        return res.status(500).json({ success: false, message: i18next.t('error_retry_login') })
    }
}
