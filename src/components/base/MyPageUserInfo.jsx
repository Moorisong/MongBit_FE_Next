import { CONST_FONT, LOGIN } from '@/constants/constant';

import { ImageElement } from '@/components/ui/test/Test';
import { Wrap_mediaquery } from '@/components/ui/wrap/Wrap';
import { Text, Wrap, Stroke } from '@/components/ui/CommonElements';

export function MyPageUserInfo({ logInState, registerDate }) {
  return (
    <Wrap_mediaquery flexDirection="column" justifyContent="center" margin="0.3rem 0 0 0 ">
      <Wrap display="flex" flexDirection="row">
        <ImageElement
          imageUrl={logInState[LOGIN.USER_THUMBNAIL]}
          style={{ width: '35px', height: '35px', margin: '0 0.7rem 0 1.5rem', borderRadius: '13.5px' }}
        />
        <Wrap display="flex" flexDirection="column" margin="0 0 1rem 0">
          <Text fontSize={CONST_FONT.SIZE.FONT_SIZE_SMALL_1}>{logInState[LOGIN.USER_USER_NAME]}</Text>
          <Text fontSize={CONST_FONT.SIZE.FONT_SIZE_SMALL_2} color={CONST_FONT.COLOR.GRAY_2}>
            {registerDate} 가입
          </Text>
        </Wrap>
      </Wrap>
      <Wrap display="flex" justifyContent="center" margin="0.5rem 0 0 0">
        <Stroke />
      </Wrap>
    </Wrap_mediaquery>
  );
}
