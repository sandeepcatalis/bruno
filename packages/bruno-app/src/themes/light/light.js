import { rgba } from 'polished';
export const palette = {
  primary: {
    SOLID: '#FF6C37',
    TEXT: '#E85820',
    STRONG: '#FF6C37',
    SUBTLE: '#FF8C5A'
  },
  hues: {
    RED: 'hsl(8,   60%, 52%)',
    ROSE: 'hsl(352, 45%, 50%)',
    BROWN: 'hsl(28,  55%, 38%)',
    ORANGE: '#FF6C37',
    YELLOW: 'hsl(45,  75%, 42%)',
    LIME: 'hsl(85,  45%, 40%)',
    GREEN: '#00C853',
    TEAL: 'hsl(178, 50%, 36%)',
    CYAN: 'hsl(195, 55%, 42%)',
    BLUE: '#2196F3',
    INDIGO: 'hsl(235, 45%, 45%)',
    VIOLET: 'hsl(258, 42%, 50%)',
    PURPLE: '#A259FF',
    PINK: 'hsl(328, 50%, 48%)'
  },
  system: {
    CONTROL_ACCENT: '#FF6C37'
  },
  background: {
    BASE: '#FFFFFF',
    MANTLE: '#F7F7F7',
    CRUST: '#F0F0F0',
    SURFACE0: '#E8E8E8',
    SURFACE1: '#E0E0E0',
    SURFACE2: '#D5D5D5'
  },
  text: {
    BASE: '#212121',
    SUBTEXT2: '#424242',
    SUBTEXT1: '#6B6B6B',
    SUBTEXT0: '#9E9E9E'
  },
  overlay: {
    OVERLAY2: '#757575',
    OVERLAY1: '#BDBDBD',
    OVERLAY0: '#E0E0E0'
  },
  border: {
    BORDER2: '#D0D0D0',
    BORDER1: '#E0E0E0',
    BORDER0: '#EEEEEE'
  },
  utility: {
    WHITE: '#ffffff',
    BLACK: '#000000'
  }
};

palette.intent = {
  INFO: palette.hues.BLUE,
  SUCCESS: palette.hues.GREEN,
  WARNING: palette.hues.ORANGE,
  DANGER: palette.hues.RED
};

palette.syntax = {
  // Core language structure
  KEYWORD: palette.hues.ROSE,
  TAG: palette.hues.ROSE,
  // Identifiers & properties (collapsed)
  VARIABLE: palette.hues.PINK,
  PROPERTY: palette.hues.BLUE,
  DEFINITION: palette.hues.BLUE,

  // Literals
  STRING: palette.hues.BROWN,
  NUMBER: palette.hues.PINK,
  ATOM: palette.hues.ROSE,

  // Operators & punctuation (quiet)
  OPERATOR: palette.text.SUBTEXT1,
  TAG_BRACKET: palette.text.SUBTEXT1,

  // Comments should recede
  COMMENT: palette.text.SUBTEXT0
};

const lightTheme = {
  mode: 'light',
  brand: palette.primary.SOLID,
  text: palette.text.BASE,
  textLink: palette.hues.BLUE,
  draftColor: '#cc7b1b',
  bg: palette.background.BASE,

  primary: {
    solid: palette.primary.SOLID,
    text: palette.primary.TEXT,
    strong: palette.primary.STRONG,
    subtle: palette.primary.SUBTLE
  },

  accents: {
    primary: palette.primary.SOLID
  },

  background: {
    base: palette.background.BASE,
    mantle: palette.background.MANTLE,
    crust: palette.background.CRUST,
    surface2: palette.background.SURFACE2,
    surface1: palette.background.SURFACE1,
    surface0: palette.background.SURFACE0
  },

  status: {
    info: {
      background: rgba(palette.intent.INFO, 0.15),
      text: palette.intent.INFO,
      border: palette.intent.INFO
    },
    success: {
      background: rgba(palette.intent.SUCCESS, 0.15),
      text: palette.intent.SUCCESS,
      border: palette.intent.SUCCESS
    },
    warning: {
      background: rgba(palette.intent.WARNING, 0.15),
      text: palette.intent.WARNING,
      border: palette.intent.WARNING
    },
    danger: {
      background: rgba(palette.intent.DANGER, 0.15),
      text: palette.intent.DANGER,
      border: palette.intent.DANGER
    }
  },

  overlay: {
    overlay2: palette.overlay.OVERLAY2,
    overlay1: palette.overlay.OVERLAY1,
    overlay0: palette.overlay.OVERLAY0
  },

  font: {
    size: {
      xs: '0.6875rem', // 11px
      sm: '0.75rem', // 12px
      base: '0.8125rem', // 13px
      md: '0.875rem', // 14px
      lg: '1rem', // 16px
      xl: '1.125rem' // 18px
    }
  },

  shadow: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.05)',
    md: '0 2px 8px rgba(0, 0, 0, 0.14), 0 0 0 1px rgba(0, 0, 0, 0.06)',
    lg: '0 2px 12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)'
  },

  border: {
    radius: {
      sm: '4px',
      base: '6px',
      md: '8px',
      lg: '10px',
      xl: '12px'
    },
    border2: palette.border.BORDER2,
    border1: palette.border.BORDER1,
    border0: palette.border.BORDER0
  },

  colors: {
    text: {
      white: palette.utility.WHITE,
      green: palette.intent.SUCCESS,
      danger: palette.intent.DANGER,
      warning: palette.intent.WARNING,
      muted: palette.text.SUBTEXT1,
      purple: palette.hues.PURPLE,
      yellow: palette.hues.YELLOW,
      subtext2: palette.text.SUBTEXT2,
      subtext1: palette.text.SUBTEXT1,
      subtext0: palette.text.SUBTEXT0
    },
    bg: {
      danger: palette.hues.RED
    },
    accent: palette.system.CONTROL_ACCENT
  },

  input: {
    bg: palette.utility.WHITE,
    border: palette.border.BORDER2,
    focusBorder: palette.overlay.OVERLAY2,
    placeholder: {
      color: palette.overlay.OVERLAY1,
      opacity: 0.8
    }
  },

  sidebar: {
    color: '#E0E0E0',
    muted: '#9E9E9E',
    bg: '#2C2C2C',
    dragbar: {
      border: '#3A3A3A',
      activeBorder: '#555555'
    },

    collection: {
      item: {
        bg: '#383838',
        hoverBg: '#383838',
        focusBorder: '#555555',
        indentBorder: '#444444',
        active: {
          indentBorder: '#555555'
        },
        example: {
          iconColor: '#9E9E9E'
        }
      }
    },

    dropdownIcon: {
      color: '#9E9E9E'
    }
  },

  dropdown: {
    color: palette.text.BASE,
    iconColor: palette.text.SUBTEXT2,
    bg: palette.utility.WHITE,
    hoverBg: palette.background.CRUST,
    shadow: '0 0px 3px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.05)',
    border: 'none',
    separator: palette.border.BORDER1,
    selectedColor: palette.primary.TEXT,
    mutedText: palette.text.SUBTEXT0
  },

  workspace: {
    accent: palette.system.CONTROL_ACCENT,
    border: palette.border.BORDER1,
    button: {
      bg: palette.background.MANTLE
    }
  },

  request: {
    methods: {
      get: '#00C853',
      post: '#FFC107',
      put: '#2196F3',
      delete: '#F44336',
      patch: '#A259FF',
      options: '#607D8B',
      head: '#00BCD4'
    },

    grpc: '#7B1FA2',
    ws: '#FF6C37',
    gql: '#E91E63'
  },

  requestTabPanel: {
    url: {
      bg: palette.utility.WHITE,
      icon: palette.text.SUBTEXT2,
      iconDanger: palette.hues.RED,
      border: `solid 1px ${palette.border.BORDER1}`
    },
    dragbar: {
      border: palette.background.SURFACE2,
      activeBorder: palette.border.BORDER2
    },
    responseStatus: palette.text.SUBTEXT1,
    responseOk: palette.hues.GREEN,
    responseError: palette.hues.RED,
    responsePending: palette.hues.BLUE,
    responseOverlayBg: 'rgba(255, 255, 255, 0.6)',
    card: {
      bg: palette.background.BASE,
      border: palette.border.BORDER1,
      hr: palette.border.BORDER1
    },
    graphqlDocsExplorer: {
      bg: palette.background.BASE,
      color: palette.text.BASE
    }
  },

  notifications: {
    bg: palette.background.BASE,
    list: {
      bg: palette.background.SURFACE0,
      borderRight: 'transparent',
      borderBottom: palette.border.BORDER2,
      hoverBg: palette.background.SURFACE1,
      active: {
        border: palette.hues.BLUE,
        bg: palette.background.SURFACE1,
        hoverBg: palette.background.SURFACE2
      }
    }
  },

  modal: {
    title: {
      color: palette.text.BASE,
      bg: palette.background.SURFACE0
    },
    body: {
      color: palette.text.BASE,
      bg: palette.background.BASE
    },
    input: {
      bg: palette.background.BASE,
      border: palette.border.BORDER2,
      focusBorder: palette.overlay.OVERLAY2
    },
    backdrop: {
      opacity: 0.4
    }
  },

  button: {
    secondary: {
      color: '#212529',
      bg: '#e2e6ea',
      border: '#dae0e5',
      hoverBorder: '#696969'
    },
    close: {
      color: '#212529',
      bg: 'white',
      border: 'white',
      hoverBorder: ''
    },
    disabled: {
      color: '#9f9f9f',
      bg: palette.border.BORDER0,
      border: 'rgb(234, 234, 234)'
    },
    danger: {
      color: '#fff',
      bg: '#dc3545',
      border: '#dc3545'
    }
  },
  button2: {
    color: {
      primary: {
        bg: palette.primary.SOLID,
        text: palette.utility.WHITE,
        border: palette.primary.SOLID
      },
      light: {
        bg: rgba(palette.primary.SOLID, 0.08),
        text: palette.primary.SOLID,
        border: rgba(palette.primary.SOLID, 0.06)
      },
      secondary: {
        bg: palette.background.MANTLE,
        border: palette.border.BORDER2,
        text: palette.text.BASE
      },
      success: {
        bg: palette.hues.GREEN,
        text: palette.utility.WHITE,
        border: palette.hues.GREEN
      },
      warning: {
        bg: palette.hues.ORANGE,
        text: palette.utility.WHITE,
        border: palette.hues.ORANGE
      },
      danger: {
        bg: palette.hues.RED,
        text: palette.utility.WHITE,
        border: palette.hues.RED
      }
    }
  },
  tabs: {
    marginRight: '0',
    active: {
      fontWeight: 600,
      color: '#212121',
      border: '#FF6C37'
    },
    secondary: {
      active: {
        bg: palette.background.SURFACE1,
        color: palette.text.BASE
      },
      inactive: {
        bg: palette.background.SURFACE0,
        color: palette.text.SUBTEXT1
      }
    }
  },

  requestTabs: {
    color: '#424242',
    bg: '#FAFAFA',
    bottomBorder: '#E0E0E0',
    icon: {
      color: palette.text.SUBTEXT0,
      hoverColor: palette.text.BASE,
      hoverBg: palette.background.SURFACE1
    },
    example: {
      iconColor: palette.text.SUBTEXT2
    }
  },

  codemirror: {
    bg: palette.utility.WHITE,
    border: palette.utility.WHITE,
    placeholder: {
      color: palette.overlay.OVERLAY1,
      opacity: 0.75
    },
    gutter: {
      bg: palette.utility.WHITE
    },
    variable: {
      valid: palette.hues.GREEN,
      invalid: palette.hues.RED,
      prompt: palette.hues.BLUE
    },
    tokens: {
      definition: palette.syntax.DEFINITION,
      property: palette.syntax.PROPERTY,
      string: palette.syntax.STRING,
      number: palette.syntax.NUMBER,
      atom: palette.syntax.ATOM,
      variable: palette.syntax.VARIABLE,
      keyword: palette.syntax.KEYWORD,
      comment: palette.syntax.COMMENT,
      operator: palette.syntax.OPERATOR,
      tag: palette.syntax.TAG,
      tagBracket: palette.syntax.TAG_BRACKET
    },
    searchLineHighlightCurrent: 'rgba(120,120,120,0.10)',
    searchMatch: '#B8860B',
    searchMatchActive: '#DAA520'
  },

  table: {
    border: palette.border.BORDER0,
    thead: {
      color: palette.text.SUBTEXT2
    },
    striped: palette.background.SURFACE0,
    input: {
      color: palette.text.BASE
    }
  },

  plainGrid: {
    hoverBg: palette.background.CRUST
  },

  scrollbar: {
    color: 'rgb(152 151 149)'
  },

  dragAndDrop: {
    border: palette.overlay.OVERLAY2, // Using the same gray as focusBorder from input
    borderStyle: '2px solid',
    hoverBg: 'rgba(139, 139, 139, 0.05)', // Matching the border color with reduced opacity
    transition: 'all 0.1s ease'
  },

  infoTip: {
    bg: 'white',
    border: palette.background.SURFACE1,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
  },

  statusBar: {
    border: '#E9E9E9',
    color: 'rgb(100, 100, 100)'
  },
  console: {
    bg: '#f8f9fa',
    headerBg: '#f8f9fa',
    contentBg: '#ffffff',
    border: '#dee2e6',
    titleColor: '#212529',
    countColor: '#6c757d',
    buttonColor: '#495057',
    buttonHoverBg: '#e9ecef',
    buttonHoverColor: '#212529',
    messageColor: '#212529',
    timestampColor: '#6c757d',
    emptyColor: '#6c757d',
    logHoverBg: 'rgba(0, 0, 0, 0.03)',
    resizeHandleHover: '#0d6efd',
    resizeHandleActive: '#0d6efd',
    dropdownBg: '#ffffff',
    dropdownHeaderBg: '#f8f9fa',
    optionHoverBg: '#f8f9fa',
    optionLabelColor: '#212529',
    optionCountColor: '#6c757d',
    checkboxColor: palette.primary.SOLID,
    scrollbarTrack: '#f8f9fa',
    scrollbarThumb: '#ced4da',
    scrollbarThumbHover: '#adb5bd'
  },

  grpc: {
    tabNav: {
      container: {
        bg: '#f5f5f5'
      },
      button: {
        active: {
          bg: '#ffffff',
          color: '#000000'
        },
        inactive: {
          bg: 'transparent',
          color: '#525252'
        }
      }
    },
    importPaths: {
      header: {
        text: '#838383',
        button: {
          color: '#838383',
          hoverColor: '#343434'
        }
      },
      error: {
        bg: 'transparent',
        text: '#B91C1C',
        link: {
          color: '#B91C1C',
          hoverColor: '#dc2626'
        }
      },
      item: {
        bg: 'transparent',
        hoverBg: 'rgba(0, 0, 0, 0.05)',
        text: '#343434',
        icon: '#838383',
        checkbox: {
          color: '#343434'
        },
        invalid: {
          opacity: 0.6,
          text: '#B91C1C'
        }
      },
      empty: {
        text: '#838383'
      },
      button: {
        bg: '#e2e6ea',
        color: '#212529',
        border: '#dae0e5',
        hoverBorder: '#696969'
      }
    },
    protoFiles: {
      header: {
        text: '#838383',
        button: {
          color: '#838383',
          hoverColor: '#343434'
        }
      },
      error: {
        bg: 'transparent',
        text: '#B91C1C',
        link: {
          color: '#B91C1C',
          hoverColor: '#dc2626'
        }
      },
      item: {
        bg: 'transparent',
        hoverBg: 'rgba(0, 0, 0, 0.05)',
        selected: {
          bg: 'rgba(217, 119, 6, 0.2)',
          border: '#d97706'
        },
        text: '#343434',
        secondaryText: '#838383',
        icon: '#838383',
        invalid: {
          opacity: 0.6,
          text: '#B91C1C'
        }
      },
      empty: {
        text: '#838383'
      },
      button: {
        bg: '#e2e6ea',
        color: '#212529',
        border: '#dae0e5',
        hoverBorder: '#696969'
      }
    }
  },
  deprecationWarning: {
    bg: 'rgba(217, 31, 17, 0.1)',
    border: 'rgba(217, 31, 17, 0.1)',
    icon: '#D91F11',
    text: palette.text.BASE
  },

  examples: {
    buttonBg: '#D977061A',
    buttonColor: '#D97706',
    buttonText: '#fff',
    buttonIconColor: '#000',
    border: palette.border.BORDER0,
    urlBar: {
      border: palette.border.BORDER0,
      bg: '#F5F5F5'
    },
    table: {
      thead: {
        bg: '#f8f9fa',
        color: '#212529'
      }
    },
    checkbox: {
      color: '#fff'
    }
  },

  app: {
    collection: {
      toolbar: {
        environmentSelector: {
          bg: palette.utility.WHITE,
          border: palette.border.BORDER1,
          icon: palette.primary.TEXT,
          text: palette.text.BASE,
          caret: palette.overlay.OVERLAY1,
          separator: palette.border.BORDER1,
          hoverBg: palette.utility.WHITE,
          hoverBorder: palette.border.BORDER2,

          noEnvironment: {
            text: palette.text.SUBTEXT1,
            bg: palette.utility.WHITE,
            border: palette.border.BORDER2,
            hoverBg: palette.utility.WHITE,
            hoverBorder: palette.overlay.OVERLAY1
          }
        },
        sandboxMode: {
          safeMode: {
            bg: 'rgba(4, 120, 87, 0.12)',
            color: palette.hues.GREEN
          },
          developerMode: {
            bg: 'rgba(204, 145, 73, 0.15)',
            color: palette.hues.YELLOW
          }
        }
      }
    }
  }
};

export default lightTheme;
