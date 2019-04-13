import React, { Component } from 'react'
import { BounceLoader } from 'react-spinners'
import { css } from '@emotion/core'

const override = css`
  display: block;
  margin: 0 auto;
  opacity: 1 !important;
`
class Loading extends Component {
  render() {
    return (
      <div
        className={
          'row h-100 justify-content-center align-items-center ' +
          (this.props.visible ? 'loading' : 'ocultar')
        }
      >
        <BounceLoader className={override} color={'#00bc98'} size={100} />
      </div>
    )
  }
}
export default Loading
