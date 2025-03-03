import { get_all_applications } from '@/Services/job';
import ApplicationsDataTable from '@/components/ApplicationsDataTable'
import NavBar from '@/components/NavBar'
import Cookies from 'js-cookie';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { InfinitySpin } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import useSWR from 'swr';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function PostedJobsDetails() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const { id } = router.query;
    const user = useSelector(state => state?.User?.userData)
    const userId = user?._id

    const [application, setApplication] = useState([]);

    const { locale } = router;
    const { t } = useTranslation('common');

    useEffect(() => {
        if (!userId || !Cookies.get('token')) {
            router.push('/auth/login')
        }
    }, [user, userId, Cookies])

    const { data, error , isLoading } = useSWR(
        id ? '/get-all-Application' : null,
        () => get_all_applications(id, locale)
    );

     useEffect(() => {
        if(data) setApplication(data?.data)
    }, [data])

    if(error) toast.error(error)

    return (
        <>

            {
                isLoading ? (

                    <div className='bg-gray w-full h-screen flex items-center flex-col justify-center'>
                        <InfinitySpin width='200' color="#4f46e5" />
                        <p className='text-xs uppercase'>{t('loading')}.</p>
                    </div>
                ) : (
                    <>
                        <NavBar />
                        <div className='w-full  pt-20'>
                            <div className='w-full h-20 bg-gray-50 text-indigo-600 font-bold flex items-center justify-center flex-col'>
                                <h1 className='text-3xl'>{t('detailPostedJob:title')}</h1>
                            </div>
                            <div className='w-full h-full px-4 py-4 flex  overflow-y-auto  items-start justify-center flex-wrap'>
                                <ApplicationsDataTable application={application}  />
                            </div>
                        </div>
                    </>
                )

            }

        </>
    )
}

export async function getStaticProps({ locale }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common', 'navbar', 'detailPostedJob', 'applicationsDataTable', 'table'])),
      },
    };
  }

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: 'blocking',
    };
}
