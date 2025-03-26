import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import CustomDataTable from './ui/CustomDataTable';

import { useTranslation } from 'next-i18next';

export default function AppliedJobDataTable() {
    const router = useRouter();
    const appliedJobData = useSelector(state => state.AppliedJob.appliedJob)

    const [Data, setData] = useState([]);


    const { t } = useTranslation('appliedJobDataTable');


    useEffect(() => {
        setData(appliedJobData)
    }, [])




    const columns = [
        {
            name: t('apply_date'),
            selector: row => new Date(`${row?.job?.createdAt}`).toLocaleDateString('en-GB'),
        },
        {
            title: t('company'),
            name: t('company'),
            selector: row => row?.job?.company,
        },
        {
            name: t('job_title'),
            selector: row => row?.job?.title,
        },
        {
            name: t('job_salary'),
            selector: row => '$' + row?.job?.salary,
        },
        {
            name: t('status'),
            selector: row => <p className={`uppercase font-semibold ${row?.status === "approved" ? "text-green-500" : ""}  ${row?.status === "rejected" ? "text-red-600" : ""}`}>{row?.status}</p> ,
        },
        {
            name: t('action'),
            cell: row => <button onClick={() => router.push(`/frontend/jobDetails/${row?.job?._id}`)} className='md:px-2 md:py-2 px-1 py-1 text-xs text-indigo-600 hover:text-white my-2 hover:bg-indigo-600 border border-indigo-600   rounded transition-all duration-700  '>{t('view_detail')}</button>
        },
    ];

    return (
        <>
            <CustomDataTable
                columns={columns}
                data={Data}
                title={`${t('total_applied_jobs')} ${Data?.length}`}
                searchPlaceholder={t('search_placeholder')}
            />
        </>
    )
}
