'use client';
import Link from 'next/link';
import { usePathname, useParams, useRouter } from 'next/navigation';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import styles from '../style.module.css';
import { URL_YINGSHI_VOD } from '@/config/yingshiUrl';
import { YingshiApi } from '@/util/YingshiApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import VodItemMobile from '../../../../../components/vodItemMobile';
import { Spinner } from '../../../../../components/spinner';
import Image from 'next/image';
import Home from '@/app/page';

import { searchEmptyIcon } from '@/asset/icons';

export default function Page() {
  const { id } = useParams();
  const router = useRouter();

  const headerId = [1, 2, 3, 4, 5, 6, 7, 99];

  const isInteger = (str) => {
    return /^\d+$/.test(str);
  };

  useEffect(() => {
    if (isInteger(id)) {
      const intId = parseInt(id);
      if (intId === 0) {
        router.push('/');
      } else if (intId === 998) {
        router.push('/topic/index/page');
      } else if (intId === 999) {
        router.push('/vod/show/by/time/id/1')
      } else if (headerId.includes(intId)) {
        // No routing needed, return to render Home component below
      } else {
        router.push('/404');
      }
    } else {
      router.push('/404');
    }
  }, [id, router]);

  // If id is a valid headerId, render the Home component with the corresponding category
  if (isInteger(id) && headerId.includes(parseInt(id))) {
    return <Home category={parseInt(id)} />;
  }

  // Return null or a spinner if routing is in progress
  return null;
}
