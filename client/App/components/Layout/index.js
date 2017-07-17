import {Flex} from 'reflexbox';
import styled from 'styled-components';
import {grey100} from 'material-ui/styles/colors';

export default styled(Flex)
  .attrs({
    auto: true,
    column: true
  })`
  background: ${grey100};
`;