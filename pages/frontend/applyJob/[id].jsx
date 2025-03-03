import NavBar from '@/components/NavBar';
import { apply_job } from '@/Services/job';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import 'react-toastify/dist/ReactToastify.css';

export default function ApplyJob() {
    const router = useRouter()
    const dispatch = useDispatch();
    const { id } = router.query
    const activeUser = useSelector(state => state.User.userData)
    const [formikData, setFormikData] = useState({ name: '', email: activeUser?.email , about: '', job: id, user: activeUser?._id })
    const [file, setFile] = useState(null)
    const [error, setError] = useState({ name: '', email: "", about: '', job: '', user: '', cv: '' });

    const { locale } = router;
    const { t } = useTranslation('applyJob');


    const { name, email, about, job, user } = formikData;

    const handleSubmit = async (e) => {

        e.preventDefault();



        if (!name) {
            setError({ ...error, name: t('name_required_error')})
            return;
        }

        if (!email) {
            setError({ ...error, email: t('email_required_error') })
            return;
        }

        if (!user) {
            return toast.error(t('login_first_error'))
        }

        if (!job) {
            return toast.error(t('follow_apply_process_error'))
        }

        if (!about) {
            setError({ ...error, about: t('about_required_error') })
            return;
        }

        if (!file) {
            setError({ ...error, cv: t('upload_cv_error') })
            return;
        }

        // Check if the file type is PDF
        if (file.type !== 'application/pdf') {
            setError({ ...error, cv: t('upload_pdf_error') })
            return;
        }

        const form = new FormData();
        form.append('name', name);
        form.append('email', email);
        form.append('about', about);
        form.append('job', job);
        form.append('user', user);
        form.append('cv', file);


        const res = await apply_job(form, locale);
        if (res.success) {
            toast.success(t('application_submitted_success'))
            setTimeout(() => {
                router.push('/')
            }, 1000);

        } else {
            toast.error(t('something_went_wrong_error'))
        }
    }

    return (
        <>
            <NavBar />
            <div className='w-full  py-20 flex items-center  justify-center flex-col'>
                <h1 className='text-xl mt-4 uppercase tracking-widest border-b-2 border-b-indigo-600 py-2 font-semibold mb-8 md:text-2xl lg:text-4xl'>{t('enter_your_info')}</h1>
                <form encType="multipart/form-data" onSubmit={handleSubmit} className="sm:w-1/2 w-full px-4 mx-4  h-full" >
                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="title" className='mb-1 text-base font-semibold'>{t('name_label')}</label>
                        <input name='name' onChange={(e) => setFormikData({ ...formikData, name: e.target.value })} type="text" id='title' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder={t('name_placeholder')} />
                        {
                            error.name && <p className="text-sm text-red-500">{error.name}</p>
                        }
                    </div>
                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="email" className='mb-1 text-base font-semibold'>{t('email_label')}</label>
                        <input name='email' value={email} onChange={(e) => setFormikData({ ...formikData, email: e.target.value })} type="email" id='email' className='w-full  py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder={t('email_placeholder')} />
                        {
                            error.email && <p className="text-sm text-red-500">{error.email}</p>
                        }
                    </div>
                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="description" className='mb-1 text-base font-semibold'>{t('about_label')}</label>
                        <textarea name='about' onChange={(e) => setFormikData({ ...formikData, about: e.target.value })} type="description" id='description' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder={t('about_placeholder')} />
                        {
                            error.about && <p className="text-sm text-red-500">{error.about}</p>
                        }
                    </div>
                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="file" className='mb-1 text-base font-semibold'>{t('upload_cv_label')}</label>
                        <input accept="application/pdf" name='cv' onChange={(e) => setFile(e.target.files[0])} type="file" id='file' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder='Enter Email' />
                        {
                            error.cv && <p className="text-sm text-red-500">{error.cv}</p>
                        }
                    </div>

                    <button type="submit" className='w-full py-2 rounded bg-indigo-600 text-white font-semibold tracking-widest'>{t('submit_button')}</button>
                </form>
            </div>
            <ToastContainer />
        </>
    )
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'navbar', 'applyJob'])),
        },
    };
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: 'blocking',
    };
}
