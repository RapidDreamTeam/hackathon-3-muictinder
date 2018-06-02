import React from 'react';
import {View, Text} from 'react-native'
import Swiper from 'react-native-deck-swiper'
import {StyleSheet} from "react-native";
import PropTypes from "prop-types"
import {withContext} from "../context/withContext";
import {compose} from "recompose";


const SwiperCards = ({cards, onSwipedLeft, onSwipedRight, onSwipedTop, renderCard, children, onSwipedAllCards, onSwiped,...rest}) => {
    return (
        <Swiper disableBottomSwipe cards={cards} renderCard={renderCard}
                onSwipedLeft={onSwipedLeft} onSwipedRight={onSwipedRight}
                onSwipedTop={onSwipedTop} stackSize={3}
                onSwiped={onSwiped}
                onSwipedAll={onSwipedAllCards}>
            {children}
        </Swiper>
    )
}

PropTypes.SwipeCards = {
    cards: PropTypes.shape({
        text: PropTypes.node.isRequired
    }),
    onSwipedLeft: PropTypes.func.isRequired,
    onSwipedRight: PropTypes.func.isRequired,
    onSwipedTop: PropTypes.func.isRequired,
    onSwipedAllCards: PropTypes.func.isRequired

};


const Card = ({text}) => (
    <View style={styles.card}>
        <Text style={styles.text}>{text}</Text>
    </View>
);

class Home extends React.Component {
    state = {
        cards: [
            'DO', 'MORE', 'OF', 'WHAT', 'MAKES', 'YOU', 'HAPPY'
        ].map(ele => ({ text: ele })) ,
        swipedAllCards: false
    };

    onSwipedAllCards = () => {
        console.log("No more card")
    };

    onSwipeLeftHandler = () => {
        console.log("Nope");
    };


    onSwipeRightHandler = () => {
        console.log("Yehhhhh");
    };

    onSwipeTopHandler = () => {
        console.log("Ohhhh Yehhhhhhhh");
    };

    onSwipeTopHandler = () => {

    }


    render() {

        const { cards } = this.state;

        return (
            <SwiperCards cards={cards} onSwipedLeft={this.onSwipeLeftHandler}
                         onSwipedRight={this.onSwipeRightHandler} onSwipedTop={this.onSwipeTopHandler}
                         renderCard={Card} onSwipedAllCards={this.onSwipedAllCards}>
                Done
            </SwiperCards>
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
        backgroundColor: "white"
    },
    text: {
        textAlign: "center",
        fontSize: 50,
        backgroundColor: "transparent"
    }
});


export default compose(withContext)(Home)
