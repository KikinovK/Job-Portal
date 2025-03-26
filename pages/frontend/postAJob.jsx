import NavBar from '@/components/NavBar'
import Select from 'react-select'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { post_job } from '@/Services/job';
import { useRouter } from 'next/router';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import uk from 'date-fns/locale/uk';
import enUS from 'date-fns/locale/en-US';

registerLocale('uk', uk);
registerLocale('en', enUS);


export default function PostAJob() {
    const user = useSelector(state => state.User.userData)
    const router = useRouter();

    const { locale } = router;
    const { t } = useTranslation('postAJob');

    const [formData, setFormData] = useState({ user: user?._id, title: "", salary: 0, email: "", company: "", description: "", job_category: "", job_type: "", job_experience: "", job_vacancy: 0, job_deadline: "" });
    const [error, setError] = useState({ user: "", title: "", salary: "", email: "", company: "", description: "", job_category: "", job_type: "", job_experience: "", job_vacancy: "", job_deadline: "" });

    const handleSubmit = async (e) => {

        e.preventDefault();



        if (!formData.title) {
            setError({ ...error, title: t('title_error') })
            return;
        }

        if (!formData.salary) {
            setError({ ...error, salary: t('salary_error') })
            return;
        }

        if (!formData.email) {
            setError({ ...error, email: t('email_error') })
            return;
        }


        if (!formData.company) {
            setError({ ...error, company: t('company_error') })
            return;
        }
        if (!formData.description) {
            setError({ ...error, description: t('description_error') })
            return;
        }
        if (!formData.job_category) {
            setError({ ...error, job_category: t('job_category_error') })
            return;
        }
        if (!formData.job_type) {
            setError({ ...error, job_type: t('job_type_error') })
            return;
        }
        if (!formData.job_experience) {
            setError({ ...error, job_experience: t('job_experience_error') })
            return;
        }
        if (!formData.job_vacancy) {
            setError({ ...error, job_vacancy: t('job_vacancy_error') })
            return;
        }
        if (!formData.job_deadline) {
            setError({ ...error, job_deadline: "job_deadline Field is required" })
            return;
        }

        if (formData.user == null) {
            return toast.error(t('login_error'));
        }

        const res = await post_job(formData, locale);
        if (res.success) {
            toast.success(res.message);
            setTimeout(() => {
                router.push('/frontend/displayJobs')
            }, 1000)
        }
        else {
            toast.error(res.message);
        }
    }



    const options = [
        { value: 'fulltime', label: t('job_type_fulltime') },
        { value: 'parttime', label: t('job_type_parttime') },
        { value: 'internship', label: t('job_type_internship') },
        { value: 'contract', label: t('job_type_contract') },
    ]


    return (
        <>
            <NavBar />
            <div className='w-full  py-20 flex items-center  justify-center flex-col'>
                <h1 className='text-xl mt-4 uppercase tracking-widest border-b-2 border-b-indigo-600 py-2 font-semibold mb-8 md:text-2xl lg:text-4xl'>{t('enter_job_details')}</h1>
                <form onSubmit={handleSubmit} className="sm:w-1/2 w-full px-4 mx-4  h-full" >
                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="title" className='mb-1 text-base font-semibold'>{t('title_label')}</label>
                        <input onChange={(e) => setFormData({ ...formData, title: e.target.value })} type="text" id='title' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder={t('title_placeholder')} />
                        {
                            error.title && <p className="text-sm text-red-500">{error.title}</p>
                        }
                    </div>
                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="salary" className='mb-1 text-base font-semibold'>{t('salary_label')}</label>
                        <input onChange={(e) => setFormData({ ...formData, salary: e.target.value })} type="number" id='salary' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder={t('salary_placeholder')} />
                        {
                            error.salary && <p className="text-sm text-red-500">{error.salary}</p>
                        }
                    </div>
                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="email" className='mb-1 text-base font-semibold'>{t('email_label')}</label>
                        <input onChange={(e) => setFormData({ ...formData, email: e.target.value })} type="email" id='email' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder={t('email_placeholder')} />
                        {
                            error.email && <p className="text-sm text-red-500">{error.email}</p>
                        }
                    </div>
                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="company" className='mb-1 text-base font-semibold'>{t('company_label')}</label>
                        <input onChange={(e) => setFormData({ ...formData, company: e.target.value })} type="text" id='company' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder={t('company_placeholder')} />
                        {
                            error.company && <p className="text-sm text-red-500">{error.company}</p>
                        }
                    </div>
                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="description" className='mb-1 text-base font-semibold'>{t('description_label')}</label>
                        <textarea onChange={(e) => setFormData({ ...formData, description: e.target.value })} onResize={"none"} type="text" id='description' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder={t('description_placeholder')} />
                        {
                            error.description && <p className="text-sm text-red-500">{error.description}</p>
                        }
                    </div>
                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="jobCategory" className='mb-1 text-base font-semibold'>{t('job_category_label')}</label>
                        <input onChange={(e) => setFormData({ ...formData, job_category: e.target.value })} type="text" id='jobCategory' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder={t('job_category_placeholder')} />
                        {
                            error.job_category && <p className="text-sm text-red-500">{error.job_category}</p>
                        }
                    </div>

                    <Select onChange={(e) => setFormData({ ...formData, job_type: e.value })} placeholder={t('job_type_placeholder')} options={options} />
                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        {
                            error.job_category && <p className="text-sm text-red-500">{error.job_category}</p>
                        }
                    </div>
                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="jobExperience" className='mb-1 text-base font-semibold'>{t('job_experience_label')}</label>
                        <input onChange={(e) => setFormData({ ...formData, job_experience: e.target.value })} type="text" id='jobExperience' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder={t('job_experience_placeholder')} />
                        {
                            error.job_experience && <p className="text-sm text-red-500">{error.job_experience}</p>
                        }
                    </div>
                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="jobva" className='mb-1 text-base font-semibold'>{t('job_vacancy_label')}</label>
                        <input onChange={(e) => setFormData({ ...formData, job_vacancy: e.target.value })} type="number" id='jobva' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder={t('job_vacancy_placeholder')} />
                        {
                            error.job_vacancy && <p className="text-sm text-red-500">{error.job_vacancy}</p>
                        }
                    </div>
                    <div className='w-full mb-4  flex flex-col items-start justify-center'>
                        <label htmlFor="jobdate" className='mb-1 text-base font-semibold'>{t('job_deadline_label')}</label>
                        <DatePicker
                            id='jobdate'
                            selected={formData.job_deadline}
                            onChange={(date) => setFormData({ ...formData, job_deadline: date })}
                            locale={locale}
                            dateFormat="dd/MM/yyyy"
                            placeholderText={t('job_deadline_placeholder')}
                            className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
                            wrapperClassName="w-full"
                        />
                        {
                            error.job_deadline && <p className="text-sm text-red-500">{error.job_deadline}</p>
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
      ...(await serverSideTranslations(locale, ['common', 'navbar', 'postAJob'])),
    },
  };
}
