/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./site/**/*.{html,js}', './*.hbs', './index.html'],
    important: false,
    variant: {
        display: ['responsive', 'group-hover', 'group-focus']
    },
    theme: {
        container: {
            center: true,
        },
        fontFamily: {
            sans: ['Roboto', 'Cabin', 'ui-sans-serif', 'system-ui']
        },
        extend: {
            spacing: {
                '0.75': '3px',
            },
            width: {
                '2xl': '40rem',
                '3xl': '50rem',
                '4xl': '58rem',
                '5xl': '60rem',
                '6xl': '64rem',
                '7xl': '70rem',
                '8xl': '80rem',
                '9xl': '1440px',
                'box1col': '534px',
                '50': '12.5rem',
            },
            fontSize: {
                '3.5xl': '1.975rem',
                'h1': ['66px', '1.2'],
                'h2': ['46px', '1.4'],
                'h3': ['38px', '50px'],
                'h4': ['28px', '38px'],
                'lead': ['24px', '32px'],
                'body1': ['20px', '28px'],
                'body2': ['16px', '24px'],
                'body3': ['14px', '19px'],
                'caption': ['13px', '18px'],
                'xs': '.8125rem',
                'h1_sm': ['40px', '52px'],
                'h2_sm': ['34px', '48px'],
                'h3_sm': ['22px', '32px'],
                'h4_sm': ['20px', '30px'],
                'lead_sm': ['18px', '26px'],
                'body1_sm': ['16px', '24px'],
                'body2_sm': ['14px', '20px'],
                'body3_sm': ['14px', '19px'],
                'caption_sm': ['13px', '18px'],
                'caption_xs': ['12px', '16px'],
                'xs_sm': '.8125rem',
                'oform-h1': ['22px', '37px'],
                //'h2_form': ['34px', '48px'],
                //'h3_form': ['22px', '32px'],
                'oform-body': ['16px', '22px'],
                'oform-body1': ['14px', '21px'],
                'oform-body2': ['12px', '25px'],
                'oform-body3': ['10px', '14px'],

            },
            lineHeight: {
                'h1': '78px',
                'h2': '58px',
                'h3': '50px',
                'h4': '38px',
                'lead': '32px',
                'body1': '28px',
                'body2': '24px',
                'body3': '19px',
                'caption': '18px',
                //'h1_sm': '78px',
                //'h2_sm': '58px',
                //'h3_sm': '50px',
                //'h4_sm': '38px',
                //'lead_sm': '32px',
                //'body1_sm': '28px',
                //'body2_sm': '24px',
                //'body3_sm': '19px',
                //'caption_sm': '18px'
            },
            boxShadow: {
                'sm': '0 0 13px rgba(0, 0, 0, 0.05)',
                DEFAULT: '0 0 26px rgba(0, 0, 0, 0.05)'
            },
            dropShadow: {
                DEFAULT: '0 0 26px rgba(0, 0, 0, 0.05)'
            },
            fontFamily: {
                'regular': 'Roobert',
                'semiBold': 'Roobert-Semibold',
                'medium': 'Roobert-Medium',
            },
            borderRadius: {
                'none': '0',
                'sm': '4px',
                'md': '6px',
                DEFAULT: '8px',
                'lg': '12px',
                'xl': '20px',
                'xxl': '26px',
                'full': '9999px',
            },
            borderWidth: {
                '1': '1px',
                '2': '2px',
            },
        },
    },
    variants: {
        extend: {},
    },
    corePlugins: {
        preflight: false,
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('postcss-import'),
        require('tailwindcss/nesting'),
        require('tailwindcss'),
        require('autoprefixer'),
        require('tailwindcss-themer')({
            defaultTheme: {
                fontFamily: {
                    normal: ["Roobert", 'sans-serif'],
                    medium: ["Roobert-Medium", 'sans-serif'],
                    semibold: ["Roobert-Semibold", 'sans-serif'],
                },
                extend: {
                    colors: {
                        form: {
                            'pink': {
                                DEFAULT: '#FF0098',
                                'main-dark': '#E20488',
                            },
                            'blue': {
                                DEFAULT: '#100072',
                                '10': '#F3F2F8',
                                '20': '#CFCCE3',
                                'text': '#C0059',
                                'dark': '#40338E'
                            },
                            'gray': '#DBDDE0',
                            'error': '#E61D47',
                        },
                        brand: {
                            DEFAULT: '#FF0098',
                            pink: '#FF0098',
                            'pink-dark': '#CC2689',
                            blue: '#100072',
                            'blue-dark': '#40338E',
                            'blue-medium': '#CBD7E8',
                            'blue-light': '#F3F6FA',
                            'gray-light': '#F5F5F5',
                            white: '#FBFAF8',
                            'white-dark': '#f6f5f4',
                            'white-darker': '#EEEDEA',
                            'green': {
                                DEFAULT: '#1db100',
                                'main-dark': '#007E00',
                            },
                            'yellow': {
                                DEFAULT: '#fcb900',
                            },
                            'black': {
                                DEFAULT: '#000',
                            },
                        },
                        primary: {
                            DEFAULT: '#100072',
                            'dark': '#0C0059',
                            'secondary': '#1F4898',
                            'mid': '#0185FF',
                            'light': '#2BE5E9',
                            'gray': {
                                DEFAULT: '#83A2D0',
                                '10': '#F3F6FA',
                                '20': '#E3E8F0',
                                '40': '#CBD7EB',
                            },
                            '60': '#7066AA',
                            'readonly': '#CBD7EB'
                        },
                        secondary: {
                            DEFAULT: '#FF0098',
                            'dark': '#E20488',
                            '10': '#FFE6F5',
                            '500': '#FF99D6',
                            'disabled': {
                                DEFAULT: '#FF99D6',
                                'text': '#CBD7EB'
                            }
                        },
                        green: {
                            DEFAULT: '#19E191',
                            'hightlight': {
                                DEFAULT: '#00FFDA',
                                '10': '#E6FFFB',
                            },
                            'dark': '#04AC69',
                            'secondary': '#E8FCF4',
                            'turkis': '#8FFFEF',
                        },
                        gray: {
                            DEFAULT: '#5E6A7A',
                            'light': {
                                DEFAULT: '#DBDDE0',
                                '10': '#EEEDEA',
                            },
                        },
                        yellow: {
                            'warm': '#FFDB43',
                            'cold': '#F1FF4A',
                        },
                        warning: {
                            DEFAULT: '#FC682A',
                            //DEFAULT: '#FF7B01',
                            'secondary': '#FF7B01',
                            'light': '#FF9F50',
                            '20': '#FFECDC',
                            'vivid': '#E61D47',
                            'vipps': '#FF5B24'

                        },
                        danger: {
                            DEFAULT: '#BB005F',
                            '10': '#FCE8ED',
                        },
                    }
                }
            },
            themes: [
                {
                    // name your theme anything that could be a valid css selector
                    // remember what you named your theme because you will use it as a class to enable the theme
                    name: 'SkandiaEnergi',
                    // put any overrides your theme has here
                    // just as if you were to extend tailwind's theme like normal https://tailwindcss.com/docs/theme#extending-the-default-theme
                    extend: {
                        fontFamily: {
                            normal: ["Saira Condensed", 'sans-serif'],
                            medium: ["Saira Condensed", 'sans-serif'],
                            semibold: ["Saira Condensed", 'sans-serif'],
                        },
                        colors: {
                            form: {
                                'pink': {
                                    DEFAULT: '#1db100',
                                    'main-dark': '#007E00',
                                },
                                'blue': {
                                    DEFAULT: '#100072',
                                    '10': '#F3F2F8',
                                    '20': '#CFCCE3',
                                    'text': '#C0059',
                                    'dark': '#40338E'
                                },
                                'gray': '#DBDDE0',
                                'error': '#E61D47',
                            },
                            brand: {
                                DEFAULT: '#1db100',
                                pink: '#1db100',
                                'pink-dark': '#007E00',
                                blue: '#1db100',
                                'blue-dark': '#0c4b00',
                                'blue-medium': '#CBD7E8',
                                'blue-light': '#F3F6FA',
                                'gray-light': '#F5F5F5',
                                white: '#FBFAF8',
                                'white-dark': '#f6f5f4',
                                'white-darker': '#EEEDEA'
                            },
                        }
                    }
                },
                {
                    // name your theme anything that could be a valid css selector
                    // remember what you named your theme because you will use it as a class to enable the theme
                    name: 'SagaEnergi',
                    // put any overrides your theme has here
                    // just as if you were to extend tailwind's theme like normal https://tailwindcss.com/docs/theme#extending-the-default-theme
                    extend: {
                        fontFamily: {
                            normal: ["Saira Condensed", 'sans-serif'],
                            medium: ["Saira Condensed", 'sans-serif'],
                            semibold: ["Saira Condensed", 'sans-serif'],
                        },
                        colors: {
                            form: {
                                'pink': {
                                    DEFAULT: '#554fff',
                                    'main-dark': '#7b77fc',
                                },
                                'blue': {
                                    DEFAULT: '#534aff',
                                    '10': '#F3F2F8',
                                    '20': '#CFCCE3',
                                    'text': '#C0059',
                                    'dark': '#40338E'
                                },
                                'gray': '#DBDDE0',
                                'error': '#E61D47',
                            },
                            brand: {
                                DEFAULT: '#554fff',
                                pink: '#554fff',
                                'pink-dark': '#7b77fc',
                                blue: '#554fff',
                                'blue-dark': '#7b77fc',
                                'blue-medium': '#CBD7E8',
                                'blue-light': '#F3F6FA',
                                'gray-light': '#F5F5F5',
                                white: '#FBFAF8',
                                'white-dark': '#f6f5f4',
                                'white-darker': '#EEEDEA'
                            },
                            secondary: {
                                DEFAULT: '#554fff',
                                'dark': '#554fff',
                                '10': '#FFE6F5',
                                '500': '#FF99D6',
                                'disabled': {
                                    DEFAULT: '#b6b4fa',
                                    'text': '#CBD7EB'
                                }
                            },
                        }
                    }
                },
                {
                    // name your theme anything that could be a valid css selector
                    // remember what you named your theme because you will use it as a class to enable the theme
                    name: 'VariEnergi',
                    // put any overrides your theme has here
                    // just as if you were to extend tailwind's theme like normal https://tailwindcss.com/docs/theme#extending-the-default-theme
                    extend: {
                        fontFamily: {
                            normal: ["Saira Condensed", 'sans-serif'],
                            medium: ["Saira Condensed", 'sans-serif'],
                            semibold: ["Saira Condensed", 'sans-serif'],
                        },
                        colors: {
                            form: {
                                'pink': {
                                    DEFAULT: '#000279',
                                    'main-dark': '#7b77fc',
                                },
                                'blue': {
                                    DEFAULT: '#534aff',
                                    '10': '#F3F2F8',
                                    '20': '#CFCCE3',
                                    'text': '#C0059',
                                    'dark': '#40338E'
                                },
                                'gray': '#DBDDE0',
                                'error': '#E61D47',
                            },
                            brand: {
                                DEFAULT: '#000279',
                                pink: '#000279',
                                'pink-dark': '#7b77fc',
                                blue: '#000279',
                                'blue-dark': '#7b77fc',
                                'blue-medium': '#CBD7E8',
                                'blue-light': '#F3F6FA',
                                'gray-light': '#F5F5F5',
                                white: '#FBFAF8',
                                'white-dark': '#f6f5f4',
                                'white-darker': '#EEEDEA'
                            },
                            secondary: {
                                DEFAULT: '#000279',
                                'dark': '#000279',
                                '10': '#FFE6F5',
                                '500': '#FF99D6',
                                'disabled': {
                                    DEFAULT: '#b6b4fa',
                                    'text': '#CBD7EB'
                                }
                            },
                        }
                    }
                }
            ]
        })
    ],
}
