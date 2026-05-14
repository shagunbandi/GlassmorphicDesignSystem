import Badge from '../../components/primitives/Badge.vue'
import Button from '../../components/primitives/Button.vue'
import ProfileHero from '../../components/display/ProfileHero.vue'

export default {
  title: 'Display/ProfileHero',
  component: ProfileHero,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    handle: { control: 'text' },
    location: { control: 'text' },
    bio: { control: 'text' },
    memberSince: { control: 'text' },
    avatarUrl: { control: 'text' },
    initials: { control: 'text' },
    allowAvatarChange: { control: 'boolean' },
  },
  args: {
    name: 'Alex Chen',
    handle: 'alexchen',
    location: 'San Francisco, CA',
    bio: 'Frequent flyer and cultural explorer. 23 countries and counting.',
    memberSince: '2023',
    initials: 'AC',
    allowAvatarChange: false,
  },
}

export const Playground = {
  render: (args) => ({
    components: { ProfileHero, Badge },
    setup() { return { args } },
    template: `
      <div style="max-width:600px">
        <ProfileHero v-bind="args">
          <Badge tone="sky">23 countries</Badge>
          <Badge tone="emerald">48 cities</Badge>
        </ProfileHero>
      </div>
    `,
  }),
}

export const WithAvatar = {
  render: () => ({
    components: { ProfileHero, Badge },
    template: `
      <div style="max-width:600px">
        <ProfileHero
          name="Maya Patel"
          handle="mayatravels"
          location="London, UK"
          bio="Passionate about slow travel, street food, and sunrise hikes."
          member-since="2022"
          avatar-url="https://i.pravatar.cc/150?img=47"
        >
          <Badge tone="coral">Foodie</Badge>
          <Badge tone="amber">Hiking</Badge>
        </ProfileHero>
      </div>
    `,
  }),
}

export const WithInitials = {
  render: () => ({
    components: { ProfileHero, Button },
    template: `
      <div style="max-width:600px">
        <ProfileHero
          name="Jordan Kim"
          handle="jordankim"
          location="Seoul, South Korea"
          bio="Tech nomad. Living out of a single carry-on since 2020."
          member-since="2024"
          initials="JK"
        >
          <template #actions>
            <Button intent="primary" surface="elevated" size="sm" radius="full">Edit Profile</Button>
          </template>
        </ProfileHero>
      </div>
    `,
  }),
}

export const EditableAvatar = {
  render: () => ({
    components: { ProfileHero },
    template: `
      <div style="max-width:600px">
        <ProfileHero
          name="Sam Rivera"
          initials="SR"
          location="Mexico City"
          bio="Adventure traveler and amateur photographer."
          member-since="2025"
          :allow-avatar-change="true"
          @avatar-click="() => alert('Avatar change triggered')"
        />
      </div>
    `,
  }),
}
