import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

import { Button } from 'semantic-ui-react'


const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => ({
    toggleVisibility,
  }))

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button data-cy="new_blog" positive onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button secondary onClick={toggleVisibility}>Cancel</Button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
