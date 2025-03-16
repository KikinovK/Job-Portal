import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import useSWR from 'swr'
import { get_application_details } from '@/Services/job';
import NavBar from '@/components/NavBar';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Loading from '@/components/Loading';


export default function ApplicationsDetail() {

    const router = useRouter();
    const { id } = router.query;
    const { locale } = router;
    const { t, ready } = useTranslation('common');

    const user = useSelector(state => state?.User?.userData)
    const userId = user?._id

    useEffect(() => {
        if (!userId || !Cookies.get('token')) {
            router.push('/auth/login')
        }
    }, [user, userId, Cookies])

    const { data, error, isLoading } = useSWR(
        id ? '/get-application-details' : null,
        () => get_application_details(id, locale)
    )

    if (error) return toast.error(error) && router.push('/frontend/postedJob')




    return (
        <Loading isLoading={isLoading || !ready} locale={locale}>
            <NavBar />
            <div className='w-full px-4 flex flex-wrap  pt-20 '>
                <div className='w-full h-32 bg-gray-50 text-indigo-600 font-bold flex items-center justify-center flex-col'>
                    <h1 className='text-3xl'>{t('applicationDetail:title')}</h1>
                </div>
                <div className='flex flex-col md:flex-row justify-center md:justify-around items-center w-full h-32 px-4'>
                    <div className='flex py-2'>
                        <h1 className='text-base font-semibold px-2 '>{t('applicationDetail:name')}</h1>
                        <p className='text-sm px-2'>{data?.data?.name}</p>
                    </div>
                    <div className='flex py-2'>
                        <h1 className='text-base font-semibold px-2 '>{t('applicationDetail:email')}</h1>
                        <p className='text-sm px-2'>{data?.data?.email}</p>
                    </div>
                    <div className='flex py-2'>
                        <h1 className='text-base font-semibold px-2 '>{t('applicationDetail:status')}</h1>
                        <p className='text-sm px-2 uppercase font-extrabold'>{data?.data?.status}</p>
                    </div>
                </div>
            </div>


        </Loading>
    )
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'navbar', 'applicationDetail'])),
        },
    };
}


export async function getStaticPaths() {
    return {
        paths: [],
        fallback: 'blocking',
    };
}
