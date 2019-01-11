/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from 'react'

// Feature-specific components
import {
  SiteRemovalNotification,
  SiteRemovalAction,
  SiteRemovalText
} from 'brave-ui/features/newTab/default'

// Icons
import { CloseStrokeIcon } from 'brave-ui/components/icons'

// Utils
import { getLocale } from '../../../common/locale'

interface Props {
  onUndoIgnoredTopSite: () => void
  onRestoreAll: () => void
  onCloseNotification: () => void
}

export default class Notification extends React.Component<Props, {}> {
  componentDidMount () {
    window.i18nTemplate.process(window.document, window.loadTimeData)
  }
  render () {
    const {
      onUndoIgnoredTopSite,
      onRestoreAll,
      onCloseNotification
    } = this.props
    return (
       <SiteRemovalNotification>
         <SiteRemovalText>{getLocale('thumbRemoved')}</SiteRemovalText>
         <SiteRemovalAction onClick={onUndoIgnoredTopSite}>{getLocale('undoRemoved')}</SiteRemovalAction>
         <SiteRemovalAction onClick={onRestoreAll}>{getLocale('restoreAll')}</SiteRemovalAction>
         <SiteRemovalAction onClick={onCloseNotification} iconOnly={true} title={getLocale('close')}>
          <CloseStrokeIcon />
        </SiteRemovalAction>
       </SiteRemovalNotification>
    )
  }
}
