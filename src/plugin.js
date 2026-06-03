// Typography
import Title from './components/typography/Title.vue'
import Text from './components/typography/Text.vue'
// Primitives
import Button from './components/primitives/Button.vue'
import Badge from './components/primitives/Badge.vue'
import Input from './components/primitives/Input.vue'
// Layout
import Card from './components/layout/Card.vue'
import Grid from './components/layout/Grid.vue'
import Flex from './components/layout/Flex.vue'
import Hero from './components/layout/Hero.vue'
import CollapsibleSection from './components/layout/CollapsibleSection.vue'
import PageShell from './components/layout/PageShell.vue'
import PageHeader from './components/layout/PageHeader.vue'
import PageSearchBar from './components/layout/PageSearchBar.vue'
import MediaCard from './components/layout/MediaCard.vue'
// Overlay
import Modal from './components/overlay/Modal.vue'
import Popover from './components/overlay/Popover.vue'
import PopoverItem from './components/overlay/PopoverItem.vue'
import PopoverRow from './components/overlay/PopoverRow.vue'
import PopoverDivider from './components/overlay/PopoverDivider.vue'
import ImageViewer from './components/overlay/ImageViewer.vue'
import InlineInput from './components/overlay/InlineInput.vue'
// Navigation
import BottomNavigation from './components/navigation/BottomNavigation.vue'
import TopNavbar from './components/navigation/TopNavbar.vue'
import Tabs from './components/navigation/Tabs.vue'
import TabBar from './components/navigation/TabBar.vue'
// Feedback
import EmptyState from './components/feedback/EmptyState.vue'
import LoadingOverlay from './components/feedback/LoadingOverlay.vue'
import AlertBanner from './components/feedback/AlertBanner.vue'
// Form
import CheckList from './components/form/CheckList.vue'
import MultiSelect from './components/form/MultiSelect.vue'
import RichTextEditor from './components/form/RichTextEditor.vue'
import FileUpload from './components/form/FileUpload.vue'
// Display
import TimelineItem from './components/display/TimelineItem.vue'
import TransitItem from './components/display/TransitItem.vue'
import ProfileHero from './components/display/ProfileHero.vue'
import ChatBubble from './components/display/ChatBubble.vue'
import StatCard from './components/display/StatCard.vue'
import StatItem from './components/display/StatItem.vue'
import Difference from './components/display/Difference.vue'
import ImageCarousel from './components/display/ImageCarousel.vue'
import StarRating from './components/display/StarRating.vue'

const GlassUI = {
  install(app) {
    app.component('GdTitle', Title)
    app.component('GdText', Text)
    app.component('GdButton', Button)
    app.component('GdBadge', Badge)
    app.component('GdInput', Input)
    app.component('GdCard', Card)
    app.component('GdGrid', Grid)
    app.component('GdFlex', Flex)
    app.component('GdHero', Hero)
    app.component('GdCollapsibleSection', CollapsibleSection)
    app.component('GdPageShell', PageShell)
    app.component('GdPageHeader', PageHeader)
    app.component('GdPageSearchBar', PageSearchBar)
    app.component('GdMediaCard', MediaCard)
    app.component('GdModal', Modal)
    app.component('GdPopover', Popover)
    app.component('GdPopoverItem', PopoverItem)
    app.component('GdPopoverRow', PopoverRow)
    app.component('GdPopoverDivider', PopoverDivider)
    app.component('GdImageViewer', ImageViewer)
    app.component('GdInlineInput', InlineInput)
    app.component('GdBottomNavigation', BottomNavigation)
    app.component('GdTopNavbar', TopNavbar)
    app.component('GdTabs', Tabs)
    app.component('GdTabBar', TabBar)
    app.component('GdEmptyState', EmptyState)
    app.component('GdLoadingOverlay', LoadingOverlay)
    app.component('GdAlertBanner', AlertBanner)
    app.component('GdCheckList', CheckList)
    app.component('GdMultiSelect', MultiSelect)
    app.component('GdRichTextEditor', RichTextEditor)
    app.component('GdFileUpload', FileUpload)
    app.component('GdTimelineItem', TimelineItem)
    app.component('GdTransitItem', TransitItem)
    app.component('GdProfileHero', ProfileHero)
    app.component('GdChatBubble', ChatBubble)
    app.component('GdStatCard', StatCard)
    app.component('GdStatItem', StatItem)
    app.component('GdDifference', Difference)
    app.component('GdImageCarousel', ImageCarousel)
    app.component('GdStarRating', StarRating)
  },
}

export default GlassUI
