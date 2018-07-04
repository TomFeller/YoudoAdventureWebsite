import React from 'react';
import styled from 'styled-components';
import MdPrint from 'react-icons/lib/md/print';
import MdShopingCart from 'react-icons/lib/md/shopping-cart'
import MdStarOutline from 'react-icons/lib/md/star-outline';
import DataStore from '../flux/stores/DataStore.js';
import {HBox, VBox, Element} from 'react-stylesheet';
import {Container, Gutter, PageTitle, Viewport, PageDescription, FontSize} from '../../style/GlobalStyle';
import PostsNavigation from './PostsNavigation';
import {Tooltip, Grid} from 'react-bootstrap';
import Translator from './Translator';
import axios from "axios/index";


class Posts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            allPosts: [],
            pageTitle: DataStore.getPageBySlug('riddles')
        };
    }

    componentDidMount() {
        const appUrl = 'http://admin.youdoadventures.com',
            riddlesApi = `${appUrl}/wp-json/wp/v2/riddles`;

        let allRiddles = [];

        this.api(riddlesApi).then((response) => {
            response.map((riddle, i) => {
                allRiddles.push(riddle)
            });
            this.setState({
                allPosts: allRiddles
            });
        });
    }

    api(endPoint) {
        return new Promise((resolve, reject) => {
            axios.get(endPoint).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    render() {
        const {allPosts, pageTitle} = this.state;
        return (
            <HBox style={PostsPage}>
                {allPosts.length > 0 &&
                <SidebarNavigation>
                    <PostsNavigation allPosts={allPosts}/>
                </SidebarNavigation>
                }

                <PostsWrapper>

                    <Element padding={`${Gutter.md} 0`}>

                        <Element padding={`0 ${Gutter.xl}`}>
                            <PageTitle>{pageTitle.title.rendered}</PageTitle>
                            <PageDescription dangerouslySetInnerHTML={{__html: pageTitle.content.rendered}}/>
                        </Element>

                        {allPosts.map((post, i) => {
                            const {slug, id, title, content, categories, better_featured_image, acf} = post,
                                featureImage = better_featured_image && better_featured_image.media_details.file;

                            return (
                                <Post key={i} id={`riddle-${slug}`} className={`post post-${slug} post-${id}`}>

                                    <Actions/>
                                    <Container>
                                        <HBox flexWrap={'wrap'}
                                              alignItems={'stretch'}
                                              justifyContent={'center'}
                                              style={PostTitles}>
                                            <ResponsiveBox>
                                                <VBox alignItems={'flex-start'}>
                                                    <PostTitle>{title.rendered}</PostTitle>
                                                    <PostDescription dangerouslySetInnerHTML={{__html: content.rendered}}/>
                                                </VBox>
                                                {/*<PostTitleSep/>*/}
                                            </ResponsiveBox>
                                            <ResponsiveBox>
                                                <PostVideo>
                                                    {acf['video-url'] && <iframe width="100%"
                                                                                 height="340"
                                                                                 style={{display: 'block'}}
                                                                                 src={acf['video-url']}
                                                                                 frameBorder="0"
                                                                                 allowFullScreen
                                                    />}
                                                </PostVideo>
                                            </ResponsiveBox>
                                        </HBox>

                                        <HBox flexWrap={'wrap'} justifyContent={'space-between'}
                                              style={PostContent}>
                                            <ResponsiveBoxThird>
                                                {featureImage &&
                                                <PostImage>
                                                    <img
                                                        src={`http://admin.youdoadventures.com/wp-content/uploads/${featureImage}`}/>
                                                </PostImage>
                                                }
                                            </ResponsiveBoxThird>
                                            <ResponsiveBoxTwoThird>
                                                {acf['add_translator'] &&
                                                <Translator title={acf.title}
                                                            description={acf.description}
                                                            letters={acf.letters}/>
                                                }
                                            </ResponsiveBoxTwoThird>
                                        </HBox>
                                    </Container>
                                </Post>
                            )
                        })}
                    </Element>

                </PostsWrapper>
            </HBox>
        );
    }
}

const Actions = () => {
    return (
        <div style={PostActions} className='postActions'>

            <PostAction style={{backgroundColor: 'yellow'}}>
                <Tooltip placement='left' className='in tooltip' id='tooltip-left'>הוסף למועדפים</Tooltip>
                <MdStarOutline size={34}/>
            </PostAction>

            <PostAction style={{backgroundColor: 'lightblue'}}>
                <Tooltip placement='left' className='in tooltip' id='tooltip-left'>קובץ להדפסה</Tooltip>
                <MdPrint size={34}/>
            </PostAction>

            <PostAction style={{backgroundColor: 'orange'}}>
                <Tooltip placement='left' className='in tooltip' id='tooltip-left'>הוסף להרפתקאה שלי</Tooltip>
                <MdShopingCart size={34}/>
            </PostAction>
        </div>
    )
};

export default Posts;

const
    ResponsiveBox = styled.div`
        width: 100%;
        padding: 0 ${Gutter.xs};
        @media screen and (min-width: ${Viewport.md}) {
            width: 50%;
        }
    `,
    ResponsiveBoxThird = styled.div`
        width: 100%;
        padding: 0 ${Gutter.xs};
        @media screen and (min-width: ${Viewport.md}) {
            width: 35%;
        }
    `,
    ResponsiveBoxTwoThird = styled.div`
        width: 100%;
        padding: 0 ${Gutter.xs};
        @media screen and (min-width: ${Viewport.md}) {
            width: 65%;
        }
    `;

const
    PostsPage = {
        marginTop: '10.3rem'
    },
    PostsWrapper = styled.div`
        flex-grow: 1;
        position: relative;
        background-color: #fff;
    `,
    SidebarNavigation = styled.div`
        min-width: 20rem;
        background-color: #f1f1f1;
    `;

const
    Post = styled.div`
        position: relative;
        border-bottom: 1px solid;
        overflow: hidden;
        padding: ${Gutter.xl};
        &:hover .postActions {
            transform: translateX(0) !important;
        }
    `,

    PostContent = {
        marginBottom: Gutter.xl
    },

    PostActions = {
        position: 'absolute',
        right: '0',
        top: '40%',
        transform: 'translateX(5rem)',
        transition: 'transform .1s',
        zIndex: '1'
    },

    PostAction = styled.div`
        position: relative;
        cursor: pointer;
        padding: .5rem;
        .tooltip { 
            opacity: 0;
            transition: opacity .2s;
            right: 5.3rem;
            bottom: .8rem;
            white-space: nowrap;
            font-size: ${FontSize.md}
        } 
        &:hover .tooltip {
            opacity: 1;
        }
    `,

    PostTitles = {
        marginBottom: Gutter.xl,
        textAlign: 'right',
    },

    PostTitle = styled.h3`
        margin: 0;
        font-weight: 700;
        font-size: 8rem;
        line-height: 1;
        text-align: right;
        margin-top: -1.1rem;
        margin-bottom: ${Gutter.sm}; 
    `,

    PostDescription = styled.p`
        width: 100%;
        margin: ${Gutter.xs} 0;
        font-size: ${FontSize.md};
        margin: 0;
        p {
            text-align: right;
        }
    `,

    PostTitleSep = styled.div`
        width: .2rem;
        background-color: red;
        margin: 0 ${Gutter.lg};  
    `,

    PostImage = styled.div`
        padding: ${Gutter.sm};
        // width: 40%;
        img {
            width: 100%;
        }
    `,

    PostVideo = styled.div`
        flex: auto;
    `;