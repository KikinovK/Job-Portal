import React from 'react';
import { InfinitySpin } from 'react-loader-spinner';

const translations = {
  en: { loading: 'Loading Resources Hold Tight...' },
  uk: { loading: 'Завантаження ресурсів, будь ласка, зачекайте...' },
};

export default function Loading ({ isLoading, locale, children }) {
  const t = (key) => translations[locale]?.[key] || key;

  return isLoading ? (
    <div className='bg-gray w-full h-screen flex items-center flex-col justify-center'>
        <InfinitySpin width='200' color="#4f46e5" />
        <p className='text-xs uppercase'>{t('loading')}</p>
    </div>
  ) : (
      children
  );
};
