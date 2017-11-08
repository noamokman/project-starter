import React from 'react';
import {Flex} from 'reflexbox';
import {Card, CardTitle, CardText} from 'material-ui';

export default () => (
  <Flex auto column align='center' justify='center'>
    <Card>
      <CardTitle title='Contributors' />
      <CardText>
        <Flex column>
          <span>{'Noam Okman'}</span>
          <span>{'Sharon Grossman'}</span>
          <span>{'Saar Sinai'}</span>
          <span>{'Roy Cohen'}</span>
        </Flex>
      </CardText>
    </Card>
  </Flex>
);
