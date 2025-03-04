import ConnectDB from '@/DB/connectDB';
import validateToken from '@/middleware/tokenValidation';
import ApplyJob from '@/models/ApplyJob';

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
            await validateToken(req, res, async () => {
                await getAppliedJobs(req, res);
            });
            break;
        default:
            res.status(400).json({ success: false, message: i18next.t('error_request') });
    }
}



const getAppliedJobs =  async (req, res) => {
    await ConnectDB();

    const userId = req.query.id;

    if(!userId) return res.status(400).json({ success: false, message: i18next.t('error_login') })

    try {
        const gettingAppliedJobs  = await ApplyJob.find({user : userId}).populate('user').populate('job');
        return res.status(200).json({ success: true, data : gettingAppliedJobs })
    } catch (error) {
        console.log('Error in getting applied  job (server) => ', error);
        return res.status(500).json({ success: false, message: i18next.t('error_retry_login') })
    }
}
