/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { Clock } from 'brave-ui/old'
import {
  Page,
  Header,
  Main,
  List,
  Footer,
  DynamicBackground,
  Gradient
} from 'brave-ui/features/newTab/default'

// Components
import Stats from './stats'
import Block from './block'
import FooterInfo from './footerInfo'
import SiteRemovalNotification from './notification'

interface Props {
  actions: any
  newTabData: NewTab.State
}

class NewTabPage extends React.Component<Props, {}> {
  get actions () {
    return this.props.actions
  }

  componentDidMount () {
    this.actions.onHideSiteRemovalNotification()
  }

  onDraggedSite = (fromUrl: string, toUrl: string, dragRight: boolean) => {
    this.actions.siteDragged(fromUrl, toUrl, dragRight)
  }

  onDragEnd = (url: string, didDrop: boolean) => {
    this.actions.siteDragEnd(url, didDrop)
  }

  onToggleBookmark (site: NewTab.Site) {
    if (site.bookmarked === undefined) {
      this.actions.bookmarkAdded(site.url)
    } else {
      this.actions.bookmarkRemoved(site.url)
    }
  }

  onHideSiteRemovalNotification = () => {
    this.actions.onHideSiteRemovalNotification()
  }

  onTogglePinnedTopSite (site: NewTab.Site) {
    if (!site.pinned) {
      this.actions.sitePinned(site.url)
    } else {
      this.actions.siteUnpinned(site.url)
    }
  }

  onIgnoredTopSite (site: NewTab.Site) {
    this.actions.siteIgnored(site.url)
  }

  onUndoIgnoredTopSite = () => {
    this.actions.undoSiteIgnored()
  }

  onUndoAllSiteIgnored = () => {
    this.actions.undoAllSiteIgnored()
  }

  render () {
    const { newTabData } = this.props

    // don't render until object is found
    if (!this.props.newTabData) {
      return null
    }

    return (
      <DynamicBackground background={newTabData.backgroundImage!.source}>
        <Gradient />
        <Page>
          <Header>
            <Stats stats={newTabData.stats} />
            <Clock />
            <Main>
              <List>
                {
                  this.props.newTabData.gridSites.map((site: NewTab.Site) =>
                    <Block
                      key={site.url}
                      id={site.url}
                      title={site.title}
                      href={site.url}
                      favicon={site.favicon}
                      style={{ backgroundColor: site.themeColor || site.computedThemeColor }}
                      onToggleBookmark={this.onToggleBookmark.bind(this, site)}
                      onPinnedTopSite={this.onTogglePinnedTopSite.bind(this, site)}
                      onIgnoredTopSite={this.onIgnoredTopSite.bind(this, site)}
                      onDraggedSite={this.onDraggedSite}
                      onDragEnd={this.onDragEnd}
                      isPinned={site.pinned}
                      isBookmarked={site.bookmarked !== undefined}
                    />
                  )
                }
              </List>
              {
                this.props.newTabData.showSiteRemovalNotification
                ? (
                  <SiteRemovalNotification
                    onUndoIgnoredTopSite={this.onUndoIgnoredTopSite}
                    onRestoreAll={this.onUndoAllSiteIgnored}
                    onCloseNotification={this.onHideSiteRemovalNotification}
                  />
                ) : null
              }
            </Main>
          </Header>
          <Footer>
            <FooterInfo backgroundImageInfo={newTabData.backgroundImage} />
          </Footer>
        </Page>
      </DynamicBackground>
    )
  }
}

export default DragDropContext(HTML5Backend)(NewTabPage)
