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
        case 'GET':

            await getApplicationDetail(req, res);

            break;
        default:
            res.status(400).json({ success: false, message: i18next.t('error_request') });
    }
}



const getApplicationDetail = async (req, res) => {
    const data = req.query;
    const id = data?.id;

    if (!id) return res.status(400).json({ success: false, message: i18next.t('error_logirn') })

    try {
        const getApplicationDetails = await AppliedJob.findById(id).populate('job').populate('user')
        return res.status(200).json({ success: true, data: getApplicationDetails })
    } catch (error) {
        console.log('Error in getting a specifed Job job (server) => ', error);
        return res.status(403).json({ success: false, message: i18next.t('error_retry_login') })
    }
}
