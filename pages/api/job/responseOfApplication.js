import ConnectDB from '@/DB/connectDB';
import validateToken from '@/middleware/tokenValidation';
import AppliedJob from '@/models/ApplyJob';

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
        case 'PUT':
            await validateToken(req, res, async () => {
                await change_application_status(req, res);
            });
            break;
        default:
            res.status(400).json({ success: false, message: i18next.t('error_request') });
    }
}


const change_application_status =  async (req, res) => {
    await ConnectDB();
    const data = req.body;
    const {status, id} = data;


    if (!id) return res.status(400).json({ success: false, message: i18next.t('error_login') })


    try {
        const gettingjobs = await AppliedJob.findByIdAndUpdate(id, { status }, { new: true })
        return res.status(200).json({ success: true,  message  : i18next.t('status_updated_successfully'), data: gettingjobs })
    } catch (error) {
        console.log('Error in getting a specifed Job job (server) => ', error);
        return res.status(403).json({ success: false, message: i18next.t('error_retry_login') })
    }
}
