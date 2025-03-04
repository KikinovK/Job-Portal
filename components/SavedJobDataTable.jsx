
import { delete_book_mark_job } from '@/Services/job/bookmark';
import { useRouter } from 'next/router';
import { AiFillDelete } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { setBookMark } from '@/Utils/AppliedJobSlice'
import { toast , ToastContainer } from 'react-toastify';
import CustomDataTable from './ui/CustomDataTable';

import { useTranslation } from 'next-i18next';

export default function SavedJobDataTable() {
    const router = useRouter();
    const bookMarkJobData = useSelector(state => state.AppliedJob.bookMark);

    const dispatch = useDispatch();

    const { t } = useTranslation('savedJobDataTable');
    const { locale } = router;


    const columns = [
        {
            name: t('apply_date'),
            selector: row => new Date(`${row?.job?.createdAt}`).toLocaleDateString('en-GB'),
        },
        {
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
            name: t('action'),
            cell: row => <button onClick={() => handleDelete(row?._id)} className='md:px-2 md:py-2 px-1 py-1 text-xl text-red-600 hover:text-white my-2 hover:bg-red-600 border border-red-600   rounded transition-all duration-700  '><AiFillDelete/></button>
        },
        {
            name: '',
            cell: row => <button onClick={() => router.push(`/frontend/jobDetails/${row?.job?._id}`)} className='md:px-2 md:py-2 px-1 py-1 text-xs text-indigo-600 hover:text-white my-2 hover:bg-indigo-600 border border-indigo-600   rounded transition-all duration-700  '>{t('view_detail')}</button>,
        },
    ];

    const handleDelete = async  (id) => {
        const res =  await delete_book_mark_job(id, locale);
        if(res.success) {
            dispatch(setBookMark(bookMarkJobData.filter(item => item?._id !== id)))
            toast.success(res.message);
            return
        }
        else{
          return  toast.error(res.message);
        }
    }


    return (
        <>
            <CustomDataTable
                columns={columns}
                data={bookMarkJobData}
                title={`${t('total_saved_jobs')} ${bookMarkJobData?.length}`}
                searchPlaceholder={t('search_placeholder')}
            />


            <ToastContainer/>
        </>
    )
}
