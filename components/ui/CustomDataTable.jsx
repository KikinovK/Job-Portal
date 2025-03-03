import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useTranslation } from 'next-i18next';

const CustomDataTable = ({ columns, data, title, searchPlaceholder }) => {
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const { t } = useTranslation('table');

    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    useEffect(() => {
        if (search === '') {
            setFilteredData(data);
        } else {
            setFilteredData(data.filter(item => {
                const itemData = item?.job?.company?.toUpperCase() || '';
                return itemData.includes(search.toUpperCase());
            }));
        }
    }, [search, data]);

    return (
        <DataTable
            subHeaderAlign="right"
            columns={columns}
            data={filteredData}
            keyField="id"
            pagination
            title={title}
            fixedHeader
            fixedHeaderScrollHeight='79%'
            selectableRows
            selectableRowsHighlight
            subHeader
            persistTableHead
            subHeaderComponent={
                <input
                    className='w-60 py-2 px-2 outline-none border-b-2 border-indigo-600'
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={searchPlaceholder}
                />
            }
            className="h-screen bg-white"
            noDataComponent={<div className="p-6">{t('no_data_message')}</div>}
            paginationComponentOptions={{
              rowsPerPageText: t('pagination.rows_per_page_text'),
              rangeSeparatorText: t('pagination.range_separator_text'),
            }}
        />
    );
};

export default CustomDataTable;
