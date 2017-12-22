import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Link } from 'dva/router'
import { Col, Panel } from 'react-bootstrap'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'

import * as routes from '../config/routes'

const Wrapper = styled(({ className, children }) => (
  <Col md={3} className={className}>
    {children}
  </Col>
))`
  padding: 0;
  display: none;

  @media (min-width: 992px) {
    & {
      display: block;
    }
  }
`
const List = styled.ul`
  list-style: none;
  font-size: 14px;
  padding: 0;
  margin: -15px;
`

const ListItem = styled.li`
  padding: 10px 15px;

  & + & {
    border-top: 1px solid #eee;
  }
`

const Sidebar = (props) => {
  return (
    <Wrapper>
      <Panel>
        <Link
          to={routes.TOPIC_NEW}
          className="btn btn-primary btn-block"
        >
          <FormattedMessage id="sidebar.newtopic.text" />
        </Link>
      </Panel>

      <Panel
        header={<FormattedMessage id="sidebar.count.text" />}
      >
        <List>
          <ListItem>
            <FormattedMessage
              id="sidebar.count.user"
              values={{
                number: props.count.user,
              }}
            />
          </ListItem>
          <ListItem>
            <FormattedMessage
              id="sidebar.count.topic"
              values={{
                number: props.count.topic,
              }}
            />
          </ListItem>
          <ListItem>
            <FormattedMessage
              id="sidebar.count.reply"
              values={{
                number: props.count.reply,
              }}
            />
          </ListItem>
        </List>
      </Panel>
    </Wrapper>
  )
}

Sidebar.propTypes = {
  count: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  const { count } = state.app
  return {
    count,
  }
}

export default connect(mapStateToProps)(Sidebar)
