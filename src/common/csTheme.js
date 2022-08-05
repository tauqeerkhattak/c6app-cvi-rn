import * as NB from 'native-base';

export const theme = NB.extendTheme({
    colors: {
        // primary: '#FF745C',
        // primary: {
        //     50: '#FFE2DD',
        //     700: '#FF745C',
        //   },
        primary50: '#FFE2DD',
        title: {
            'black': '#292929'
        },
        placeholder: '#D2D2D2',
        gray2: '#D2D2D2',
        gray4: '#8F8F8F',
        alert: {
            'red': '#FD3A3A',
        },
        linkBlue: '#349AF9',
        linkBlueDisable: '#A4D3FF',
        mute: '#737373',
        csPrimary: {
            50:  '#ffe2dd',
            100: '#FFC7BD',
            200: '#ef9774',
            300: '#e3713f',
            400: '#dc5412',
            500: '#d43600',
            600: '#FF745C',
            700: '#be2a00',
            800: '#b12200',
            900: '#991100',
          },
          screenBG: '#F5F5F5'
        // Redefining only one shade, rest of the color will remain same.
    },
    fontSizes: {
        '3.25xl': '32',
        '3.75xl': '34',
    },
    components: {
        Heading: {
            defaultProps: {
                fontSize: '3.25xl',
                color: 'title.black'
            },
        }
      },
});