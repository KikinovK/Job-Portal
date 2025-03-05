import { change_application_status } from '@/Services/job';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import CustomDataTable from './ui/CustomDataTable';

import { useTranslation } from 'next-i18next';

export default function ApplicationsDataTable({ application }) {

    const router = useRouter();
    const { locale } = router;
    const { t } = useTranslation('applicationsDataTable');


    const [Data, setData] = useState([]);


    useEffect(() => {
        setData(application)
    }, [application])


    const handleAcceptStatus = async (id) => {
        const data = { id, status: "approved" }
        const res = await change_application_status(data, locale);
        if (res.success) {
            router.push('/frontend/postedJob')
        } else {
            toast.error(res.message)
        }

    }

    const handleRejectStatus = async (id) => {
        const data = { id, status: "rejected" }
        const res = await change_application_status(data, locale);
        if (res.success) {
            router.push('/frontend/postedJob')
        } else {
            toast.error(res.message)
        }
    }

    const handleDownloadCV = async (name) => {
        const fileUrl = `/uploads/${name}`;
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = 'cv.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }



    const columns = [
        {
            name: t('name'),
            selector: row => row?.user?.name,
        },
        {
            name: t('email'),
            selector: row => row?.user?.email,
        },
        {
            name: t('status'),
            selector: row => <p className={`uppercase font-semibold ${row?.status === "approved" ? "text-green-500" : ""}  ${row?.status === "rejected" ? "text-red-600" : ""}`}>{row?.status}</p>,
        },
        {
            name: t('cv'),
            selector: row => <button onClick={() => handleDownloadCV(row?.cv)} className=' w-20 py-2 text-xs text-indigo-600 hover:text-white my-2 hover:bg-indigo-600 border border-indigo-600 rounded transition-all duration-700'>{t('download_cv')}</button>
        },
        {
            name: t('status'),
            selector: row => <p className={`uppercase font-semibold ${row?.status === "approved" ? "text-green-500" : ""}  ${row?.status === "rejected" ? "text-red-600" : ""}`}>{row?.status}</p>,
        },
        {
            name: t('action'),
            cell: row => (
                <div className='flex items-center justify-start w-72 h-20'>
                    <button onClick={() => router.push(`/frontend/applicationDetail/${row?._id}`)} className=' w-20 py-2 mx-2 text-xs text-indigo-600 hover:text-white my-2 hover:bg-indigo-600 border border-indigo-600 rounded transition-all duration-700'>{t('details_button')}</button>
                    <button onClick={() => handleAcceptStatus(row?._id)} className=' w-20 py-2 mx-2 text-xs text-green-600 hover:text-white my-2 hover:bg-green-600 border border-green-600 rounded transition-all duration-700'>{t('approved_button')}</button>
                    <button onClick={() => handleRejectStatus(row?._id)} className=' w-20 py-2 mx-2 text-xs text-red-600 hover:text-white my-2 hover:bg-red-600 border border-red-600 rounded transition-all duration-700'>{t('reject_button')}</button>
                </div>
            )
        },

    ];


    return (
        <>
            <CustomDataTable
                columns={columns}
                data={Data}
                title={`${t('total_applications_title')} ${Data?.length}`}
                searchPlaceholder={t('search_placeholder')}
            />


        </>
    )
}
