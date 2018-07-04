import React from "react";
import styled from 'styled-components';
import {HBox, VBox, Element} from 'react-stylesheet';
import FaMinus from 'react-icons/lib/fa/minus-square';
import FaPlus from 'react-icons/lib/fa/plus-square';
import axios from "axios/index";
import {Button} from 'react-bootstrap';
import {FontSize, Gutter} from '../../style/GlobalStyle';

class PostsNavigation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            allPosts: this.props.allPosts,
            postsByCategories: []
        }
    }

    componentWillMount() {
        const appUrl = 'http://admin.youdoadventures.com',
            categoriesApi = `${appUrl}/wp-json/wp/v2/categories`;

        let postsByCategories = [];

        this.api(categoriesApi).then((response) => {
            response.map((cat, i) => {
                this.setState({
                    [cat.id]: cat.name
                });
                postsByCategories.push(this.state.allPosts.filter((post) => {
                    return post.categories[0] === cat.id
                }));
            });
            this.setState({
                postsByCategories: postsByCategories,
                allCategories: response
            });
        });
    }

    // Method for getting data from the provided end point url
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
        const {postsByCategories} = this.state;
        return (
            <SidePostNavigation>
                {postsByCategories.map((cat, c) => {
                    const catId = cat[0] && cat[0].categories[0],
                        categoryName = this.state[catId];
                    return (
                        <NavigationGroup key={c}
                                         c={c}
                                         cat={cat}
                                         categoryName={categoryName}/>
                    )
                })}
            </SidePostNavigation>
        )
    }
}

class NavigationGroup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: true
        };

        this.closeGroup = this.closeGroup.bind(this);
        this.openGroup = this.openGroup.bind(this);
    }

    closeGroup() {
        this.setState({
            isOpen: false
        })
    }

    openGroup() {
        this.setState({
            isOpen: true
        })
    }

    render() {
        const {c, cat, categoryName} = this.props,
            {isOpen} = this.state;

        return (
            <Group key={c}>
                <HBox justifyContent={'space-between'} alignItems={'center'} className={'groupTitle'}>
                    <CategoryTitle>{categoryName}</CategoryTitle>
                    <div className={'minimize-me'}
                         onClick={isOpen ? this.closeGroup : this.openGroup}>
                        {isOpen ? <FaMinus size={20}/> : <FaPlus size={20}/>}
                    </div>
                </HBox>
                {isOpen &&
                <ul style={groupList}>
                    {cat.map((post, p) => {
                        return (
                            <ListItem key={p}>
                                <a href={`/riddles/#riddle-${post.slug}`}
                                   style={{color: '#000000'}}>{post.title.rendered}</a>
                            </ListItem>
                        )
                    })}
                </ul>
                }
            </Group>
        )
    }
}


export default PostsNavigation;

const
    SidePostNavigation = styled.div`
        position: fixed;
        max-height: 100vh;
        width: 20rem;
        overflow-y: auto;
        background-color: #f1f1f1;
        padding-right: ${Gutter.sm};
        padding-left: ${Gutter.sm};
        overflow-x: hidden;
        padding-bottom: 10rem;  
        &::-webkit-scrollbar {
            width: 0;
        }
        &::-webkit-scrollbar-track {
            background: transparent;
        }
        &::-webkit-scrollbar-thumb {
            background: transparent;
        }    
        &::-webkit-scrollbar-thumb:hover {
            background: transparent;
        }
        h3 {
            margin: 0;
        }
        ul {
            margin-top: ${Gutter.sm}
        }
        .groupTitle {
            &:hover .minimize-me {
                display: block;
            }
            .minimize-me {
                display: none;
                cursor: pointer;
            }
        }`,
    Group = styled.div`
        margin-bottom: ${Gutter.md}
    `,
    CategoryTitle = styled.h3`
        font-weight: bold;
        font-size: ${FontSize.lg};
    `,
    ListItem = styled.li`
        a {
            color: #000;
            font-size: ${FontSize.md};
        }
    `,
    groupList = {
        // marginTop: Gutter.md
    };


