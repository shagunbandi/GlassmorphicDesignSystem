// Design tokens — import in your app entry: import '@glass/ui/style.css'
import './tokens/tokens.css'

// Primitives
export { default as Button } from './components/primitives/Button.vue'
export { default as Badge }  from './components/primitives/Badge.vue'
export { default as Input }  from './components/primitives/Input.vue'

// Layout
export { default as Card } from './components/layout/Card.vue'
export { default as Grid } from './components/layout/Grid.vue'
export { default as Flex } from './components/layout/Flex.vue'
export { default as Hero } from './components/layout/Hero.vue'

// Overlay
export { default as Modal       } from './components/overlay/Modal.vue'
export { default as Popover     } from './components/overlay/Popover.vue'
export { default as ImageViewer } from './components/overlay/ImageViewer.vue'
export { default as InlineInput } from './components/overlay/InlineInput.vue'

// Navigation
export { default as BottomNavigation } from './components/navigation/BottomNavigation.vue'
export { default as Tabs             } from './components/navigation/Tabs.vue'
export { default as SectionHeader    } from './components/navigation/SectionHeader.vue'

// Feedback
export { default as EmptyState      } from './components/feedback/EmptyState.vue'
export { default as LoadingOverlay  } from './components/feedback/LoadingOverlay.vue'

// Form
export { default as CheckList       } from './components/form/CheckList.vue'
export { default as RichTextEditor  } from './components/form/RichTextEditor.vue'
export { default as FileUpload      } from './components/form/FileUpload.vue'

// Display
export { default as TimelineItem } from './components/display/TimelineItem.vue'
export { default as TransitItem  } from './components/display/TransitItem.vue'

// Vue plugin (app.use(GlassUI) registers all as Gd* globals)
export { default as GlassUI } from './plugin.js'
