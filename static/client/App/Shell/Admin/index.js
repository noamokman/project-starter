import React from 'react';
import {Flex} from 'reflexbox';
import {Card, CardTitle, CardText} from 'material-ui';

export default () => (
  <Flex auto column align='center' justify='center'>
    <Card>
      <CardTitle title='Admin' />
      <CardText>
        <Flex column>
          <span>{'You are an admin!'}</span>
        </Flex>
      </CardText>
    </Card>
  </Flex>
);
