import ConnectDB from '@/DB/connectDB';
import validateToken from '@/middleware/tokenValidation';
import bookMarkJob from '@/models/Bookmark';
import Joi from 'joi';
import i18next from '@/i18n_backend';


const schema = Joi.object({
    job: Joi.string().required().messages({
        'string.empty': 'validation.job_required',
        'any.required': 'validation.job_required'
    }),
    user: Joi.string().required().messages({
        'string.empty': 'validation.user_required',
        'any.required': 'validation.user_required'
    }),
});


export default async (req, res) => {
    await ConnectDB();


    const lng = req.headers['accept-language'] || (
        Array.isArray(i18next.options.fallbackLng)
            ? i18next.options.fallbackLng[0]
            : i18next.options.fallbackLng
    );
    i18next.changeLanguage(lng);

    switch (req.method) {
        case "POST":
            await validateToken(req, res, async () => {
                await bookmark_my_job(req, res);
            });
            break;
        case "GET":
            await validateToken(req, res, async () => {
                await getBookmark_jobs(req, res);
            });
            break;
        case "DELETE":
            await validateToken(req, res, async () => {
                await delete_bookmark_job(req, res);
            });
            break;
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}



export const bookmark_my_job = async (req, res) => {
    await ConnectDB();
    const data = req.body;
    const { job, user } = data;

    const { error } = schema.validate({ job, user });

    if (error) return res.status(401).json({ success: false, message: i18next.t(error.details[0].message) });

    try {
        const checkAlreadyBookMarked = await bookMarkJob.findOne({ job, user })
        if (checkAlreadyBookMarked) return res.status(401).json({ success: false, message: i18next.t('job_already_bookmarked') });

        const bookmarkingJob = await bookMarkJob.create({ job, user });
        return res.status(200).json({ success: true, message: i18next.t('job_bookmarked_successfully') });
    } catch (error) {
        console.log('Error in booking marking a job (server) => ', error);
        return res.status(500).json({ success: false, message: i18next.t('error_retry_login') })
    }
}


export const getBookmark_jobs = async (req, res) => {
    const userId = req.query.id;

    if (!userId) return res.status(400).json({ success: false, message: i18next.t('error_login') })
    try {
        const getBookMark = await bookMarkJob.find({ user: userId }).populate('job').populate('user')
        return res.status(200).json({ success: true, message: i18next.t('job_bookmarked_successfully'), data: getBookMark })
    } catch (error) {
        console.log('Error in getting book mark Job (server) => ', error);
        return res.status(500).json({ success: false, message: i18next.t('error') })
    }
}



export const delete_bookmark_job = async (req, res) => {
    const id = req.body;
    if (!id) return res.status(400).json({ success: false, message: i18next.t('error_login') })
    try {

        const deleteBookmark = await bookMarkJob.findByIdAndDelete(id)
        return res.status(200).json({ success: true, message: i18next.t('job_removed_successfully') })
    } catch (error) {
        console.log('Error in deleting book mark Job (server) => ', error);
        return res.status(500).json({ success: false, message: i18next.t('error') })
    }
}
