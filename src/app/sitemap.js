import { DOMAIN, DOMAIN_BE_PROD } from '@/constants/constant';

export default async function sitemap() {
  const allTestData = await getData();

  // 정적 라우트
  const staticPages = [
    {
      url: `${DOMAIN}`,
      lastModified: new Date(),
    },
    {
      url: `${DOMAIN}/devinfo`,
      lastModified: new Date(),
    },
    {
      url: `${DOMAIN}/exception`,
      lastModified: new Date(),
    },
    {
      url: `${DOMAIN}/main`,
      lastModified: new Date(),
    },
    {
      url: `${DOMAIN}/mypage`,
      lastModified: new Date(),
    },
    {
      url: `${DOMAIN}/need_login`,
      lastModified: new Date(),
    },
    {
      url: `${DOMAIN}/policy`,
      lastModified: new Date(),
    },
    {
      url: `${DOMAIN}/terms`,
      lastModified: new Date(),
    },
    {
      url: `${DOMAIN}/test/latest`,
      lastModified: new Date(),
    },
    {
      url: `${DOMAIN}/test/list`,
      lastModified: new Date(),
    },
    {
      url: `${DOMAIN}/test/random`,
      lastModified: new Date(),
    },
  ];

  // 동적 라우트
  const testOn = allTestData.map((d) => ({
    url: `${DOMAIN}/test/on/${d.id}`,
    lastModified: new Date(),
  }));

  const result = allTestData.map((d) => ({
    url: `${DOMAIN}/result/${d.id}`,
    lastModified: new Date(),
  }));

  const testPreview = allTestData.map((d) => ({
    url: `${DOMAIN}/test/preview/${d.id}`,
    lastModified: new Date(),
  }));

  return [...staticPages, ...testOn, ...result, ...testPreview];
}

async function getData() {
  const res = await fetch(`${DOMAIN_BE_PROD}/api/v1/tests`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
