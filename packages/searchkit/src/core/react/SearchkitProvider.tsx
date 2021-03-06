import * as React from 'react'
import * as PropTypes from 'prop-types'
import { SearchkitManager } from '../SearchkitManager'

export interface SearchkitProps {
  searchkit: SearchkitManager
  children?: any
}

export class SearchkitProvider extends React.Component<SearchkitProps, any> {
  static childContextTypes = {
    searchkit: PropTypes.instanceOf(SearchkitManager)
  }

  static propTypes = {
    searchkit: PropTypes.instanceOf(SearchkitManager).isRequired,
    children: PropTypes.element.isRequired
  }

  componentDidMount() {
    this.props.searchkit.setupListeners()
    this.props.searchkit.completeRegistration()
  }

  componentWillUnmount() {
    const { searchkit } = this.props
    searchkit.unlistenHistory()
    searchkit.guidGenerator.reset()
  }

  getChildContext() {
    return { searchkit: this.props.searchkit }
  }

  render() {
    return this.props.children
  }
}
