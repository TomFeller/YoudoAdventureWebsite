import styled from 'styled-components';

const
    Viewport = {
        xs: '32rem',
        sm: '64rem',
        md: '76.8rem',
        lg: '99.2rem',
        xl: '120rem',
        wide: '144rem',
    },
    Gutter = {
        xs: '1rem',
        sm: '1.5rem',
        md: '2.5rem',
        lg: '3.5rem',
        xl: '4.5rem'
    },
    FontSize = {
        xs: '1rem',
        sm: '1.5rem',
        md: '1.8rem',
        lg: '2.5rem',
        xl: '3.5rem',
        jumbo: '4.5rem'
    };


const
    Container = styled.div`
        width: 100%;
        padding: 0 ${Gutter.sm};
        margin: 0 auto;
        @media screen and (min-width: ${Viewport.sm}) {
            width: ${Viewport.md};
        }
        @media screen and (min-width: ${Viewport.md}) {
            width: ${Viewport.lg};
        }
        @media screen and (min-width: ${Viewport.lg}) {
            width: ${Viewport.xl};
        }
        @media screen and (min-width: ${Viewport.xl}) {
            width: ${Viewport.wide};
        }
    `,
    PageTitle = styled.h1`
        font-size: ${FontSize.lg};
        font-weight: 700;
        text-align: center;
    `,
    PageDescription = styled.p`
        font-size: ${FontSize.sm};
        text-align: center;
    `;

export {Container, Gutter, PageTitle, PageDescription, FontSize, Viewport};