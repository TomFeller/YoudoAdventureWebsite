import React from 'react';
import DataStore from '../flux/stores/DataStore.js'


class Home extends React.Component {
    render() {
        let pageData = DataStore.getPageBySlug('home');
        console.log(pageData);
        return (
            <div>
                <h2>Homepage template</h2>
                <h1>{pageData.title.rendered}</h1>

                <div dangerouslySetInnerHTML={{__html: pageData.excerpt.rendered}} />
                <div>{pageData.acf && pageData.acf.text}</div>
            </div>
        );
    }
}

export default Home;
