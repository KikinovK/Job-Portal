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

    // const [search, setSearch] = useState('');
    // const [filteredData, setFilteredData] = useState([]);

    // useEffect(() => {
    //     setFilteredData(Data);
    // }, [Data])




    const columns = [
        {
            name: t('apply_date'),
            selector: row => new Date(`${row?.job?.createdAt}`).toLocaleDateString('en-GB'),
        },
        {
            title: t('company'),
            name: 'Company',
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




    // useEffect(() => {
    //     if (search === '') {
    //         setFilteredData(Data);
    //     } else {
    //         setFilteredData(Data?.filter((item) => {
    //             const itemData = item?.job?.company.toUpperCase();
    //             const textData = search.toUpperCase();
    //             return itemData.indexOf(textData) > -1;
    //         }))
    //     }


    // }, [search, Data])


    return (
        <>
            <CustomDataTable
                columns={columns}
                data={Data}
                title={`${t('total_applied_jobs')} ${Data?.length}`}
                searchPlaceholder={t('search_placeholder')}
            />
{/*
                        <DataTable
                            subHeaderAlign={"right"}
                            columns={columns}
                            data={filteredData}
                            keyField="id"
                            pagination
                            title={`Total Applied Jobs: ${Data?.length}`}
                            fixedHeader
                            fixedHeaderScrollHeight='79%'
                            selectableRows
                            selectableRowsHighlight
                            subHeader
                            persistTableHead
                            subHeaderComponent={
                                <input className='w-60  py-2 px-2  outline-none  border-b-2 border-indigo-600' type={"search"}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder={"Search with company name..."} />
                            }
                            className="h-screen bg-white"
                            noDataComponent={<MessageDataTable>{t('table:no_data_message')}</MessageDataTable>}
                        /> */}


        </>
    )
}
