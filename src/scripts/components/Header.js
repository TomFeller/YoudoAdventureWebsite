import React from 'react';
import DataStore from '../flux/stores/DataStore.js';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {HBox, VBox, Element} from 'react-stylesheet';
import {Gutter} from '../../style/GlobalStyle';


class Header extends React.Component {
    render() {
        let allPages = DataStore.getAllPages();
        allPages = _.sortBy(allPages, [function (page) {
            return page.menu_order;
        }]); // Sort pages by order

        return (
            <HBox justifyContent={'space-between'}
                  alignItems={'center'}
                  className="header"
                  style={header}>
                <HBox>
                    <UserImage>
                        <img src={'http://admin.youdoadventures.com/wp-content/uploads/2018/07/Tami.png'}/>
                    </UserImage>
                    <Element>
                        <p style={{marginBottom: 0}}>היי תמי!</p>
                        <Link to={'/'}>צור הרפתקאה</Link>
                        <span style={seperator}></span>
                        <Link to={'/'}>צור חידה</Link>
                    </Element>
                </HBox>

                <Navigation>
                    <Element>
                        <Link to="/">בית</Link>
                    </Element>
                    {allPages.map((page) => {
                        if (page.slug !== 'home') {
                            return (
                                <Element key={page.id}>
                                    <Link to={`/${page.slug}`}>{page.title.rendered}</Link>
                                </Element>
                            )
                        }
                    })}
                </Navigation>

                <Logo>
                    <img src={'http://127.0.0.1:85/wordpress/wp-content/uploads/2018/07/screenshot.png'}/>
                </Logo>
            </HBox>
        );
    }
}

export default Header;

const
    header = {
        position: 'fixed',
        top: 0,
        width: '100%',
        padding: Gutter.sm,
        borderBottom: '1px solid',
        zIndex: '30',
        backgroundColor: '#fff'
    },
    WelcomeUser = styled.div`
    
    `,
    UserImage = styled.div`
        width: 5rem;
        height: 5rem;
        border-radius: 50%;
        overflow: hidden;
        margin-left: ${Gutter.sm}
        img {
            width: 100%;
        }
    `,
    seperator = {
        width: '.2rem',
        height: '1rem',
        margin: `0 ${Gutter.xs}`,
        display: 'inline-block',
        backgroundColor: 'red'
    },
    Logo = styled.div`
    
    `,
    Navigation = styled.div`
        display: flex;
        a {
            font-size: 2rem;
            margin: 0 ${Gutter.sm};
        }
    `;