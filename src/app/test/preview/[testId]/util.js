import { DOMAIN_BE_PROD } from '@/constants/constant';

import { getHeaders } from '@/utils/util';

export const getData = async (testId) => {
  const headers = getHeaders();
  return await fetch(`${DOMAIN_BE_PROD}/api/v1/tests/test/${testId}`, { headers })
    .then((response) => response.json())
    .then((res) => res)
    .catch(
      (err) =>
        'https://post-phinf.pstatic.net/MjAyMjA2MTJfMjIx/MDAxNjU0OTY2MTc1Nzk0.SGfHNYdOSACyiVqhnj7onksI54NQWa53zwmg5wahP2Ug.sGVv828jW4EdN_HnT_ctv8ceUCOAb5x9Jqkf2gEzK4gg.JPEG/1.JPG?type=w800_q75',
    );
};
