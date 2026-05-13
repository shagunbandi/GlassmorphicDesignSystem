// Primitives
import Button from './components/primitives/Button.vue'
import Badge  from './components/primitives/Badge.vue'
import Input  from './components/primitives/Input.vue'
// Layout
import Card from './components/layout/Card.vue'
import Grid from './components/layout/Grid.vue'
import Flex from './components/layout/Flex.vue'
import Hero from './components/layout/Hero.vue'
// Overlay
import Modal       from './components/overlay/Modal.vue'
import Popover     from './components/overlay/Popover.vue'
import ImageViewer from './components/overlay/ImageViewer.vue'
import InlineInput from './components/overlay/InlineInput.vue'
// Navigation
import BottomNavigation from './components/navigation/BottomNavigation.vue'
import TopNavbar        from './components/navigation/TopNavbar.vue'
import Tabs             from './components/navigation/Tabs.vue'
import SectionHeader    from './components/navigation/SectionHeader.vue'
// Feedback
import EmptyState     from './components/feedback/EmptyState.vue'
import LoadingOverlay from './components/feedback/LoadingOverlay.vue'
// Form
import CheckList      from './components/form/CheckList.vue'
import RichTextEditor from './components/form/RichTextEditor.vue'
import FileUpload     from './components/form/FileUpload.vue'
// Display
import TimelineItem from './components/display/TimelineItem.vue'
import TransitItem  from './components/display/TransitItem.vue'
import ProfileHero  from './components/display/ProfileHero.vue'

const GlassUI = {
  install(app) {
    app.component('GdButton',          Button)
    app.component('GdBadge',           Badge)
    app.component('GdInput',           Input)
    app.component('GdCard',            Card)
    app.component('GdGrid',            Grid)
    app.component('GdFlex',            Flex)
    app.component('GdHero',            Hero)
    app.component('GdModal',           Modal)
    app.component('GdPopover',         Popover)
    app.component('GdImageViewer',     ImageViewer)
    app.component('GdInlineInput',     InlineInput)
    app.component('GdBottomNavigation',BottomNavigation)
    app.component('GdTopNavbar',       TopNavbar)
    app.component('GdTabs',            Tabs)
    app.component('GdSectionHeader',   SectionHeader)
    app.component('GdEmptyState',      EmptyState)
    app.component('GdLoadingOverlay',  LoadingOverlay)
    app.component('GdCheckList',       CheckList)
    app.component('GdRichTextEditor',  RichTextEditor)
    app.component('GdFileUpload',      FileUpload)
    app.component('GdTimelineItem',    TimelineItem)
    app.component('GdTransitItem',     TransitItem)
    app.component('GdProfileHero',     ProfileHero)
  },
}

export default GlassUI
