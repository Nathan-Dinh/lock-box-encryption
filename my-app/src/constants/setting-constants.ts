interface Option {
  name: string
  icon: string
  route: string
}

interface OptionGroup {
  subtitle: string
  options: Option[]
}

const SETTING_OPTIONS: OptionGroup[] = [
  {
    subtitle: 'Account Setting',
    options: [
      {
        name: 'Account Info',
        icon: 'account_circle',
        route: 'account-info',
      },
    ],
  },
  {
    subtitle: 'Database Information',
    options: [
      {
        name: 'Clear Database',
        icon: 'clear_all',
        route: 'database',
      },
    ],
  },
  {
    subtitle: 'About',
    options: [
      {
        name: 'About',
        icon: 'info',
        route: 'about',
      },
    ],
  },
]

export default {
  SETTING_OPTIONS,
}
