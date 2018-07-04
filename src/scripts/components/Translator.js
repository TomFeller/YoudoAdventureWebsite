import React from "react";
import styled from 'styled-components';
import {HBox, VBox, Element} from 'react-stylesheet';
import MdCached from 'react-icons/lib/md/cached';
import MdContentCopy from 'react-icons/lib/md/content-copy';

import {Gutter} from '../../style/GlobalStyle';

class Translator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            originalLetters: ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י', 'כ', 'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ', 'ק', 'ר', 'ש', 'ת'],
            letters: [],
            sentence: [],
            translate: ''
        };

        this.translate = this.translate.bind(this);
        this.updateInputState = this.updateInputState.bind(this);
        this.copyToClipoboard = this.copyToClipoboard.bind(this);
    }

    componentDidMount() {
        const {letters} = this.props;
        this.setState({
            letters: letters && this.props.letters.split('\n')
        })
    }

    updateInputState(e) {
        let value = e.target.value;
        this.state.sentence = [];

        for (let i = 0; i < value.length; i++) {
            let letter = value[i];

            switch(letter) {
                case 'ך':
                    letter = 'כ';
                    break;

                case 'ם':
                    letter = 'מ';
                    break;
                case 'ן':
                    letter = 'נ';
                    break;
                case 'ף':
                    letter = 'פ';
                    break;
                case 'ץ':
                    letter = 'צ';
                    break;
                default:
                    letter = value[i] ? value[i] : ' '
            }

            console.log(letter);

            this.state.sentence.push(letter);
        }

        this.setState({
            sentence: this.state.sentence
        });
    }

    translate() {
        const {sentence, letters, originalLetters} = this.state;
        let newValue = '';

        sentence.map((l) => {
            const index = originalLetters.indexOf(l);
            newValue += index === -1 ? ' ' : letters[originalLetters.indexOf(l)];
        });

        this.setState({
            translate: newValue
        });
    }

    copyToClipoboard(e) {
        const copyText = e.target.parentElement.firstElementChild;

        /* Select the text field */
        copyText.select();

        /* Copy the text inside the text field */
        document.execCommand("copy");

        /* Alert the copied text */
        // alert("Copied the text: " + copyText.value);
    }

    render() {
        const {translate} = this.state,
            {title, description} = this.props;

        return (
            <TranslatorWrapper>
                <HBox alignItems={'stretch'} justifyContent={'space-between'}>
                    <VBox alignItems={'stretch'} style={half}>
                        <h3>{title}</h3>
                        <p>{description}</p>
                        <TextArea rows={5} onChange={this.updateInputState}/>
                    </VBox>

                    <Arrow onClick={this.translate}>
                        <MdCached size={44}/>
                    </Arrow>

                    <VBox style={half}>
                        <h3>מחולל גימטריה</h3>
                        <p>תיאור מחולל גימטריה</p>
                        <TranslateBox>
                            <input type={'hidden'} value={translate}/>
                            <p>{translate}</p>
                            {translate !== '' &&
                            <MdContentCopy size={30}
                                           style={copyContent}
                                           value={translate}
                                           onClick={this.copyToClipoboard}
                            />
                            }
                        </TranslateBox>

                    </VBox>
                </HBox>
            </TranslatorWrapper>
        )
    }
}

export default Translator;

const half = {
    width: '42%'
};

const
    TranslatorWrapper= styled.div`
        flex: auto;
    `,
    Arrow = styled.div`
        padding: 0 1.5rem 6.5rem;
        cursor: pointer;
        text-align: center;
        align-self: flex-end;
        width: 16%;  
    `,
    TranslateBox = styled.div`
        width: 100%;
        height: 20rem
        border: 1px solid #999;
        text-align: left;
        padding: ${Gutter.xs};
        textarea {
            border: 0;
            height: 100%;
        }
    `,
    TextArea = styled.textarea`
        width: 100%;
        height: 20rem
    `,
    copyContent = {
        position: 'absolute',
        bottom: Gutter.xs,
        right: Gutter.xs,
        cursor: 'pointer'
    };