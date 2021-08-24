import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const GalleryWrapper = styled(motion.div)<Props>`
  position: absolute;
  top: 0;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 150%;

  display: grid;
  grid-template-columns: repeat(5, 1fr);

  opacity: 0.1;
`;