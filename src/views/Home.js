import React from 'react';
import {View, Text, Image} from 'react-native'
import Swiper from 'react-native-deck-swiper'
import {StyleSheet} from "react-native";
import PropTypes from "prop-types"
import {withContext} from "../context/withContext";
import { compose } from "recompose";
import {Button, Container} from 'native-base'
import {facebookLogout} from '../api/authentication/FacebookAuthentication'
import { onSwipedLeft, onSwipedRight, onSwipedTop } from "../api/matcher/SwipeAction";
import {fetchCards} from "../api/matcher/Cards";


const SwiperCards = ({cards, onSwipedLeft, onSwipedRight, onSwipedTop, renderCard, children, onSwipedAllCards, onSwiped,...rest}) => {
    return (
        <Swiper disableBottomSwipe cards={cards} renderCard={renderCard}
                onSwipedLeft={onSwipedLeft} onSwipedRight={onSwipedRight}
                onSwipedTop={onSwipedTop} stackSize={2}
                onSwiped={onSwiped}
                onSwipedAll={onSwipedAllCards} >
            {children}
        </Swiper>
    )
};

SwiperCards.propTypes = {
    cards: PropTypes.shape({
        text: PropTypes.node.isRequired
    }),
    onSwipedLeft: PropTypes.func.isRequired,
    onSwipedRight: PropTypes.func.isRequired,
    onSwipedTop: PropTypes.func.isRequired,
    onSwipedAllCards: PropTypes.func.isRequired

};


const Card = ({name, photo}, idx) => {
    return (<View style={styles.card}>
    <Image
        style={{width: 400, height: 400}}
        source={{uri: photo}}
        />
        {/*<Image*/}
        {/*style={{width: 100, height: 100}}*/}
        {/*source={{uri: "https://www.jqueryscript.net/images/Simplest-Responsive-jQuery-Image-Lightbox-Plugin-simple-lightbox.jpg"}}/>*/}
        <Text style={styles.text}>{name} - {idx}</Text>
    </View>);
};

Card.propTypes = {
    text: PropTypes.node.isRequired
};

class Home extends React.Component {

    // static navigationOptions = {
    //     title: 'Minder',
    // };

    static navigationOptions = ({ navigation }) => {
        return {
            title: "Minder",
        };
    };
    componentDidMount() {
        fetchCards(10).then((d) => console.log('done', this.setState({cards: d}))).catch(e => console.log(e.msg));
    }

    // static navigationOptions = {
    //     title: 'Minder',
    //     currentPage: "HOME"
    // };

    state = {
        cards: [],
        // cards: [
        //     'DO', 'MORE', 'OF', 'WHAT', 'MAKES', 'YOU', 'HAPPY'
        // ].map(ele => ({ text: ele })) ,
        swipedAllCards: false
    };

    onSwipedAllCards = () => {
        console.log("No more card")
    };

    render() {
        const { cards } = this.state;

        return (
            <Container >
                <SwiperCards cards={cards} onSwipedLeft={onSwipedLeft(cards)}
                             onSwipedRight={onSwipedRight(cards)} onSwipedTop={onSwipedTop(cards)}
                             renderCard={Card} onSwipedAllCards={this.onSwipedAllCards}>
                </SwiperCards>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        flex: 1,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: "#E8E8E8",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
    },
    text: {
        textAlign: "center",
        fontSize: 50,
        backgroundColor: "transparent"
    }
});


export default compose(withContext)(Home)
