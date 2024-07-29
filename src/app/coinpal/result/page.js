'use client'
import { setRechargeInfo } from '@/store/recharge'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next';
import { useDispatch } from 'react-redux'
import { isWeb } from '@/util/common'
import { WebPage } from './WebPage'
import { H5Page } from './H5Page'

export default function Result() {
  const [receivedParams, setReceivedParams] = useState({});
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const succeedText = t('succeed');

  useEffect(() => {
    const params = Object.fromEntries(
      new URLSearchParams(window.location.search)
    )
    setReceivedParams({ ...params, ...{ status: succeedText } })
    dispatch(setRechargeInfo({ ...params, ...{ status: succeedText } }))
  }, [])

  return isWeb() ? (
    <WebPage receivedParams={receivedParams} />
  ) : (
    <H5Page receivedParams={receivedParams} />
  )
}
