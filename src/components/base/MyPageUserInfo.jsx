import { CONST_FONT, LOGIN } from '@/constants/constant';

import { TextElement } from '@/components/ui/text/Text';
import { ImageElement } from '@/components/ui/test/Test';
import { Div_stroke } from '@/components/ui/square/Square';
import { DivElement, Wrap_mediaquery } from '@/components/ui/wrap/Wrap';

export function MyPageUserInfo({ logInState, registerDate }) {
  return (
    <Wrap_mediaquery flexDirection="column" justifyContent="center" margintop="0.3rem">
      <DivElement style={{ display: 'flex', flexDirection: 'row' }}>
        <ImageElement
          imageUrl={logInState[LOGIN.USER_THUMBNAIL]}
          style={{ width: '35px', margin: '0 0.7rem 0 1.5rem', borderRadius: '13.5px' }}
        />
        <DivElement style={{ display: 'flex', flexDirection: 'column' }}>
          <TextElement
            text={logInState[LOGIN.USER_USER_NAME]}
            style={{ fontSize: CONST_FONT.SIZE.FONT_SIZE_SMALL_1 }}
          />
          <TextElement
            text={`${registerDate} 가입`}
            style={{ fontSize: CONST_FONT.SIZE.FONT_SIZE_SMALL_2, color: CONST_FONT.COLOR.GRAY_2 }}
          />
        </DivElement>
      </DivElement>
      <DivElement style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
        <Div_stroke />
      </DivElement>
    </Wrap_mediaquery>
  );
}
