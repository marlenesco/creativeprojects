import styled from 'styled-components';
import { motion } from 'framer-motion';

import { media } from 'utils/responsive';

interface Props {}

export const Text = styled(motion.h4)<Props>`
  font-weight: 400;
  color: white;
  font-size: 14px;

  border-right: 1px solid white;
  padding-right: 10px;

  ${media.tablet} {
    font-size: 14px;
    margin: 0 10px;
  }
`;
