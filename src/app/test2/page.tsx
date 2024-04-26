'use client'

import React, { useRef, useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';

export default function Test() {
  const Map = useMemo(() => dynamic(
    () => import('@/components/map'),
    { 
      loading: () => <p>A map is loading</p>,
      ssr: false
    }
  ), [])

  return <div>
    <Map />
  </div>
}
